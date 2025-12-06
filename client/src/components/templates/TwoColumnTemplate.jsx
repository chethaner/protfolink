import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatText } from '../../utils/textFormatter';

const TwoColumnTemplate = ({ portfolio }) => {
    if (!portfolio) return null;

    const { content } = portfolio;
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [], certifications = [], achievements = [], languages = [], interests = [] } = content;
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <>
            <div className="max-w-5xl mx-auto bg-white flex min-h-screen">
                {/* Left Sidebar */}
                <motion.div
                    className="w-1/3 bg-gray-800 text-white p-8"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {personalInfo.profileImage && (
                        <motion.div
                            className="mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <img
                                src={personalInfo.profileImage}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-700"
                            />
                        </motion.div>
                    )}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                        {personalInfo.position && (
                            <p className="text-gray-300 text-lg">{personalInfo.position}</p>
                        )}
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h2 className="text-xl font-bold mb-4 text-blue-400">Contact</h2>
                        <div className="space-y-2 text-sm">
                            {personalInfo.email && <p>📧 {personalInfo.email}</p>}
                            {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
                            {personalInfo.location && <p>📍 {personalInfo.location}</p>}
                            {personalInfo.linkedin && <p className="break-all">🔗 LinkedIn</p>}
                            {personalInfo.github && <p className="break-all">💻 GitHub</p>}
                        </div>
                    </motion.div>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <h2 className="text-xl font-bold mb-4 text-blue-400">Skills</h2>
                            {skills.map((skillGroup, idx) => (
                                <motion.div
                                    key={idx}
                                    className="mb-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
                                >
                                    <h3 className="font-semibold text-sm mb-2">{skillGroup.category}</h3>
                                    <div className="space-y-1">
                                        {skillGroup.items?.map((skill, i) => (
                                            <div key={i} className="text-sm text-gray-300">• {skill}</div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            <h2 className="text-xl font-bold mb-4 text-blue-400">Education</h2>
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    className="mb-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 1.1 + idx * 0.1 }}
                                >
                                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                                    <p className="text-gray-300 text-sm">{edu.school}</p>
                                    <p className="text-gray-400 text-xs">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Right Content */}
                <div className="w-2/3 p-8">
                    {/* Summary */}
                    {personalInfo.summary && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
                            <div
                                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: personalInfo.summary }}
                            />
                        </motion.div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
                            <div className="space-y-6">
                                {experience.map((exp, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <p className="text-blue-600 font-semibold">{exp.company}</p>
                                            <span className="text-sm text-gray-500">
                                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: exp.description }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
                            <div className="space-y-4">
                                {projects.map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                                        {project.description && (
                                            <div
                                                className="text-gray-700 text-sm mb-2 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: project.description }}
                                            />
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
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h2>
                            <div className="space-y-6">
                                {certifications.map((cert, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    >
                                        <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                                        <p className="text-blue-600 font-semibold">{cert.issuer}</p>
                                        <p className="text-sm text-gray-500">{cert.date}</p>
                                        {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}

                                        {/* Certificate Images */}
                                        {cert.images && cert.images.length > 0 && (
                                            <div className="mt-3 grid grid-cols-2 gap-3">
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
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
                            <div className="space-y-4">
                                {achievements.map((achievement, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <h3 className="text-lg font-bold text-gray-900">{achievement.title}</h3>
                                        <p className="text-sm text-gray-500 mb-1">{achievement.date}</p>
                                        <div
                                            className="text-gray-700 text-sm prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: achievement.description }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {languages.map((language, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex justify-between items-center bg-gray-50 p-3 rounded"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <span className="font-semibold">{language.name}</span>
                                        <span className="text-sm text-gray-600">{language.proficiency}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Interests */}
                    {interests.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interests</h2>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((interest, index) => (
                                    <motion.span
                                        key={index}
                                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm"
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

export default TwoColumnTemplate;
