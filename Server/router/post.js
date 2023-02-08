const express = require('express');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');

const Post = require('../models/postSchema');

const router = express.Router();

cloudinary.config({
    cloud_name: 'ds6plmbhp',
    api_key: '898844141923526',
    api_secret: 'fkrdQ6OePtfBf2dM99daap_Rg_w'
});

router.post("/upload", async (req, res) => {
    console.log(req.body);
    const file = req.files.PostImage;
    console.log(file)

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        console.log(result);
        try {
            const posts = await Post.create({
                name: req.body.name,
                location: req.body.location,
                likes: req.body.likes,
                description: req.body.description,
                PostImage: result.url,
                date: req.body.date
            });
            res.json({
                status: "Sucess",
                posts
            })
        } catch (e) {
            res.status(500).json({
                status: "Failed",
                message: e.message
            })
        }
    })
})

router.get("/show", async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });
        res.status(200).json({
            posts
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });
        res.status(200).json({
            posts
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Success",
            message: "Post deleted successfully",
            post,
        });
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message,
        });
    }
});

router.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ error: 'Email is required' });
        }
        const token = generatePasswordResetToken();
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false,
            auth: {
                user: 'noreply@example.com',
                pass: 'secret',
            },
        });
        const mailOptions = {
            from: 'noreply@example.com',
            to: email,
            subject: 'Password Reset',
            text: `Follow this link to reset your password: http://localhost:3000/resetPassword?token=${token}`,
        };
        await transporter.sendMail(mailOptions);
        return res.status(200).send({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Something went wrong' });
    }
});

function generatePasswordResetToken() {
    return token;
}


module.exports = router;