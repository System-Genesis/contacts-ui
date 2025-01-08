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

export const clickedEdit = (id: string) => {
  trackEventClick('Click', 'Edit', id);
  console.log('trackEventClick', 'Click', 'Edit', id);
};

export const ErrorEvent = (massage, source = '') => {
  trackEventClick('Error', massage, source);
  console.log('trackEventClick', 'Error', massage, source);
};
