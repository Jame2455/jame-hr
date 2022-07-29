import dbConnect from '../../../lib/dbConnect'
import Addform from '../../../models/Addform'



export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const forms = await Addform.findById(req.query.id)
                res.status(200).json({ success: true, data: forms })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT':
            try {
                const forms = await Addform.findByIdAndUpdate(req.query.id, req.body, { upsert: true });
                res.status(200).json({ success: true, data: forms })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const form = await Addform.deleteOne({_id:req.query.id});
                res.status(200).json({ success: true, data: form })
                
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
