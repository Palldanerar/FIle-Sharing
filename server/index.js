import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import { getImage, uploadImage } from './controllers/FIleController.js';
import upload from "./utils/upload.js"

dotenv.config();
const PORT = process.env.PORT || 8888;
const DB_CONNECT = process.env.db

const app = express()

mongoose.connect(DB_CONNECT)
    .then(() => {
        console.log("БАЗА ДАННЫХ ПОДКЛЮЧЕНА")
    })
    .catch((err) => {
        console.log(`БАЗА ДАННЫХ НЕ ПОДКЛЮЧЕНА. Ошибка: ${err}`)
    })

app.use(cors())
app.use(express.json());

app.get('/file/:fileId', getImage);
app.post('/upload', upload.single('file'), uploadImage);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})