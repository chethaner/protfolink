import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import RichTextEditor from '../RichTextEditor';

const Experience = ({ data = [], onChange }) => {
    const [showAIMenu, setShowAIMenu] = useState({});
    const [aiProcessing, setAiProcessing] = useState({});

    const addExperience = () => {
        onChange([...data, {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }]);
    };

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeExperience = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const handleAIImprove = async (index, action) => {
        const text = data[index]?.description || '';
        if (!text.trim()) {
            toast.error('Please enter some text first');
            return;
        }

        setAiProcessing({ ...aiProcessing, [index]: true });
        setShowAIMenu({ ...showAIMenu, [index]: false });

        try {
            const { data: result } = await axios.post('/api/ai/improve', {
                text,
                action
            }, { withCredentials: true });

            updateExperience(index, 'description', result.improvedText);
            toast.success('Description improved!');
        } catch (error) {
            console.error('AI error:', error);
            toast.error('Failed to improve text. Make sure Ollama is running.');
        } finally {
            setAiProcessing({ ...aiProcessing, [index]: false });
        }
    };

    return (
        <div className="space-y-6">
            {data.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Experience #{index + 1}</h3>
                        <button
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company</label>
                                <input
                                    type="text"
                                    value={exp.company || ''}
                                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Position</label>
                                <input
                                    type="text"
                                    value={exp.position || ''}
                                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="text"
                                    value={exp.startDate || ''}
                                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                    placeholder="e.g. Jan 2020"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="text"
                                    value={exp.endDate || ''}
                                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                    placeholder="e.g. Present"
                                    disabled={exp.current}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={exp.current || false}
                                onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">Currently working here</label>
                        </div>

                        {/* Description with AI Improve */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowAIMenu({ ...showAIMenu, [index]: !showAIMenu[index] })}
                                        disabled={aiProcessing[index]}
                                        className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition flex items-center gap-1 disabled:opacity-50"
                                    >
                                        {aiProcessing[index] ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>✨</span>
                                                <span>AI Improve</span>
                                                <span className="ml-1">{showAIMenu[index] ? '▲' : '▼'}</span>
                                            </>
                                        )}
                                    </button>

                                    {showAIMenu[index] && !aiProcessing[index] && (
                                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                                            <button onClick={() => handleAIImprove(index, 'improve')} className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-sm rounded-t-lg">
                                                <span>✨</span><span>Improve Text</span>
                                            </button>
                                            <button onClick={() => handleAIImprove(index, 'professional')} className="w-full text-left px-4 py-2 hover:bg-purple-50 flex items-center gap-2 text-sm">
                                                <span>💼</span><span>Make Professional</span>
                                            </button>
                                            <button onClick={() => handleAIImprove(index, 'shorten')} className="w-full text-left px-4 py-2 hover:bg-orange-50 flex items-center gap-2 text-sm">
                                                <span>✂️</span><span>Make Shorter</span>
                                            </button>
                                            <button onClick={() => handleAIImprove(index, 'expand')} className="w-full text-left px-4 py-2 hover:bg-green-50 flex items-center gap-2 text-sm">
                                                <span>📝</span><span>Expand Details</span>
                                            </button>
                                            <button onClick={() => handleAIImprove(index, 'bullets')} className="w-full text-left px-4 py-2 hover:bg-pink-50 flex items-center gap-2 text-sm rounded-b-lg">
                                                <span>•</span><span>Convert to Bullets</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <RichTextEditor
                                value={exp.description || ''}
                                onChange={(html) => updateExperience(index, 'description', html)}
                                disabled={aiProcessing[index]}
                                placeholder="Describe your responsibilities and achievements..."
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={addExperience}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
            >
                + Add Experience
            </button>
        </div>
    );
};

export default Experience;
