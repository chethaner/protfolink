import { useState } from 'react';
import { templates } from '../templates';

const TemplateSelector = ({ currentTemplate, onTemplateChange }) => {
    const [showSelector, setShowSelector] = useState(false);
    const templateList = Object.values(templates);

    const templateIcons = {
        modern: '🎨',
        minimal: '📄',
        creative: '🌈',
        corporate: '💼',
        'two-column': '📊'
    };

    const templateColors = {
        modern: 'from-indigo-500 to-purple-500',
        minimal: 'from-gray-400 to-gray-600',
        creative: 'from-pink-500 to-purple-500',
        corporate: 'from-blue-700 to-blue-900',
        'two-column': 'from-teal-500 to-cyan-500'
    };

    return (
        <div className="relative">
            {/* Current Template Button */}
            <button
                onClick={() => setShowSelector(!showSelector)}
                className="flex items-center gap-3 px-5 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-200 group"
            >
                <span className="text-2xl">{templateIcons[currentTemplate] || '🎨'}</span>
                <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500 font-medium">Current Template</div>
                    <div className="font-bold text-gray-900">{templates[currentTemplate]?.name || 'Modern'}</div>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showSelector ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Template Selector Modal */}
            {showSelector && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setShowSelector(false)}
                    ></div>

                    {/* Centered Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white border-2 border-purple-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fadeIn">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-2xl flex-shrink-0">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-xl">Choose Your Template</h3>
                                        <p className="text-sm text-purple-100">{templateList.length} professional designs</p>
                                    </div>
                                    <button
                                        onClick={() => setShowSelector(false)}
                                        className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Templates Grid - Scrollable */}
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1">
                                {templateList.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => {
                                            onTemplateChange(template.id);
                                            setShowSelector(false);
                                        }}
                                        className={`group relative text-left p-4 rounded-xl transition-all duration-200 ${currentTemplate === template.id
                                                ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-500 shadow-lg'
                                                : 'bg-gray-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
                                            }`}
                                    >
                                        {/* Selected Badge */}
                                        {currentTemplate === template.id && (
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                                                ✓ Active
                                            </div>
                                        )}

                                        {/* Template Preview */}
                                        <div className={`h-20 bg-gradient-to-br ${templateColors[template.id] || 'from-gray-400 to-gray-600'} rounded-lg mb-3 flex items-center justify-center text-3xl shadow-md`}>
                                            {templateIcons[template.id] || '📄'}
                                        </div>

                                        {/* Template Info */}
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base mb-1">
                                                {template.name}
                                            </h4>
                                            <p className="text-xs text-gray-600">{template.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-3 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex-shrink-0">
                                <p className="text-xs text-gray-600 text-center">
                                    💡 You can change templates anytime without losing content
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TemplateSelector;
