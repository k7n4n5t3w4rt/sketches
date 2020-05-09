// @flow
import { h, hydrate, render } from "../web_modules/preact.js";
import App from "./App.js";
import htm from "../web_modules/htm.js";
import screenfull from "../web_modules/screenfull.js";

// Flow
/*::
import typeof HtmType from "../web_modules/htm.js";
import typeof {
  h as HType,
  render as RenderType,
} from "../web_modules/preact.js";
import typeof AppType from "./App.js";
*/

const html /*: HtmType */ = htm.bind(h);

hydrate(
  html`
    <${App} />
  `,
  document.getElementById("goodthing"),
);

// Doesn't work on iPhone ~ https://caniuse.com/#feat=fullscreen
// Plus we only want fullscreen on touch devices
// $FlowFixMe
if (Modernizr.hasEvent("touchend") && screenfull.isEnabled) {
  const mainContainer = document.getElementById("goodthing") || null;
  if (mainContainer !== null) {
    mainContainer.addEventListener(
      "touchend",
      () => {
        screenfull.request();
      },
      { once: true },
    );
  }
}
