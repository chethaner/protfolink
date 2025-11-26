import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const TwoColumnTemplate = ({ portfolio }) => {
    if (!portfolio) return null;

    const { content } = portfolio;
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [], certifications = [], achievements = [] } = content;
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
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
                            <div className="text-gray-700 leading-relaxed">{formatText(personalInfo.summary)}</div>
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
                                            <div className="text-gray-700 text-sm leading-relaxed">{formatText(exp.description)}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h2>
                            <div className="space-y-6">
                                {certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                                        <p className="text-blue-600 font-semibold">{cert.issuer}</p>
                                        <p className="text-sm text-gray-500">{cert.date}</p>
                                        {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}

                                        {/* Certificate Images */}
                                        {cert.images && cert.images.length > 0 && (
                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                {cert.images.map((img, imgIndex) => (
                                                    <div key={imgIndex} className="group">
                                                        <div
                                                            onClick={() => setLightboxImage(img.data)}
                                                            className="relative overflow-hidden rounded border-2 border-gray-300 hover:border-blue-600 cursor-pointer transition"
                                                        >
                                                            <img
                                                                src={img.data}
                                                                alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                                className="w-full h-32 object-cover transform group-hover:scale-105 transition duration-300"
                                                            />
                                                            <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition">
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
                        </div>
                    )}

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
                            <div className="space-y-4">
                                {achievements.map((achievement, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-lg font-bold text-gray-900">{achievement.title}</h3>
                                        <p className="text-sm text-gray-500 mb-1">{achievement.date}</p>
                                        <div className="text-gray-700 text-sm">{formatText(achievement.description)}</div>
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
                                            <div className="text-gray-700 text-sm mb-2">{formatText(project.description)}</div>
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

export default TwoColumnTemplate;
