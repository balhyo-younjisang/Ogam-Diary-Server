import { Router, Request, Response } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/api/v1/diary", route);

  route.get("/list", (req: Request, res: Response) => {
    return res.json({}).status(200);
  });

  route.post("/write", (req: Request, res: Response) => {
    return res.json({}).status(200);
  });

  route.get("/view/:id", (req: Request, res: Response) => {
    return res.json({}).status(200);
  });

  route.patch("/edit/:id", (req: Request, res: Response) => {
    return res.json({}).status(200);
  });

  route.delete("/delete/:id", (req: Request, res: Response) => {
    return res.json({}).status(200);
  });
};
