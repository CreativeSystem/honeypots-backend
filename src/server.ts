import 'module-alias/register'
import '@/config/env'

import express from 'express'

import routes from '@/routes'

const server = express()

server.use(routes)

server.listen(process.env.PORT || 3000,() => console.log('Server started'))
