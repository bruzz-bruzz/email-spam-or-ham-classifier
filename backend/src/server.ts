import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'

dotenv.config()
const app = express()

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
})

app.use(helmet())
app.use(cors({
    origin: process.env.ORIGIN
}))
app.use(express.json())
app.use(rateLimiter)

app.post('/predict',
    body('text').notEmpty().withMessage('Text is required').isString().withMessage('Text must be a string'),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const response = await axios.post(`${process.env.AI_URL}/predict`, {
                text: req.body.text
            })
            const data = response.data
            return res.status(200).json({ data: data.prediction, ok: true, msg: 'Success.' })
        } catch (e) {
            return res.status(500).json({ data: '', ok: false, msg: 'An error occured.' })
        }
    })
app.listen(8080)
