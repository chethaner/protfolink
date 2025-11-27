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
        // Get selected text from the page
        const selectedText = window.getSelection().toString().trim();

        if (!selectedText) {
            toast.error('Please select some text first');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/ai/improve', {
                text: selectedText,
                action
            }, { withCredentials: true });

            toast.success('Text improved! Copied to clipboard.');

            // Copy to clipboard
            await navigator.clipboard.writeText(data.improvedText);

            // Call onApply if provided
            if (onApply) {
                onApply(data.improvedText);
            }
        } catch (error) {
            console.error('AI improve error:', error);
            toast.error('Failed to improve text. Make sure Ollama is running.');
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
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-900 mb-1">AI Text Improver</h3>
                        <p className="text-xs text-gray-500">Select text and click an action</p>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => improveText('improve')}
                            disabled={loading}
                            className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            <span>✨</span>
                            <span>Improve Text</span>
                        </button>

                        <button
                            onClick={() => improveText('professional')}
                            disabled={loading}
                            className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            <span>💼</span>
                            <span>Make Professional</span>
                        </button>

                        <button
                            onClick={() => improveText('shorten')}
                            disabled={loading}
                            className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            <span>✂️</span>
                            <span>Make Shorter</span>
                        </button>

                        <button
                            onClick={() => improveText('expand')}
                            disabled={loading}
                            className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            <span>📝</span>
                            <span>Expand Details</span>
                        </button>

                        <button
                            onClick={() => improveText('bullets')}
                            disabled={loading}
                            className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            <span>•</span>
                            <span>Convert to Bullets</span>
                        </button>
                    </div>

                    {loading && (
                        <div className="mt-4 text-center">
                            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <span>Improving...</span>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-800">
                            💡 Highlight any text on the page, then click a button
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
