import { createInstance } from '@datapunt/matomo-tracker-react';

export const initializeMatomo = (urlBase: string, siteId: number) =>
  createInstance({
    urlBase,
    siteId,
    trackerUrl: `${urlBase}/matomo.php`,
    srcUrl: `${urlBase}/matomo.js`,
  });
