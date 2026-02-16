import { body, validationResult } from 'express-validator';
import { prisma } from '../../prisma/lib/prisma.js';

async function checkEmail(value, {req}) {
    if (req.user?.email?.toLowerCase() === value.toLowerCase()) return true;

    const result = await prisma.user.findUnique({
        where: {email: value}
    });

    if(result) throw new Error('Email already in use');
    return true
}

export function handlePatchError(req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error updating user',
            error: errors.array()
        });
    }

    return next();
}

export const patchValidation = [
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
]