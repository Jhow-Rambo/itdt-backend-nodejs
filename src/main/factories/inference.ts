import { GetInferenceMongoRepository, InferenceMongoRepository } from '../../infra/db/mongodb/inference-repository/inference'
import { InferenceController } from '../../presentation/controllers/inference/inference'
import { DbAddInference } from '../../data/usecases/add-inference/db-add-inference'

export const makeInferenceController = (): InferenceController => {
  const inferenceMongoRepository = new InferenceMongoRepository()
  const dbAddInference = new DbAddInference(inferenceMongoRepository)
  return new InferenceController(dbAddInference)
}

export const getInferences = (): any => {
  return new GetInferenceMongoRepository().get()
}