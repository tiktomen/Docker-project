const mongoose = require('../db/mongo');

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
