import { Router } from 'express';
import { postRegister, postLogIn, getUser } from '../controllers/userControllers.js';
import { requireAuth, requireGuest } from '../middlewares/authMiddleware.js';
import { handleRegisterError, registerValidation } from '../middlewares/validators/register.js'

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
        requireGuest,
        postLogIn
    );

userRouter.route('/me')
    .get(
        requireAuth,
        getUser
    )
export default userRouter;