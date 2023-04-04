import { Router } from 'express';
import User from '../models/User.js';
import { decrypt, encrypt } from '../../src/lib/encryption.js';

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const userData = decrypt(req.body.user);
    console.log(11, userData)
    const isEmail = await User.findOne({ email: userData.email }, { _id: true });
    if (isEmail) {
      return res.status(400).json({ message: 'User with this email is registered' });
    }
    const isUsername = await User.findOne({ username: userData.username }, { _id: true });
    if (isUsername) {
      return res.status(400).json({ message: 'User with this username is registered' });
    }
    userData.token = encrypt(userData.email);
    console.log(22, userData)
    const user = new User(userData);
    await user.save();
    console.log(33, user)
    res.json({token: userData.token});
  } catch {
    res.status(500);
  }
});

router.post('/auth', async (req, res) => {
  try {
    const user = decrypt(req.body.data);
    res.json(await User.findOne(user, { password: false, _id: false }));
  } catch {
    res.status(400);
  }
});

router.get('/user/:token', async (req, res) => {
  // res.set('Content-Type', 'text/plain')
  try {
    const email = decrypt(req.params.token);
    res.json(await User.findOne({ email }, { password: false, _id: false }));
  } catch {
    res.status(400);
  }
});

router.put('/user/:token', async (req, res) => {
  try {
    const email = decrypt(req.params.token);
    const user = decrypt(req.body.data);
    await User.updateOne({ email }, user);
    res.json({ state: 'updated' });
  } catch {
    res.status(400);
  }
});

router.delete('/user/:token', async (req, res) => {
  try {
    const email = decrypt(req.params.token);
    await User.findOneAndRemove({ email });
    res.json({ state: 'deleted' });
  } catch {
    res.status(400);
  }
});

export default router;
