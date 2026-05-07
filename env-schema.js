const { z } = require("zod");

const EnvSchema = z.object({
  OPENCODE_ZEN_ENABLED: z.enum(["true", "false"]).default("true"),
  OPENCODE_ZEN_BASE_URL: z.string().url().default("https://opencode.ai/zen/v1/chat/completions"),
  OPENCODE_ZEN_MODEL: z.string().default("minimax-m2.5-free"),
  OPENCODE_API_KEY: z.string().startsWith("sk-").optional(),
  OPENCODE_ZEN_API_KEY: z.string().startsWith("sk-").optional(),
  OPENCODE_KEY_LIMIT: z.coerce.number().default(1000),

  GEMINI_ENABLED: z.enum(["true", "false"]).default("true"),
  GEMINI_BASE_URL: z.string().url().default("https://generativelanguage.googleapis.com/v1beta"),
  GEMINI_MODEL: z.string().default("gemini-2.0-flash"),
  GEMINI_API_KEY: z.string().startsWith("AIzaSy").optional(),
  GEMINI_KEY_LIMIT: z.coerce.number().default(1500),

  OLLAMA_ENABLED: z.enum(["true", "false"]).default("true"),
  OLLAMA_BASE_URL: z.string().url().default("http://localhost:11434"),
  OLLAMA_MODEL: z.string().default("qwen2.5-coder:3b"),

  HERMES_AGENT_ENABLED: z.enum(["true", "false"]).default("true"),
  HERMES_AGENT_AUTO_ROTATE: z.enum(["true", "false"]).default("true"),

  API_RATE_LIMIT_ENABLED: z.enum(["true", "false"]).default("true"),
  API_RATE_LIMIT_REQUESTS_PER_MINUTE: z.coerce.number().default(60),

  HERMES_KEY_ROTATION_STRATEGY: z.string().default("priority-based"),
  HERMES_KEY_MAX_RETRIES: z.coerce.number().default(3),
  HERMES_KEY_RETRY_DELAY_MS: z.coerce.number().default(1000),
  HERMES_KEY_CHECK_INTERVAL_MS: z.coerce.number().default(300000),

  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  LOG_FORMAT: z.enum(["json", "text"]).default("json"),
  LOG_INCLUDE_KEY_HASH: z.enum(["true", "false"]).default("true"),

  CACHE_ENABLED: z.enum(["true", "false"]).default("true"),
  CACHE_TTL_MS: z.coerce.number().default(300000),
  CACHE_MAX_SIZE: z.coerce.number().default(1000),

  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000)
});

function validateEnv() {
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.issues.map(issue =>
      `  - ${issue.path.join(".")}: ${issue.message}`
    ).join("\n");

    console.error("\n❌ Invalid environment configuration:");
    console.error(errors);
    console.error("\nCopy .env.example to .env and fill in the required values.\n");
    process.exit(1);
  }

  return result.data;
}

module.exports = { validateEnv, EnvSchema };
