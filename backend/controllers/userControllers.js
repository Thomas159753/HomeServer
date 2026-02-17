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

      return res.status(201).json({
        success: true,
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
      return res.status(401).json({
        success: false,
        error: 'Authentication failed',
        message: info.message
      });
    }
    // user sanitized at deserializeUser so its safe
    req.logIn(user, (error) => {
      if(error) return next(error);

      return res.status(200).json({
        success: true,
        message: "Success log in",
        user
      });
    });
  })(req, res, next);
}

export async function getUser (req, res, next) {
  //Default is 200
  return res.status(200).json({
    success: true,
    message: 'User found',
    user: req.user
  })
}

export async function patchUser (req, res, next) {
  const { email, name } = req.body;

  try {
    const updated = await prisma.user.update({
      where: {id: req.user.id},
      data: { email, name },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Profile updated',
      user: updated
    });

  } catch(error) {
    console.error(error);
    next(error);
  }
}

export async function passwordPatch (req, res, next) {
  const { oldPassword, newPassword } = req.body;

  try {
    // Make sure there is a user
    if(!req.user?.email || !req.user?.id){
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
    }
    // Find the user and get the old password
    const unsafeUser = await prisma.user.findUnique({
      where: {id: req.user.id},
      select: { id: true, passwordHash: true },
    })

    if(!unsafeUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    // Compare passwords
    const isValid = await bcrypt.compare(oldPassword, unsafeUser.passwordHash);
    
    if(!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Old password is incorrect'
      });
    }
    // Dont use same password bro...
    const samePassAsOld = await bcrypt.compare(newPassword, unsafeUser.passwordHash);
    if(samePassAsOld) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from old password"
      });
    }

    // Hash new password
    const newHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { passwordHash: newHash },
    });

    return res.status(200).json({
      success: true,
      message: 'Password updated'
    })
  }catch(error) {
    console.error(error);
    next(error);
  }
}