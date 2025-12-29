import express from 'express';
import authRouter from './routes/authRouter';
import commentRouter from './routes/commentRouter';
import postRouter from './routes/postRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.send('Server working'));

app.use('/auth', authRouter);
app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(3000, () => console.log(`Server started`));
