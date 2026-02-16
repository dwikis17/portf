export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const hasGtag = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function" && Boolean(GA_MEASUREMENT_ID);
};

export const pageview = (url: string): void => {
  if (!hasGtag()) {
    return;
  }

  window.gtag("event", "page_view", {
    page_location: url,
    send_to: GA_MEASUREMENT_ID
  });
};

export const trackEvent = (name: string, params: Record<string, unknown> = {}): void => {
  if (!hasGtag()) {
    return;
  }

  window.gtag("event", name, params);
};
