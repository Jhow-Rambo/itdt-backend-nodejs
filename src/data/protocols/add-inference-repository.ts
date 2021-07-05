import { InferenceModel } from '../../domain/models/inference'
import { AddInferenceModel } from '../../domain/usecases/add-inference'

export interface AddInferenceRepository {
  add (inferenceData: AddInferenceModel): Promise<InferenceModel>
}