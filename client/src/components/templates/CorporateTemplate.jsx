import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const CorporateTemplate = ({ portfolio }) => {
    const content = portfolio.content || {};
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
            <div className="bg-gray-100 min-h-screen p-8">
                <div className="max-w-4xl mx-auto bg-white shadow-xl">
                    {/* Header - Professional Blue */}
                    <motion.div
                        className="bg-blue-900 text-white p-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-6">
                            {content.personalInfo?.profileImage && (
                                <motion.img
                                    src={content.personalInfo.profileImage}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                />
                            )}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h1 className="text-4xl font-bold mb-2">{content.personalInfo?.fullName || 'Your Name'}</h1>
                                <p className="text-xl text-blue-200">{content.personalInfo?.position || 'Professional Title'}</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Bar */}
                    <motion.div
                        className="bg-blue-800 text-white px-8 py-4 flex flex-wrap gap-6 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {content.personalInfo?.email && <span>✉️ {content.personalInfo.email}</span>}
                        {content.personalInfo?.phone && <span>📞 {content.personalInfo.phone}</span>}
                        {content.personalInfo?.location && <span>📍 {content.personalInfo.location}</span>}
                    </motion.div>

                    <div className="p-8">
                        {/* Professional Summary */}
                        {content.personalInfo?.summary && (
                            <motion.div
                                className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-900"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-xl font-bold text-blue-900 mb-3">PROFESSIONAL SUMMARY</h2>
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
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Professional Experience</h2>
                                {content.experience.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        className="mb-6"
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                                <p className="text-blue-800 font-semibold">{exp.company}</p>
                                            </div>
                                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </span>
                                        </div>
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
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Education</h2>
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
                                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                                        <p className="text-blue-800 font-semibold">{edu.school}</p>
                                        <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Skills */}
                        {content.skills?.length > 0 && (
                            <motion.div
                                className="mb-8"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Core Competencies</h2>
                                {content.skills.map((skillGroup, index) => (
                                    <motion.div
                                        key={index}
                                        className="mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">{skillGroup.category}</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {skillGroup.items?.map((skill, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="bg-blue-50 text-blue-900 px-4 py-2 rounded font-semibold text-center"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {skill}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
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
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Certifications</h2>
                                {content.certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        className="mb-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                                        <p className="text-blue-800 font-semibold">{cert.issuer}</p>
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
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Achievements</h2>
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
                                        <h3 className="text-lg font-bold text-gray-900">{achievement.title}</h3>
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
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Languages</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {content.languages.map((language, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex justify-between items-center bg-blue-50 p-3 rounded"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <span className="font-semibold text-gray-900">{language.name}</span>
                                            <span className="text-sm text-blue-900">{language.proficiency}</span>
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
                                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b-2 border-blue-900 pb-2">Interests</h2>
                                <div className="flex flex-wrap gap-2">
                                    {content.interests.map((interest, index) => (
                                        <motion.span
                                            key={index}
                                            className="bg-blue-100 text-blue-900 px-4 py-2 rounded font-semibold"
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

export default CorporateTemplate;
