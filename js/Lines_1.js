// @flow
import * as THREE from "../web_modules/three.js";
import { points } from "./lines_1/points.js";
import { h, render } from "../web_modules/preact.js";
import { useState, useEffect } from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import { createStyles, rawStyles } from "../web_modules/simplestyle-js.js";

// Flow
/*::
import typeof { createStyles as CreateStylesType, rawStyles as RawStylesType } from "../web_modules/simplestyle-js.js";
import typeof HtmType from "../web_modules/htm.js";
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
rawStyles({
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
  },
});

const [styles] /*: CreateStylesType */ = createStyles(
  {
    container: {
      display: "none",
    },
  },
  null,
  "myuniqueid",
);

/*::
type Props = {
  count: typeof Number
};
*/
const Lines_1 = (props /*: Props */) /*: HtmType */ => {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const renderElement = document.getElementById("goodthing") || null;

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

    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x222222 });

    const vectorPoints = points(0, 0, 10);

    const geometry = new THREE.BufferGeometry().setFromPoints(vectorPoints);

    const line = new THREE.Line(geometry, material);

    scene.add(line);

    if (renderElement !== null) {
      renderElement.appendChild(renderer.domElement);
      renderer.render(scene, camera);
    }
  }, []);

  const [count, setCount] = useState(parseInt(props.count));
  // console.log(props.count.isInteger());
  return html`
    <div className="${styles.container}">[/Lines_1]</div>
  `;
};

export default Lines_1;
