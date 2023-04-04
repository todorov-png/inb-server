import { Router } from 'express';
import Land from '../models/Land.js';
import { decrypt } from '../../src/lib/encryption.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json(await Land.find({}, { nameTask: true, _id: true }));
  } catch {
    res.status(400);
  }
});

router.get('/:task', async (req, res) => {
  try {
    const nameTask = decrypt(req.params.task);
    res.json(await Land.findOne({ nameTask }, {}));
  } catch {
    res.status(400);
  }
});

export default router;
