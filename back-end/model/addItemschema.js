import mongoose from "mongoose";
// Define a schema for products
export const item = new mongoose.Schema({
   
    items:{type:String, required:true},
    amount:{type:Number,required:true},
  


});

// Create a model
export const itemModel =mongoose.model('itemModel', item);
