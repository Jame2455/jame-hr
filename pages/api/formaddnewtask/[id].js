import dbConnect from '../../../lib/dbConnect'
import Addnewtask from '../../../models/Addnewtask'




export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const formsTask = await Addnewtask.findById(req.query.id)
                res.status(200).json({ success: true, data: formsTask })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT':
            try {
                const formsTask = await Addnewtask.findByIdAndUpdate(req.query.id, req.body, { upsert: true });
                res.status(200).json({ success: true, data: formsTask })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const formsTask = await Addnewtask.deleteOne({_id:req.query.id});
                res.status(200).json({ success: true, data: formsTask })
                
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
