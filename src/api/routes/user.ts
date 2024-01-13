import { Router, Request, Response } from "express";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  /***
   * @path /api/v1/login
   * @description email과 password를 json 형태로 전달받아 로그인 로직 처리
   */
  route.post(
    "/login",
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .required()
          .regex(new RegExp("/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/")), // 이메일 유효성 검사
        password: Joi.string().required(),
      }),
    }),
    (req: Request, res: Response) => {}
  );

  /***
   * @path /api/v1/join
   * @description email과 password, confirm password 를 json 형태로 전달받아 회원가입 로직 처리
   */
  route.post(
    "/join",
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .required()
          .regex(new RegExp("/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/")), // 이메일 유효성 검사
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
      }),
    }),
    (req: Request, res: Response) => {}
  );
};
