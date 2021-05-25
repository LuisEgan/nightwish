module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  basePath: "/nightwish",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/nightwish",
  //       permanent: true,
  //       basePath: false,
  //     },
  //   ];
  // },

  trailingSlash: true,

  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/redeem": { page: "/redeem" },
      "/register": { page: "/register" },
      "/support": { page: "/support" },
      "/event/all": { page: "/event/all" },
    };
  },
};
