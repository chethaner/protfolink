import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import ThreeDCard from '../3d/ThreeDCard';
import { get3DSettings } from '../3d/utils/helpers';

const ThreeDTemplate = ({ portfolio }) => {
    if (!portfolio) return null;

    const { content } = portfolio;
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [], certifications = [] } = content;
    const [activeSection, setActiveSection] = useState('profile');
    const [lightboxImage, setLightboxImage] = useState(null);
    const settings = get3DSettings();

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
            {/* 3D Background Canvas */}
            <div className="absolute inset-0">
                <Canvas dpr={settings.dpr} gl={{ antialias: settings.antialias }}>
                    <Suspense fallback={null}>
                        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Environment preset="city" />

                        {/* Floating background elements */}
                        <FloatingBackground />

                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.3}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                {/* Navigation */}
                <nav className="flex justify-center gap-4 mb-12">
                    {['profile', 'experience', 'projects', 'skills', 'certifications'].map((section) => (
                        <motion.button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`px-6 py-3 rounded-full font-semibold capitalize transition-all ${activeSection === section
                                ? 'bg-white text-purple-900 shadow-lg'
                                : 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {section}
                        </motion.button>
                    ))}
                </nav>

                {/* Profile Section */}
                {activeSection === 'profile' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <ThreeDCard glassEffect={true} className="max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {personalInfo.profileImage && (
                                    <img
                                        src={personalInfo.profileImage}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white/30"
                                    />
                                )}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-5xl font-black text-white mb-2">
                                        {personalInfo.fullName || 'Your Name'}
                                    </h1>
                                    {personalInfo.position && (
                                        <p className="text-2xl text-purple-200 mb-4">{personalInfo.position}</p>
                                    )}
                                    {personalInfo.summary && (
                                        <div
                                            className="text-white/80 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: personalInfo.summary }}
                                        />
                                    )}
                                </div>
                            </div>
                        </ThreeDCard>
                    </motion.div>
                )}

                {/* Experience Section */}
                {activeSection === 'experience' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {experience.map((exp, index) => (
                            <ThreeDCard key={index} glassEffect={true}>
                                <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                                <p className="text-purple-200 font-semibold mb-1">{exp.company}</p>
                                <p className="text-white/60 text-sm mb-4">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </p>
                                {exp.description && (
                                    <div
                                        className="text-white/80 prose prose-sm max-w-none prose-invert"
                                        dangerouslySetInnerHTML={{ __html: exp.description }}
                                    />
                                )}
                            </ThreeDCard>
                        ))}
                    </motion.div>
                )}

                {/* Projects Section */}
                {activeSection === 'projects' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {projects.map((project, index) => (
                            <ThreeDCard key={index} glassEffect={true} flippable={true} backContent={
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-4">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-purple-500/30 text-white rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-block text-purple-200 hover:text-white"
                                        >
                                            View Project →
                                        </a>
                                    )}
                                </div>
                            }>
                                <h3 className="text-2xl font-bold text-white mb-4">{project.name}</h3>
                                {project.description && (
                                    <div
                                        className="text-white/80 prose prose-sm max-w-none prose-invert"
                                        dangerouslySetInnerHTML={{ __html: project.description }}
                                    />
                                )}
                                <p className="text-purple-200 text-sm mt-4">Click to flip for details →</p>
                            </ThreeDCard>
                        ))}
                    </motion.div>
                )}

                {/* Skills Section */}
                {activeSection === 'skills' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {skills.map((skillGroup, index) => (
                            <ThreeDCard key={index} glassEffect={true}>
                                <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
                                <div className="space-y-2">
                                    {skillGroup.items?.map((skill, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                            <span className="text-white/80">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </ThreeDCard>
                        ))}
                    </motion.div>
                )}

                {/* Certifications Section */}
                {activeSection === 'certifications' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {certifications.map((cert, index) => (
                            <ThreeDCard key={index} glassEffect={true}>
                                <h3 className="text-2xl font-bold text-white mb-2">{cert.name}</h3>
                                <p className="text-purple-200 font-semibold mb-1">{cert.issuer}</p>
                                <p className="text-white/60 text-sm mb-4">{cert.date}</p>
                                {cert.credentialId && (
                                    <p className="text-white/60 text-sm mb-4">ID: {cert.credentialId}</p>
                                )}

                                {/* Certificate Images */}
                                {cert.images && cert.images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {cert.images.map((img, imgIndex) => (
                                            <div
                                                key={imgIndex}
                                                className="group cursor-pointer"
                                                onClick={() => setLightboxImage(img.data)}
                                            >
                                                <div className="relative overflow-hidden rounded-lg border-2 border-purple-500/30 hover:border-purple-400 transition">
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
                                                    <p className="text-xs text-purple-200 mt-1 text-center italic">{img.caption}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ThreeDCard>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-purple-400 transition"
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
        </div>
    );
};

// Floating background elements component
const FloatingBackground = () => {
    return (
        <>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[-3, 2, -2]}>
                    <torusGeometry args={[1, 0.3, 16, 100]} />
                    <meshStandardMaterial color="#9333ea" wireframe />
                </mesh>
            </Float>
            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
                <mesh position={[3, -2, -3]}>
                    <octahedronGeometry args={[1]} />
                    <meshStandardMaterial color="#ec4899" metalness={0.8} roughness={0.2} />
                </mesh>
            </Float>
            <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
                <mesh position={[0, 3, -4]}>
                    <icosahedronGeometry args={[0.8]} />
                    <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.3} />
                </mesh>
            </Float>
        </>
    );
};

export default ThreeDTemplate;
