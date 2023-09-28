import { number, object, string, TypeOf, z } from 'zod';

enum AttendanceEnumType {
  YES = "YES",
  NO = "NO",
}

export const createAttendanceSchema = object({
  body: object({
    id: number().optional(),
    attendanceEnum: z.nativeEnum(AttendanceEnumType), 
    reason: string().optional(),
  })
});

export type CreateAttendanceInput = TypeOf<typeof createAttendanceSchema>['body'];
