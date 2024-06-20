const schema = require('../user/schema');

const getAllUsers = async (req, res) => {
    try {
        const users = await schema.find({});
        res.send({
            status: 200,
            message: 'Data retrieved',
            data: users
        });
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: 'Error retrieving data',
            data: e
        });
    }
};

module.exports = { getAllUsers };
