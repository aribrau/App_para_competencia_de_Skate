import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';


const app = express();
const port = 2023;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})