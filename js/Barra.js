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
const Barra = (props /*: Props */) => {
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
      embedded
      vr-mode-ui="enabled: false"
      arjs="sourceType: webcam; debugUIEnabled: false;videoTexture: true;"
    >
      <a-entity
        position="0 0 0"
        scale="1000 1000 1000"
        look-at="[gps-camera]"
        gps-entity-place="latitude: -35.3082237; longitude: 149.1222036;"
      >
        <a-entity
          position="0 0 0"
          scale="0 0 0"
          gltf-model="url(/img/barra/BarramundiFish.gltf)"
        >
        </a-entity>
      </a-entity>
      <a-camera
        near="1"
        far="70000"
        fov="76"
        rotation-reader
        gps-camera="
			positionMinAccuracy:10000;
			minDistance:0;
			maxDistance:0;
			simulateAltitude:0;
			simulateLatitude:-35.30822;
			simulateLongitude:149.1239828;"
      ></a-camera>
    </a-scene>
  `;
};

export default Barra;
