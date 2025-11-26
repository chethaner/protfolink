import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getTemplate } from '../components/templates';
import SocialShare from '../components/SocialShare';

const PublicPortfolio = () => {
    const { slug } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPortfolio();
    }, [slug]);

    const fetchPortfolio = async () => {
        try {
            const { data } = await axios.get(`/api/public/${slug}`);
            setPortfolio(data);
        } catch (error) {
            setError(error.response?.data?.message || 'Portfolio not found');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="text-xl text-gray-600">Loading portfolio...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    const TemplateComponent = getTemplate(portfolio.template).component;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <SocialShare
                    portfolioUrl={`/p/${slug}`}
                    portfolioTitle={portfolio.title}
                />
                <TemplateComponent portfolio={portfolio} />
            </div>
        </div>
    );
};

export default PublicPortfolio;
