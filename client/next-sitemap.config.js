module.exports = {
  siteUrl: "https://langtwo.vercel.app",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  transform: async (config, path) => {
    const priority = path.startsWith("/programs/") ? 0.9 : 0.7;
    return {
      loc: path,
      priority,
      changefreq: "weekly",
    };
  },
};

