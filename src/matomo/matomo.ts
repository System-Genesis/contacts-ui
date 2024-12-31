export const track = (args: string | string[], value?: string | number) => {
  const eventNames = Array.isArray(args) ? args : [args];
  const eventData = value ? [value] : [];

  (window as any)._paq.push([...eventNames, ...eventData]);
};

export const matomoInit = (matomoUrl, matomoSiteId) => {
  (window as any)._paq = (window as any)._paq || [];

  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  track('trackPageView');
  track('enableLinkTracking');

  (function () {
    track('setTrackerUrl', `${matomoUrl}/matomo.php`);
    track('setSiteId', `${matomoSiteId}`);
    const s = document.getElementsByTagName('script')[0];
    const g = document.createElement('script');
    g.async = true;
    g.src = `${matomoUrl}/matomo.js`;
    s.parentNode?.insertBefore(g, s);
  })();
};

export const setCustomDimension = (dimensionIndex: number, dimensionValue: string) => {
  track(['setCustomDimension', dimensionIndex + ''], dimensionValue);
};
