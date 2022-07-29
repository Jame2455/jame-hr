import dbConnect from '../../../lib/dbConnect'
import Addnewtask from '../../../models/Addnewtask'

export default async function handler (req, res) {
    const { method } = req
  
    await dbConnect()
  
    switch (method) {
      case 'GET':
        try {
          const formsTask = await Addnewtask.find({})
          res.status(200).json({ success: true, data: formsTask })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      case 'POST':
        try {
          const formsTask = await Addnewtask.create(req.body)
          res.status(201).json({ success: true, data: formsTask })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
    }
  }