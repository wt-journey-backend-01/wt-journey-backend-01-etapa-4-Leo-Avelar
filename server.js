require('dotenv').config();

const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

const setupSwagger = require('./docs/swagger');
const { errorHandler } = require('./utils/errorHandler');

const authMiddleware = require('./middlewares/authMiddleware');
const agentesRouter = require("./routes/agentesRoutes");
const casosRouter = require("./routes/casosRoutes");
const authRouter = require("./routes/authRoutes");

app.use(express.json());
app.use('/agentes', authMiddleware, agentesRouter);
app.use('/casos', authMiddleware, casosRouter);
app.use(authRouter);

setupSwagger(app);
app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ status: 404, message: 'Rota não encontrada. Verifique as rotas disponiveis em /docs' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});