const MinimalTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};

    return (
        <div className="bg-white shadow-lg max-w-4xl mx-auto p-12">
            {/* Header - Clean & Minimal */}
            <div className="text-center mb-12 pb-8 border-b-2 border-gray-900">
                {content.personalInfo?.profileImage && (
                    <img
                        src={content.personalInfo.profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-gray-900"
                    />
                )}
                <h1 className="text-5xl font-light text-gray-900 mb-2 tracking-wide">{content.personalInfo?.fullName || 'YOUR NAME'}</h1>
                <p className="text-lg text-gray-600 uppercase tracking-widest">{content.personalInfo?.position || 'Professional Title'}</p>
                <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
                    {content.personalInfo?.email && <span>{content.personalInfo.email}</span>}
                    {content.personalInfo?.phone && <span>•</span>}
                    {content.personalInfo?.phone && <span>{content.personalInfo.phone}</span>}
                    {content.personalInfo?.location && <span>•</span>}
                    {content.personalInfo?.location && <span>{content.personalInfo.location}</span>}
                </div>
            </div>

            {/* Summary */}
            {content.personalInfo?.summary && (
                <div className="mb-10">
                    <p className="text-gray-700 leading-relaxed text-center italic">{content.personalInfo.summary}</p>
                </div>
            )}

            {/* Experience */}
            {content.experience?.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Experience</h2>
                    {content.experience.map((exp, index) => (
                        <div key={index} className="mb-6">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                            </div>
                            <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                            <p className="text-gray-600 text-sm">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {content.education?.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Education</h2>
                    {content.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                                    <p className="text-gray-700">{edu.school}</p>
                                </div>
                                <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {content.skills?.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Skills</h2>
                    {content.skills.map((skillGroup, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">{skillGroup.category}</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {skillGroup.items?.map((skill, i) => (
                                    <span key={i} className="text-gray-700 text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MinimalTemplate;
