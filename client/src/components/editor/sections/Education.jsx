const Education = ({ data = [], onChange }) => {
    const addEducation = () => {
        onChange([...data, {
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            current: false
        }]);
    };

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeEducation = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            {data.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Education #{index + 1}</h3>
                        <button
                            onClick={() => removeEducation(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">School/University</label>
                            <input
                                type="text"
                                value={edu.school || ''}
                                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Degree</label>
                                <input
                                    type="text"
                                    value={edu.degree || ''}
                                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                    placeholder="e.g. Bachelor's"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                                <input
                                    type="text"
                                    value={edu.fieldOfStudy || ''}
                                    onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                                    placeholder="e.g. Computer Science"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="text"
                                    value={edu.startDate || ''}
                                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                                    placeholder="e.g. 2018"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="text"
                                    value={edu.endDate || ''}
                                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                                    placeholder="e.g. 2022"
                                    disabled={edu.current}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={edu.current || false}
                                onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">Currently studying</label>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={addEducation}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
            >
                + Add Education
            </button>
        </div>
    );
};

export default Education;
