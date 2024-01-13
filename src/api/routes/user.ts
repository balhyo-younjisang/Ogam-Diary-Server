import { Router } from "express";

const route = Router();

export default (app: Router) => {
  app.use("api/v1/users", route);

  route.post("/login");
  route.post("/join");
};
