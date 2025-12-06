import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const MinimalTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
            <div className="bg-white shadow-lg max-w-4xl mx-auto p-12">
                {/* Header - Clean & Minimal */}
                <motion.div
                    className="text-center mb-12 pb-8 border-b-2 border-gray-900"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {content.personalInfo?.profileImage && (
                        <motion.img
                            src={content.personalInfo.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-gray-900"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
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
                </motion.div>

                {/* Summary */}
                {content.personalInfo?.summary && (
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div
                            className="text-gray-700 leading-relaxed text-center italic prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: content.personalInfo.summary }}
                        />
                    </motion.div>
                )}

                {/* Experience */}
                {content.experience?.length > 0 && (
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Experience</h2>
                        {content.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="mb-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                                    <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                                </div>
                                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                                <div
                                    className="text-sm prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: exp.description }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Education */}
                {content.education?.length > 0 && (
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Education</h2>
                        {content.education.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                                        <p className="text-gray-700">{edu.school}</p>
                                    </div>
                                    <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Skills */}
                {content.skills?.length > 0 && (
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Skills</h2>
                        {content.skills.map((skillGroup, index) => (
                            <motion.div
                                key={index}
                                className="mb-4"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">{skillGroup.category}</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {skillGroup.items?.map((skill, i) => (
                                        <motion.span
                                            key={i}
                                            className="text-gray-700 text-sm"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Certifications */}
                {content.certifications?.length > 0 && (
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Certifications</h2>
                        {content.certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                                <p className="text-gray-700 font-medium">{cert.issuer}</p>
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
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Achievements</h2>
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
                                <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                                <p className="text-sm text-gray-600 mb-1">{achievement.date}</p>
                                <div className="text-sm">{formatText(achievement.description)}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Languages */}
                {content.languages?.length > 0 && (
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Languages</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {content.languages.map((language, index) => (
                                <motion.div
                                    key={index}
                                    className="flex justify-between items-center border-b border-gray-200 pb-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="font-semibold">{language.name}</span>
                                    <span className="text-sm text-gray-600">{language.proficiency}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Interests */}
                {content.interests?.length > 0 && (
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Interests</h2>
                        <div className="flex flex-wrap gap-2">
                            {content.interests.map((interest, index) => (
                                <motion.span
                                    key={index}
                                    className="border border-gray-300 px-3 py-1 rounded text-sm"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ scale: 1.1, borderColor: '#111' }}
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
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

export default MinimalTemplate;
