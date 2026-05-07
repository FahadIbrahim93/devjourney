const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config({ path: "./.env" });

const hermesConfig = {
  api: {
    rotation: {
      enabled: process.env.HERMES_AGENT_AUTO_ROTATE === "true",
      strategy: process.env.HERMES_KEY_ROTATION_STRATEGY || "priority-based",
      currentKeyIndex: 0,
      maxRetries: parseInt(process.env.HERMES_KEY_MAX_RETRIES || "3", 10),
      retryDelayMs: parseInt(process.env.HERMES_KEY_RETRY_DELAY_MS || "1000", 10),
      checkIntervalMs: parseInt(process.env.HERMES_KEY_CHECK_INTERVAL_MS || "300000", 10)
    },
    rateLimit: {
      enabled: process.env.API_RATE_LIMIT_ENABLED === "true",
      requestsPerMinute: parseInt(process.env.API_RATE_LIMIT_REQUESTS_PER_MINUTE || "60", 10)
    }
  },
  cache: {
    enabled: process.env.CACHE_ENABLED === "true",
    ttlMs: parseInt(process.env.CACHE_TTL_MS || "300000", 10),
    maxSize: parseInt(process.env.CACHE_MAX_SIZE || "1000", 10)
  },
  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: process.env.LOG_FORMAT || "json",
    includeKeyHash: process.env.LOG_INCLUDE_KEY_HASH === "true"
  }
};

const providers = [];

if (process.env.OPENCODE_ZEN_ENABLED === "true") {
  providers.push({
    name: "OpenCode Zen",
    type: "opencode-zen",
    model: process.env.OPENCODE_ZEN_MODEL || "minimax-m2.5-free",
    baseURL: process.env.OPENCODE_ZEN_BASE_URL || "https://opencode.ai/zen/v1/chat/completions",
    priority: 1,
    keys: [{
      name: "opencode-api-key",
      usage: 0,
      limit: parseInt(process.env.OPENCODE_KEY_LIMIT || "1000", 10)
    }]
  });
}

if (process.env.GEMINI_ENABLED === "true") {
  providers.push({
    name: "Gemini",
    type: "gemini",
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    baseURL: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta",
    priority: 2,
    keys: [{
      name: "gemini-api-key",
      usage: 0,
      limit: parseInt(process.env.GEMINI_KEY_LIMIT || "1500", 10)
    }]
  });
}

if (process.env.OLLAMA_ENABLED === "true") {
  providers.push({
    name: "Ollama",
    type: "ollama",
    model: process.env.OLLAMA_MODEL || "qwen2.5-coder:3b",
    baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
    priority: 3,
    keys: [{
      name: "ollama-local",
      usage: 0,
      limit: 999999
    }]
  });
}

let currentProviderIndex = 0;

function getEnabledProviders() {
  return providers;
}

function getCurrentProvider() {
  if (providers.length === 0) return null;
  return providers[currentProviderIndex] || providers[0];
}

function getCurrentApiKey() {
  const provider = getCurrentProvider();
  if (!provider) return null;

  if (provider.type === "opencode-zen") {
    return process.env.OPENCODE_API_KEY || null;
  }
  if (provider.type === "gemini") {
    return process.env.GEMINI_API_KEY || null;
  }
  return null;
}

function getCurrentApiKeyWithProvider() {
  const provider = getCurrentProvider();
  if (!provider) return null;

  const key = getCurrentApiKey();
  return {
    provider: provider.name,
    type: provider.type,
    model: provider.model,
    baseURL: provider.baseURL,
    key: key
  };
}

function rotateApiKey() {
  if (providers.length === 0) return null;

  const currentKey = getCurrentApiKey();
  const newKey = rotateToNextProvider();
  if (!newKey) return currentKey;

  return getCurrentApiKey();
}

function rotateToNextProvider() {
  if (providers.length <= 1) return false;

  const previousIndex = currentProviderIndex;

  for (let i = 1; i < providers.length; i++) {
    const nextIndex = (currentProviderIndex + i) % providers.length;
    const nextProvider = providers[nextIndex];
    const nextKey = nextProvider.type === "opencode-zen"
      ? process.env.OPENCODE_API_KEY
      : nextProvider.type === "gemini"
        ? process.env.GEMINI_API_KEY
        : "local";

    if (nextKey && nextKey.length > 0) {
      currentProviderIndex = nextIndex;
      hermesConfig.api.rotation.currentKeyIndex = nextIndex;
      return true;
    }
  }

  currentProviderIndex = previousIndex;
  return false;
}

function getKeyMetrics() {
  return providers.map(p => ({
    name: p.name,
    type: p.type,
    model: p.model,
    priority: p.priority,
    keys: p.keys.map(k => ({
      name: k.name,
      usage: k.usage,
      limit: k.limit,
      available: k.limit - k.usage
    }))
  }));
}

function getFullMetrics() {
  return {
    config: hermesConfig,
    providers: getKeyMetrics(),
    currentProvider: getCurrentProvider()?.name,
    currentKeyIndex: hermesConfig.api.rotation.currentKeyIndex,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  hermesConfig,
  getCurrentApiKey,
  getCurrentApiKeyWithProvider,
  rotateApiKey,
  rotateToNextProvider,
  getKeyMetrics,
  getFullMetrics,
  getEnabledProviders,
  getCurrentProvider
};
