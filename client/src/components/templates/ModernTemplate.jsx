import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const ModernTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
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
                    {content.personalInfo?.summary && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-indigo-600 pb-2">About Me</h2>
                            <div
                                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: content.personalInfo.summary }}
                            />
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
                                    <div
                                        className="text-gray-700 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: exp.description }}
                                    />
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
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Projects</h2>
                            {content.projects.map((project, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                                    <div
                                        className="text-gray-700 mb-2 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: project.description }}
                                    />
                                    {project.link && (
                                        <a href={project.link} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                            View Project →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Certifications */}
                    {content.certifications?.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Certifications</h2>
                            {content.certifications.map((cert, index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                                    <p className="text-indigo-600 font-semibold">{cert.issuer}</p>
                                    <p className="text-sm text-gray-600">{cert.date}</p>
                                    {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}

                                    {/* Certificate Images */}
                                    {cert.images && cert.images.length > 0 && (
                                        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {cert.images.map((img, imgIndex) => (
                                                <div key={imgIndex} className="group">
                                                    <div
                                                        onClick={() => setLightboxImage(img.data)}
                                                        className="relative overflow-hidden rounded-lg cursor-pointer border-2 border-gray-200 hover:border-indigo-500 transition"
                                                    >
                                                        <img
                                                            src={img.data}
                                                            alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                            className="w-full h-32 object-cover transform group-hover:scale-110 transition duration-300"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition">
                                                            <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition">🔍</span>
                                                        </div>
                                                    </div>
                                                    {img.caption && (
                                                        <p className="text-xs text-gray-600 mt-1 text-center italic">{img.caption}</p>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Achievements</h2>
                            {content.achievements.map((achievement, index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{achievement.date}</p>
                                    <div className="text-gray-700">{formatText(achievement.description)}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Languages */}
                    {content.languages?.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Languages</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {content.languages.map((language, index) => (
                                    <div key={index} className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg">
                                        <span className="font-semibold text-gray-900">{language.name}</span>
                                        <span className="text-sm text-indigo-600">{language.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interests */}
                    {content.interests?.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">Interests</h2>
                            <div className="flex flex-wrap gap-2">
                                {content.interests.map((interest, index) => (
                                    <span key={index} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
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

export default ModernTemplate;
