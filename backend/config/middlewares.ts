export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      ...(process.env.NODE_ENV === "production"
        ? {} // In production, don't restrict origin (allows all)
        : {
            origin: [
              "http://localhost:3000",
              "http://localhost:3001",
              process.env.FRONTEND_URL || "http://localhost:3000",
            ],
          }),
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
