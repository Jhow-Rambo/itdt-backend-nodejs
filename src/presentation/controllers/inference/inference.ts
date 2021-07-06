import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { AddInference, Controller, HttpRequest, HttpResponse, InferenceGet } from './inference-protocols'

export class InferenceController implements Controller {
  private readonly addInference: AddInference

  constructor (addInference: AddInference) {
    this.addInference = addInference
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requireFields = ['normal_image', 'inferred_image', 'inference', 'created_at']
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { normal_image, inferred_image, inference, created_at } = httpRequest.body
      const inferenceData = await this.addInference.add({
        normal_image,
        inferred_image,
        inference,
        created_at
      })
      return ok(inferenceData)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}

export class GetInferenceController implements InferenceGet {
  async get (inference: any): Promise<HttpResponse> {
    try {
      const inferenceData = inference
      return ok(inferenceData)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}