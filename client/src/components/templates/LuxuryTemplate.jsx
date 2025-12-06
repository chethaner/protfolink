import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const LuxuryTemplate = ({ portfolio }) => {
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

    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <div className="bg-white text-black overflow-hidden" style={{ fontFamily: 'var(--font-body)' }}>
            {/* Hero Section */}
            <motion.section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center"
                style={{ y }}
            >
                <div className="luxury-container text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <h1 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        {personalInfo.position && (
                            <p className="text-2xl md:text-3xl text-gray-600 mb-8 tracking-wide">
                                {personalInfo.position}
                            </p>
                        )}
                        <div className="luxury-divider w-32 mx-auto"></div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent"></div>
                </motion.div>
            </motion.section>

            {/* About Section */}
            {personalInfo.summary && (
                <section className="luxury-section">
                    <div className="luxury-container max-w-5xl px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            {personalInfo.profileImage && (
                                <motion.div
                                    initial={{ opacity: 0, x: -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="relative"
                                >
                                    <img
                                        src={personalInfo.profileImage}
                                        alt={personalInfo.fullName}
                                        className="w-full aspect-square object-cover"
                                        style={{ filter: 'grayscale(100%)' }}
                                    />
                                    <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37] -z-10"></div>
                                </motion.div>
                            )}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                                    About
                                </h2>
                                <div
                                    className="text-gray-700 text-lg leading-relaxed prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: personalInfo.summary }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Experience Timeline */}
            {experience && experience.length > 0 && (
                <section className="luxury-section bg-gray-50">
                    <div className="luxury-container max-w-4xl px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Experience
                        </motion.h2>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#D4AF37]"></div>

                            {experience.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`relative mb-16 md:mb-24 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2'
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#D4AF37] rounded-full"></div>

                                    <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                        <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                            {exp.position}
                                        </h3>
                                        <p className="text-xl text-gray-600 mb-2">{exp.company}</p>
                                        <p className="text-sm text-gray-500 mb-4">
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </p>
                                        {exp.description && (
                                            <div
                                                className="text-gray-700 leading-relaxed prose max-w-none"
                                                dangerouslySetInnerHTML={{ __html: exp.description }}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="luxury-section">
                    <div className="luxury-container max-w-4xl px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Education
                        </motion.h2>

                        <div className="space-y-8">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {edu.degree}
                                    </h3>
                                    <p className="text-xl text-[#D4AF37] mb-2">{edu.school}</p>
                                    <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects Showcase */}
            {projects && projects.length > 0 && (
                <section className="luxury-section bg-gray-50">
                    <div className="luxury-container px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Selected Works
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative overflow-hidden mb-6 aspect-video bg-gray-100">
                                        {project.image && (
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
                                    </div>
                                    <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {project.name}
                                    </h3>
                                    {project.description && (
                                        <div
                                            className="text-gray-600 mb-4 prose max-w-none"
                                            dangerouslySetInnerHTML={{ __html: project.description }}
                                        />
                                    )}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-3 py-1 border border-gray-300 text-gray-600 tracking-wide"
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
                                            className="text-[#D4AF37] hover:underline"
                                        >
                                            View Project →
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="luxury-section bg-black text-white">
                    <div className="luxury-container max-w-4xl px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-white text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Expertise
                        </motion.h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {skills.map((skillGroup, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                >
                                    <h3 className="text-xl mb-6 text-[#D4AF37]" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {skillGroup.category}
                                    </h3>
                                    <ul className="space-y-3">
                                        {skillGroup.items && skillGroup.items.map((skill, i) => (
                                            <li key={i} className="text-gray-300">
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Certifications - ONLY SHOW IF THERE ARE CERTIFICATIONS */}
            {certifications && certifications.length > 0 && (
                <section className="luxury-section bg-gray-50">
                    <div className="luxury-container max-w-4xl px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Certifications
                        </motion.h2>

                        <div className="space-y-12">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {cert.name}
                                    </h3>
                                    <p className="text-xl text-[#D4AF37] mb-2">{cert.issuer}</p>
                                    <p className="text-sm text-gray-500 mb-4">{cert.date}</p>
                                    {cert.credentialId && (
                                        <p className="text-sm text-gray-500 mb-4">Credential ID: {cert.credentialId}</p>
                                    )}

                                    {/* Certificate Images - FIXED */}
                                    {cert.images && cert.images.length > 0 && (
                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {cert.images.map((img, imgIndex) => (
                                                <motion.div
                                                    key={imgIndex}
                                                    className="group cursor-pointer"
                                                    onClick={() => setLightboxImage(img.data)}
                                                    whileHover={{ y: -4 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="relative overflow-hidden bg-white shadow-lg">
                                                        <img
                                                            src={img.data}
                                                            alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                            className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300">
                                                            <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                                    </div>
                                                    {img.caption && (
                                                        <p className="text-sm text-gray-600 mt-2 text-center italic">{img.caption}</p>
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

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
                <section className="luxury-section">
                    <div className="luxury-container max-w-4xl px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Achievements
                        </motion.h2>

                        <div className="space-y-8">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                >
                                    <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {achievement.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">{achievement.date}</p>
                                    <div
                                        className="text-gray-700 prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: achievement.description }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section className="luxury-section bg-gray-50">
                    <div className="luxury-container max-w-4xl px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Languages
                        </motion.h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {languages.map((language, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {language.name}
                                    </h3>
                                    <p className="text-[#D4AF37]">{language.proficiency}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Interests */}
            {interests && interests.length > 0 && (
                <section className="luxury-section">
                    <div className="luxury-container max-w-4xl px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 text-4xl md:text-5xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Interests
                        </motion.h2>

                        <div className="flex flex-wrap justify-center gap-4">
                            {interests.map((interest, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 tracking-wide"
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section className="luxury-section bg-gray-50">
                <div className="luxury-container max-w-2xl text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="mb-8 text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                            Let's Connect
                        </h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Interested in working together? Let's start a conversation.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            {personalInfo.email && (
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="luxury-button luxury-button-gold px-10 py-4 inline-block"
                                >
                                    Get in Touch
                                </a>
                            )}
                            {personalInfo.linkedin && (
                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="luxury-button luxury-button-outline px-10 py-4 inline-block"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-[#D4AF37] transition"
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
                </div>
            )}

            {/* Footer */}
            <footer className="border-t border-gray-200 py-12">
                <div className="luxury-container text-center text-gray-500 text-sm tracking-wide px-4">
                    <p>© {new Date().getFullYear()} {personalInfo.fullName || 'Your Portfolio'}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LuxuryTemplate;
