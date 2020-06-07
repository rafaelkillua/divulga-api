const cloudinary = require('cloudinary')
cloudinary.config(process.env.CLOUDINARY_URL || '')

const options = {
  folder: 'divulga',
  resource_type: 'image',
  maxTimeToBuffer: 4500,
  eager: [
    { height: 400 }
  ]
}

module.exports = {
  upload (file) {
    const base64 = `data:${file.mimetype};base64,` + file.buffer.toString('base64')
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(base64, options, (err, data) => {
        if (err)  {
          return reject(err)
        }
        return resolve(data)
      })
    })
  },

  destroy (public_id) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(public_id, result => {
        resolve(result)
      })
    })
  }
}
