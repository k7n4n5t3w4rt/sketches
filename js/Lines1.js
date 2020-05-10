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

const POINTS_PER_LINE = 10;
const TARGET = "lines1";

const html /*: HtmType */ = htm.bind(h);
const [styles] /*: CreateStylesType */ = createStyles(
  {
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "white",
    },
    [TARGET]: {
      width: "100%",
      height: "100%",
    },
  },
  null,
  "iouyoiu",
);

/*::
type Props = {
  count: typeof Number
};
*/
const Lines = (props /*: Props */) /*: HtmType */ => {
  useEffect(() => {
    const camera = setUpCamera(window.innerWidth, window.innerHeight);
    const vectorPoints = points(0, 0, POINTS_PER_LINE);
    const line = setUpLine(vectorPoints);
    const scene = setUpScene(line);
    const renderer = setUpRenderer(window.innerWidth, window.innerHeight);
    const renderElement = document.getElementById(TARGET) || null;
    if (renderElement !== null) {
      renderElement.appendChild(renderer.domElement);
      renderer.render(scene, camera);
    } else {
      throw new Error(
        `There is a problem rendering the scene - div#${TARGET} doesn't exist`,
      );
    }

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
              if (document.body !== null) {
                document.body.style.height = window.innerHeight + "px";
                if (
                  document.body.parentElement !== null &&
                  typeof document.body.parentElement !== "undefined"
                ) {
                  // $FlowFixMe
                  document.body.parentElement.style.height =
                    window.innerHeight + "px";
                }
              }

              if (document.getElementById("lines1") !== null) {
                // $FlowFixMe
                document.getElementById("lines1").style.width =
                  window.innerWidth + "px";
                // $FlowFixMe
                document.getElementById("lines1").style.height =
                  window.innerHeight + "px";
              }
              const camera = setUpCamera(window.innerWidth, window.innerHeight);
              renderer.setSize(window.innerWidth, window.innerHeight);
              if (renderElement !== null) {
                // Clear the scene - totally
                while (renderElement.firstChild) {
                  renderElement.removeChild(renderElement.firstChild);
                }
                // ...and attach a fresh one
                renderElement.appendChild(renderer.domElement);
              }
              renderer.render(scene, camera);
            });
          },
          { once: true },
        );
        mainContainer.addEventListener("touchend", () => {
          const vectorPoints = points(0, 0, POINTS_PER_LINE);
          line.geometry.setFromPoints(vectorPoints);
          line.geometry.attributes.position.needsUpdate = true;
          renderer.render(scene, camera);
        });
      } else {
        mainContainer.addEventListener("mouseup", () => {
          const vectorPoints = points(0, 0, POINTS_PER_LINE);
          line.geometry.setFromPoints(vectorPoints);
          line.geometry.attributes.position.needsUpdate = true;
          renderer.render(scene, camera);
        });
      }
    }
  });

  // Camera
  const setUpCamera = (
    width /*: number */,
    height /*: number */,
  ) /*: Object */ => {
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    return camera;
  };

  // Line
  const setUpLine = (vectorPoints /*: Array<Object> */) /*: Object */ => {
    const material = new THREE.LineBasicMaterial({ color: 0x222222 });
    const geometry = new THREE.BufferGeometry().setFromPoints(vectorPoints);
    const line = new THREE.Line(geometry, material);
    return line;
  };

  // Scene
  const setUpScene = (line /*: Object */) /*: Object */ => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");
    scene.add(line);
    return scene;
  };

  // Renderer
  const setUpRenderer = (
    width /*: number */,
    height /*: number */,
  ) /*: Object */ => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    return renderer;
  };

  return html`
    <div id="container" className="${styles.container}">
      <div id="${TARGET}" className="${styles[TARGET]}"></div>
    </div>
  `;
};

export default Lines;
