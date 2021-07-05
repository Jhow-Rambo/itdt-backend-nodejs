import { Router } from 'express'
import { makeInferenceController } from '../factories/inference'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/inference', adaptRoute(makeInferenceController()))
}