module.exports = {
  // The rest of the Cypress config options go here...
  chromeWebSecurity: false,
  video: false,
  includeShadowDom: true,
  // pageLoadTimeout: 300000,
  // defaultCommandTimeout: 60000,

  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // supportFile: "cypress/support/index.js",
    baseUrl: "https://coffee-cart.app/",
  },
}
