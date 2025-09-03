const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return next(new AppError(401, 'Token não fornecido.'));
    }

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError(401, 'Token não fornecido.'));
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
        if (err) {
            return next(new AppError(401, 'Token inválido ou expirado.'));
        }
        req.user = user;
        next();
    });
}

module.exports = authMiddleware;