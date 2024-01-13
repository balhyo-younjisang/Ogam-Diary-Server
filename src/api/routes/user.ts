import { Router, Request, Response } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.post("/login", (req: Request, res: Response) => {});
  route.post("/join", (req: Request, res: Response) => {});
};
