"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTypeSchema = exports.getSingleUserSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyOtpSchema = exports.verifyEmailSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// enum RoleEnumType {
//   EIT = "EIT",
//   Instructors = "Intructors",
//   Kitchen ="Kitchen",
//   Security ="Security",
//   Nurse = "Nurses",
//   Admin = "Admin",
// }
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        id: (0, zod_1.number)().optional(),
        roleId: (0, zod_1.string)().optional(),
        firstName: (0, zod_1.string)({
            required_error: 'first_name is required',
        }),
        lastName: (0, zod_1.string)().optional(),
        email: (0, zod_1.string)().email('Invalid email address').optional(),
        code: (0, zod_1.string)().optional(),
        ip: (0, zod_1.string)().optional(),
        otpToken: (0, zod_1.number)().optional(),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be more than 5 characters')
            .max(32, 'Password must be less than 32 characters'),
        confirm_password: (0, zod_1.string)({
            required_error: 'Please confirm your password',
        }),
    }).refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Passwords do not match',
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
    }),
});
exports.verifyEmailSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        verificationCode: (0, zod_1.string)(),
    }),
});
exports.verifyOtpSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        otp: (0, zod_1.string)(),
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Email is invalid'),
    }),
});
exports.resetPasswordSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        resetToken: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(8, 'Password must be more than 8 characters'),
        confirm_password: (0, zod_1.string)({
            required_error: 'Please confirm your password',
        }),
    }).refine((data) => data.password === data.confirm_password, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    }),
});
exports.getSingleUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)()
    })
});
exports.getUserTypeSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        user_type: (0, zod_1.string)()
    })
});
//# sourceMappingURL=user.schema.js.map