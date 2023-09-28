import { boolean, number, object, string, TypeOf } from 'zod';

export const createTestSchema = object({
  body: object({
    id: number().optional(),
    name: string({
      required_error: 'Farm name is required',
    }),
    role: string(),
    address: string({
      required_error: 'Farm location is required',
    }),
  })
});

export type CreateTestInput = TypeOf<typeof createTestSchema>['body'];
