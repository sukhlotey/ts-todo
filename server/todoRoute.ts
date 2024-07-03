import express, { Request, Response } from 'express';
import Todo, { ITodo } from './todo';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/:id/timer', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { timer } = req.body;


  try {
    const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;
    if (!objectId) {
      return res.status(404).send('Invalid Todo ID');
    }

    const todo = await Todo.findByIdAndUpdate(
      objectId,
      { timer },
      { new: true }
    );

    if (!todo) {
      return res.status(404).send('Todo not found');
    }

    res.status(200).send(todo);
  } catch (error) {
    console.error('Error updating timer:', error);
    res.status(500).send('Error updating timer');
  }
});

export default router;
