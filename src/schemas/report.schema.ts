import { number, object, string, TypeOf } from 'zod';

// enum RoleEnumType {
//   EIT = "EIT",
//   Instructors = "Intructors",
//   Kitchen ="Kitchen",
//   Security ="Security",
//   Nurse = "Nurses",
//   Admin = "Admin",
// }

export const createReportSchema = object({
  body: object({
    id: number().optional(),
    from: string().email('Invalid email address'),
    details: string({
      required_error: 'Enter Details'
    }),
    recipients: string().email('Invalid email address'),
  })
});

export type CreateReportInput = TypeOf<typeof createReportSchema>['body'];
