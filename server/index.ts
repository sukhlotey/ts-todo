import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoute from './todoRoute'; 

const PORT = 5000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      'mongodb+srv://sukhmeet:todotimer@cluster0.zrjurkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

connectDB();

app.use('/api/todos', todoRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
