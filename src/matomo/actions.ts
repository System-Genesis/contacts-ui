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

export const trackEventClick = (Action: 'Click' | 'Search', name: string, value?: string | number) => {
  track(['trackEvent', 'Button', Action, name], value);
};
