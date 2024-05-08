import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import config from '../config'
import fs from 'fs'

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
})

export const sendImageToCloudinary = (path: string, imageName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result)
          // delete a file asynchronously
          fs.unlink(path, (err) => {
            if (err) {
              console.error(err)
            } else {
              console.log('File is deleted.')
            }
          })
        }
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
