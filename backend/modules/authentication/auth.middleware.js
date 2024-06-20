const jwt = require('jsonwebtoken');
const schema = require('../user/schema');

const verifyUser =async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) 
        {
            console.log('no token provided');
            return res.status(401).json({ error: 'Access denied' });

        }

    try {
        const bearerToken = token.split(' ')[1];
        const decoded = jwt.verify(bearerToken, 'MERN_PROJECT');
        console.log('Token decoded:', decoded);

        const user = await schema.findById(decoded.id);
        console.log('User:', user);

        if(user){
            req.user = user;
            next();
        }else{
            console.log('User not found');
            return res.status(401).json({ error: 'Access denied. User not found' })
        }

    } catch (error) {
        console.log('Invalid token:', error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};


const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        console.log('Not an admin:', req.user.role);
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};
module.exports = { verifyUser, verifyAdmin };