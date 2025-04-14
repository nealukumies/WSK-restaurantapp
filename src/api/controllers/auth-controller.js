import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {login} from '../models/user-model.js';

const authUser = async (req, res) => {
  const result = await login(req.body.username);
  if (!result) {
    return res.status(404).json({message: 'User not found'});
  }

  const passwordValid = bcrypt.compareSync(req.body.password, result.password);
  if (!passwordValid) {
    return res.sendStatus(401);
  }

  const userWithNoPassword = {
    user_id: result.user_id,
    name: result.name,
    username: result.username,
    email: result.email,
    role: result.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({user: userWithNoPassword});
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
};

export {authUser, getMe};
