import { Test } from '../models/test.model';
import { CreateTestInput } from '../schemas/test.schema'

export class TestService {
  public async createTest(test_data: CreateTestInput): Promise<Test> {
    return (
         await Test.create(test_data)
    ) as Test;
  }
}
