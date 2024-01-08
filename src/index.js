const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const methodOverride = require('method-override');
const session = require('express-session');

const flash = require('connect-flash');

const passport = require('passport');

//inicialisaciones
const app = express();
require('./database');
require('./config/passport');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views') );
app.engine('.hbs', engine({
    defaultLayout: 'main',
       defaultDir: path.join('views', 'layouts'),
       partialsDir: path.join(__dirname,'views', 'partials'),
       extname: 'hbs',
       runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
   }

}));
    
app.set('view engine', 'hbs');


//midelware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//var glob


app.use((req, res, next)=>{

        res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
                res.locals.error = req.flash('error');
                res.locals.user = req.user || null;
                    next();
});

// ru tas
app.use(require('./routes/index'));
app.use(require('./routes/calificaciones'));
app.use(require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Servicio en el puerto', app.get('port'));
});

