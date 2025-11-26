import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AIAssistant = ({ text, onApply }) => {
    const [loading, setLoading] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    const improveText = async (action) => {
        if (!text || !text.trim()) {
            toast.error('Please enter some text first');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/ai/improve', {
                text,
                action
            });

            onApply(data.improvedText);
            toast.success('Text improved!');
        } catch (error) {
            toast.error('Failed to improve text');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowPanel(!showPanel)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
                disabled={loading}
            >
                <span>✨</span>
                <span>AI Assistant</span>
            </button>

            {showPanel && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-64">
                    <h3 className="font-semibold text-gray-900 mb-3">Improve with AI</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => improveText('improve')}
                            disabled={loading}
                            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition disabled:opacity-50"
                        >
                            ✨ Improve Text
                        </button>
                        <button
                            onClick={() => improveText('professional')}
                            disabled={loading}
                            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition disabled:opacity-50"
                        >
                            💼 Make Professional
                        </button>
                        <button
                            onClick={() => improveText('shorten')}
                            disabled={loading}
                            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition disabled:opacity-50"
                        >
                            ✂️ Make Shorter
                        </button>
                        <button
                            onClick={() => improveText('expand')}
                            disabled={loading}
                            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition disabled:opacity-50"
                        >
                            📝 Expand Details
                        </button>
                        <button
                            onClick={() => improveText('bullets')}
                            disabled={loading}
                            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition disabled:opacity-50"
                        >
                            • Convert to Bullets
                        </button>
                    </div>
                    {loading && (
                        <div className="mt-3 text-center text-sm text-gray-500">
                            Processing...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
