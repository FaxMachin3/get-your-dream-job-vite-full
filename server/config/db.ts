import { connect, set } from 'mongoose';
import { config } from 'dotenv';

// loading env variables
config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log('mongoose connection started');

    set('strictQuery', 'throw');
    await connect(db as string);

    console.log('mongoose connection established');
  } catch (error: any) {
    console.log(error.message);
    // exit process with failure
    process.exit(1);
  }
};

export default connectDB;
