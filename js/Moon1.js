// @flow
import { h, render } from "../web_modules/preact.js";
import { useState, useEffect } from "../web_modules/preact/hooks.js";
import { createStyles, rawStyles } from "../web_modules/simplestyle-js.js";
import htm from "../web_modules/htm.js";

const RANGE = 10;
const SCALE = 1;
const TARGET = "lines3";

const html = htm.bind(h);
rawStyles({
  canvas: {
    margin: "0px",
    overflow: "hidden",
  },
});

/*::
type Props = {
  count: typeof Number
};
*/
const Moon = (props /*: Props */) => {
  useEffect(() => {});

  return html`
    <a-scene
      vr-mode-ui="enabled: false"
      arjs="sourceType: webcam; debugUIEnabled: false;"
    >
      <a-entity
        position="0 0 0"
        look-at="[gps-camera]"
        scale="3000 3000 3000"
        gltf-model="url(/img/BarramundiFish.gltf)"
        gps-entity-place="latitude: -35.3082237; longitude: 149.1222036;"
      ></a-entity>
      <a-camera
        rotation-reader
        gps-camera="
			alert:true;
			positionMinAccuracy:1000;
			minDistance: 1;
			maxDistance: 100000;
			simulateAltitude:0;
			simulateLatitude:-35.3170510;
			simulateLongitude:149.107410;
		"
      >
      </a-camera>
    </a-scene>
  `;
};

// simulateLatitude:-35.3082237;
// simulateLongitude:149.1222036;
export default Moon;
