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

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({success: false,  message: "error" });
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.body.id);
        fs.unlinkSync(`uploads/${food.image}`);
        res.json({success: true, data: food, message : "Food item removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false,  message: "error" });
    }
}

export { addFood , listFood , removeFood}
