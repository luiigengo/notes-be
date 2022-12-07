import bcrypt from "bcryptjs";

export class CreateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, levelId }) {
    try {
      const checkEmailExist = await this.userRepository.findByEmail(email);

      if (checkEmailExist) {
        throw new Error("Email cadastrado");
      }

      const hashPassword = await bcrypt.hash(password, 8);

      const newUser = this.userRepository.createUser({
        name,
        email,
        password: hashPassword,
        levelId,
      });

      return newUser;
    } catch (err) {
      console.log(err);
    }
  }
}
