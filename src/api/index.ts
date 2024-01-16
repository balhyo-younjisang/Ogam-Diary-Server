import { Router } from "express";
import user from "./routes/user";
import diary from "./routes/diary";
import config from "../config";

export default () => {
  const app = Router();
  app.all(`${config.api.prefix}`);

  user(app);
  diary(app);

  return app;
};
