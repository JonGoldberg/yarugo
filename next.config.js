module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/puzzle',
        permanent: true,
      },
    ];
  },
};
