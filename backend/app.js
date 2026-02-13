import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/userRoutes.js';
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from './prisma/lib/prisma.js'
import passport from './strategies/local.js';

const PORT = process.env.PORT || 6833;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new PrismaSessionStore(
        prisma,
        {
            dbRecordIdFunction: undefined,
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
        }
    ),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', userRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}: http://localhost:${PORT}`))