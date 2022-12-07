export class UserRepositoryInMemory {
  users = [];

  async createUser({ name, email, password, levelId }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      password,
      levelId,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }
}
