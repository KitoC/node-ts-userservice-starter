import express, { ErrorRequestHandler } from "express";

import get from "lodash/get";

require("dotenv").config();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  //   TODO: add error logging service

  console.log("\n___ERROR CAUGHT___\n");
  if (process.env.TS_NODE_DEV === "true") {
    const { path, headers, method, body } = req;

    console.log({ method, path, headers, body });
  }
  console.log(err);

  console.log("\n___ERROR CAUGHT___\n");

  const { message, code, status, meta } = err;

  let payload = {
    errors: { message: get(err, "data.message", message), code, status, meta },
  };

  if (err.response) {
    payload = err.response.data;
  }

  res.json(payload);
};

export default errorHandler;
