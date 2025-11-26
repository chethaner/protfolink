const Sidebar = ({ activeSection, setActiveSection }) => {
    const sections = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'experience', label: 'Experience', icon: '💼' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'certifications', label: 'Certifications', icon: '📜' },
        { id: 'achievements', label: 'Achievements', icon: '🏆' },
        { id: 'languages', label: 'Languages', icon: '🌍' },
        { id: 'interests', label: 'Interests', icon: '💡' }
    ];

    return (
        <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeSection === section.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <span className="text-xl">{section.icon}</span>
                        <span className="font-medium">{section.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
