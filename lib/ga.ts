export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

export const pageview = (url: string) => {
  if (APP_ENV !== "production" || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: url });
};

export const track404 = (path: string, referrer: string) => {
  if (APP_ENV !== "production" || !window.gtag) return;
  window.gtag("event", "page_not_found", {
    page_path: path,
    referrer,
  });
};
