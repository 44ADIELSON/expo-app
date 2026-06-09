export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const MAX_EMAIL_LENGTH = 254;
export const ATTEMPT_LIMIT = 5;
export const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos
export const STORAGE_KEYS = {
  ATTEMPTS: "@app:loginAttempts",
  LOCK_UNTIL: "@app:loginLockUntil",
};
