import express from 'express';
import connectDB from './config/db.js';
import path from 'path';

import auth from './routes/api/auth.js';
import user from './routes/api/user.js';

const app = express();
const PORT = process.env.PORT ?? 8080;

// connect database
connectDB();

// init middleware
app.use(express.json());

// routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);

// app.get('/', (req, res) => {
//     res.status(200).send({ message: 'hello' });
// });

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // set a static folder
    app.use(express.static('client/build'));

    // serve index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// listening
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});
