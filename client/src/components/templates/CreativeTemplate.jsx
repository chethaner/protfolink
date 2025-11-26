const CreativeTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};

    return (
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Sidebar */}
                <div className="grid md:grid-cols-3">
                    <div className="bg-gradient-to-b from-pink-500 to-purple-600 text-white p-8">
                        <div className="mb-8">
                            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                {content.personalInfo?.profileImage ? (
                                    <img
                                        src={content.personalInfo.profileImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-6xl">👤</span>
                                )}
                            </div>
                            <h1 className="text-3xl font-black text-center">{content.personalInfo?.fullName || 'Your Name'}</h1>
                            <p className="text-center text-pink-100 mt-2">{content.personalInfo?.position || 'Title'}</p>
                        </div>

                        {/* Contact */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-3 border-b border-pink-300 pb-2">Contact</h3>
                            {content.personalInfo?.email && (
                                <p className="text-sm mb-2 flex items-center gap-2">
                                    <span>📧</span> {content.personalInfo.email}
                                </p>
                            )}
                            {content.personalInfo?.phone && (
                                <p className="text-sm mb-2 flex items-center gap-2">
                                    <span>📱</span> {content.personalInfo.phone}
                                </p>
                            )}
                            {content.personalInfo?.location && (
                                <p className="text-sm flex items-center gap-2">
                                    <span>📍</span> {content.personalInfo.location}
                                </p>
                            )}
                        </div>

                        {/* Skills */}
                        {content.skills?.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg mb-3 border-b border-pink-300 pb-2">Skills</h3>
                                {content.skills.map((skillGroup, index) => (
                                    <div key={index} className="mb-3">
                                        <h4 className="font-semibold text-sm mb-2">{skillGroup.category}</h4>
                                        <div className="space-y-2">
                                            {skillGroup.items?.map((skill, i) => (
                                                <div key={i} className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 p-8">
                        {/* Summary */}
                        {content.personalInfo?.summary && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 text-pink-600">About Me</h2>
                                <p className="text-gray-700 leading-relaxed">{content.personalInfo.summary}</p>
                            </div>
                        )}

                        {/* Experience */}
                        {content.experience?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-pink-600 mb-4">Experience</h2>
                                {content.experience.map((exp, index) => (
                                    <div key={index} className="mb-6 relative pl-6 border-l-4 border-pink-300">
                                        <div className="absolute -left-2 top-0 w-4 h-4 bg-pink-500 rounded-full"></div>
                                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                        <p className="text-pink-600 font-semibold">{exp.company}</p>
                                        <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
                                        <p className="text-gray-700">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Education */}
                        {content.education?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-pink-600 mb-4">Education</h2>
                                {content.education.map((edu, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                                        <p className="text-pink-600 font-semibold">{edu.school}</p>
                                        <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Projects */}
                        {content.projects?.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-pink-600 mb-4">Projects</h2>
                                <div className="grid gap-4">
                                    {content.projects.map((project, index) => (
                                        <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
                                            <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                                            <p className="text-gray-700 text-sm">{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
