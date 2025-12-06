import { motion } from 'framer-motion';
import { useState } from 'react';

const CyberTemplate = ({ portfolio }) => {
    const [lightboxImage, setLightboxImage] = useState(null);

    if (!portfolio) return null;

    const { content } = portfolio;
    const {
        personalInfo = {},
        experience = [],
        education = [],
        projects = [],
        skills = [],
        certifications = [],
        achievements = [],
        languages = [],
        interests = []
    } = content;

    return (
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white min-h-screen">
            {/* Animated Background Stars */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Navigation */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div
                        className="text-2xl font-bold text-cyan-400"
                        whileHover={{ scale: 1.05 }}
                    >
                        ★ Portfolio
                    </motion.div>
                    <div className="flex gap-6">
                        {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
                <div className="max-w-4xl text-center relative z-10">
                    <motion.h1
                        className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </motion.h1>

                    <motion.p
                        className="text-2xl md:text-3xl text-gray-300 mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {personalInfo.position || 'Professional Title'}
                    </motion.p>

                    {/* Stats Cards */}
                    <motion.div
                        className="grid grid-cols-3 gap-6 mt-12"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.6)' }}
                        >
                            <div className="text-4xl font-bold text-cyan-400">{new Date().getFullYear()}</div>
                            <div className="text-sm text-gray-400 mt-2">Expected Graduation</div>
                        </motion.div>
                        <motion.div
                            className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.6)' }}
                        >
                            <div className="text-4xl font-bold text-cyan-400">{projects.length}+</div>
                            <div className="text-sm text-gray-400 mt-2">Projects Completed</div>
                        </motion.div>
                        <motion.div
                            className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.6)' }}
                        >
                            <div className="text-4xl font-bold text-cyan-400">{skills.length}+</div>
                            <div className="text-sm text-gray-400 mt-2">Skills Learning</div>
                        </motion.div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex gap-4 justify-center mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {personalInfo.email && (
                            <motion.a
                                href={`mailto:${personalInfo.email}`}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                📧 Contact Me
                            </motion.a>
                        )}
                        <motion.button
                            className="px-8 py-4 border-2 border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🚀 View My Work
                        </motion.button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex gap-6 justify-center mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {personalInfo.github && (
                            <motion.a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 transition-colors"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                💻
                            </motion.a>
                        )}
                        {personalInfo.linkedin && (
                            <motion.a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 transition-colors"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                            >
                                📧
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center pt-2">
                        <motion.div
                            className="w-1 h-2 bg-cyan-400 rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* About Section */}
            {personalInfo.summary && (
                <section id="about" className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            className="text-4xl font-bold mb-12 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-cyan-400">About</span> Me
                        </motion.h2>
                        <motion.div
                            className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div
                                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: personalInfo.summary }}
                            />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
                <section id="skills" className="py-20 px-6 bg-gray-900/50">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            className="text-4xl font-bold mb-12 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-cyan-400">Skills</span> & Expertise
                        </motion.h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((skillGroup, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.4)' }}
                                >
                                    <h3 className="text-xl font-bold text-cyan-400 mb-4">{skillGroup.category}</h3>
                                    <ul className="space-y-2">
                                        {skillGroup.items && skillGroup.items.map((skill, i) => (
                                            <li key={i} className="text-gray-300 flex items-center gap-2">
                                                <span className="text-cyan-400">▹</span> {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {projects && projects.length > 0 && (
                <section id="projects" className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            className="text-4xl font-bold mb-12 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Featured <span className="text-cyan-400">Projects</span>
                        </motion.h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl overflow-hidden group"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.4)' }}
                                >
                                    {project.image && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-cyan-400 mb-3">{project.name}</h3>
                                        {project.description && (
                                            <div
                                                className="text-gray-300 mb-4 prose prose-sm prose-invert max-w-none"
                                                dangerouslySetInnerHTML={{ __html: project.description }}
                                            />
                                        )}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs border border-cyan-500/30"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                View Project →
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience Section */}
            {experience && experience.length > 0 && (
                <section className="py-20 px-6 bg-gray-900/50">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            className="text-4xl font-bold mb-12 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Work <span className="text-cyan-400">Experience</span>
                        </motion.h2>
                        <div className="space-y-8">
                            {experience.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6"
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.01, borderColor: 'rgba(34, 211, 238, 0.4)' }}
                                >
                                    <h3 className="text-2xl font-bold text-cyan-400 mb-2">{exp.position}</h3>
                                    <p className="text-xl text-gray-300 mb-2">{exp.company}</p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </p>
                                    {exp.description && (
                                        <div
                                            className="text-gray-300 prose prose-sm prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: exp.description }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
                <section id="certificates" className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            className="text-4xl font-bold mb-12 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-cyan-400">Certifications</span>
                        </motion.h2>
                        <div className="space-y-8">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <h3 className="text-2xl font-bold text-cyan-400 mb-2">{cert.name}</h3>
                                    <p className="text-xl text-gray-300 mb-2">{cert.issuer}</p>
                                    <p className="text-sm text-gray-500 mb-4">{cert.date}</p>
                                    {cert.credentialId && (
                                        <p className="text-sm text-gray-500 mb-4">Credential ID: {cert.credentialId}</p>
                                    )}

                                    {/* Certificate Images */}
                                    {cert.images && cert.images.length > 0 && (
                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {cert.images.map((img, imgIndex) => (
                                                <motion.div
                                                    key={imgIndex}
                                                    className="group cursor-pointer"
                                                    onClick={() => setLightboxImage(img.data)}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <div className="relative overflow-hidden rounded-lg border-2 border-cyan-500/30 hover:border-cyan-400 transition-all">
                                                        <img
                                                            src={img.data}
                                                            alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                            className="w-full h-48 object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all">
                                                            <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                                                        </div>
                                                    </div>
                                                    {img.caption && (
                                                        <p className="text-sm text-gray-400 mt-2 text-center">{img.caption}</p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 bg-gray-900/50">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Let's <span className="text-cyan-400">Connect</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-300 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Interested in working together? Let's start a conversation.
                    </motion.p>
                    {personalInfo.email && (
                        <motion.a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📧 Get in Touch
                        </motion.a>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-cyan-500/20 py-8">
                <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} {personalInfo.fullName || 'Your Portfolio'}. All rights reserved.</p>
                </div>
            </footer>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <motion.div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-cyan-400 transition"
                        onClick={() => setLightboxImage(null)}
                    >
                        ×
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Certificate"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </motion.div>
            )}
        </div>
    );
};

export default CyberTemplate;
