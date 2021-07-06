import { AddInferenceRepository } from '../../../../data/protocols/add-inference-repository'
import { InferenceModel } from '../../../../domain/models/inference'
import { AddInferenceModel } from '../../../../domain/usecases/add-inference'
import { MongoHelper } from '../helpers/mongo-helper'

export class InferenceMongoRepository implements AddInferenceRepository {
  async add (inferrenceData: AddInferenceModel): Promise<InferenceModel> {
    const inferenceCollection = await MongoHelper.getCollection('inferences')
    const result = await inferenceCollection.insertOne(inferrenceData)
    return MongoHelper.map(result.ops[0])
  }
}

export class GetInferenceMongoRepository {
  async handle (): Promise<any> {
    const inferences = await MongoHelper.getCollection('inferences')
    const result = await inferences.find({}).toArray()
    return {
      statusCode: 200,
      body: result
    }
  }
}