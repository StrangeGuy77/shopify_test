import { Application } from "express";
import * as express from "express";
import { config } from "dotenv";
import Router from "./router/routes";

// import crypto from 'crypto';
// import * as cookie from 'cookie';
// import * as querystring from 'querystring';
// import * as request from 'request-promise'

config();
const app: Application = express();

const startServer = async (port: string) => {
  if (port === undefined || typeof port !== "string")
    throw new Error(
      `Port is undefined, has not been provided or is not a string: ${typeof port}`
    );

  Router(app);
  app.listen(Number(port));
  console.log(`Server listening on port ${port}`);
};

startServer(process.env.PORT as string);
