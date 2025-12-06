import { useState } from 'react';

const Sidebar = ({ activeSection, setActiveSection, sectionOrder, onReorder }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

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

    // Use sectionOrder if provided, otherwise use default order
    const orderedSections = sectionOrder
        ? sectionOrder.map(id => sections.find(s => s.id === id)).filter(Boolean)
        : sections;

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newOrder = [...orderedSections];
        const [draggedItem] = newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, draggedItem);

        // Call parent handler to update order
        if (onReorder) {
            onReorder(newOrder.map(s => s.id));
        }

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
                {orderedSections.map((section, index) => (
                    <div
                        key={section.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`relative transition-all duration-200 ${dragOverIndex === index ? 'mt-12' : ''
                            }`}
                    >
                        <button
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 group ${activeSection === section.id
                                    ? 'bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                } ${draggedIndex === index ? 'opacity-50' : ''}`}
                            style={activeSection === section.id ? { border: '1px solid #D4AF37' } : {}}
                        >
                            {/* Drag Handle */}
                            <span className="text-gray-400 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
                                ⋮⋮
                            </span>

                            <span className="text-xl">{section.icon}</span>
                            <span className="font-medium flex-1">{section.label}</span>
                        </button>

                        {/* Drop indicator */}
                        {dragOverIndex === index && draggedIndex !== index && (
                            <div
                                className="absolute -top-2 left-0 right-0 h-1 rounded-full"
                                style={{ backgroundColor: '#D4AF37' }}
                            />
                        )}
                    </div>
                ))}
            </nav>

            <div className="px-4 pb-4">
                <p className="text-xs text-gray-500 text-center">
                    💡 Drag sections to reorder
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
