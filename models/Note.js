var mongoose = require('mongoose');

var noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [4, "Title should contain at least 4 characters."],
      maxLength: [128, "Title should contain at least 128 characters."],
      trim: true,
    },
    context: {
      type: String,
      required: true,
      // minLength: [32, "Context should contain at least 32 characters."],
      maxLength: [32768, "Context should contain at least 16384 characters."],
      trim: true,
    },
  },
  { timestamps: true }
  //{ collection: "posts" }
);

module.exports = mongoose.model('Note', noteSchema);