const Express = require("express");
const router = Express.Router();
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator'); // To validate the user input ne
const { getByTitle } = require("@testing-library/react");

// Pro Tip - Be carefull of not forgetting async and await. 

// Route 1
// Endpoint to fetch all the notes created by a user
router.get("/fetchnotes", fetchuser, async(req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})


// Route 2
// Endpoint to create a note
router.post("/createnote", fetchuser, [
        body("title", "Title should be of length > 3").isLength({ min: 3 }),
        body("description", "Description length should be > 5").isLength({ min: 3 })
    ],
    async(req, res) => {
        // Validate the request?
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Get title, dexcription, tag from the request boady and create a new Note object
            const { title, description, tag } = req.body;
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id
            })

            // That's how you save a note
            const savedNote = await note.save()
            res.json(savedNote)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occurred. Now your fault though")
        }
    })

// Route 3
// Endpoint to create a note (router.put)
router.put("/updatenote/:id", fetchuser, async(req, res) => {
    try {
        // Let's see if the note actually exists
        let note = await Notes.findById(req.params.id)
            // Send 404 if note doesn't exists
        if (!note) {
            return res.status(404).send("Note not found")
        }
        // Is the one trying to update his note actually the owner of the note? Let's see
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized")
        }

        // All good Let's move on with the new updated data
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // This is how you update a model object
        note = await Notes.findByIdAndUpdate(req.params.id, newNote, { new: true })
        res.send(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Error")
    }
})


// Route 4
// Endpoint to delete a note (router.delete)
router.delete("/deletenote/:id", fetchuser, async(req, res) => {
    try {
        // Check if the note exists
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Note not found")
        }

        // Check if the note belongs to the same user who is trying to delete it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized")
        }

        // Run function to delete the note
        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({ "Success": "The Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Error")
    }
})

module.exports = router