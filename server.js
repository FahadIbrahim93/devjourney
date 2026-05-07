const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { validateEnv } = require("./env-schema");
const {
  hermesConfig,
  getCurrentApiKey,
  getCurrentApiKeyWithProvider,
  rotateApiKey,
  rotateToNextProvider,
  getKeyMetrics,
  getFullMetrics,
  getEnabledProviders,
  getCurrentProvider
} = require("./hermes-config");

dotenv.config({ path: "./.env" });
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/hermes/config", function(req, res) {
  res.json({
    config: hermesConfig,
    currentProvider: getCurrentProvider()?.name,
    keyRotationEnabled: hermesConfig.api.rotation.enabled,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/hermes/provider/current", function(req, res) {
  const provider = getCurrentProvider();
  if (!provider) {
    return res.status(503).json({ error: "No providers available" });
  }
  
  res.json({
    provider: provider.name,
    type: provider.type,
    model: provider.model,
    baseURL: provider.baseURL,
    keyIndex: hermesConfig.api.rotation.currentKeyIndex,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/hermes/rotate", function(req, res) {
  const success = rotateToNextProvider();
  const provider = getCurrentProvider();
  const api = getCurrentApiKeyWithProvider();
  
  res.json({
    success: success,
    message: success ? "Rotated to next provider" : "No more providers to rotate to",
    newProvider: provider?.name,
    newModel: provider?.model,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/hermes/key/rotate", function(req, res) {
  const newKey = rotateApiKey();
  const api = getCurrentApiKeyWithProvider();
  
  res.json({
    message: "Rotated to next key/provider",
    provider: api?.provider,
    model: api?.model,
    key: newKey ? newKey.substring(0, 20) + "..." : "none",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", function(req, res) {
  res.json({
    status: "healthy",
    agent: "hermes",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/hermes/metrics", function(req, res) {
  res.json({
    providers: getKeyMetrics(),
    currentProvider: getCurrentProvider()?.name,
    rotation: hermesConfig.api.rotation,
    rateLimit: hermesConfig.api.rateLimit,
    cache: hermesConfig.cache,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/hermes/providers", function(req, res) {
  res.json({
    providers: getEnabledProviders().map(p => ({
      name: p.name,
      type: p.type,
      model: p.model,
      baseURL: p.baseURL,
      priority: p.priority,
      keys: p.keys.map(k => ({
        name: k.name,
        usage: k.usage,
        limit: k.limit,
        available: k.limit - k.usage
      }))
    })),
    timestamp: new Date().toISOString()
  });
});

const server = app.listen(PORT, function() {
  const providers = getEnabledProviders();
  const current = getCurrentProvider();
  
  console.log("\n" + "=".repeat(60));
  console.log("HERMES AGENT DASHBOARD");
  console.log("=".repeat(60));
  console.log("✅ Server running on http://localhost:" + PORT);
  console.log("✅ Providers: " + providers.length);
  console.log("✅ Current: " + current.name + " (" + current.model + ")");
  console.log("=".repeat(60));

  console.log("\nAvailable Endpoints:");
  console.log("  GET  /health                     - Health check");
  console.log("  GET  /api/hermes/config           - Full configuration");
  console.log("  GET  /api/hermes/providers       - List all providers");
  console.log("  GET  /api/hermes/provider/current - Current provider");
  console.log("  GET  /api/hermes/metrics         - Usage metrics");
  console.log("  POST /api/hermes/rotate         - Rotate to next provider");
  console.log("  POST /api/hermes/key/rotate      - Rotate key within provider");
  console.log("  GET  /                          - Web dashboard");
  console.log("=".repeat(60) + "\n");
});

module.exports = app;