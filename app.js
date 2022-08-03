import dotenv from 'dotenv';
dotenv.config();
import express, { application } from "express";
const app = express();
import cors from 'cors';
require("")

function initialize() {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use('/api', routes);

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening on port: ${process.env.PORT || 3000}`);
    });

    return app;
}

export {
    initialize
}