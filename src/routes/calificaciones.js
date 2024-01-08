const express = require('express');
const router = express.Router();


const cal = require('../models/Calificacion');
const Calificacion = require('../models/Calificacion');
const Cali = require('../models/Calificacion');


const { isAuthenticated } = require('../helpers/auth');

router.get('/calificaciones/add', isAuthenticated, (req, res)=>{
    res.render('calificaciones/new-cal');
})

router.post('/calificaciones/new-cal', isAuthenticated,  async (req, res)=>{
    const {Calificacion, Materia, Description} = req.body
    const errors = [];
    if(!Calificacion){
        errors.push({text: 'Escribe la calificacion'});
    }
    if (!Materia){
        errors.push({text: 'Escriba la materia'})
    }
    if (!Description){
        errors.push({text: 'Escriba la descripcion'})
    }
    if(errors.length >0){
        res.render('calificaciones/new-cal',{
            errors,
            Calificacion,
            Materia,
            Description

        });
    } else {  
      const newCal =  new cal({Calificacion, Materia, Description});
      newCal.user = req.user.id;
      await newCal.save();
      req.flash('success_msg', 'Calificacion agregada');
      res.redirect('/calificaciones')
}
  
});
///buscar notas
router.get('/calificaciones', isAuthenticated, async (req , res)=>{
    const cal = await Calificacion.find({user: req.user.id}).lean().sort({date: 'desc'});
    res.render('calificaciones/all-calificaciones', { cal });
});

//editar
router.get('/calificaciones/edit/:id', isAuthenticated, async (req, res)=>{
    const cal = await Calificacion.findById(req.params.id).lean();
    res.render('calificaciones/edit-cal', {cal});
});


router.put('/calificaciones/edit-cal/:id', isAuthenticated, async (req, res)=>{
  const {Calificacion, Materia, Description} = req.body;
  await Cali.findByIdAndUpdate(req.params.id, {Calificacion, Materia, Description});
  req.flash('success_msg', 'Calificacion editata con exito');
  res.redirect('/calificaciones');
});

router.delete('/calificaciones/delete/:id', isAuthenticated, async (req, res)=>{
    await Cali.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Calificacion eliminada con exito');
    res.redirect('/calificaciones')
});

module.exports = router;