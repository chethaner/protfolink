import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const JobSuggestions = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const { data } = await axios.get('/api/portfolios');
            setPortfolios(data);
            if (data.length > 0) {
                setSelectedPortfolio(data[0]._id);
                fetchSuggestions(data[0]._id);
            }
        } catch (error) {
            toast.error('Failed to load portfolios');
        }
    };

    const fetchSuggestions = async (portfolioId) => {
        try {
            const { data } = await axios.get(`/api/jobs/portfolio/${portfolioId}`);
            setSuggestions(data);
        } catch (error) {
            // No suggestions yet
            setSuggestions(null);
        }
    };

    const analyzePortfolio = async () => {
        if (!selectedPortfolio) return;

        setAnalyzing(true);
        try {
            const { data } = await axios.post(`/api/jobs/analyze/${selectedPortfolio}`);
            setSuggestions(data);
            toast.success('Analysis complete!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Analysis failed');
        } finally {
            setAnalyzing(false);
        }
    };

    const handlePortfolioChange = (portfolioId) => {
        setSelectedPortfolio(portfolioId);
        fetchSuggestions(portfolioId);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 60) return 'text-yellow-600 bg-yellow-100';
        return 'text-orange-600 bg-orange-100';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/dashboard" className="text-purple-600 hover:text-purple-800 mb-4 inline-block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">💼 Job Suggestions</h1>
                    <p className="text-gray-600">AI-powered job matching based on your portfolio</p>
                </div>

                {/* Portfolio Selector */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Portfolio to Analyze
                    </label>
                    <div className="flex gap-4">
                        <select
                            value={selectedPortfolio || ''}
                            onChange={(e) => handlePortfolioChange(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            {portfolios.map((portfolio) => (
                                <option key={portfolio._id} value={portfolio._id}>
                                    {portfolio.title}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={analyzePortfolio}
                            disabled={analyzing || !selectedPortfolio}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            {analyzing ? '🔍 Analyzing...' : '🤖 Analyze with AI'}
                        </button>
                    </div>
                </div>

                {/* Suggestions */}
                {suggestions && suggestions.suggestions.length > 0 ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Matched Jobs ({suggestions.suggestions.length})
                            </h2>
                            <span className="text-sm text-gray-500">
                                Analyzed: {new Date(suggestions.analyzedAt).toLocaleDateString()}
                            </span>
                        </div>

                        {suggestions.suggestions.map((job, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                                {/* Job Header */}
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{job.jobTitle}</h3>
                                            <p className="text-purple-100">{job.description}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full font-bold ${getScoreColor(job.matchScore)}`}>
                                            {job.matchScore}% Match
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Salary Range */}
                                    {job.salaryRange && (
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">💰 Salary Range</h4>
                                            <p className="text-lg text-green-600 font-medium">{job.salaryRange}</p>
                                        </div>
                                    )}

                                    {/* Required Skills */}
                                    {job.requiredSkills && job.requiredSkills.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">✅ Required Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {job.requiredSkills.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Skill Gaps */}
                                    {job.skillGaps && job.skillGaps.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">📚 Skills to Learn</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {job.skillGaps.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Career Path */}
                                    {job.careerPath && job.careerPath.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-3">🚀 Career Path</h4>
                                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                                {job.careerPath.map((role, i) => (
                                                    <div key={i} className="flex items-center">
                                                        <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg whitespace-nowrap">
                                                            {role}
                                                        </div>
                                                        {i < job.careerPath.length - 1 && (
                                                            <span className="mx-2 text-gray-400">→</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-3 pt-4 border-t">
                                        <Link
                                            to={`/editor/${selectedPortfolio}`}
                                            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Improve Portfolio
                                        </Link>
                                        <Link
                                            to="/career"
                                            className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
                                        >
                                            Create Learning Goal
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-xl shadow-md text-center">
                        <div className="text-6xl mb-4">🤖</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Job Suggestions Yet</h3>
                        <p className="text-gray-600 mb-6">
                            Click "Analyze with AI" to get personalized job recommendations
                        </p>
                        <button
                            onClick={analyzePortfolio}
                            disabled={analyzing || !selectedPortfolio}
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 text-lg font-semibold"
                        >
                            {analyzing ? '🔍 Analyzing...' : '🤖 Get Job Suggestions'}
                        </button>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-3">💡 How It Works</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>AI analyzes your skills, experience, and projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>Matches you with suitable job roles</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>Shows skill gaps and learning recommendations</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>Provides career growth path visualization</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JobSuggestions;
