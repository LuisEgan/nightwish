module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  basePath: "/nightwish",

  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/ticket": { page: "/ticket" },
      "/register": { page: "/register" },
      "/forgot": { page: "/forgot" },
      "/reset": { page: "/reset" },
      "/support": { page: "/support" },
      "/events": { page: "/events" },
    };
  },
};
