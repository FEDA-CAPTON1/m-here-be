"use strict";
// import crypto from 'crypto';
// import { CookieOptions, NextFunction, Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import {
//   LoginUserInput,
//   ResetPasswordInput,
//   VerifyEmailInput,
//   VerifyOtpInput,
// } from '../schemas/user.schema';
// import { UserService } from '../services/user.service';
// const userService = new UserService;
// import config from 'config';
// import AppError from '../utils/app.error';
// import redisClient from '../utils/connect.redis';
// import { signJwt, verifyJwt } from '../utils/jwt';
// import Email from '../utils/email.service.ts';
// const cookiesOptions: CookieOptions = {
//   httpOnly: true,
//   sameSite: 'lax',
// };
// const accessTokenCookieOptions: CookieOptions = {
//   ...cookiesOptions,
//   expires: new Date(
//     Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
//   ),
//   maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
// };
// const refreshTokenCookieOptions: CookieOptions = {
//   ...cookiesOptions,
//   expires: new Date(
//     Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
//   ),
//   maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
// };
// export const registerUserHandler = async (
//   req: Request<{}, {}, RegisterUserInput> | any,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     const verifyCode = crypto.randomBytes(32).toString('hex');
//     const email_verification_code = crypto
//       .createHash('sha256')
//       .update(verifyCode)
//       .digest('hex');
//     const userData = {
//       role_id: req.body.role_id,
//       role: req.body.role,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       address: req.body.address,                                                                                                                               
//       phone: req.body.phone,
//       profile_picture: req.body.profile_picture,
//       state: req.body.state,
//       local_govt: req.body.local_govt,
//       ward: req.body.ward,
//       marital_status: req.body.marital_status,
//       email: req.body.email,
//       password: hashedPassword,
//       email_verification_code
//     }
//     const user = await createUser(userData);
//     const baseUrl = process.env.BASE_URL;
//     const emailVerificationRedirectUrl = `${baseUrl}/api/v1/auth/verifyemail/${verifyCode}`;
//     await new Email(user, emailVerificationRedirectUrl).sendVerificationCode();
//     // if (user.role != "Farmer") {}
//       try { 
//         await updateUser({ id: user.id }, { email_verification_code });
//         res.status(201).json({
//           status: 'success',
//           message:
//             'An email with a verification code has been sent to your email',
//           user
//         });
//       } catch (error) {
//         await updateUser({ id: user.id }, { email_verification_code: null });
//         return res.status(500).json({
//           status: 'error',
//           message: 'There was an error sending email, please try again',
//         });
//       }
//   } catch (err: any) {   
//     if (err instanceof Prisma.PrismaClientKnownRequestError) {
//       if (err.code === 'P2002') {
//         return res.status(409).json({
//           status: 'fail',
//           msg: 'Email or Phone number already exist, please check and try again',
//         });
//       }
//     }
//     next(err);
//   }
// };
//# sourceMappingURL=report.controller.js.map