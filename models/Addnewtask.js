
import mongoose from 'mongoose'

const AddFormSchema = new mongoose.Schema({
    
    taskname: String
})
module.exports = mongoose.models.AddNewTask || mongoose.model('AddNewTask', AddFormSchema)