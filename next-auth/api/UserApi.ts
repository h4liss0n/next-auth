export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export class UserApi {
  static async createRegister(data: UserCreate) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  }
}
