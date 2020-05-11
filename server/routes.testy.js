// @flow
import { test, testPromise, should } from "./testy.js";
import http from "http";
import requestPromise from "./request_promise.js";
/*::
import typeof { test as TestType, testPromise as TestPromiseType, should as ShouldType } from "./testy.js";
import RequestPromiseType from "./request_promise.js";
*/

const options /*: http$requestOptions */ = {
  hostname: "localhost",
  port: 4000,
  method: "GET",
  path: "/",
};

testPromise("Routes | Testing /", () => {
  options.path = "/";
  return requestPromise(options)
    .then(({ res, body }) => {
      should(res.statusCode).be.exactly(200);
    })
    .catch(e => {
      throw e;
    });
});

testPromise("Routes | Testing /lines1", () => {
  options.path = "/lines1";
  return requestPromise(options)
    .then(({ res, body }) => {
      should(res.statusCode).be.exactly(200);
    })
    .catch(e => {
      throw e;
    });
});

testPromise("Routes | Testing /lines2", () => {
  options.path = "/lines2";
  return requestPromise(options)
    .then(({ res, body }) => {
      should(res.statusCode).be.exactly(200);
    })
    .catch(e => {
      throw e;
    });
});

testPromise("Routes | Testing /lines3", () => {
  options.path = "/lines3";
  return requestPromise(options)
    .then(({ res, body }) => {
      should(res.statusCode).be.exactly(200);
    })
    .catch(e => {
      throw e;
    });
});

// Test other routes here
