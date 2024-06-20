const schema = require('../user/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SignIn = async (req, res) => {
    const { username, password } = req.body;

    const userExists = await schema.findOne({ username });
    if (userExists) {
        const passwordIsSame = await bcrypt.compare(password, userExists.password);
        if (passwordIsSame) {
            const encryptData = { id: userExists._id, role: userExists.role };
            const expiryOptions = { expiresIn: '30d' };
            const token = jwt.sign(encryptData, 'MERN_PROJECT', expiryOptions);
            delete userExists.password;
            res.send({
                message: 'User is authenticated',
                status: 200,
                data: {
                    user: userExists,
                    token
                }
            });
        } else {
            res.status(401).json({ message: 'Username or password is incorrect' });
        }
    } else {
        res.status(401).json({ message: 'User does not exist' });
    }
};

const SignUp = async (req, res) => {
    try {
        const { name, contact, gender, email, username, password, role } = req.body;
        if (!name || !contact || !gender || !email || !username || !password || !role) {
            return res.status(400).json({ message: 'Please fill all the boxes' });
        }
        // const validator = require('email-validator');

        // if (!validator.validate(email)) {
        //     return res.status(400).json({ status: 400, message: 'Invalid email format' });
        // }

        const emailExists = await schema.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const contactExists = await schema.findOne({ contact });
        if (contactExists) {
            return res.status(400).json({ message: 'Contact number already used' });
        }

        const usernameExists = await schema.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: 'Username not available' });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special symbol' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImage = req.file ? req.file.path : null;
        const userData = { name, contact, gender, email, username, password: hashedPassword, role, profileImage };
        const data = await schema.create(userData);
        res.send({
            status: 201,
            message: 'User created successfully',
            data:data
        });
    } catch (e) {
        console.error('SignUp error:', e);

        res.status(400).send({
            status: 400,
            message: 'Failed to create user',
            error: e
        });
    }
};
 
function isValidPassword(password) {
    if (password.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if (!/[a-z]/.test(password)) {
        return false;
    }

    if (!/[0-9]/.test(password)) {
        return false;
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-]/.test(password)) {
        return false;
    }

    return true;
}

module.exports = { SignIn, SignUp };
