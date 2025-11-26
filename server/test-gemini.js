// Quick test script to verify Gemini API
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log('Testing Gemini API...');
        console.log('API Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent('Say hello in one word');
        const response = await result.response;
        const text = response.text();

        console.log('✅ SUCCESS! Gemini responded:', text);
        process.exit(0);
    } catch (error) {
        console.error('❌ ERROR:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

testGemini();
