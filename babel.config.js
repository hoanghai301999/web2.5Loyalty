module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          utils: "./utils",
          screens: "./screens",
          navigation: "./navigation",
          hooks: "./hooks",
          components: "./components",
          assets: "./assets",
          constants: "./constants",
          configs: "./configs",
        },
      },
    ],
    ["react-native-reanimated/plugin"],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
};
