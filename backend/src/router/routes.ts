import { Router, Application, Request, Response } from "express";
import { storeQueryCallback } from "../controllers/store";

export default (app: Application) => {
  const router = Router();
  router.all("/", (req: Request, res: Response) => {
    req;
    res.send("Everything is working. Send queries to /shopify?shop=x");
  });

  router.get("/shopify", storeQueryCallback);

  app.use(router);
  return app;
};
