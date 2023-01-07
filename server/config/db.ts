import { connect, set } from 'mongoose';
import config from 'config';

const db: string = config.get('mongoURI');

const connectDB = async () => {
    try {
        console.log('mongoose connection started');

        set('strictQuery', false);
        await connect(db);

        console.log('mongoose connection established');
    } catch (error: any) {
        console.log(error.message);
        // exit process with failure
        process.exit(1);
    }
};

export default connectDB;
