
import cors from 'cors'
import { Router, json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import passport from '@/config/passport'
import { loginUserController, registerUserController } from '@/controllers'

import { errorHandlerDecorator,validatorErrorHandler,errorHandler,useCaseHandler } from './middlewares'

const router = Router()

router.use(helmet())
router.use(morgan(process.env.MORGAN_LOG))
router.use(cors())
router.use(json())
router.use(passport.initialize())

// Public Endpoints

router.get(
  process.env.FACEBOOK_CALLBACK_URL,
  passport.authenticate('facebook',{ scope: ['email','public_profile'] }),
  (req, res) => res.json(req.user)
)

router.get(
  process.env.GOOGLE_CALLBACK_URL,
  passport.authenticate('google'),
  (req, res) => res.json(req.user)
)

router.post(
  '/login',
  errorHandlerDecorator(passport.authenticate('email-password')),
  errorHandlerDecorator(loginUserController)
)

router.post('/users',errorHandlerDecorator(registerUserController))

// Private Endpoints

router.use(passport.authenticate('jwt'))

router.get('/feed', (req,res) => res.json(req.user))

router.use(validatorErrorHandler)
router.use(useCaseHandler)
router.use(errorHandler)

export default router
