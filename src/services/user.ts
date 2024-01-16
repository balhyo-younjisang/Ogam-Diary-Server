import { IUserInputDTO } from "@/interfaces/IUser";
import { Inject, Service } from "typedi";
import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

@Service()
export default class UserService {
  constructor(@Inject("logger") private logger) {}

  public async SignUp(userInputDTO: IUserInputDTO): Promise<String> {
    try {
      const { password, confirmPassword } = userInputDTO;

      if (password !== confirmPassword)
        throw new Error("The password you entered is incorrect.");

      const { user } = await createUserWithEmailAndPassword(
        auth,
        userInputDTO.email,
        password
      );

      return user.email;
    } catch (e) {
      throw new Error("User Sigin Up ERROR");
    }
  }

  public async SignIn(userInputDTO: IUserInputDTO): Promise<String> {
    try {
      const { email, password } = userInputDTO;

      this.logger.info(email);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      return user.email;
    } catch (e) {
      throw new Error("Invalid Password");
    }
  }
}
