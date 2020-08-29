// @flow
import { test, testPromise, should } from "../../server/testy.js";
import { points, random } from "./points.js";
/*::
import typeof PointsType from "./points.js"
*/

test("Points returns an array of 100 three.js vectors", () => {
  const range = 10;
  const returnedPoints = points(0, 0, range);
  // Check there's the right number of points
  should(returnedPoints.length).be.exactly(100);
  // Check that they're random (not all the same x)
  should(returnedPoints[0].x).not.be.exactly(returnedPoints[99].x);
  // Check that they're random (not all the same y)
  should(returnedPoints[10].y).not.be.exactly(returnedPoints[89].y);
});

test("Random returns a number within 10 units of the input number and NOT the input number", () => {
  const inputX = 10;
  const inputY = 10;
  const range = 10;
  const returnedX = random(inputX - range, inputX + range);
  const returnedY = random(inputY - range, inputY + range);
  // Check it's a number within the range for X
  should(returnedX).be.aboveOrEqual(inputX - range);
  should(returnedX).be.belowOrEqual(inputX + range);
  // Check it's a number within the range for Y
  should(returnedY).be.aboveOrEqual(inputY - range);
  should(returnedY).be.belowOrEqual(inputY + range);
});
