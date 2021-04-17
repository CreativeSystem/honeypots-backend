import 'module-alias/register'
import '@/config/env'
import '@/validators'

import express from 'express'

import routes from '@/routes'

const app = express()

app.use('/api/v1', routes)

app.listen(process.env.PORT || 3333,() => console.log('Server started'))
