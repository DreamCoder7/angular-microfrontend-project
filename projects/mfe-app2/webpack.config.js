const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mfe-app2",

  // exposes: {
  //   './Component': './projects/mfe-app2/src/app/app.component.ts',
  // },

  exposes: {
    "./Module": "./projects/mfe-app2/src/app/app.routes.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
