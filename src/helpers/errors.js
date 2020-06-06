exports.getMongooseErrors = error => {
  return Object.entries(error.errors).map(([key, value]) => ({
    name: key,
    message: value.properties.message
  }))
}