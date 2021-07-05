import { AddInferenceRepository, AddInferenceModel, InferenceModel, AddInference } from './db-add-inference-protocols'

export class DbAddInference implements AddInference {
  private readonly addInferenceRepository: AddInferenceRepository

  constructor (addInferenceRepository: AddInferenceRepository) {
    this.addInferenceRepository = addInferenceRepository
  }

  async add (inferenceData: AddInferenceModel): Promise<InferenceModel> {
    const inference = await this.addInferenceRepository.add(inferenceData)
    return inference
  }
}