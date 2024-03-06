const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const userController = {
    allUsers: asyncHandler(async (req, res) => {
        const keyword = req.query.search
            ? {
                $or: [
                    { name: { $regex: req.query.search, $options: "i" } },
                    { email: { $regex: req.query.search, $options: "i" } },
                ],
            }
            : {};

        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        res.send(users);
    }),


    register: asyncHandler(async (req, res) => {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please Enter all the Feilds");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }


        let newPic = pic; 
            if(!pic) newPic=`https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

        const user = await User.create({
            name,
            email,
            password,
            pic: newPic,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: user.getJwtToken(),
            });
        } else {
            res.status(400);
            throw new Error("User not found");
        }
    }),


    Login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: user.getJwtToken(),
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    }),
};

module.exports = userController;