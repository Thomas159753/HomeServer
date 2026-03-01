import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/userRoutes.js';
import measurementRouter from './routes/measurementRoutes.js';
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './prisma/lib/prisma.js';
import passport from './strategies/local.js';
import cors from "cors";

const PORT = process.env.PORT || 6833;
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
};

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

app.use(cors(corsOptions));
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
app.use("/stats", measurementRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}: http://localhost:${PORT}`))