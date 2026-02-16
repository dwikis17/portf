export const CMS_TOKEN_COOKIE = "cms_token";
const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

export const setTokenCookie = (token: string): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${CMS_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SEVEN_DAYS_IN_SECONDS}; SameSite=Lax`;
};

export const getTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookiePair = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CMS_TOKEN_COOKIE}=`));

  if (!cookiePair) {
    return null;
  }

  const value = cookiePair.slice(CMS_TOKEN_COOKIE.length + 1);
  return decodeURIComponent(value);
};

export const clearTokenCookie = (): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${CMS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
};
