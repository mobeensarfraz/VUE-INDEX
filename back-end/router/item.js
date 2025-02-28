import express from 'express';
import { createitem, deleteitem, getitem } from '../controller/additems.js';
const router= express.Router();

//create router
router.post('/',createitem);
//get item
router.get('/',getitem);
//delete item
router.delete('/:items',deleteitem);
export default router;