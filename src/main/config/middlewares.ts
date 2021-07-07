import { Express, urlencoded } from 'express'
import { bodyParser, contentType, cors } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(urlencoded({
    extended: false
  }))
  app.use(contentType)
  app.use(cors)
}
