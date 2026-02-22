import { prisma } from '../prisma/lib/prisma.js';

export async function createMeasurement (req, res, next) {
    try {
        const userId = req.user?.id;
        
        const {
            weight,
            waist,
            chest,
            leftArm,
            rightArm,
            leftLeg,
            rightLeg,
            note
        } = req.body;

        if(!userId) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }
         
        const log = await prisma.measurementLog.create({
            data: {
                userId,
                weight,
                waist,
                chest,
                leftArm,
                rightArm,
                leftLeg,
                rightLeg,
                note
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Measurement created',
            log
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
}

export async function listMeasurement (req, res, next) {
    try {
        const userId = req.user?.id;

        if(!userId) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }

        const logs = await prisma.measurementLog.findMany({
            where: { userId },
            orderBy: { recordedAt: "desc" },
            take: 100,
        });

        return res.status(200).json({
            success: true,
            message: 'Successful request',
            logs
        });

    } catch(error) {
        console.error(error);
        next(error);
    }
}

export async function getLatestLog (req, res, next) {
    try {
        const userId = req.user?.id;

        if(!userId) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }

        const log = await prisma.measurementLog.findFirst({
            where: { userId },
            orderBy: { recordedAt: "desc" },
        });

        return res.status(200).json({
            success: true,
            message: 'Successful request',
            log
        });
    } catch(error){
        console.log(error);
        next(error);
    }
}

export async function updateMeasurement (req, res, next) {
    try {
        const userId = req.user?.id;
        const id = Number(req.params.id);

        const {
            weight,
            waist,
            chest,
            leftArm,
            rightArm,
            leftLeg,
            rightLeg,
            note
        } = req.body;

        if(!userId) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }

        const logUpdate = await prisma.measurementLog.updateMany({
            where: { userId, id },
            data: {
                weight,
                waist,
                chest,
                leftArm,
                rightArm,
                leftLeg,
                rightLeg,
                note
            }
        });

        if (result.count === 0) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }

        return res.status(200).json({ success: true, message: "Log updated", logUpdate });
    } catch( error ) {
        console.error(error);
        next(error);
    } 
}

export async function deleteMeasurement (req, res, next) {
    try {
        const userId = req.user.id;
        const id = Number(req.params.id);
        
        if(!userId) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }

        const result = await prisma.measurementLog.deleteMany({
            where: { userId, id }
        });

        if (result.count === 0) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }

        return res.status(200).json({ success: true, message: "Log deleted" });
    } catch(error) {
        console.error(error);
        next(error);
    }
}