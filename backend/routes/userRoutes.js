import { Router } from 'express';
import { postRegister, postLogIn, getUser, patchUser, passwordPatch } from '../controllers/userControllers.js';
import { requireAuth, requireGuest } from '../middlewares/authMiddleware.js';
import { handleRegisterError, registerValidation } from '../middlewares/validators/register.js';
import { handleLoginError, loginValidation } from '../middlewares/validators/login.js';
import { handlePatchError, patchValidation } from '../middlewares/validators/patch.js'
import { handlePassError, passValidation } from '../middlewares/validators/password.js'

const userRouter = Router();

userRouter.route('/register')
    .post(
        requireGuest,
        registerValidation,
        handleRegisterError,
        postRegister
    );

userRouter.route('/login')
    .post(
        requireGuest,
        loginValidation,
        handleLoginError,
        postLogIn
    );

userRouter.route('/me')
    .get(
        requireAuth,
        getUser
    )
    .patch(
        requireAuth,
        patchValidation,
        handlePatchError,
        patchUser
    )

userRouter.route('/me/password')
    .patch(
        requireAuth,
        passValidation,
        handlePassError,
        passwordPatch
    )

export default userRouter;