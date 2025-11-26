import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AIAssistant = ({ text, onApply }) => {
    const [loading, setLoading] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth - 320, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    const improveText = async (action) => {
        if (!text || !text.trim()) {
            toast.error('Please enter some text first');
            return;
        }

        setLoading(true);
        toast.loading('Improving text with AI...', { id: 'ai-improve' });

        try {
            const { data } = await axios.post('/api/ai/improve', {
                text,
                action
            });

            onApply(data.improvedText);
            toast.success('Text improved!', { id: 'ai-improve' });
            setShowPanel(false);
        } catch (error) {
            console.error('AI improvement error:', error);
            toast.error(error.response?.data?.message || 'Failed to improve text', { id: 'ai-improve' });
        } finally {
            setLoading(false);
        }
    };

    const handleMouseDown = (e) => {
        if (e.target.closest('.ai-panel')) return; // Don't drag when clicking panel
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 280));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 100));

        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragOffset]);

    return (
        <div
            ref={buttonRef}
            className="fixed z-50"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            <button
                onMouseDown={handleMouseDown}
                onClick={() => !isDragging && setShowPanel(!showPanel)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition shadow-lg hover:shadow-xl"
                disabled={loading}
                title="Drag to move, click to open"
            >
                <span className="text-lg">✨</span>
                <span className="font-semibold">AI Assistant</span>
            </button>

            {showPanel && (
                <div className="ai-panel absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-72">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 text-lg">✨ Improve with AI</h3>
                        <button
                            onClick={() => setShowPanel(false)}
                            className="text-gray-400 hover:text-gray-600 text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => improveText('improve')}
                            disabled={loading}
                            className="w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg transition disabled:opacity-50 border border-blue-200"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">✨</span>
                                <span className="font-medium">Improve Text</span>
                            </div>
                        </button>

                        <button
                            onClick={() => improveText('professional')}
                            disabled={loading}
                            className="w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg transition disabled:opacity-50 border border-purple-200"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">💼</span>
                                <span className="font-medium">Make Professional</span>
                            </div>
                        </button>

                        <button
                            onClick={() => improveText('shorten')}
                            disabled={loading}
                            className="w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-lg transition disabled:opacity-50 border border-orange-200"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">✂️</span>
                                <span className="font-medium">Make Shorter</span>
                            </div>
                        </button>

                        <button
                            onClick={() => improveText('expand')}
                            disabled={loading}
                            className="w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg transition disabled:opacity-50 border border-green-200"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">📝</span>
                                <span className="font-medium">Expand Details</span>
                            </div>
                        </button>

                        <button
                            onClick={() => improveText('bullets')}
                            disabled={loading}
                            className="w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 rounded-lg transition disabled:opacity-50 border border-yellow-200"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">•</span>
                                <span className="font-medium">Convert to Bullets</span>
                            </div>
                        </button>
                    </div>

                    {loading && (
                        <div className="mt-4 text-center">
                            <div className="inline-flex items-center gap-2 text-sm text-purple-600">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                                <span>Processing...</span>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            💡 Select text in any field, then use AI to improve it
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
