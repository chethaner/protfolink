import { useState } from 'react';

const Languages = ({ data = [], onChange }) => {
    const [languages, setLanguages] = useState(data);

    const addLanguage = () => {
        const newLanguage = { name: '', proficiency: 'Intermediate' };
        const updated = [...languages, newLanguage];
        setLanguages(updated);
        onChange(updated);
    };

    const updateLanguage = (index, field, value) => {
        const updated = languages.map((lang, i) =>
            i === index ? { ...lang, [field]: value } : lang
        );
        setLanguages(updated);
        onChange(updated);
    };

    const removeLanguage = (index) => {
        const updated = languages.filter((_, i) => i !== index);
        setLanguages(updated);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            {languages.map((language, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Language *
                            </label>
                            <input
                                type="text"
                                value={language.name}
                                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., English"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Proficiency Level
                            </label>
                            <select
                                value={language.proficiency}
                                onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Native">Native</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Basic">Basic</option>
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={() => removeLanguage(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium mt-3"
                    >
                        Remove Language
                    </button>
                </div>
            ))}

            <button
                onClick={addLanguage}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
            >
                + Add Language
            </button>
        </div>
    );
};

export default Languages;
