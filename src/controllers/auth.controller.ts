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
// import Email from '../utils/email.service';

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

// export const loginUserHandler_ = async (
//   req: Request<{}, {}, LoginUserInput> | string,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const otpCode = () => {
//       return Math.floor(Math.random() * 100000)
//     }
//     const baseUrl = process.env.BASE_URL;
//     const otpVerificationRedirectUrl = `${baseUrl}/api/v1/auth/verifyotp/${otpCode}`;
//     const { email } = req.params;
//     const user = userService.findUserByEmail(email)
//     await new Email(user, otpVerificationRedirectUrl).sendOtp();
//       try { 
//         await updateUser({ id: user.id }, { otpVerificationCode });
//         res.status(201).json({
//           status: 'success',
//           message:
//             'An otp has been sent your email',
//           user
//         });
//       } catch (error) {
//         await updateUser({ id: user.id }, { otpVerificationCode: null });
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

// export const loginUserHandler = async (
//   req: Request<{}, {}, LoginUserInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, phone, password } = req.body;

//     const user = await findUniqueUser(
//       { email: email.toLowerCase() } || { phone: email.toLowerCase() },
//       { id: true, email: true, verified: true, phone: true, password: true }
//     );
//     if (!user) {
//       return next(new AppError(400, 'Invalid credentials, kindly check and try again'));
//     }

//     if (!user.verified) {
//       return next(
//         new AppError(
//           401,
//           'You are not verified, please verify your email or phone number to login'
//         )
//       );
//     }
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return next(new AppError(400, 'Invalid email or password'));
//     }

//     const { access_token, refresh_token } = await signTokens(user);

//     // console.log(access_token);
    
//     res.cookie('access_token', access_token, accessTokenCookieOptions);
//     res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
//     res.cookie('logged_in', true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });

//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refresh_token = req.cookies.refresh_token;

//     const message = 'Could not refresh access token';

//     if (!refresh_token) {
//       return next(new AppError(403, message));
//     }
//     const decoded = verifyJwt<{ sub: string }>(
//       refresh_token,
//       'ab1234'
//     );
//     if (!decoded) {
//       return next(new AppError(403, message));
//     }
//     const session = await redisClient.get(decoded.sub);
//     if (!session) {
//       return next(new AppError(403, message));
//     }
//     const id = JSON.parse(session).id 
//     const user = await userService.findUserById(id);
//     if (!user) {
//       return next(new AppError(403, message));
//     }
//     const access_token = signJwt({ sub: user.id }, 'ab1234', {
//       expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     });

//     res.cookie('access_token', access_token, accessTokenCookieOptions);
//     res.cookie('logged_in', true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });

//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     // console.log(err);
//     next(err);
//   }
// };

// function logout(res: Response) {
//   res.cookie('access_token', '', { maxAge: 1 });
//   res.cookie('refresh_token', '', { maxAge: 1 });
//   res.cookie('logged_in', '', { maxAge: 1 });
// }

// export const logoutUserHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await redisClient.del(res.locals.user.id);
//     logout(res);

//     res.status(200).json({
//       status: 'success',
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// export const verifyOtpHandler = async (
//   req: Request<VerifyEmailInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const email_verification_code = crypto
//       .createHash('sha256')
//       .update(req.params.verificationCode)
//       .digest('hex');

//     const user = await userService.updateUserInformation (
//       { email_verification_code },
//       { verified: true, email_verification_code: null },
//       { email: true }
//     );

//     if (!user) {
//       return next(new AppError(401, 'Could not verify email'));
//     }

//     return res.status(200).json({
//       status: 'success',
//       message: 'Email verified successfully',
//     });
//   } catch (err: any) {
//     if (err.code === 'P2025') {
//       return res.status(403).json({
//         status: 'fail',
//         message: `Verification code is invalid or user doesn't exist`,
//       });
//     }
//     next(err);
//   }
// };

// export const verifyOtpHandler = async (
//   req: Request<VerifyOtpInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
  
//     const phone_verification_code = Math.floor(Math.random()*1000000).toString();

//     const user = await updateUser(
//       { phone_verification_code },
//       { verified: true, phone_verification_code: null },
//       { email: true }
//     );

//     if (!user) {
//       return next(new AppError(401, 'Could not verify phone number'));
//     }

//     return res.status(200).json({
//       status: 'success',
//       message: 'Phone numbrt verified successfully',
//     });
//   } catch (err: any) {
//     if (err.code === 'P2025') {
//       return res.status(403).json({
//         status: 'fail',
//         message: `Verification code is invalid or user doesn't exist`,
//       });
//     }
//     next(err);
//   }
// };

// export const forgotPasswordHandler = async (
//   req: Request<
//     Record<string, never>,
//     Record<string, never>,
//     ForgotPasswordInput
//   >,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // const agent = await findUser({ email: req.body.email.toLowerCase() });
//     const email = req.body.email.toLowerCase();
//     const user = await findUser1({ email: email });
//     console.log(user)
//     const message =
//       'You will receive a reset email if user with that email exist';
//     if (!user) {
//       return res.status(200).json({
//         status: 'success',
//         message,
//       });
//     }

//     if (!user.verified) {
//       return res.status(403).json({
//         status: 'fail',
//         message: 'Account not verified',
//       });
//     }

//     if (user.provider) {
//       return res.status(403).json({
//         status: 'fail',
//         message:
//           'We found your account. It looks like you registered with a social auth account. Try signing in with social auth.',
//       });
//     }
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const password_reset_token = crypto
//       .createHash('sha256')
//       .update(resetToken)
//       .digest('hex');

//     await updateUser(
//       { id: user.id },
//       {
//         password_reset_token,
//         password_reset_at: new Date(Date.now() + 10 * 60 * 1000),
//       },
//       { email: true }
//     );

//     try {
//       const baseUrl = process.env.BASE_URL;
//       const url = `${baseUrl}/api/auth/resetpassword/${resetToken}`;
//       await new Email(user, url).sendPasswordResetToken();

//      return res.status(200).json({
//         status: 'success',
//         message,
//       });
//     } catch (err: any) {
//       await updateUser(
//         { id: user.id },
//         { password_reset_token: null, password_reset_at: null },
//         {}
//       );
//       return res.status(500).json({
//         status: 'error',
//         message: 'There was an error sending email',
//       });
//     }
//   } catch (err: any) {
//     next(err);
//   }
// };

// export const resetPasswordHandler = async (
//   req: Request<
//     ResetPasswordInput['params'],
//     Record <string, never>,
//     ResetPasswordInput['body']
//   >,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Get the user from the collection
//     const password_reset_token = crypto
//       .createHash('sha256')
//       .update(req.params.resetToken)
//       .digest('hex');

//     const user = await findUser({
//       password_reset_token,
//       password_reset_at: Date.now().toString(),
      
//     });

//     if (!user) {
//       return res.status(403).json({
//         status: 'fail',
//         message: 'Invalid token or token has expired',
//       });
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 12);

//     await updateUser(
//       {
//         id: user.id,
//       },
//       {
//         password: hashedPassword,
//         password_reset_token: null,
//         password_reset_at: null,
//       },
//       { email: true }
//     );

//     logout(res);
//     res.status(200).json({
//       status: 'success',
//       message: 'Password data updated successfully',
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

