require('dotenv').config();
const app = require('./app');
const loginRouter = require('./routes/loginRoutes');
const userRouter = require('./routes/userRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => console.log('ouvindo porta', port));
