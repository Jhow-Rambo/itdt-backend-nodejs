import { MissingParamError, ServerError } from '../../errors'
import { InferenceController } from './inference'
import { AddInference, InferenceModel, AddInferenceModel } from './inference-protocols'

const makeAddInferenceStub = (): AddInference => {
  class AddAccountStub implements AddInference {
    async add (inference: AddInferenceModel): Promise<InferenceModel> {
      const fakeInference = {
        id: 'valid_id',
        normal_image: 'valid_normal_image',
        inferred_image: 'valid_inferred_image',
        inference: 'valid_inference',
        created_at: 'valid_date'
      }
      return new Promise(resolve => resolve(fakeInference))
    }
  }
  return new AddAccountStub()
}

interface SutTypes {
  sut: InferenceController
  addInferenceStub: AddInference
}

const makeSut = (): SutTypes => {
  const addInferenceStub = makeAddInferenceStub()
  const sut = new InferenceController(addInferenceStub)
  return {
    sut,
    addInferenceStub
  }
}

describe('Inference Controller', () => {
  test('Should return 400 if no normal image is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        inferred_image: 'any_inferred_image',
        inference: 'any_inference',
        created_at: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('normal_image'))
  })

  test('Should return 400 if no inferred image is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        normal_image: 'any_normal_image',
        inference: 'any_inference',
        created_at: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('inferred_image'))
  })

  test('Should return 400 if no inference is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        normal_image: 'any_normal_image',
        inferred_image: 'any_inferred_image',
        created_at: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('inference'))
  })

  test('Should return 400 if no date is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        normal_image: 'any_normal_image',
        inferred_image: 'any_inferred_image',
        inference: 'any_inference'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('created_at'))
  })

  test('Should return 500 if AddInferrence throws', async () => {
    const { sut, addInferenceStub } = makeSut()
    jest.spyOn(addInferenceStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        normal_image: 'any_normal_image',
        inferred_image: 'any_inferred_image',
        inference: 'any_inference',
        created_at: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        normal_image: 'any_normal_image',
        inferred_image: 'any_inferred_image',
        inference: 'any_inference',
        created_at: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      normal_image: 'valid_normal_image',
      inferred_image: 'valid_inferred_image',
      inference: 'valid_inference',
      created_at: 'valid_date'
    })
  })
})