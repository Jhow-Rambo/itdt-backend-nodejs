import { Router } from 'express'
import { makeGetInferenceController, makeInferenceController } from '../factories/inference'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/inference', adaptRoute(makeInferenceController()))
  router.get('/inference', adaptRoute(makeGetInferenceController()))
}