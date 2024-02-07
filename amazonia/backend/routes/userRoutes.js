const express = require('express')
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const generateToken = require('../utils.js')
const expressAsyncHandler = require('express-async-handler')

const userRouter = express.Router();



userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password

        // Buscar usuario por su correo electrónico en la base de datos
        const user = await User.findOne({ email });

        console.log(user)// Verificar si el usuario existe y si la contraseña es correcta
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                return; 
            }

        } else {
            // Si el usuario no existe o la contraseña es incorrecta, responder con un mensaje de error
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (err) {
        // Capturar cualquier error y responder con un mensaje de error genérico
        console.log(err); // Muestra el error en la consola para fines de depuración
        res.status(500).send({ message: 'An error occurred while processing your request' });
    }
}));



module.exports = userRouter;