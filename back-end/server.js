import   express from 'express';
import mongoose from 'mongoose';
import item from './router/item.js';


// Connect to MongoDB
mongoose.connect('mongodb+srv://mobeensarfrazahmad:YMeLluYFJYhA7RH9@cluster0.yku5r.mongodb.net/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));
    const port= process.env.PORT || 3000;


const app= express();
//body prases middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/api/item',item);

app.listen(port, () => console.log(`server running on port ${port}`));