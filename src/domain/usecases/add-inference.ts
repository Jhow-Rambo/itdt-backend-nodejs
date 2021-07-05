import { InferenceModel } from '../models/inference'

export interface AddInferenceModel {
  normal_image: any
  inferred_image: any
  inference: any // TODO: search about json not string
  created_at: string
}

export interface AddInference {
  add (inference: AddInferenceModel): Promise<InferenceModel>
}