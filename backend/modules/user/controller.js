const schema = require('./schema');

const getAll = async (req, res) => {
    const data = await schema.find({});
    res.send({
        status: 200,
        message: 'Data retrieved',
        data: data
    });
}


const getById = async (req, res) => {
    const data = await schema.findById(req.params.id);
    if (data) {
        res.send({
            status: 200,
            message: 'Data retrieved',
            data: data
        });
    } else {
        res.send({
            status: 404,
            message: 'Data could not be found',
            data: data
        });
    }
}


const create = async (req, res) => {
    try {
        const { username, email, contact } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({
                status: 400,
                message: 'Username already exists'
            });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({
                status: 400,
                message: 'Email already exists'
            });
        }

        const existingContact = await User.findOne({ contact });
        if (existingContact) {
            return res.status(400).send({
                status: 400,
                message: 'Contact number already exists'
            });
        }

        const data = await User.create({
          ...req.body
        });

        res.status(201).send({
            status: 201,
            message: 'Data created',
            data: data
        });
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: 'Action could not be completed',
            data: e
        });
    }
};



const update = async (req, res) => {
    try {
        await schema.findByIdAndUpdate(req.params.id, {
            ...req.body
        });
        res.send({
            status: 200,
            message: 'Data updated'
        })
    } catch (e) {
        res.status(400).send({
            status: 400,
            message: 'Action could not be completed',
            data: e
        })
    }
}

const remove = async (req, res) => {
    try {
        await schema.findByIdAndDelete(req.params.id);
        res.send({
            status: 200,
            message: 'Data deleted'
        })
    } catch (e) {
        res.status(400).send({
            status: 400,
            message: 'Action could not be completed',
            data: e
        })
    }
}



module.exports = {
    getAll,
    create,
    update,
    remove,
    getById,
}