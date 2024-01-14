import { IUser, IUserInputDTO } from "@/interfaces/IUser";
import { Inject, Service } from "typedi";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import { supabase } from "@/config/supabase";
import config from "@/config";

@Service()
export default class UserService {
  constructor(@Inject("logger") private logger) {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);

      const hashedPassword = await argon2.hash(userInputDTO.password, {
        salt,
      });
      await supabase.from("users").insert({
        ...userInputDTO,
        salt: salt.toString("hex"),
        password: hashedPassword,
      });

      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", userInputDTO.email);

      const token = this.generateToken(data[0]);
      const user = data[0];

      if (error) {
        throw new Error("User cannot be created");
      }

      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
