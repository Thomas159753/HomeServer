import passport from 'passport';
import { Strategy } from 'passport-local';
import { prisma } from '../prisma/lib/prisma.js';
import bcrypt from 'bcryptjs'

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        }, 
        async(email, password, done) => {
            try{
                // Make sure fields are populated
                if(!email || !password){
                    return done(null, false, {
                        message: 'Missing Credentials'
                    });
                }
                // Find user by email
                const user = await prisma.user.findUnique({
                    where: { email },
                });
                // Make sure there is a user
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect email or password'
                    });
                }
                // Compare passwords
                const isValid = await bcrypt.compare(password, user.passwordHash);
                // If bad password
                if (!isValid) {
                    return done(null, false, {
                        message: 'Incorrect email or password'
                    })
                }

                // Sanitize user
                const safeUser = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
                //Return sanitized user
                return done(null, safeUser);
            }catch(error) {
                return done(error);
            }
        })
)
//Passport session serialize/deserialize
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async(id, done) => {
    try {
        // sanitize user
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
        // sent safe user
        done(null, user);
    } catch(error) {
        done(error);
    }
})

export default passport