import * as express from 'express'

import { badRequest } from '../../helpers'

import { oauthClientsRouter } from './oauth-clients'
import { configRouter } from './config'
import { applicationRouter } from './application'
import { usersRouter } from './users'
import { videosRouter } from './videos'

const apiRouter = express.Router()

apiRouter.use('/application', applicationRouter)
apiRouter.use('/oauth-clients', oauthClientsRouter)
apiRouter.use('/config', configRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/videos', videosRouter)
apiRouter.use('/ping', pong)
apiRouter.use('/*', badRequest)

// ---------------------------------------------------------------------------

export { apiRouter }

// ---------------------------------------------------------------------------

function pong (req: express.Request, res: express.Response, next: express.NextFunction) {
  return res.send('pong').status(200).end()
}
