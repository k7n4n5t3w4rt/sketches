// @flow
import { h, render } from "../web_modules/preact.js";
import { useState, useEffect } from "../web_modules/preact/hooks.js";
import { createStyles, rawStyles } from "../web_modules/simplestyle-js.js";
import htm from "../web_modules/htm.js";
import screenfull from "../web_modules/screenfull.js";

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
const Map = (props /*: Props */) => {
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
      arjs="sourceType: webcam; debugUIEnabled: true;videoTexture: true;"
    >
      <a-camera
        near="1000"
        far="10000"
        fov="76"
        rotation-reader
        gps-camera="
			positionMinAccuracy:10000;
			minDistance:0;
			maxDistance:0;
			simulateAltitude: 85;
			simulateLatitude: -33.5467087;
			simulateLongitude: 151.3371129"
      ></a-camera>
      <a-sphere
        color="pink"
        radius="1"
        position="0 91 0"
        scale="200 200 200"
        gps-entity-place="latitude: -33.5801498; longitude: 151.3275505;"
      ></a-sphere>
      <a-sphere
        color="blue"
        radius="1"
        position="0 105 0"
        scale="200 200 200"
        gps-entity-place="latitude: -33.5813438; longitude: 151.3119409;"
      ></a-sphere>
      <a-sphere
        color="green"
        radius="1"
        position="0 60 0"
        scale="200 200 200"
        gps-entity-place="latitude: -33.557636; longitude: 151.3170053;"
      ></a-sphere>
      <a-sphere
        color="red"
        radius="1"
        position="0 251 0"
        scale="200 200 200"
        gps-entity-place="latitude: -33.4938125; longitude: 151.2728018;"
      ></a-sphere>
    </a-scene>
  `;
};

export default Map;
