import { itemModel } from "../model/addItemschema.js";

//create product
export const createitem = async (req, res) => {
    try {
      console.log("Received request body:", req.body);
  
      if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
      }
  
      const { items, amount } = req.body;
      if (!items || !amount) {
        return res.status(400).json({ error: "Items and amount are required" });
      }
  
      const item = new itemModel({
        items,
        amount,
      });
  
      const savedItem = await item.save();
      
      console.log("Item Created:", savedItem);
      res.status(201).json(savedItem);
    } catch (err) {
      console.error("Error creating item:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

//get all the product
export const getitem = async (req, res) => {
    try {
      const item = await itemModel.find();
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //delete product
  export const deleteitem = async (req, res) => {
    try {
      const { items } = req.params; 
  
      const deleteditem = await itemModel.findOneAndDelete({ items });
  
      if (!deleteditem) {
        return res.status(404).json({ message: "item not found" });
      }
  
      res.status(200).json({ message: "item deleted successfully", item: deleteditem});
    } catch (err) {
      console.error("Error deleting item:", err.message);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };