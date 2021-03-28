
import cors from 'cors'
import { Router, json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const router = Router()

router.use(helmet())
router.use(morgan(process.env.MORGAN_LOG))
router.use(cors())
router.use(json())

export default router
