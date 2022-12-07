import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory.js";
import { CreateUserService } from "./CreateUserService";

it("shoud create an user", async () => {
  const user = {
    name: "User Test",
    email: "userTest@gmail.com",
    password: "123",
  };

  const userRepositoryInMemory = new UserRepositoryInMemory();
  const createUserService = new CreateUserService(userRepositoryInMemory);

  const newUser = createUserService.execute(user);

  expect(newUser).toHaveProperty("id");
});
