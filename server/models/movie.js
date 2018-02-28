const { mongoose } = require('../db/mongoose');

var Movie = mongoose.model('Movie', {
    url: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    uploadedAt: {
      type: Number,
      default: null
    }
  });
  
module.exports = { Movie };
