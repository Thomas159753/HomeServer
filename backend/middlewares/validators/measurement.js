import { param, body, validationResult } from 'express-validator';

function chectDecimal(value) {
    if (!/^\d+(\.\d{1,2})?$/.test(String(value))) {
      throw new Error('Input can have at most 2 decimal places');
    }
    return true;
}

export function handlePatchError(req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error in measurement form',
            error: errors.array()
        });
    }

    return next();
}

export const dataParamValidation = [
  param("id")
  .isInt({ gt: 0 })
  .withMessage("Invalid id"),
]

export const dataValidation = [
  body('weight')
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0, max: 500 })
    .withMessage('Input must be between 0 and 500')
    .custom(chectDecimal)
    .toFloat(),
  body('waist')
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0, max: 500 })
    .withMessage('Input must be between 0 and 500')
    .custom(chectDecimal)
    .toFloat(),
  body('chest')
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0, max: 500 })
    .withMessage('Input must be between 0 and 500')
    .custom(chectDecimal)
    .toFloat(),
  body('leftArm')
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0, max: 500 })
    .withMessage('Input must be between 0 and 500')
    .custom(chectDecimal)
    .toFloat(),
  body('rightArm')
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0, max: 500 })
    .withMessage('Input must be between 0 and 500')
    .custom(chectDecimal)
    .toFloat(),
  body('leftLeg')
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0, max: 500 })
    .withMessage('Input must be between 0 and 500')
    .custom(chectDecimal)
    .toFloat(),
  body('rightLeg')
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0, max: 500 })
    .withMessage('Input must be between 0 and 500')
    .custom(chectDecimal)
    .toFloat(),
  body("note")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Note must be 500 characters or less"),
  
  // Check if at least one field is provided
  body().custom((_, { req }) => {
    const { weight, waist, chest, leftArm, rightArm, leftLeg, rightLeg, note } = req.body;
    // If any of those """is not undefined""" it becomes true
    const hasAny = 
      weight !== undefined ||
      waist !== undefined ||
      chest !== undefined ||
      leftArm !== undefined ||
      rightArm !== undefined ||
      leftLeg !== undefined ||
      rightLeg !== undefined ||
      note !== undefined;

    if (!hasAny) {
      throw new Error("Provide at least one measurement value");
    }
    return true;
  }),
];