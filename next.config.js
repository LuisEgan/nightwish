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
      "/watch/1": { page: "/watch/[id]", query: { id: "1" } },
      "/watch/2": { page: "/watch/[id]", query: { id: "2" } },
      "/watch/11": { page: "/watch/[id]", query: { id: "11" } },
      "/watch/12": { page: "/watch/[id]", query: { id: "12" } },
    };
  },
  trailingSlash: true,
};
