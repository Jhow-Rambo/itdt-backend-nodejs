import { InferenceMongoRepository } from '../../infra/db/mongodb/account-repository/inference'
import { InferenceController } from '../../presentation/controllers/inference/inference'
import { DbAddInference } from '../../data/usecases/add-inference/db-add-inference'

export const makeInferenceController = (): InferenceController => {
  const accountMongoRepository = new InferenceMongoRepository()
  const dbAddAccount = new DbAddInference(accountMongoRepository)
  return new InferenceController(dbAddAccount)
}