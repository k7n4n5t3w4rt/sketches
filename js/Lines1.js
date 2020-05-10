// @flow
import * as THREE from "../web_modules/three.js";
import { points } from "./lines1/points.js";
import { h, render } from "../web_modules/preact.js";
import { useState, useEffect } from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import { createStyles, rawStyles } from "../web_modules/simplestyle-js.js";
import screenfull from "../web_modules/screenfull.js";

// Flow
/*::
import typeof { createStyles as CreateStylesType, rawStyles as RawStylesType } from "../web_modules/simplestyle-js.js";
import typeof HtmType from "../web_modules/htm.js";
import typeof Screenfull from "../web_modules/screenfull.js";
import typeof {
  useState as UseStateType,
  useEffect as UseEffectType
} from "../web_modules/preact/hooks.js";
import typeof {
  h as HType,
  render as RenderType,
} from "../web_modules/preact.js";
*/

const html /*: HtmType */ = htm.bind(h);
const [styles] /*: CreateStylesType */ = createStyles(
  {
    lines1: {
      width: "100%",
      height: "100%",
    },
  },
  null,
  "kljhyoiweut",
);

/*::
type Props = {
  count: typeof Number
};
*/
const Lines1 = (props /*: Props */) /*: HtmType */ => {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const renderElement = document.getElementById("container") || null;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");
    const material = new THREE.LineBasicMaterial({ color: 0x222222 });
    const vectorPoints = points(0, 0, 10);
    const geometry = new THREE.BufferGeometry().setFromPoints(vectorPoints);
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    if (renderElement !== null) {
      renderElement.appendChild(renderer.domElement);
      renderer.render(scene, camera);
    }

    const update = () /*: void */ => {
      const vectorPoints = points(0, 0, 10);
      line.geometry.setFromPoints(vectorPoints);
      line.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const mainContainer = document.getElementById("goodthing") || null;
    if (mainContainer !== null) {
      // Modernizr doesn't have an es module npm package so it's
      // imported with a <script> tag in `index.html`
      // $FlowFixMe
      if (Modernizr.hasEvent("touchend")) {
        mainContainer.addEventListener("touchend", () => {
          update();
        });
      } else {
        mainContainer.addEventListener("mouseup", () => {
          update();
        });
      }
    }
  });

  const [count, setCount] = useState(parseInt(props.count));
  // console.log(props.count.isInteger());
  return html`
    <div id="container" className="${styles.container}">
      <div id="lines1" className="${styles.lines1}"></div>
    </div>
  `;
};

export default Lines1;
