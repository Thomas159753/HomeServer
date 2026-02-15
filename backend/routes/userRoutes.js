import { Router } from 'express';
import { postRegister, postLogIn, getUser, patchUser } from '../controllers/userControllers.js';
import { requireAuth, requireGuest } from '../middlewares/authMiddleware.js';
import { handleRegisterError, registerValidation } from '../middlewares/validators/register.js';
import { handleLoginError, loginValidation } from '../middlewares/validators/login.js';

const userRouter = Router();

userRouter.route('/register')
    .post(
        registerValidation,
        handleRegisterError,
        requireGuest,
        postRegister
    );

userRouter.route('/login')
    .post(
        loginValidation,
        handleLoginError,
        requireGuest,
        postLogIn
    );

userRouter.route('/me')
    .get(
        requireAuth,
        getUser
    )
    .patch(
        requireAuth,
        patchUser
    )
export default userRouter;