const Skills = ({ data = [], onChange }) => {
    const addSkillCategory = () => {
        onChange([...data, {
            category: '',
            items: []
        }]);
    };

    const updateCategory = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeCategory = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateSkills = (index, value) => {
        const skillsArray = value.split(',').map(s => s.trim()).filter(s => s);
        updateCategory(index, 'items', skillsArray);
    };

    return (
        <div className="space-y-6">
            {data.map((skillGroup, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Skill Category #{index + 1}</h3>
                        <button
                            onClick={() => removeCategory(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input
                                type="text"
                                value={skillGroup.category || ''}
                                onChange={(e) => updateCategory(index, 'category', e.target.value)}
                                placeholder="e.g. Frontend, Backend, Tools"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                            <input
                                type="text"
                                value={skillGroup.items?.join(', ') || ''}
                                onChange={(e) => updateSkills(index, e.target.value)}
                                placeholder="e.g. React, Vue, Angular"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={addSkillCategory}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
            >
                + Add Skill Category
            </button>
        </div>
    );
};

export default Skills;
