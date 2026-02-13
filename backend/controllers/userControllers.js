import passport from 'passport';
import { prisma } from '../prisma/lib/prisma.js';
import bcrypt from 'bcryptjs'

export async function postRegister (req, res, next) {
  const { email, name, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    // sanitize user before we sent it to browser
    const newSafeUser = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    req.logIn(newSafeUser, (error) => {
      if (error) return next(error);
      // Sinse we register beter sent 201
      return res.status(201).json({
        message: "Success register",
        user: newSafeUser
      });
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export async function postLogIn (req, res, next) {
  passport.authenticate('local', (error, user, info) => {
    if(error) return next(error);
    if(!user) {
      console.error('Authentication failed:', info.message);
      return res.status(401).json({error: 'Authentication failed', message: info.message});
    }
    // user sanitized at deserializeUser so its safe
    req.logIn(user, (error) => {
      if(error) return next(error);
      // Default is 200 since its a login
      return res.json({
        message: "Success log in",
        user
      });
    });
  })(req, res, next);
}

export async function getUser (req, res, next) {
  //Default is 200
  return res.json({
    user: req.user
  })
}