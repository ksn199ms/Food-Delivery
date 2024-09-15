import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({success: false, message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = createToken(user._id);
        res.status(200).json({success: true, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// register user
const registerUser = async (req, res) => {
    // checking if user already exist
    const { name, email, password } = req.body;
    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({success: false, message: "User already exist"});
        }

        //  validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }

        if(!validator.isStrongPassword(password)) {
            return res.json({success: false, message: "Please enter a strong password"});
        }


        // encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id)
        res.status(200).json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "error"});
    }
}


export { loginUser, registerUser }