import 'module-alias/register'
import '@/config/env'
import '@/validators'

import express from 'express'

import routes from '@/routes'

const app = express()

app.use(routes)

app.listen(process.env.PORT || 3000,() => console.log('Server started'))
