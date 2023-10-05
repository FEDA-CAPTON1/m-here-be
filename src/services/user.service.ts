import { UserInstance } from '../models/user.model';
import { CreateUserInput } from '../schemas/user.schema';
import AppError  from '../utils/app.error'


export class UserService {

  public async createUser(test_data: CreateUserInput ): Promise<UserInstance> {
    return (
         await UserInstance.create(test_data)
    ) as UserInstance;
  }

  public async loginUser(test_data: CreateUserInput ): Promise<UserInstance> {
    return (
         await UserInstance.create(test_data)
    ) as UserInstance;
  }

  public async findUserByEmail(email: string): Promise<UserInstance | null> {
    try {
      const user = await UserInstance.findOne({ where: { email } });
      return user;
    } catch (error) {
      return next(new AppError(400, 'Invalid User, please enter a valid email address'));
    }
  }

  public async findUserById(userId: number): Promise<UserInstance | null> {
    try {
      const user = await UserInstance.findByPk(userId);
      return user;
    } catch (error) {
      return next(new AppError(400, 'Invalid User id'));
    }
  }

  // public async updateUserInformation(userId: number, updatedInfo: { firstName?: string; lastName?: string }) {
  //   try {
  //     await updateUser(userId, updatedInfo);
  //     console.log('User information updated successfully.');
  //   } catch (error) {
  //     console.error('Error updating user information:', error);
  //   }
  // }
}


function next(arg0: AppError): UserInstance | PromiseLike<UserInstance | null> | null {
  throw new Error('Function not implemented.');
}

