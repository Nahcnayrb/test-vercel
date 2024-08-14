import express from 'express';
import { connectToDatabase } from '../services/database.service';

const router = express.Router();

type EmojiResponse = string[];

router.get<{}, EmojiResponse>('/', (req, res) => {
  connectToDatabase().then(()=>{
    res.json(['😀', '😳', '🙄']);
  })
  .catch((error: Error) => {
    if (error instanceof Error) {
      res.status(400).send([error.message]);
    }
});
});

export default router;
