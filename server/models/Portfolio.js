const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a title for your portfolio'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    template: {
        type: String,
        required: true,
        default: 'modern-one-page' // Default template ID
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        unique: true,
        sparse: true // Allows null/undefined to not be unique
    },
    content: {
        personalInfo: {
            fullName: String,
            email: String,
            phone: String,
            location: String,
            linkedin: String,
            github: String,
            website: String,
            summary: String,
            position: String,
            profileImage: String // Base64 image data
        },
        experience: [{
            company: String,
            position: String,
            startDate: String,
            endDate: String,
            current: Boolean,
            description: String
        }],
        education: [{
            school: String,
            degree: String,
            fieldOfStudy: String,
            startDate: String,
            endDate: String,
            current: Boolean
        }],
        projects: [{
            name: String,
            description: String,
            technologies: [String],
            link: String,
            githubLink: String
        }],
        skills: [{
            category: String,
            items: [String]
        }],
        certifications: [{
            name: String,
            issuer: String,
            date: String,
            credentialId: String,
            link: String
        }],
        achievements: [{
            title: String,
            description: String,
            date: String
        }],
        languages: [{
            name: String,
            proficiency: String // e.g., Fluent, Intermediate, Basic
        }],
        interests: [String],
        customSections: [{
            title: String,
            content: String
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
portfolioSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
