const ModernTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};

    return (
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            {/* Header - Gradient Background */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
                <div className="flex items-center gap-6">
                    {content.personalInfo?.profileImage && (
                        <img
                            src={content.personalInfo.profileImage}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="text-4xl font-black mb-2">{content.personalInfo?.fullName || 'Your Name'}</h1>
                        <p className="text-xl text-indigo-100 mb-4">{content.personalInfo?.position || 'Professional Title'}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            {content.personalInfo?.email && (
                                <span className="flex items-center gap-2">
                                    <span>📧</span> {content.personalInfo.email}
                                </span>
                            )}
                            {content.personalInfo?.phone && (
                                <span className="flex items-center gap-2">
                                    <span>📱</span> {content.personalInfo.phone}
                                </span>
                            )}
                            {content.personalInfo?.location && (
                                <span className="flex items-center gap-2">
                                    <span>📍</span> {content.personalInfo.location}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Summary */}
                {content.personalInfo?.summary && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-indigo-600 pb-2">About Me</h2>
                        <p className="text-gray-700 leading-relaxed">{content.personalInfo.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {content.experience?.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Experience</h2>
                        {content.experience.map((exp, index) => (
                            <div key={index} className="mb-6 pl-4 border-l-4 border-indigo-200">
                                <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                <p className="text-indigo-600 font-semibold">{exp.company}</p>
                                <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
                                <p className="text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {content.education?.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Education</h2>
                        {content.education.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                                <p className="text-indigo-600 font-semibold">{edu.school}</p>
                                <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {content.skills?.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Skills</h2>
                        {content.skills.map((skillGroup, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{skillGroup.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items?.map((skill, i) => (
                                        <span key={i} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {content.projects?.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Projects</h2>
                        {content.projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                                <p className="text-gray-700 mb-2">{project.description}</p>
                                {project.link && (
                                    <a href={project.link} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                        View Project →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModernTemplate;
