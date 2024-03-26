require('dotenv').config();
const cors = require('cors');
import express from 'express';
import {Request, Response, NextFunction} from 'express';

const PORT = process.env.PORT || 5000;
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Default route
app.get("/", async(req: Request, res: Response) => {
    try {
        return res.status(200).send("Hello Dev");
    } catch (error) {
        console.log(error);
        return res.status(404).send("Internal server error")
    }
});

app.use(userRoutes);
app.use(authRoutes);
app.use(authorRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}/`)
});
