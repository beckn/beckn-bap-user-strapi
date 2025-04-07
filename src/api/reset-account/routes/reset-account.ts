export default {
  routes: [
    {
      method: 'POST',
      path: '/reset-account',
      handler: 'reset-account.resetAccount',
      config: {
        middlewares: [
          'global::auth'
        ],
      },
    },
  ],
}; 