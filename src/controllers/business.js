module.exports = {
  create: (req, res) => {
    return res.status(200).json(req.body)
  },
}