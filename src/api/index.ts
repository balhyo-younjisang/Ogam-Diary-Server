import { Router } from "express";
import user from "./routes/user";
import diary from "./routes/diary";

export default () => {
  const app = Router();
  user(app);
  diary(app);

  return app;
};
