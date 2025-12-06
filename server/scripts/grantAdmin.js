// Script to grant admin access to a user
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolink';
const USER_EMAIL = 'chethaner1@gmail.com';

async function grantAdminAccess() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Update user to admin
        const result = await mongoose.connection.db.collection('users').updateOne(
            { email: USER_EMAIL },
            { $set: { isAdmin: true, role: 'admin' } }
        );

        if (result.matchedCount === 0) {
            console.log(`❌ User with email ${USER_EMAIL} not found`);
        } else if (result.modifiedCount > 0) {
            console.log(`✅ Successfully granted admin access to ${USER_EMAIL}`);
        } else {
            console.log(`ℹ️  User ${USER_EMAIL} already has admin access`);
        }

        // Verify the update
        const user = await mongoose.connection.db.collection('users').findOne({ email: USER_EMAIL });
        console.log('\nUser details:');
        console.log(`- Email: ${user.email}`);
        console.log(`- Name: ${user.name}`);
        console.log(`- isAdmin: ${user.isAdmin}`);
        console.log(`- role: ${user.role}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    }
}

grantAdminAccess();
