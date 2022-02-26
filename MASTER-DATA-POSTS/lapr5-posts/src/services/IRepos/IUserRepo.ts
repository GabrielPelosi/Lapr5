import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/users/user";
import { UserEmail } from "../../domain/users/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
}
  