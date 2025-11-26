const TwoColumnTemplate = ({ portfolio }) => {
    if (!portfolio) return null;

    const { content } = portfolio;
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [] } = content;

    return (
        <div className="max-w-5xl mx-auto bg-white flex">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-gray-800 text-white p-8">
                {personalInfo.profileImage && (
                    <div className="mb-6">
                        <img
                            src={personalInfo.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-700"
                        />
                    </div>
                )}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                    {personalInfo.position && (
                        <p className="text-gray-300 text-lg">{personalInfo.position}</p>
                    )}
                </div>

                {/* Contact */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Contact</h2>
                    <div className="space-y-2 text-sm">
                        {personalInfo.email && <p>📧 {personalInfo.email}</p>}
                        {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
                        {personalInfo.location && <p>📍 {personalInfo.location}</p>}
                        {personalInfo.linkedin && <p className="break-all">🔗 LinkedIn</p>}
                        {personalInfo.github && <p className="break-all">💻 GitHub</p>}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-blue-400">Skills</h2>
                        {skills.map((skillGroup, idx) => (
                            <div key={idx} className="mb-4">
                                <h3 className="font-semibold text-sm mb-2">{skillGroup.category}</h3>
                                <div className="space-y-1">
                                    {skillGroup.items?.map((skill, i) => (
                                        <div key={i} className="text-sm text-gray-300">• {skill}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-blue-400">Education</h2>
                        {education.map((edu, idx) => (
                            <div key={idx} className="mb-4">
                                <h3 className="font-semibold text-sm">{edu.degree}</h3>
                                <p className="text-gray-300 text-sm">{edu.school}</p>
                                <p className="text-gray-400 text-xs">
                                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Content */}
            <div className="w-2/3 p-8">
                {/* Summary */}
                {personalInfo.summary && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
                        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
                        <div className="space-y-6">
                            {experience.map((exp, idx) => (
                                <div key={idx}>
                                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <p className="text-blue-600 font-semibold">{exp.company}</p>
                                        <span className="text-sm text-gray-500">
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    {exp.description && (
                                        <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
                        <div className="space-y-4">
                            {projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                                    {project.description && (
                                        <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                                    )}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TwoColumnTemplate;
