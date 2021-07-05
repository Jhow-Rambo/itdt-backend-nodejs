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
})
