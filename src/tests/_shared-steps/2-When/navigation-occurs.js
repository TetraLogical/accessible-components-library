import { When } from "@cucumber/cucumber";

// Navigates to an anchor on the current page, as following a link to it would
When("I navigate to the fragment {string}", async function (fragment) {
  await this.page.evaluate((fragment) => { location.hash = fragment; }, fragment);

  // Give the browser time to reveal anything hidden until found
  await this.page.waitForTimeout(300);
});
