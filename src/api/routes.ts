export const routes = {
  login: '/api/auth/login',
  config: '/api/config',
  users: '/api/users',
  me: '/api/users/my',
  backend: {
    favorites: '/api/users/my/favorites',
    users: '/api/users',
    pic: '/api/users/pic',
    search: '/api/users/search',
    history: 'api/users/my/history',
    subs: '/api/users/group/:id/subs',
    groups: '/api/tags/group',
    tags: '/api/tags',
  },
};
