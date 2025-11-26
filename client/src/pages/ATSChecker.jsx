import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ATSChecker = () => {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        fetchPortfolio();
    }, [id]);

    const fetchPortfolio = async () => {
        try {
            const { data } = await axios.get(`/api/portfolios/${id}`);
            setPortfolio(data);
        } catch (error) {
            toast.error('Failed to load portfolio');
        } finally {
            setLoading(false);
        }
    };

    const runAnalysis = async () => {
        setAnalyzing(true);
        try {
            const { data } = await axios.post(`/api/ats/analyze/${id}`);
            setAnalysis(data);
            toast.success('Analysis complete!');
        } catch (error) {
            toast.error('Failed to analyze portfolio');
        } finally {
            setAnalyzing(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'bg-green-100';
        if (score >= 60) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">ATS Compatibility Checker 🎯</h1>
                    <p className="text-gray-600">Analyze how well your portfolio performs with Applicant Tracking Systems</p>
                </div>

                {/* Portfolio Info */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-2">{portfolio.title}</h2>
                    <p className="text-gray-600">Last updated: {new Date(portfolio.updatedAt).toLocaleDateString()}</p>
                </div>

                {/* Analyze Button */}
                {!analysis && (
                    <div className="text-center mb-8">
                        <button
                            onClick={runAnalysis}
                            disabled={analyzing}
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold disabled:opacity-50"
                        >
                            {analyzing ? 'Analyzing...' : '🔍 Run ATS Analysis'}
                        </button>
                    </div>
                )}

                {/* Analysis Results */}
                {analysis && (
                    <div className="space-y-6">
                        {/* Score Card */}
                        <div className={`${getScoreBgColor(analysis.score)} p-8 rounded-xl shadow-lg`}>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">ATS Compatibility Score</h3>
                                <div className={`text-7xl font-bold ${getScoreColor(analysis.score)} mb-4`}>
                                    {analysis.score}
                                    <span className="text-4xl">/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                                    <div
                                        className={`h-4 rounded-full transition-all ${analysis.score >= 80 ? 'bg-green-600' :
                                                analysis.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                                            }`}
                                        style={{ width: `${analysis.score}%` }}
                                    ></div>
                                </div>
                                <p className="text-lg text-gray-700">
                                    {analysis.score >= 80 ? '✅ Excellent! Your portfolio is highly ATS-friendly' :
                                        analysis.score >= 60 ? '⚠️ Good, but there\'s room for improvement' :
                                            '❌ Needs improvement to pass ATS systems'}
                                </p>
                            </div>
                        </div>

                        {/* Strengths */}
                        {analysis.strengths && analysis.strengths.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
                                    <span>💪</span> Your Strengths
                                </h3>
                                <ul className="space-y-2">
                                    {analysis.strengths.map((strength, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span className="text-gray-700">{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Recommendations */}
                        {analysis.recommendations && analysis.recommendations.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                                    <span>💡</span> Recommendations
                                </h3>
                                <ul className="space-y-3">
                                    {analysis.recommendations.map((rec, index) => (
                                        <li key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                                            <span className="text-orange-600 mt-1">→</span>
                                            <span className="text-gray-700">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Missing Keywords */}
                        {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                                    <span>🔑</span> Suggested Keywords
                                </h3>
                                <p className="text-gray-600 mb-4">Consider adding these industry-relevant keywords:</p>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.missingKeywords.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center">
                            <Link
                                to={`/editor/${id}`}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Edit Portfolio
                            </Link>
                            <button
                                onClick={runAnalysis}
                                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                            >
                                Re-analyze
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ATSChecker;
