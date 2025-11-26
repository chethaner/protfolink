import { useState } from 'react';

const Interests = ({ data = [], onChange }) => {
    const [interests, setInterests] = useState(data);
    const [inputValue, setInputValue] = useState('');

    const addInterest = () => {
        if (inputValue.trim()) {
            const updated = [...interests, inputValue.trim()];
            setInterests(updated);
            onChange(updated);
            setInputValue('');
        }
    };

    const removeInterest = (index) => {
        const updated = interests.filter((_, i) => i !== index);
        setInterests(updated);
        onChange(updated);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addInterest();
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Your Interests
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., UI/UX Design, Open Source, Tech Blogging"
                    />
                    <button
                        onClick={addInterest}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Press Enter or click Add</p>
            </div>

            {interests.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Interests ({interests.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {interests.map((interest, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                            >
                                <span>{interest}</span>
                                <button
                                    onClick={() => removeInterest(index)}
                                    className="text-blue-600 hover:text-blue-900 font-bold"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {interests.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">No interests added yet</p>
                </div>
            )}
        </div>
    );
};

export default Interests;
