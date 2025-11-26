const Projects = ({ data = [], onChange }) => {
    const addProject = () => {
        onChange([...data, {
            name: '',
            description: '',
            technologies: [],
            link: '',
            githubLink: ''
        }]);
    };

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeProject = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateTechnologies = (index, value) => {
        const techArray = value.split(',').map(t => t.trim()).filter(t => t);
        updateProject(index, 'technologies', techArray);
    };

    return (
        <div className="space-y-6">
            {data.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Project #{index + 1}</h3>
                        <button
                            onClick={() => removeProject(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Name</label>
                            <input
                                type="text"
                                value={project.name || ''}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={3}
                                value={project.description || ''}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                            <input
                                type="text"
                                value={project.technologies?.join(', ') || ''}
                                onChange={(e) => updateTechnologies(index, e.target.value)}
                                placeholder="e.g. React, Node.js, MongoDB"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Live Link</label>
                                <input
                                    type="text"
                                    value={project.link || ''}
                                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                                    placeholder="https://..."
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
                                <input
                                    type="text"
                                    value={project.githubLink || ''}
                                    onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={addProject}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
            >
                + Add Project
            </button>
        </div>
    );
};

export default Projects;
