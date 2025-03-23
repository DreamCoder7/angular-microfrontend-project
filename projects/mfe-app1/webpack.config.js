const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mfe-app1",

  // exposes: {
  //   './Component': './projects/mfe-app1/src/app/app.component.ts',
  // },
  exposes: {
    "./Module": "./projects/mfe-app1/src/app/app.routes.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
