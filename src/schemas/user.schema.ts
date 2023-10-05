import { number, object, string, TypeOf, z } from 'zod';

// enum RoleEnumType {
//   EIT = "EIT",
//   Instructors = "Intructors",
//   Kitchen ="Kitchen",
//   Security ="Security",
//   Nurse = "Nurses",
//   Admin = "Admin",
// }

export const createUserSchema = object({
  body: object({
    id: number().optional(),
    roleId: string().optional(),
    firstName: string({
      required_error: 'first_name is required',
    }),
    lastName: string().optional(),
    email: string().email('Invalid email address').optional(),
    code: string().optional(),
    ip: string().optional(),
    otpToken: number().optional(),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password must be more than 5 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirm_password: string({
      required_error: 'Please confirm your password',
    }),
 
  }).refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  params: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export const verifyOtpSchema = object({
  body: object({
    otp: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email is invalid'),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    resetToken: string(),
  }),
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be more than 8 characters'),
    confirm_password: string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  }),
});

export const getSingleUserSchema = object({
  params: object({
    id: string()
  })
})

export const getUserTypeSchema = object({
  params: object({
    user_type: string()
  })
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'confirm_password'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['params'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
export type VerifyOtpInput = TypeOf<typeof verifyOtpSchema>['body'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type GetSingleUserInput = TypeOf<typeof getSingleUserSchema>['params'];
