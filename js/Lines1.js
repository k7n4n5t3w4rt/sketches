// @flow
import * as THREE from "../web_modules/three.js";
import {points} from "./lines1/points.js";
import {h, render} from "../web_modules/preact.js";
import {useState, useEffect} from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import {createStyles, rawStyles} from "../web_modules/simplestyle-js.js";
import screenfull from "../web_modules/screenfull.js";

const RANGE = 10;
// const SCALE = window.devicePixelRatio;
const SCALE = 1;
const TARGET = "lines1";

const html = htm.bind(h);
rawStyles({
	canvas: {
		width: "100%",
		height: "100%",
	},
});
const [styles] = createStyles(
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
const Lines = (props /*: Props */) => {
	useEffect(() => {
		const vectorPoints = points(0, 0, RANGE * SCALE);
		const line = setUpLine(vectorPoints);
		const scene = setUpScene(line);
		const renderElement = document.getElementById(TARGET) || null;
		if (renderElement !== null) {
			const camera = setUpCamera(window.innerWidth, window.innerHeight);
			const renderer = setUpRenderer(
				renderElement.clientWidth,
				renderElement.clientHeight,
			);
			renderElement.appendChild(renderer.domElement);
			renderer.render(scene, camera);

			// Events
			const mainContainer = document.getElementById("goodthing") || null;
			// Basically just a bag of side-effects
			const updater = () /*: void */ => {
				const vectorPoints = points(0, 0, RANGE * SCALE);
				line.geometry.setFromPoints(vectorPoints);
				line.geometry.attributes.position.needsUpdate = true;
				renderer.render(scene, camera);
			};
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
								setTimeout(
									() /*: void */ => {
										if (renderElement !== null) {
											const camera = setUpCamera(
												renderElement.clientWidth,
												renderElement.clientHeight,
											);
											renderer.setSize(
												(renderElement.clientWidth * SCALE) | 0,
												(renderElement.clientHeight * SCALE) | 0,
												false,
											);
											// Clear the scene - totally
											while (renderElement.firstChild) {
												renderElement.removeChild(renderElement.firstChild);
											}
											// ...and attach a fresh one
											renderElement.appendChild(renderer.domElement);
											renderer.render(scene, camera);
										}
									},
									500,
								);
							});
						},
						{once: true},
					);
					mainContainer.addEventListener("touchend", () => {
						updater();
					});
				} else {
					mainContainer.addEventListener("mouseup", () => {
						updater();
					});
				}
			}
		} else {
			throw new Error(
				`There is a problem rendering the scene - div#${TARGET} doesn't exist`,
			);
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
		const material = new THREE.LineBasicMaterial({
			color: 0x222222,
			linewidth: 2,
		});
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
		renderer.setSize((width * SCALE) | 0, (height * SCALE) | 0, false);
		return renderer;
	};

	return html`
		<script src="/js/vendor/three.js"></script>
		<div id="container" className="${styles.container}">
			<div id="${TARGET}" className="${styles[TARGET]}"></div>
		</div>
  `;
};

export default Lines;
