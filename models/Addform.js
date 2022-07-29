
import mongoose from 'mongoose'

const AddFormSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    img: String
})
module.exports = mongoose.models.AddForm || mongoose.model('AddForm', AddFormSchema)