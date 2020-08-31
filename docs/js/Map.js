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
const Map = (props /*: Props */) => {
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
        position="0 251 0"
        scale="100 100 100"
        gps-entity-place="latitude: -33.4938125; longitude: 151.2728018;"
      ></a-sphere>
      <a-sphere
        color="silver"
        radius="1"
        position="0 60 0"
        scale="100 100 100"
        gps-entity-place="latitude: -33.557636; longitude: 151.3170053;"
      ></a-sphere>
      <a-sphere
        color="silver"
        radius="1"
        position="0 105 0"
        scale="100 100 100"
        gps-entity-place="latitude: -33.5813438; longitude: 151.3119409;"
      ></a-sphere>
      <a-sphere
        color="silver"
        radius="1"
        position="0 91 0"
        scale="100 100 100"
        gps-entity-place="latitude: -33.557644; longitude: 151.318952;"
      ></a-sphere>
      <a-camera
        near="1000"
        far="10000"
        rotation-reader
        gps-camera="
			positionMinAccuracy:10000;
			minDistance:0;
			maxDistance:0;
			simulateAltitude: 85;
			simulateLatitude: -33.5467087;
			simulateLongitude: 151.3371129"
      ></a-camera>
    </a-scene>
  `;
};

export default Map;
