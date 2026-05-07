/**
 * Hermes Session Memory System
 * Enables learning across sessions
 */

const fs = require('fs');
const path = require('path');

class SessionMemory {
  constructor(options = {}) {
    this.baseDir = options.baseDir || process.cwd();
    this.sessionsDir = path.join(this.baseDir, 'Logs', 'sessions');
    this.ensureDirectory(this.sessionsDir);
  }

  ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  getSessionId() {
    const now = new Date();
    return `session_${now.toISOString().slice(0, 10)}_${now.getTime()}`;
  }

  // Start a new session
  startSession(context = {}) {
    const session = {
      id: this.getSessionId(),
      startTime: new Date().toISOString(),
      context,
      iterations: [],
      decisions: [],
      toolCalls: [],
      errors: [],
      results: {
        tasksCompleted: 0,
        filesModified: 0,
        bugsFixed: 0,
        qualityGates: { passed: 0, failed: 0 }
      },
      metrics: {
        provider: 'opencode-zen',
        model: 'minimax-m2.5-free',
        apiCalls: 0,
        tokensUsed: 0
      }
    };
    
    this.currentSession = session;
    return session;
  }

  // Log an iteration
  logIteration(data) {
    if (!this.currentSession) {
      this.startSession();
    }
    
    const entry = {
      timestamp: new Date().toISOString(),
      iteration: this.currentSession.iterations.length,
      ...data
    };
    
    this.currentSession.iterations.push(entry);
    return entry;
  }

  // Log a decision (for learning)
  logDecision(decision) {
    if (!this.currentSession) {
      this.startSession();
    }
    
    this.currentSession.decisions.push({
      timestamp: new Date().toISOString(),
      decision,
      rationale: decision.rationale || '',
      outcome: decision.outcome || 'pending'
    });
  }

  // Log a tool call
  logToolCall(toolName, args, result) {
    if (!this.currentSession) {
      this.startSession();
    }
    
    this.currentSession.toolCalls.push({
      timestamp: new Date().toISOString(),
      tool: toolName,
      args: args ? JSON.stringify(args).substring(0, 200) : '',
      success: !result.error,
      resultTruncated: result?.error || (result + '').substring(0, 100)
    });
  }

  // Log an error
  logError(error) {
    if (!this.currentSession) {
      this.startSession();
    }
    
    this.currentSession.errors.push({
      timestamp: new Date().toISOString(),
      error: error.message || error,
      stack: error.stack || ''
    });
  }

  // Update results
  updateResults(updates) {
    if (!this.currentSession) {
      this.startSession();
    }
    
    Object.assign(this.currentSession.results, updates);
  }

  // Update metrics
  updateMetrics(updates) {
    if (!this.currentSession) {
      this.startSession();
    }
    
    Object.assign(this.currentSession.metrics, updates);
  }

  // End session and save
  endSession(summary = {}) {
    if (!this.currentSession) {
      return null;
    }
    
    this.currentSession.endTime = new Date().toISOString();
    this.currentSession.duration = 
      new Date(this.currentSession.endTime) - new Date(this.currentSession.startTime);
    
    // Calculate statistics
    const successfulCalls = this.currentSession.toolCalls.filter(t => t.success).length;
    const totalCalls = this.currentSession.toolCalls.length;
    
    this.currentSession.stats = {
      toolSuccessRate: totalCalls > 0 ? successfulCalls / totalCalls : 0,
      iterations: this.currentSession.iterations.length,
      decisions: this.currentSession.decisions.length,
      errors: this.currentSession.errors.length
    };
    
    // Merge summary
    Object.assign(this.currentSession, summary);
    
    // Save to file
    const filename = path.join(this.sessionsDir, `${this.currentSession.id}.json`);
    fs.writeFileSync(filename, JSON.stringify(this.currentSession, null, 2));
    
    console.log(`[SessionMemory] Session saved: ${filename}`);
    console.log(`[SessionMemory] Duration: ${this.currentSession.duration}ms`);
    console.log(`[SessionMemory] Iterations: ${this.currentSession.iterations.length}`);
    console.log(`[SessionMemory] Tool calls: ${totalCalls} (${successfulCalls} success)`);
    
    return this.currentSession;
  }

  // Get session history
  getHistory(count = 10) {
    if (!fs.existsSync(this.sessionsDir)) {
      return [];
    }
    
    const files = fs.readdirSync(this.sessionsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()
      .slice(0, count);
    
    return files.map(f => {
      const content = fs.readFileSync(path.join(this.sessionsDir, f), 'utf8');
      return JSON.parse(content);
    });
  }

  // Aggregate metrics across sessions
  getAggregateMetrics(count = 10) {
    const sessions = this.getHistory(count);
    
    return {
      totalSessions: sessions.length,
      totalIterations: sessions.reduce((sum, s) => sum + (s.iterations?.length || 0), 0),
      totalFilesModified: sessions.reduce((sum, s) => sum + (s.results?.filesModified || 0), 0),
      totalBugsFixed: sessions.reduce((sum, s) => sum + (s.results?.bugsFixed || 0), 0),
      avgToolSuccessRate: sessions.length > 0 
        ? sessions.reduce((sum, s) => sum + (s.stats?.toolSuccessRate || 0), 0) / sessions.length 
        : 0,
      commonErrors: this.getCommonErrors(sessions),
      topDecisions: this.getTopDecisions(sessions)
    };
  }

  getCommonErrors(sessions) {
    const errors = {};
    sessions.forEach(s => {
      (s.errors || []).forEach(e => {
        const key = String(e.error || 'unknown').substring(0, 50);
        errors[key] = (errors[key] || 0) + 1;
      });
    });
    
    return Object.entries(errors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([error, count]) => ({ error, count }));
  }

  getTopDecisions(sessions) {
    const decisions = {};
    sessions.forEach(s => {
      (s.decisions || []).forEach(d => {
        const key = String(d.decision || 'unknown').substring(0, 50);
        decisions[key] = (decisions[key] || 0) + 1;
      });
    });
    
    return Object.entries(decisions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([decision, count]) => ({ decision, count }));
  }

  // Get strategy recommendations based on history
  getRecommendations() {
    const metrics = this.getAggregateMetrics(20);
    const recommendations = [];
    
    if (metrics.avgToolSuccessRate < 0.7) {
      recommendations.push({
        priority: 'HIGH',
        area: 'Tool Use',
        recommendation: 'Improve tool usage strategy - low success rate'
      });
    }
    
    if (metrics.commonErrors.length > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        area: 'Error Handling',
        recommendation: `Common errors: ${metrics.commonErrors[0]?.error}`,
        actions: ['Add retry logic', 'Improve error handling']
      });
    }
    
    if (metrics.totalBugsFixed < 5) {
      recommendations.push({
        priority: 'HIGH',
        area: 'Productivity',
        recommendation: 'Low bug fix rate - adjust task selection'
      });
    }
    
    return recommendations;
  }
}

module.exports = { SessionMemory };

// Helper to create a memory instance
function createSessionMemory(baseDir) {
  return new SessionMemory({ baseDir });
}

module.exports.createSessionMemory = createSessionMemory;