module.exports = {
  async redirects() {
    return [
      {
        source: '/puzzle',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
