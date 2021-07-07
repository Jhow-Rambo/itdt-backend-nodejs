import { Router } from 'express'
import { makeGetInferenceController, makeInferenceController } from '../factories/inference'
import { adaptRoute } from '../adapters/express-route-adapter'
import multer from 'multer'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'

function addImageToS3Database (): any {
  aws.config.update({
    secretAccessKey: 'reYaUEY4ZVsJRd82AXDYM0qalRsGzVvjOMy9xzYc',
    accessKeyId: 'AKIAQAW6SYU6Y6SACPLQ',
    region: 'us-east-2'
  })
  const s3 = new aws.S3()
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'itdi-inference',
      key: function (req, file, cb) {
        cb(null, file.originalname) // use Date.now() for unique file keys
      }
    })
  })
  return upload.any()
}

export default (router: Router): void => {
  router.post('/inference', addImageToS3Database(), adaptRoute(makeInferenceController()))
  router.get('/inference', adaptRoute(makeGetInferenceController()))
}