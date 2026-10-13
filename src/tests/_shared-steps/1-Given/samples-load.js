import { expect } from "@playwright/test";
import { Given } from "@cucumber/cucumber";

// Loads a sample to test from a web URL.
Given("I load the sample {string}", async function (inputUrl) {
  await this.page.goto(inputUrl);
  this.url = await this.page.url();
  await expect(this.url).toContain(inputUrl);
});
