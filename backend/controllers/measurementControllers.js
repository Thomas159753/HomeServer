import { prisma } from '../prisma/lib/prisma.js';

export async function createMeasurement (req, res, next) {
    try {
        if(!req.user?.id) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }
         
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
    
        const log = await prisma.measurementLog.create({
            data: {
                userId: req.user.id,
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
        if(!req.user?.id) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }

        const logs = prisma.measurementLog.findMany({
            where: req.user.id,
            orderby: { recordedAt: "desc" },
            take: 100,
        })


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