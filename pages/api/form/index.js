// api/menus.js

import dbConnect from '../../../lib/dbConnect'
import Addform from '../../../models/Addform'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const forms = await Addform.find({})
        res.status(200).json({ success: true, data: forms })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const forms = await Addform.create(req.body)
        res.status(201).json({ success: true, data: forms })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}