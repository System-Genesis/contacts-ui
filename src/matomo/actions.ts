import { UserState } from '../store/reducers/user';
import { setCustomDimension, track } from './matomo';

export const setUserLogin = (user: UserState) => {
  track('setUserId', user.id);
  setCustomDimension(1, user.adfsId);
  setCustomDimension(2, user.rank);
  setCustomDimension(3, user.fullName);
  setCustomDimension(4, user.source);
  setCustomDimension(5, user.hierarchy);
};

export const trackEventClick = (Action: 'Click' | 'Search' | 'Error', name: string, value?: string | number) => {
  track(['trackEvent', 'Button', Action, name], value);
};

export const ErrorEvent = (massage: string, source = '') => {
  trackEventClick('Error', massage, source);
};

export const searchPerformed = (searchTerm: string) => {
  trackEventClick('Search', 'search', searchTerm);
};

export const clickedEdit = (id: string) => {
  trackEventClick('Click', 'Edit', id);
};

export const clickedShortcut = (type: string, location: 'favorite' | 'drawer' | 'searchRes') => {
  trackEventClick('Click', `ShortCut-${type}-${location}`, location);
};

export const searchFilterApplied = (filterCategory: string) => {
  trackEventClick('Click', `Filter-${filterCategory}`, filterCategory);
};
