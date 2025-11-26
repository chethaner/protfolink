import { useState } from 'react';

const Achievements = ({ data = [], onChange }) => {
    const [achievements, setAchievements] = useState(data);

    const addAchievement = () => {
        const newAchievement = { title: '', description: '', date: '' };
        const updated = [...achievements, newAchievement];
        setAchievements(updated);
        onChange(updated);
    };

    const updateAchievement = (index, field, value) => {
        const updated = achievements.map((achievement, i) =>
            i === index ? { ...achievement, [field]: value } : achievement
        );
        setAchievements(updated);
        onChange(updated);
    };

    const removeAchievement = (index) => {
        const updated = achievements.filter((_, i) => i !== index);
        setAchievements(updated);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            {achievements.map((achievement, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Achievement Title *
                            </label>
                            <input
                                type="text"
                                value={achievement.title}
                                onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., Won 1st Prize in Hackathon"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={achievement.description}
                                onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                rows="3"
                                placeholder="Describe your achievement..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                type="text"
                                value={achievement.date}
                                onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., March 2023"
                            />
                        </div>

                        <button
                            onClick={() => removeAchievement(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium mt-4"
                        >
                            Remove Achievement
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={addAchievement}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 transition font-medium"
            >
                + Add Achievement
            </button>
        </div>
    );
};

export default Achievements;
