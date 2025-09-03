const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');
const { registerSchema, loginSchema } = require('../utils/usuarioValidation');
const { createUser, findByEmail, removeUser } = require('../repositories/usuariosRepository');

const SECRET = process.env.JWT_SECRET || "secret";

async function login(req, res, next) {
    try {
        const parsed = loginSchema.parse(req.body);

        let user;
        if (parsed.email) user = await findByEmail(parsed.email);
        if (!user) throw new AppError(401, 'Credenciais inválidas.');
        
        const ok = await bcrypt.compare(parsed.senha, user.senha);
        if (!ok) throw new AppError(401, 'Credenciais inválidas.');

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.nome,
                email: user.email
            },
            SECRET, { expiresIn: "1d" }
        );

        return res.status(200).json({status: 200, message: 'Login realizado com sucesso', access_token: token});

    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        if (err instanceof z.ZodError) {
            return next(new AppError(400, err.issues.map((e) => e.message).join(', ')));
        }
        return next(new AppError(500, 'Erro ao realizar login.'));
    }
}

async function register(req, res, next) {
    try {
        const parsed = registerSchema.parse(req.body);
        
        const emailExists = await findByEmail(parsed.email);
        if (emailExists){
            throw new AppError(400, 'E-mail já cadastrado.');
        }

        const hashed = await bcrypt.hash(parsed.senha, 10);

        const newUser = {
            nome: parsed.nome,
            email: parsed.email,
            senha: hashed,
        };

        const created = await createUser(newUser);
        return res.status(201).json({status: 201, message: 'Usuário registrado com sucesso', user: created});
    
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        if (err instanceof z.ZodError) {
            return next(new AppError(400, err.issues.map((e) => e.message).join(', ') || 'Erro de validação.'));
        }
        return next(new AppError(500, 'Erro ao registrar usuário.'));
    }
}

async function deleteUser(req, res, next) {
    const { id } = req.params;
    try {
        const deleted = await removeUser(id);
        if (!deleted) return next(new AppError(404, 'Usuário não encontrado.'));
        
        res.status(204).send();
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        return next(new AppError(500, 'Erro ao deletar usuário.'));
    }
}

async function logout(req, res, next) {
    try {
        res.user = null;
        res.clearCookie('access_token', { path: '/' });
        res.clearCookie("refresh_token", { path: '/' });
        res.status(200).json({ status: 200, message: 'Logout realizado com sucesso, apague o token localmente' });
    } catch (err) {
        return next(new AppError(500, 'Erro ao realizar logout.'));
    }
}

//user information
async function userInformation(req, res, next) {
    try {
        const email = req.user.email;
        const user = await findByEmail(email);
        delete user.senha;

        if (!user) throw new AppError(404, 'Usuário não encontrado.');
        res.status(200).json({ status: 200, user });
    } catch (err) {
        return next(new AppError(500, 'Erro ao obter informações do usuário.'));
    }
}

module.exports = {
    login,
    logout,
    register,
    deleteUser,
    userInformation
};