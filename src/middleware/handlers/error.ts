import express, { ErrorRequestHandler } from "express";
require("dotenv").config();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  //   TODO: add error logging service

  console.log("\n___ERROR CAUGHT___\n");
  if (process.env.TS_NODE_DEV === "true") {
    const { path, headers, method } = req;

    console.log({ method, path, headers });
  }
  console.log(err);
  console.log("\n___ERROR CAUGHT___\n");

  const { message, code, status, meta } = err;

  res.json({ errors: { message, code, status, meta } });
};

export default errorHandler;
