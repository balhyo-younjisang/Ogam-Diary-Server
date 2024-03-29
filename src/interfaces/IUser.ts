export interface IUser {
  email: string;
  password: string;
}

export interface IUserInputDTO {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserResponseDTO {
  email: string;
}
