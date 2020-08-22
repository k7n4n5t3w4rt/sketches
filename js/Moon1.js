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

  //   <a-assets>
  //     <a-asset-item
  //       id="moon"
  //       position="0 1.25 -5"
  //       radius="1.25"
  //       src="../img/Moon_1_3474.glb"
  //     ></a-asset-item>
  //   </a-assets>

  //   <a-entity gltf-model="#moon"></a-entity>
  return html`
    <a-scene>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
    </a-scene>
  `;
};

export default Moon;
