import DiaryService from "@/services/diary";
import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";

const route = Router();

export default (app: Router) => {
  app.use("/diary", route);

  route.get("/list", (req: Request, res: Response, next: NextFunction) => {
    const diaryInstance = Container.get(DiaryService);
    const { email } = req.body;

    if (!email) return res.json({ msg: "Email is null" }).status(500);

    const diaryList = diaryInstance.GetListView(email);

    return res.json({ diaryList }).status(200);
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

  route.post("/bookmark/:id", (req: Request, res: Response) => {
    return res.json({}).status(200);
  });
};
