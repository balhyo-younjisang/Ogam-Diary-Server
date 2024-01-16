import "reflect-metadata";
import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import UserService from "../../services/user";
import { IUserInputDTO } from "../../interfaces/IUser";

const route = Router();

export default (app: Router) => {
  app.use(`/user`, route);

  /***
   * @path /api/v1/login
   * @description email과 password를 json 형태로 전달받아 로그인 로직 처리
   */
  route.post(
    "/login",
    celebrate({
      body: Joi.object({
        email: Joi.string().required(), // 이메일 유효성 검사
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      const userServiceInstance = Container.get(UserService);

      const email = await userServiceInstance.SignIn(req.body as IUserInputDTO);

      return res.status(201).json({ email });
    }
  );

  /***
   * @path /api/v1/join
   * @description email과 password, confirm password 를 json 형태로 전달받아 회원가입 로직 처리
   */
  route.post(
    "/join",
    celebrate({
      body: Joi.object({
        email: Joi.string().required(), // 이메일 유효성 검사
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const userServiceInstance = Container.get(UserService);

      const email = await userServiceInstance.SignUp(req.body as IUserInputDTO);

      return res.status(201).json({ email });
    }
  );
};
