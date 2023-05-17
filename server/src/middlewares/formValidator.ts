import { body, ValidationChain } from 'express-validator'

const validator: ValidationChain[] = [
  body('user_name').notEmpty().withMessage('User name is required'),
  body('password')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 chars long'),
]

const registerValidator = [
  ...validator,
  body('user_name')
    .notEmpty()
    .withMessage('User name is required')
    .matches(/[a-zA-Z]/g)
    .withMessage('user name must contain a big and a small letter'),
  
  body('password')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')
    .matches(/[a-zA-Z]/g)
    .withMessage('password must contain a big and a small letter')
    ,
  body('first_name')
    .notEmpty()
    .withMessage('Invalid first name')
    .matches(/[a-zA-Z]/g)
    .withMessage('first name must contain a big and a small letter')
    .not()
    .matches(/\d/)
    .withMessage('first name must not contain a number')
  ,
  body('last_name')
    .notEmpty()
    .withMessage('Invalid last name')
    .matches(/[a-zA-Z]/g)
    .withMessage('last name must contain a big and a small letter')
    .not()
    .matches(/\d/)
    .withMessage('last name  must not contain a number')
  ,
]

export { registerValidator, validator as loginValidator }