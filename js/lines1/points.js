// @flow
import * as THREE from "../../web_modules/three.js"; 

export const points = (
startX /*: number */, 
startY /*: number */, 
range /*: number */, 
)/*: Array<any> */ =>  {
const points = []; 
let lastX /*: number */ = startX; 
let lastY /*: number */ = startY; 
let x /*: number */ = startX; 
let y /*: number */ = startY; 
for (let i = 1; i <= 100; i + 1) {
x = random(lastX - range, lastX + range); 
y = random(lastY - range, lastY + range); 
points.push(new THREE.Vector3(x, y, 0)); 
lastX = x; 
lastY = y; 
}
return points; 
}; 

export const random = (min /*: number */, max /*: number */)/*: number */ =>  {
min = Math.ceil(min); 
max = Math.floor(max); 
return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}; 

export default points; 
