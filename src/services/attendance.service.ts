import { Test } from '../models/test.model';
import { CreateTestInput } from '../schemas/test.schema'

export class TestService {
  public async createTest(data: CreateTestInput): Promise<Test> {
    return (
         await Test.create(data)
    ) as Test;
  }
}
