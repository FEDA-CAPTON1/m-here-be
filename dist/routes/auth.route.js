"use strict";
// import express, { NextFunction, Request, Response, response } from 'express';
// import {
//   forgotPasswordHandler,
//   loginUserHandler,
//   logoutUserHandler,
//   refreshAccessTokenHandler,
//   resetPasswordHandler,
//   verifyEmailHandler,
//   verifyOtpHandler,
// } from '../controllers/auth.controller';
// import { auth, } from '../middleware/auth';
// import { requireUser } from '../middleware/requireUser';
// import { validate } from '../middleware/validate';
// import {
//   forgotPasswordSchema,
//   loginUserSchema,
//   resetPasswordSchema,
//   verifyEmailSchema,
//   verifyOtpSchema
// } from '../schemas/user.schema';
// const authRouter = express.Router();
// authRouter.post( '/login', validate(loginUserSchema), loginUserHandler);
// authRouter.get( '/refresh', refreshAccessTokenHandler);
// authRouter.get( '/verifyemail/:verificationCode', validate(verifyEmailSchema), verifyEmailHandler );
// authRouter.post( '/otp', validate(verifyOtpSchema), verifyOtpHandler );
// authRouter.get( '/logout', auth, requireUser, logoutUserHandler );
// authRouter.post( '/forgotpassword', validate(forgotPasswordSchema), forgotPasswordHandler );
// authRouter.patch( '/resetpassword/:resetToken', validate(resetPasswordSchema), resetPasswordHandler );
// export default authRouter;
//# sourceMappingURL=auth.route.js.map