// @flow
import { h, render } from "../web_modules/preact.js";
import { useState, useEffect } from "../web_modules/preact/hooks.js";
import { createStyles, rawStyles } from "../web_modules/simplestyle-js.js";
import screenfull from "../web_modules/screenfull.js";
import htm from "../web_modules/htm.js";

const html = htm.bind(h);
rawStyles({
  canvas: {
    margin: "0px",
    overflow: "hidden",
  },
});

/*::
type Props = {
};
*/
const Moon = (props /*: Props */) => {
  useEffect(() => {
    // Events
    const mainContainer = document.getElementById("goodthing") || null;
    if (mainContainer !== null) {
      // Modernizr doesn't have an es module npm package so it's
      // imported with a <script> tag in `index.html`
      // $FlowFixMe
      if (Modernizr.hasEvent("touchend")) {
        mainContainer.addEventListener(
          "touchend",
          () => {
            // Doesn't work on iPhone ~ https://caniuse.com/#feat=fullscreen
            // Plus we only want fullscreen on touch devices
            screenfull.request().then(() /*: void */ => {
              setTimeout(() /*: void */ => {}, 500);
            });
          },
          { once: true },
        );
      }
    }
  });

  return html`
    <a-scene
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;videoTexture: true;"
    >
      <a-sphere
        color="silver"
        radius="1"
        position="0 1000 0"
        scale="1500 1500 1500"
        gps-entity-place="latitude: -33.563987; longitude: 151.3408743;"
      ></a-sphere>
      <a-camera
        near="1"
        far="80000"
        fov="76"
        rotation-reader
        gps-camera="
			positionMinAccuracy:10000;
			minDistance:0;
			maxDistance:0;
			simulateAltitude:0;"
      ></a-camera>
    </a-scene>
  `;
};

// simulateLatitude:-33.546851;
// simulateLongitude:151.3443583;
export default Moon;
