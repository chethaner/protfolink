const CorporateTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};

    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl">
                {/* Header - Professional Blue */}
                <div className="bg-blue-900 text-white p-8">
                    <div className="flex items-center gap-6">
                        {content.personalInfo?.profileImage && (
                            <img
                                src={content.personalInfo.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        )}
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{content.personalInfo?.fullName || 'Your Name'}</h1>
                            <p className="text-xl text-blue-200">{content.personalInfo?.position || 'Professional Title'}</p>
                        </div>
                    </div>
                </div>

                {/* Contact Bar */}
                <div className="bg-blue-800 text-white px-8 py-4 flex flex-wrap gap-6 text-sm">
                    {content.personalInfo?.email && <span>✉️ {content.personalInfo.email}</span>}
                    {content.personalInfo?.phone && <span>📞 {content.personalInfo.phone}</span>}
                    {content.personalInfo?.location && <span>📍 {content.personalInfo.location}</span>}
                </div>

                <div className="p-8">
                    {/* Professional Summary */}
                    {content.personalInfo?.summary && (
                        <div className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-900">
                            <h2 className="text-xl font-bold text-blue-900 mb-3">PROFESSIONAL SUMMARY</h2>
                            <p className="text-gray-700 leading-relaxed">{content.personalInfo.summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {content.experience?.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Professional Experience</h2>
                            {content.experience.map((exp, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                            <p className="text-blue-800 font-semibold">{exp.company}</p>
                                        </div>
                                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Education */}
                    {content.education?.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Education</h2>
                            {content.education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                                    <p className="text-blue-800 font-semibold">{edu.school}</p>
                                    <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Skills */}
                    {content.skills?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Core Competencies</h2>
                            {content.skills.map((skillGroup, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">{skillGroup.category}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {skillGroup.items?.map((skill, i) => (
                                            <div key={i} className="bg-blue-50 text-blue-900 px-4 py-2 rounded font-semibold text-center">
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CorporateTemplate;
