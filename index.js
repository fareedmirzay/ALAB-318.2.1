import express from 'express'
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
const app = express();
const Port = 4006



// in order to handle __dirname, i need to define these here
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




//this will log request with morgan
app.use(morgan('dev')); 


//setting the views engine to ejs and views directory
app.set('view engine', 'ejs');
app.set('views', './views');


//========================middleware========================
// setting middleware to parse URL-encoded form date
app.use(express.urlencoded({ extended: true}));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));




app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})



// =========================routes================================
app.get('/', (req, res) => {
    res.render('index'); 
  });
  
app.get('/about', (req, res) => {
    res.render('about');
  });
  
  // Route to handle form submission
app.post('/subscribe', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send('Name and Email are required!');
    }
    console.log(`New Subscription: Name: ${name}, Email: ${email}`);

    // Sending a response back
    res.send(`Thank you, ${name}, for subscribing to our newsletter!`);
});
  // =========== route with a parameter===========
// app.get('/greet/:name', (req, res) => {
//     res.send(`Hello, ${req.params.name}!`);
//   });
  
//========== route to download images=========
app.get('/download', (req, res) => {
    const file = path.join(__dirname, 'public', 'image.jpg');
    res.download(file, 'image.jpg', (err) => {
      if (err) {
        console.log('Error downloading file:', err);
      }
    });
  });



app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
    
})
