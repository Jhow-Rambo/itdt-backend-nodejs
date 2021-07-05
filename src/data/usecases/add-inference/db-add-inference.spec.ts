import { AddInferenceRepository, AddInferenceModel, InferenceModel } from './db-add-inference-protocols'
import { DbAddInference } from './db-add-inference'

const makeAddInferenceRepository = (): AddInferenceRepository => {
  class AddInferenceRepositoryStub implements AddInferenceRepository {
    async add (accountData: AddInferenceModel): Promise<InferenceModel> {
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
  return new AddInferenceRepositoryStub()
}

interface SutTypes {
  sut: DbAddInference
  addIferenceRepositoryStub: AddInferenceRepository
}

const makeSut = (): SutTypes => {
  const addIferenceRepositoryStub = makeAddInferenceRepository()
  const sut = new DbAddInference(addIferenceRepositoryStub)
  return {
    sut,
    addIferenceRepositoryStub
  }
}

describe('DbInference Usecase', () => {
  test('Should call AddInferenceRepository with correct values', async () => {
    const { sut, addIferenceRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addIferenceRepositoryStub, 'add')
    const inferenceData = {
      normal_image: 'valid_normal_image',
      inferred_image: 'valid_inferred_image',
      inference: 'valid_inference',
      created_at: 'valid_date'
    }
    await sut.add(inferenceData)
    expect(addSpy).toHaveBeenCalledWith({
      normal_image: 'valid_normal_image',
      inferred_image: 'valid_inferred_image',
      inference: 'valid_inference',
      created_at: 'valid_date'
    })
  })

  test('Should throw if AddInferenceRepository throws', async () => {
    const { sut, addIferenceRepositoryStub } = makeSut()
    jest.spyOn(addIferenceRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const inferenceData = {
      normal_image: 'valid_normal_image',
      inferred_image: 'valid_inferred_image',
      inference: 'valid_inference',
      created_at: 'valid_date'
    }
    const promise = sut.add(inferenceData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an inference on success', async () => {
    const { sut } = makeSut()
    const inferenceData = {
      normal_image: 'valid_normal_image',
      inferred_image: 'valid_inferred_image',
      inference: 'valid_inference',
      created_at: 'valid_date'
    }
    const inference = await sut.add(inferenceData)
    expect(inference).toEqual({
      id: 'valid_id',
      normal_image: 'valid_normal_image',
      inferred_image: 'valid_inferred_image',
      inference: 'valid_inference',
      created_at: 'valid_date'
    })
  })
})
