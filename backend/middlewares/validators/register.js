import { body, validationResult } from 'express-validator';
import { prisma } from '../../prisma/lib/prisma.js';

async function checkEmail (value) {
    const result = await prisma.user.findUnique({
        where: { email: value }
    });

    if (result) throw new Error("Email already in use");
    return true;
}

export function handleRegisterError(req, res, next) {
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

export const registerValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()

        .custom(checkEmail),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .bail()
        // Contain only letter, numbers and underscores
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters"),

    body('password')
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

    body("confirmPassword")
        .notEmpty()
        .withMessage("Please confirm your password")

        .custom((value, {req}) => {
            if(value !== req.body.password) throw new Error("Passwords do not match");
            return true;
    })
]