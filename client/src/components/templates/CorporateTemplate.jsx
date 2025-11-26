import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const CorporateTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
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
                                <div className="text-gray-700 leading-relaxed">{formatText(content.personalInfo.summary)}</div>
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
                                        <div className="text-gray-700">{formatText(exp.description)}</div>
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

                        {/* Certifications */}
                        {content.certifications?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Certifications</h2>
                                {content.certifications.map((cert, index) => (
                                    <div key={index} className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                                        <p className="text-blue-800 font-semibold">{cert.issuer}</p>
                                        <p className="text-sm text-gray-600">{cert.date}</p>
                                        {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}

                                        {/* Certificate Images */}
                                        {cert.images && cert.images.length > 0 && (
                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {cert.images.map((img, imgIndex) => (
                                                    <div key={imgIndex} className="group">
                                                        <div
                                                            onClick={() => setLightboxImage(img.data)}
                                                            className="relative overflow-hidden rounded border-2 border-blue-200 hover:border-blue-900 cursor-pointer transition"
                                                        >
                                                            <img
                                                                src={img.data}
                                                                alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                                className="w-full h-32 object-cover transform group-hover:scale-105 transition duration-300"
                                                            />
                                                            <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition">
                                                                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition">🔍</span>
                                                            </div>
                                                        </div>
                                                        {img.caption && (
                                                            <p className="text-xs text-gray-600 mt-1 text-center">{img.caption}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Achievements */}
                        {content.achievements?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Achievements</h2>
                                {content.achievements.map((achievement, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">{achievement.title}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{achievement.date}</p>
                                        <div className="text-gray-700">{formatText(achievement.description)}</div>
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

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition"
                        onClick={() => setLightboxImage(null)}
                    >
                        ✕
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Full size"
                        className="max-w-full max-h-full object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default CorporateTemplate;
