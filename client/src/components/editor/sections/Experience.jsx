import AIAssistant from '../AIAssistant';

const Experience = ({ data = [], onChange }) => {
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
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <AIAssistant
                                    text={exp.description || ''}
                                    onApply={(improvedText) => updateExperience(index, 'description', improvedText)}
                                />
                            </div>
                            <textarea
                                rows={3}
                                value={exp.description || ''}
                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
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
