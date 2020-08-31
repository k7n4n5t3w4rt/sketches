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
const Coal = (props /*: Props */) => {
  useEffect(() => {});

  return html`
    <a-scene
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;videoTexture: true;"
    >
      <a-entity
        position="0 0 0"
        look-at="[gps-camera]"
        scale="5 5 5"
        gltf-model="url(/img/coal/DBS_ex_01.gltf)"
        gps-entity-place="latitude: -35.3082237; longitude: 149.1222036;"
      ></a-entity>
      <a-camera
        near="1"
        far="70000"
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

// simulateLatitude:-35.30822;
// simulateLongitude:149.1239828;"
export default Coal;
