import { UserInstance } from '../models/user.model';
import { CreateUserInput } from '../schemas/user.schema'

export class TestService {
  public async createTest(test_data: CreateUserInput ): Promise<UserInstance> {
    return (
         await UserInstance.create(test_data)
    ) as UserInstance;
  }
}
