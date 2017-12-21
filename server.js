// DEPENDENCIES
const express    = require('express');
const session    = require('express-session');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const cors 			 = require('cors');
const app        = express();
//const session    = require('express-session');
require('pretty-error').start();

// CONFIG
const PORT       = process.env.PORT || 3000;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/travel_tracker'

// Connect to Mongo
mongoose.connect ( mongoURI , { useMongoClient: true});
const db = mongoose.connection;
db.on( 'error', ( err ) => console.log( err.message + ' is Mongod not running?' ));
db.on( 'connected', () => console.log( 'Mongo OK: ', mongoURI ));
db.on( 'disconnected', () => console.log( 'Mongo Disconnected' ));
mongoose.Promise = global.Promise;

// open the connection to mongo
// db.on( 'open' , ()=>{});

// Controllers
const placeController = require( './controllers/placeController' );
const userController = require( './controllers/userController' );
const sessionController = require( './controllers/sessionController' );
const quoteController = require( './controllers/quoteController' );

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static( 'public' ));
app.use(morgan('dev'));
app.use(cors());
app.use(session({
	 secret: "kickass",
	 resave: false,
	 saveUninitialized: false
}));
app.use('/places', placeController );
app.use('/users', userController );
app.use('/sessions', sessionController);
app.use('/quote', quoteController);

//app.get('/', (req, res) => res.send('Welcome to Travel_Tracker'));
app.get('/:whatever', (req, res) => res.redirect('/'))

app.listen(PORT, () => {
   console.log('Server OK: ' + PORT);
});
