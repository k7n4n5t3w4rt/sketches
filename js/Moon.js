// @flow
import { h, render } from "../web_modules/preact.js";
import { useState, useEffect } from "../web_modules/preact/hooks.js";
import { createStyles, rawStyles } from "../web_modules/simplestyle-js.js";
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
  useEffect(() => {});

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
        scale="1500 1500 15;00"
        gps-entity-place="latitude: -33.563987; longitude: 151.3408743;"
      ></a-sphere>
      <a-camera
        near="1"
        far="80000"
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
