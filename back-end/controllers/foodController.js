import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item 

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const Food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await Food.save();
        res.json({ success: true, message: "Food item added successfully" });
    } catch (error) {
        console.log(error);
        res.json({success: false,  message: "error" });
    }
}

export { addFood }
