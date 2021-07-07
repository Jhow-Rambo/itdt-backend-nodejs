import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    if (req.route.methods.post) {
      req.body.normal_image = 'https://itdi-inference.s3.us-east-2.amazonaws.com/' + req.files[0].originalname
      req.body.inferred_image = 'https://itdi-inference.s3.us-east-2.amazonaws.com/' + req.files[1].originalname
    }
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}