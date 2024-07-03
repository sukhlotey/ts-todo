import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  todo: string;
  isDone: boolean;
  timer: number;
}

const todoSchema: Schema = new mongoose.Schema({
  todo: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  timer: { type: Number, required: true },
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);
export default Todo;
