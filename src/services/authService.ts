import { jwtDecode } from 'jwt-decode';
import cookies from 'js-cookie';
import { environment } from '../globals';
import { routes } from '../api/routes';
import { UserState } from '../store/reducers/user';
import { loggedInEntityStubEs } from '../mocks/stubs/backend/entities';
import axiosInstance from '../api/axios';
const env = import.meta.env;

export class AuthService {
  static getUser = async () => {
    if (env.DEV && !env.VITE_APP_BE) {
      cookies.set(
        environment.accessTokenName,
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InQxMTA0MzYyMkBhbWFuIiwiYWRmc0lkIjoidDExMDQzNjIyQGFtYW4iLCJnZW5lc2lzSWQiOiI2NjE2ZGM2ODMxNWIyOTQ3YjE5NjUxNTgiLCJuYW1lIjp7ImZpcnN0TmFtZSI6Itei16DXkdeoIiwibGFzdE5hbWUiOiLXk9en15wifSwiZW1haWwiOiJ0MTEwNDM2MjJAcmFiaXJhbi5jb20iLCJkaXNwbGF5TmFtZSI6InQxMTA0MzYyMkByYWJpcmFuLmNvbSIsInVwbiI6InQxMTA0MzYyMkByYWJpcmFuLmNvbSIsInByb3ZpZGVyIjoiR2VuZXNpcyIsInBlcnNvbmFsTnVtYmVyIjoiODI4NjUwNSIsImVudGl0eVR5cGUiOiJTb2xkaWVyIiwiY3VycmVudFVuaXQiOiLXnteo15vXliIsImRpc2NoYXJnZURheSI6IjIwMDgtMDctMDJUMTU6Mzk6NTYuODkxWiIsInJhbmsiOiJ1bHRpbWF0ZSIsImpvYiI6Ik1hbmFnZXIiLCJwaG9uZU51bWJlcnMiOltdLCJhZGRyZXNzIjoi15bXkdeQ16jXkteUICjXqdeR15gpLCDXqdeT16jXldeqINeR15zXkyDXkNec16nXmdeaLCAn15EyIiwiY2xlYXJhbmNlIjoiMyIsInBob3RvIjoiaHR0cDovL25vdC1zdXBwb3J0ZWQtb3V0c2lkZS1ieS1rYXJ0b2ZmZWwiLCJSZWxheVN0YXRlIjoiL2F1dGgvc2FtbCIsImp0aSI6Ijc5NjEzNmM0LWJmOGEtNGIxNC04NzBiLWE1MmI0MTA1OGM0OSIsImlhdCI6MTcyMTE1NDg0MiwiZXhwIjoyNzIxMTU4NDQyfQ.dhcpgXcF73STotPJN50Ub26Q1NqVidiegg_cC79GsYY',
      );
      console.log('Development Environment, using default auth cookie');
    }

    const accessToken = cookies.get(environment.accessTokenName);

    if (!accessToken) {
      AuthService.logout();
      return null;
    }

    const decodedToken = AuthService.parseUserToken(accessToken);

    if (!decodedToken) {
      AuthService.logout();
      return null;
    }

    const { data } = await axiosInstance.get(routes.me);

    return data as UserState;
  };

  static logout = () => {
    cookies.remove(environment.accessTokenName);
    if (env.PROD) window.location.replace(`${routes.login}?RelayState=${window.location.href}`);
    else window.location.replace(`${environment.devBackendURL}${routes.login}?RelayState=${window.location.href}`);
  };

  static parseUserToken = (token: string) => {
    if (env.DEV) {
      if (!env.VITE_APP_IS_DOCKER || !env.VITE_APP_BE) return loggedInEntityStubEs;
    }

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  };
}
