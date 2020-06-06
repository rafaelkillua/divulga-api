exports.getMongooseErrors = error => {
  return error.errors ? Object.entries(error.errors).map(([key, value]) => ({
    name: key,
    message: value.properties.message
  })) : null
}