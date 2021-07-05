import { InferenceModel } from '../models/inference'

export interface AddInferenceModel {
  normal_image: string
  inferred_image: string
  inference: JSON
  created_at: string
}

export interface AddInference {
  add (inference: AddInferenceModel): Promise<InferenceModel>
}