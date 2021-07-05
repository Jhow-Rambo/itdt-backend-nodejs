import { MongoHelper } from '../helpers/mongo-helper'
import { GetInferenceMongoRepository, InferenceMongoRepository } from './inference'

const makeSut = (): any => {
  const sut = new InferenceMongoRepository()
  const sutGetMethod = new GetInferenceMongoRepository()
  return {
    sut,
    sutGetMethod
  }
}

describe('Inference Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const inferenceCollection = MongoHelper.getCollection('inferences')
    await inferenceCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Sould return an inference on success', async () => {
    const { sut } = makeSut()
    const inference = await sut.add({
      normal_image: 'valid_normal_image',
      inferred_image: 'valid_inferred_image',
      inference: 'valid_inference',
      created_at: 'valid_date'
    })
    expect(inference).toBeTruthy()
    expect(inference.id).toBeTruthy()
    expect(inference.normal_image).toBe('valid_normal_image')
    expect(inference.inferred_image).toBe('valid_inferred_image')
    expect(inference.inference).toBe('valid_inference')
    expect(inference.created_at).toBe('valid_date')
  })

  test('Sould return inferences os success', async () => {
    const { sutGetMethod } = makeSut()
    const inferences = await sutGetMethod.get()
    expect(inferences).toBeTruthy()
  })
})
