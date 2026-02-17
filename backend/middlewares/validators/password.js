import { body, validationResult } from 'express-validator';

export function handlePassError(req, res, next) {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error registering',
            error: errors.array()
        });
    }

    return next();
}

export const passValidation = [
    body('oldPassword')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
    body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[^a-zA-Z0-9]/)
        .withMessage("Password must contain at least one special character"),
    body("confirmNewPassword")
        .notEmpty()
        .withMessage("Please confirm your password")

        .custom((value, {req}) => {
            if(value !== req.body.newPassword) throw new Error("Passwords do not match");
            return true;
    })
    
] 