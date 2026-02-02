import Note from '../models/Note.js'

export const  getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
        console.log(notes);
    }
    catch(error) {
        console.log("Error occured in getAllNotes",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getNoteById = async(req,res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createNotes = async(req,res) => {
    try {
        const { title, content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log("Error occured in createNote",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateNotes = async(req,res) => {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content});
        if(!updatedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log("Error occured in updateNotes",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteNotes = async(req,res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({deletedNote});
    } catch (error) {
        console.log("Error occured in deleteNotes",error);
        res.status(500).json({message: "Internal server error"});
    }
}