const winston = require("winston");

const FUNNY_TAGS = [
  "chef's kiss",
  "sizzling hot",
  "fresh from oven",
  "secret sauce",
  "spicy take",
  "well done",
  "medium rare",
  "table for one",
  "order up",
  "kitchen chaos",
  "simmering nicely",
  "plated to perfection",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  white: "\x1b[97m",
  gray: "\x1b[90m",
  brightCyan: "\x1b[96m",
  brightMagenta: "\x1b[95m",
  brightYellow: "\x1b[93m",
  brightGreen: "\x1b[92m",
  brightRed: "\x1b[91m",
  brightBlue: "\x1b[94m",
  orange: "\x1b[38;5;208m",
  pink: "\x1b[38;5;213m",
  lavender: "\x1b[38;5;141m",
  gold: "\x1b[38;5;220m",
  teal: "\x1b[38;5;43m",
  coral: "\x1b[38;5;203m",
};

const LEVEL_STYLES = {
  info: { color: C.brightCyan, icon: "●" },
  warn: { color: C.brightYellow, icon: "▲" },
  error: { color: C.brightRed, icon: "✖" },
};

const TAG_PALETTE = {
  INFO: C.brightBlue,
  WIN: C.brightGreen,
  HMM: C.gold,
  OOPS: C.coral,
  VIBE: C.brightMagenta,
  HTTP: C.teal,
  DASHBOARD: C.lavender,
  SETTINGS: C.pink,
  FIRE: C.orange,
  BOUNCER: C.brightYellow,
  CRASH: C.brightRed,
  NOPE: C.coral,
  AUTH: C.gold,
  ORDER: C.teal,
  ADMIN: C.lavender,
  DB: C.brightCyan,
  UPLOAD: C.pink,
};

const colorize = (text, color) => `${color}${text}${C.reset}`;

const fullTimestamp = winston.format((info) => {
  info.fullDate = new Date().toLocaleString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return info;
});

const rainbowFormat = winston.format.printf(({ level, message, fullDate, tag, emoji }) => {
  const lvl = level.replace(/\x1b\[[0-9;]*m/g, "");
  const style = LEVEL_STYLES[lvl] || LEVEL_STYLES.info;
  const tagColor = TAG_PALETTE[tag] || C.gray;
  const spice = lvl === "info" && emoji ? colorize(` · ${pick(FUNNY_TAGS)}`, C.dim) : "";

  const time = colorize(fullDate, C.dim);
  const levelStr = colorize(`${style.icon} ${lvl.toUpperCase().padEnd(5)}`, style.color);
  const tagStr = tag ? colorize(` ${tag}`, `${C.bold}${tagColor}`) : "";
  const divider = colorize("│", C.gray);
  const emojiStr = emoji ? `${emoji} ` : "";
  const msg = colorize(message, C.white);

  return `${time} ${divider} ${levelStr}${tagStr} ${divider} ${emojiStr}${msg}${spice}`;
});

const baseLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(fullTimestamp(), rainbowFormat),
  transports: [new winston.transports.Console({ format: winston.format.combine(fullTimestamp(), rainbowFormat) })],
});

const log = {
  info: (msg, tag = "INFO") => baseLogger.info({ message: msg, tag }),
  success: (msg, tag = "WIN") => baseLogger.info({ message: msg, tag }),
  warn: (msg, tag = "HMM") => baseLogger.warn({ message: msg, tag }),
  error: (msg, tag = "OOPS") => baseLogger.error({ message: msg, tag }),

  funny: (emoji, msg) => baseLogger.info({ message: msg, emoji, tag: "VIBE" }),

  request: (req, statusCode, durationMs) => {
    const statusGroup = Math.floor(statusCode / 100);
    const emoji = { 2: "✅", 3: "↪️", 4: "🚫", 5: "💥" }[statusGroup] || "❓";
    const ip = req.ip?.replace("::ffff:", "") || "unknown";
    const level = statusGroup >= 5 ? "error" : statusGroup >= 4 ? "warn" : "info";
    const speed =
      durationMs < 100 ? colorize("⚡", C.gold) : durationMs > 1000 ? colorize("🐢", C.orange) : "";

    baseLogger[level]({
      message: `${emoji} ${req.method} ${colorize(req.originalUrl, C.brightBlue)} → ${colorize(String(statusCode), statusGroup >= 4 ? C.coral : C.brightGreen)} (${durationMs}ms)${speed ? ` ${speed}` : ""} ← ${colorize(ip, C.dim)}`,
      tag: "HTTP",
      emoji: "📡",
    });
  },

  auth: (msg) => log.funny("🔑", msg),
  order: (msg) => log.funny("🛒", msg),
  admin: (msg) => log.funny("👑", msg),
  db: (msg) => log.funny("🍜", msg),
  upload: (msg) => log.funny("📸", msg),
  delete: (msg) => log.funny("🗑️", msg),
};

module.exports = log;
