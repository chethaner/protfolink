import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const MinimalTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
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
                                <div className="text-sm">{formatText(exp.description)}</div>
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

                {/* Certifications */}
                {content.certifications?.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Certifications</h2>
                        {content.certifications.map((cert, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                                <p className="text-gray-700 font-medium">{cert.issuer}</p>
                                <p className="text-sm text-gray-600">{cert.date}</p>
                                {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}

                                {/* Certificate Images */}
                                {cert.images && cert.images.length > 0 && (
                                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {cert.images.map((img, imgIndex) => (
                                            <div key={imgIndex} className="group">
                                                <div
                                                    onClick={() => setLightboxImage(img.data)}
                                                    className="relative overflow-hidden rounded border-2 border-gray-300 hover:border-gray-900 cursor-pointer transition"
                                                >
                                                    <img
                                                        src={img.data}
                                                        alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                        className="w-full h-32 object-cover transform group-hover:scale-105 transition duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition">
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
                    <div className="mb-10">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Achievements</h2>
                        {content.achievements.map((achievement, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                                <p className="text-sm text-gray-600 mb-1">{achievement.date}</p>
                                <div className="text-sm">{formatText(achievement.description)}</div>
                            </div>
                        ))}
                    </div>
                )}
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

export default MinimalTemplate;
