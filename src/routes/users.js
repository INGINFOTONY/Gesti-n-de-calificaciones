const express = require('express');
const { route } = require('.');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res)=>{
    res.render('users/signin');
});


router.post('/users/signin', passport.authenticate('local', {
        successRedirect: '/calificaciones',
        failureRedirect: '/users/signin',
        failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res)=>{
        const {usuario, email, password, confirm_password} = req.body;
        const errors = [];
        if(usuario.length <= 0){
            errors.push({text: 'Porfavor inserte el nombre de usuario'});
        }
        if(email.length <= 0){
            errors.push({text: 'Porfavor inserte el correo electronico'});
        } if(password.length <= 0){
            errors.push({text: 'Porfavor inserte su contraseña'});
        }
        if(password != confirm_password){
            errors.push({text: 'Las constraseñas no coinciden'});
        }
        if(password.length < 4){
            errors.push({text: 'La contraseña debe tener 4 o mas caracteres'});
        }
        if(errors.length >0){
            res.render('users/signup', {errors, usuario, email, password, confirm_password});
            return;
        } else {
            //validar correo
            const emailUser = await User.findOne({email: email});
            if(emailUser){
                req.flash('success_msg', 'Ingresa otro correo, este ya esta siendo utilizado por otro usuario');
                res.redirect('/users/signup');
                return;
            }
            const newUser = new User({usuario, email, password});
            newUser.password = await newUser.encryptPassword(password);

            await newUser.save();
            req.flash('success_msg', 'Usuario registrado');
            res.redirect('/users/signin');
        }
        
});

router.get('/users/salir', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        res.status(500).send("Error interno");
      } else {
        res.redirect('/');
      }
    });
  });
  
module.exports = router;