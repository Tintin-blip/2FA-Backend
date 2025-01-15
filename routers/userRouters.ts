import express from "express";
import { userController } from "../controllers/userControllers";
import { userHelper} from "../helpers/userHelpers";
import { Auth } from "../helpers/security/password";
import { TOTP } from "../helpers/security/TOTP";
import { check, param } from "express-validator";

const helper = new userHelper();
const totp = new TOTP(helper)
const auth = new Auth();
const userRouter = express.Router();
const userControllers = new userController(helper,auth,totp);

userRouter.post('/users/:id/enable/2fa', [
  param('id').isString().notEmpty().withMessage('User ID is required'),
  check('inputUserCode').isString().notEmpty().withMessage('User input code is required')
], userControllers.twoFaAuthentication);

userRouter.post('/users/signup', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userControllers.signUpController);

export default userRouter;
