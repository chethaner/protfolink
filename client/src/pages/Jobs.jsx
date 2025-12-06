import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Jobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [userSkills, setUserSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserSkills();
    }, []);

    const fetchUserSkills = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data: portfolios } = await axios.get('http://localhost:5000/api/portfolios', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (portfolios.length > 0) {
                const { data: analysis } = await axios.post(
                    `http://localhost:5000/api/ml/analyze-portfolio/${portfolios[0]._id}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserSkills(analysis.extractedSkills || []);
            }
        } catch (error) {
            console.error('Failed to fetch skills');
        } finally {
            setLoading(false);
        }
    };

    const jobs = [
        {
            id: 1,
            title: 'Senior Full Stack Developer',
            company: 'TechCorp',
            location: 'Remote',
            salary: '$120k - $180k',
            type: 'Full-time',
            posted: '2 days ago',
            description: 'Looking for an experienced full stack developer...',
            skills: ['React', 'Node.js', 'MongoDB', 'AWS']
        },
        {
            id: 2,
            title: 'Frontend Engineer',
            company: 'StartupXYZ',
            location: 'San Francisco, CA',
            salary: '$100k - $150k',
            type: 'Full-time',
            posted: '1 week ago',
            description: 'Join our growing team as a frontend engineer...',
            skills: ['React', 'TypeScript', 'Tailwind CSS']
        },
        {
            id: 3,
            title: 'Backend Developer',
            company: 'DataSolutions',
            location: 'New York, NY',
            salary: '$110k - $160k',
            type: 'Full-time',
            posted: '3 days ago',
            description: 'Build scalable backend systems...',
            skills: ['Python', 'Django', 'PostgreSQL', 'Docker']
        },
        {
            id: 4,
            title: 'DevOps Engineer',
            company: 'CloudFirst',
            location: 'Remote',
            salary: '$130k - $190k',
            type: 'Full-time',
            posted: '5 days ago',
            description: 'Manage cloud infrastructure and CI/CD pipelines...',
            skills: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins']
        }
    ];

    const calculateMatch = (jobSkills) => {
        if (userSkills.length === 0) return 0;
        const matchingSkills = jobSkills.filter(skill =>
            userSkills.some(userSkill =>
                userSkill.toLowerCase() === skill.toLowerCase()
            )
        );
        return Math.round((matchingSkills.length / jobSkills.length) * 100);
    };

    const getMatchingSkills = (jobSkills) => {
        return jobSkills.filter(skill =>
            userSkills.some(userSkill =>
                userSkill.toLowerCase() === skill.toLowerCase()
            )
        );
    };

    const filteredJobs = jobs
        .map(job => ({
            ...job,
            matchPercentage: calculateMatch(job.skills),
            matchingSkills: getMatchingSkills(job.skills)
        }))
        .filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
            return matchesSearch && matchesLocation;
        })
        .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)' }}>
            <FloatingOrb delay={0} size={600} color="#D4AF37" />
            <FloatingOrb delay={5} size={400} color="#0A0A0A" />

            <motion.div
                className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-16"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{ borderBottom: '2px solid #D4AF37' }}
            >
                <div className="luxury-container px-6">
                    <ScrollReveal>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    💼 Job Opportunities
                                </h1>
                                <p className="text-sm md:text-base text-gray-300">AI-powered job recommendations based on your skills</p>
                            </div>
                            <MagneticButton
                                onClick={() => navigate('/dashboard')}
                                className="luxury-button luxury-button-outline"
                            >
                                ← Dashboard
                            </MagneticButton>
                        </div>
                    </ScrollReveal>
                </div>
            </motion.div>

            <div className="luxury-container px-4 md:px-6 py-8 md:py-12 relative z-10">
                <ScrollReveal>
                    <div className="luxury-card p-6 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                                🤖 AI-Powered Job Recommendations
                            </h2>
                            {userSkills.length > 0 && (
                                <span className="text-sm text-gray-600">
                                    Based on your {userSkills.length} skills
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Job title, company, or skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Location..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                        </div>
                    </div>
                </ScrollReveal>

                <div className="space-y-4">
                    {filteredJobs.map((job, index) => (
                        <ScrollReveal key={job.id} delay={index * 0.1}>
                            <motion.div
                                className="luxury-card p-6 hover:shadow-xl transition-all"
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                                                {job.title}
                                            </h3>
                                            {job.matchPercentage > 0 && (
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-bold ${job.matchPercentage >= 70 ? 'bg-green-100 text-green-800' :
                                                            job.matchPercentage >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {job.matchPercentage}% Match
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-lg text-gray-700">{job.company}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        {job.type}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span>📍</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span>💰</span>
                                        <span>{job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span>🕒</span>
                                        <span>{job.posted}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4">{job.description}</p>

                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, i) => {
                                            const isMatching = job.matchingSkills.includes(skill);
                                            return (
                                                <span
                                                    key={i}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${isMatching
                                                            ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                                            : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {isMatching && '✓ '}{skill}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                <MagneticButton
                                    onClick={() => toast.success('Application feature coming soon!')}
                                    className="luxury-button luxury-button-gold"
                                >
                                    Apply Now
                                </MagneticButton>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <ScrollReveal>
                        <div className="luxury-card p-12 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold mb-2">No Jobs Found</h3>
                            <p className="text-gray-600">
                                Try adjusting your search criteria
                            </p>
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
};

export default Jobs;
