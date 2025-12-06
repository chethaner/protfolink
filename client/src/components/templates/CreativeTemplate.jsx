import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const CreativeTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen p-8">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-3">
                        {/* Sidebar */}
                        <motion.div
                            className="bg-gradient-to-b from-pink-500 to-purple-600 text-white p-8"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Profile */}
                            <motion.div
                                className="mb-8"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
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
                            </motion.div>

                            {/* Contact */}
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
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
                            </motion.div>

                            {/* Skills */}
                            {content.skills?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <h3 className="font-bold text-lg mb-3 border-b border-pink-300 pb-2">Skills</h3>
                                    {content.skills.map((skillGroup, index) => (
                                        <motion.div
                                            key={index}
                                            className="mb-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                        >
                                            <h4 className="font-semibold text-sm mb-2">{skillGroup.category}</h4>
                                            <div className="space-y-2">
                                                {skillGroup.items?.map((skill, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="bg-white/20 rounded-lg px-3 py-2 text-sm"
                                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                                                    >
                                                        {skill}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Main Content */}
                        <div className="md:col-span-2 p-8">
                            {/* Summary */}
                            {content.personalInfo?.summary && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-3">About Me</h2>
                                    <div
                                        className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: content.personalInfo.summary }}
                                    />
                                </motion.div>
                            )}

                            {/* Experience */}
                            {content.experience?.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Experience</h2>
                                    {content.experience.map((exp, index) => (
                                        <motion.div
                                            key={index}
                                            className="mb-6 relative pl-6 border-l-4 border-pink-300"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className="absolute -left-2 top-0 w-4 h-4 bg-pink-500 rounded-full"></div>
                                            <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                            <p className="text-pink-600 font-semibold">{exp.company}</p>
                                            <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
                                            <div
                                                className="text-gray-700 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: exp.description }}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Education */}
                            {content.education?.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Education</h2>
                                    {content.education.map((edu, index) => (
                                        <motion.div
                                            key={index}
                                            className="mb-4"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                                            <p className="text-pink-600 font-semibold">{edu.school}</p>
                                            <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Projects */}
                            {content.projects?.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Projects</h2>
                                    <div className="grid gap-4">
                                        {content.projects.map((project, index) => (
                                            <motion.div
                                                key={index}
                                                className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                                                <div
                                                    className="text-gray-700 text-sm prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                                />
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-pink-600 hover:text-pink-700 text-sm mt-2 inline-block"
                                                    >
                                                        View Project →
                                                    </a>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Certifications */}
                            {content.certifications?.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Certifications</h2>
                                    {content.certifications.map((cert, index) => (
                                        <motion.div
                                            key={index}
                                            className="mb-6"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                                            <p className="text-pink-600 font-semibold">{cert.issuer}</p>
                                            <p className="text-sm text-gray-600">{cert.date}</p>
                                            {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}

                                            {/* Certificate Images */}
                                            {cert.images && cert.images.length > 0 && (
                                                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {cert.images.map((img, imgIndex) => (
                                                        <motion.div
                                                            key={imgIndex}
                                                            className="group"
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.4, delay: imgIndex * 0.1 }}
                                                            whileHover={{ scale: 1.05 }}
                                                        >
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
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Achievements */}
                            {content.achievements?.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Achievements</h2>
                                    {content.achievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            className="mb-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                                            <p className="text-sm text-gray-600 mb-1">{achievement.date}</p>
                                            <div className="text-gray-700">{formatText(achievement.description)}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Languages */}
                            {content.languages?.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Languages</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {content.languages.map((language, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex justify-between items-center bg-pink-50 p-3 rounded-xl"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <span className="font-semibold text-gray-900">{language.name}</span>
                                                <span className="text-sm text-pink-600">{language.proficiency}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Interests */}
                            {content.interests?.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Interests</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {content.interests.map((interest, index) => (
                                            <motion.span
                                                key={index}
                                                className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {interest}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                </motion.div>
            )}
        </>
    );
};

export default CreativeTemplate;
