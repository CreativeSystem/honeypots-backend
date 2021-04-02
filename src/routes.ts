
import cors from 'cors'
import { Router, json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import passport from '@/config/passport'
import { registerUserController } from '@/controllers'

const router = Router()

router.use(helmet())
router.use(morgan(process.env.MORGAN_LOG))
router.use(cors())
router.use(json())
router.use(passport.initialize())

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

router.post('/users',registerUserController)

export default router
