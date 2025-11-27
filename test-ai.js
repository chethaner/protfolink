// Test AI Service
const axios = require('axios');

async function testAI() {
    const testText = "I worked on React projects and improved performance";

    console.log('Testing AI Improve endpoint...\n');

    // Test each action
    const actions = ['improve', 'professional', 'shorten', 'expand', 'bullets'];

    for (const action of actions) {
        try {
            console.log(`\n=== Testing: ${action} ===`);
            const response = await axios.post('http://localhost:5000/api/ai/improve', {
                text: testText,
                action: action
            }, {
                withCredentials: true,
                timeout: 30000
            });

            console.log('✅ Success!');
            console.log('Response:', response.data.improvedText.substring(0, 200));
        } catch (error) {
            console.log('❌ Error:', error.message);
            if (error.response) {
                console.log('Status:', error.response.status);
                console.log('Data:', error.response.data);
            }
        }
    }
}

testAI();
