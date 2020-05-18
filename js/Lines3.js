// @flow
import { h, render } from "../web_modules/preact.js";
import { useState, useEffect } from "../web_modules/preact/hooks.js";
import { createStyles, rawStyles } from "../web_modules/simplestyle-js.js";
import htm from "../web_modules/htm.js";

// Flow
/*::
import typeof HtmType from "../web_modules/htm.js";
import typeof {
  createStyles as CreateStylesType,
  rawStyles as RawStylesType
} from "../web_modules/simplestyle-js.js";
import typeof {
  useState as UseStateType,
  useEffect as UseEffectType
} from "../web_modules/preact/hooks.js";
import typeof {
  h as HType,
  render as RenderType,
} from "../web_modules/preact.js";
*/

const RANGE = 10;
const SCALE = 1;
const TARGET = "lines3";

const html /*: HtmType */ = htm.bind(h);
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
const Lines = (props /*: Props */) /*: HtmType */ => {
  useEffect(() => {});

  return html`
    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  `;
};

export default Lines;
