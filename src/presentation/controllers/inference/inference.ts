import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { AddInference, Controller, HttpRequest, HttpResponse } from './inference-protocols'

export class InferenceController implements Controller {
  private readonly addInference: AddInference

  constructor (addInference: AddInference) {
    this.addInference = addInference
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requireFields = ['normal_image', 'inferred_image', 'inference', 'created_at']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}