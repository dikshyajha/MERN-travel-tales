const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../user/schema'); // path to user schema file

mongoose.connect('mongodb+srv://admin:admin@cluster0.pgvxv3c.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });


const createAdmin = async () => {
    const adminData = {
        name: 'Admin1',
        contact: '1111111111',
        gender: 'female',
        email: 'admin1@gmail.com',
        username: 'admin1',
        password: await bcrypt.hash('admin1', 10),
        role: 'admin',
    };

    try {
        const existingAdmin = await User.findOne({ 
            $or: [{ email: adminData.email }, { contact: adminData.contact }] 
          });
  
          if (existingAdmin) {
              console.log('Admin user already exists');
          } else {
        const admin = new User(adminData);
        await admin.save();
        console.log('Admin user created');
    }
 } catch (err) {
        console.error('Error creating admin user:', err.message);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
