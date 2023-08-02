const router = require("express").Router();
const Note = require("../models/Note");
const { success, error, validation } = require("../utils/response");

// Create a note in category
router.post("/", async (req, res) => {
  try {
    const note = await new Note(
      {
        title: req.body.title,
        context: req.body.context,
      }
    );
    savedNote = await note.save();
    return res.status(200).json(success(res.statusCode, `Note created successfully.`, savedNote));
  } catch (err) {
    return res.status(500).json(error(res.statusCode, err.message));
  }
});

// Read all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json(success(res.statusCode, `All notes retrieved succesfully.`, notes));
  } catch (err) {
    return res.status(500).json(error(res.statusCode, err.message));
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const selectedNote = await Note.findById(req.params.id);
      if (selectedNote) {
        const updatedNote = await Note.findOneAndUpdate(
          { _id: selectedNote.id },
          {
            $set: {
              title: req.body.title,
              context: req.body.context,
            },
          },
          { runValidators: true }
        );
        return res.status(200).json(success(res.statusCode, `${req.params.id} is updated.`, updatedNote));
      } else {
        return res.status(400).json(validation(res.statusCode, `Given id is not found.`));
      }
    } else {
      return res.status(400).json(validation(res.statusCode, `Please provide a valid id.`));
    }
  } catch (err) {
    return res.status(500).json(error(res.statusCode, err.message));
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findOneAndRemove({_id: req.params.id});
    return res.status(200).json(success(res.statusCode, `${req.params.id} is deleted.`));
  } catch (err) {
    return res.status(500).json(error(res.statusCode, err.message));
  }
});

module.exports = router;