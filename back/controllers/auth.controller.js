// controllers/auth.controller.js
// --- Импорты ---
const authService = require('../services/auth.service');

// Обрабатывает запрос на регистрацию нового пользователя.
const register = async (req, res, next) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Для входа требуются логин и пароль.' });
    }

    try {
        const result = await authService.registerUser(login, password);
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован.' });
    } catch (error) {
        if (error.message === 'Логин уже существует.') {
            return res.status(409).json({ message: error.message }); // Conflict
        }
        console.error("Ошибка регистрации:", error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

// Обрабатывает запрос на аутентификацию пользователя.
const login = async (req, res, next) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Для входа требуются логин и пароль.' });
    }

    try {
        const result = await authService.loginUser(login, password);
        if (!result) {
            return res.status(401).json({ message: 'Неверные данные для входа, либо пользователь заблокирован.' });
        }
        res.json({ token: result.token });
    } catch (error) {
        console.error("Ошибка входа:", error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
    }
};

// --- Экспорт ---
module.exports = {
    register,
    login,
};