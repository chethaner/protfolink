const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
    };

    console.log('Testing Authentication...');
    console.log('Target URL:', API_URL);

    try {
        // 1. Register
        console.log('\n1. Attempting Registration...');
        const regResponse = await axios.post(`${API_URL}/register`, testUser);
        console.log('✅ Registration Successful!');
        console.log('User ID:', regResponse.data._id);
        console.log('Token received:', !!regResponse.data.token);

        // 2. Login
        console.log('\n2. Attempting Login...');
        const loginResponse = await axios.post(`${API_URL}/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login Successful!');
        console.log('User:', loginResponse.data.name);
        console.log('Token received:', !!loginResponse.data.token);

    } catch (error) {
        console.error('\n❌ Auth Test Failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received (Server down?)');
        } else {
            console.error('Error:', error.message);
        }
    }
}

testAuth();
