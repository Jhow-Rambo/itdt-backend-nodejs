import { AddInferenceRepository } from '../../../../data/protocols/add-inference-repository'
import { InferenceModel } from '../../../../domain/models/inference'
import { AddInferenceModel } from '../../../../domain/usecases/add-inference'
import { MongoHelper } from '../helpers/mongo-helper'

export class InferenceMongoRepository implements AddInferenceRepository {
  async add (inferrenceData: AddInferenceModel): Promise<InferenceModel> {
    const inferenceCollection = await MongoHelper.getCollection('inferences')
    const result = await inferenceCollection.insertOne(inferrenceData)

    const inferences = await MongoHelper.getCollection('inferences')
    await inferences.find({}).toArray(function (err, result) {
      if (err) throw err
      console.log(result)
    })

    return MongoHelper.map(result.ops[0])
  }
}