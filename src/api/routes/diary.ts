import DiaryService from "../../services/diary";
import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";

const route = Router();

export default (app: Router) => {
  app.use("/diary", route);

  route.get(
    "/list/:date",
    async (req: Request, res: Response, next: NextFunction) => {
      const diaryInstance = Container.get(DiaryService);
      const { date } = req.params;
      const { email } = req.body;

      if (!email) return res.json({ msg: "Email is null" }).status(500);

      const diaryList = await diaryInstance.getListView(email, new Date(date));

      return res.json({ diaryList }).status(200);
    }
  );

  route.post("/write", async (req: Request, res: Response) => {
    const diaryInstance = Container.get(DiaryService);
    const { email, situation, think, emotion, reaction, action, date } =
      req.body;

    if (!email) return res.json({ msg: "Email is null" }).status(500);

    if (
      !email ||
      !situation ||
      !think ||
      !emotion ||
      !reaction ||
      !action ||
      !date
    ) {
      return res.json({ msg: "일기 내용이 비어있으면 안돼용" }).status(500);
    }

    const diary = await diaryInstance.addDiary({
      email,
      situation,
      think,
      emotion,
      reaction,
      action,
      date,
    });

    return res.json({ diary }).status(200);
  });

  route.get("/view/:id", async (req: Request, res: Response) => {
    const diaryInstance = Container.get(DiaryService);
    const { email } = req.body;
    const { id } = req.params;

    if (!email) return res.json({ msg: "Email is null" }).status(500);

    const diary = await diaryInstance.getDiary(email, id);

    return res.json({ diary }).status(200);
  });

  route.patch("/edit/:diaryId", async (req: Request, res: Response) => {
    const diaryInstance = Container.get(DiaryService);
    const { email, situation, think, emotion, reaction, action, date } =
      req.body;
    const { diaryId } = req.params;

    if (!email) return res.json({ msg: "Email is null" }).status(500);

    const diary = await diaryInstance.editDiary({
      email,
      diaryId,
      situation,
      think,
      emotion,
      reaction,
      action,
      date,
    });

    return res.json({ diary }).status(200);
  });

  route.delete("/delete/:id", async (req: Request, res: Response) => {
    const diaryInstance = Container.get(DiaryService);
    const { email } = req.body;
    const { id } = req.params;

    if (!email) return res.json({ msg: "Email is null" }).status(500);

    await diaryInstance.deleteDiary(email, id);

    return res.status(200);
  });
};
