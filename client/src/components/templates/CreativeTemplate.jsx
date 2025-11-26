import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const CreativeTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
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
                                    <div className="text-gray-700 leading-relaxed">{formatText(content.personalInfo.summary)}</div>
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
                                            <div className="text-gray-700">{formatText(exp.description)}</div>
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

                            {/* Certifications */}
                            {content.certifications?.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Certifications</h2>
                                    {content.certifications.map((cert, index) => (
                                        <div key={index} className="mb-6">
                                            <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                                            <p className="text-pink-600 font-semibold">{cert.issuer}</p>
                                            <p className="text-sm text-gray-600">{cert.date}</p>
                                            {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}

                                            {/* Certificate Images */}
                                            {cert.images && cert.images.length > 0 && (
                                                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {cert.images.map((img, imgIndex) => (
                                                        <div key={imgIndex} className="group">
                                                            <div
                                                                onClick={() => setLightboxImage(img.data)}
                                                                className="relative overflow-hidden rounded-xl border-2 border-pink-200 hover:border-pink-500 cursor-pointer transition"
                                                            >
                                                                <img
                                                                    src={img.data}
                                                                    alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                                    className="w-full h-32 object-cover transform group-hover:scale-105 transition duration-300"
                                                                />
                                                                <div className="absolute inset-0 bg-pink-500 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition">
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
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Achievements</h2>
                                    {content.achievements.map((achievement, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                                            <p className="text-sm text-gray-600 mb-1">{achievement.date}</p>
                                            <div className="text-gray-700">{formatText(achievement.description)}</div>
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
                                                <div className="text-gray-700 text-sm">{formatText(project.description)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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

export default CreativeTemplate;
