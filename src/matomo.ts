export const track = (name: string | string[], value?: string | number) => {
  const names = Array.isArray(name) ? name : [name];
  (window as any)._paq.push([...names, ...(value ? [value] : [])]);
};

export const trackEvent = (name: string, value?: string | number) => {
  track(['trackEvent', 'Button', 'Click', name], value);
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
