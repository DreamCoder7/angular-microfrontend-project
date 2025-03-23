const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "main-app",

  // exposes: {
  //   "./Component": "./projects/main-app/src/app/app.component.ts",
  // },

  remotes: {
    "mfe-app1": "http://localhost:3000/remoteEntry.js",
    "mfe-app2": "http://localhost:3001/remoteEntry.js",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
