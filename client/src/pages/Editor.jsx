import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import debounce from 'lodash.debounce';
import Sidebar from '../components/editor/Sidebar';
import TemplateSelector from '../components/editor/TemplateSelector';
import LinkedInImport from '../components/LinkedInImport';
import PersonalInfo from '../components/editor/sections/PersonalInfo';
import Experience from '../components/editor/sections/Experience';
import Education from '../components/editor/sections/Education';
import Projects from '../components/editor/sections/Projects';
import Skills from '../components/editor/sections/Skills';
import Certifications from '../components/editor/sections/Certifications';
import Achievements from '../components/editor/sections/Achievements';
import Languages from '../components/editor/sections/Languages';
import Interests from '../components/editor/sections/Interests';
import Preview from '../components/editor/Preview';

const Editor = () => {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('personal');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchPortfolio();
    }, [id]);

    const fetchPortfolio = async () => {
        try {
            const { data } = await axios.get(`/api/portfolios/${id}`);
            setPortfolio(data);
        } catch (error) {
            toast.error('Failed to load portfolio');
        } finally {
            setLoading(false);
        }
    };

    const savePortfolio = debounce(async (updatedData) => {
        try {
            await axios.put(`/api/portfolios/${id}`, updatedData);
            setIsSaving(false);
        } catch (error) {
            toast.error('Failed to save');
            setIsSaving(false);
        }
    }, 1000);

    const handleTemplateChange = (templateId) => {
        const updatedPortfolio = { ...portfolio, template: templateId };
        setPortfolio(updatedPortfolio);
        setIsSaving(true);
        savePortfolio(updatedPortfolio);
        toast.success('Template changed!');
    };

    const updateContent = (section, data) => {
        const updatedContent = { ...portfolio.content, [section]: data };
        const updatedPortfolio = { ...portfolio, content: updatedContent };
        setPortfolio(updatedPortfolio);
        setIsSaving(true);
        savePortfolio(updatedPortfolio);
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">{portfolio?.title || 'Portfolio Editor'}</h1>
                <div className="flex items-center gap-4">
                    <LinkedInImport
                        portfolioId={id}
                        onImportComplete={(data) => {
                            setPortfolio(data.portfolio);
                            toast.success('Data imported successfully!');
                        }}
                    />
                    <TemplateSelector
                        currentTemplate={portfolio?.template || 'modern'}
                        onTemplateChange={handleTemplateChange}
                    />
                    <div className="flex items-center gap-2">
                        {isSaving ? (
                            <span className="text-sm text-blue-600 flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            <span className="text-sm text-green-600 flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                All changes saved
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>

                {/* Editor + Preview */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Form Area */}
                    <div className="w-1/2 overflow-y-auto p-8 border-r">
                        <h2 className="text-2xl font-bold mb-6 capitalize">
                            {activeSection.replace(/([A-Z])/g, ' $1').trim()}
                        </h2>

                        {activeSection === 'personal' && (
                            <PersonalInfo
                                data={portfolio.content.personalInfo}
                                onChange={(data) => updateContent('personalInfo', data)}
                            />
                        )}
                        {activeSection === 'experience' && (
                            <Experience
                                data={portfolio.content.experience}
                                onChange={(data) => updateContent('experience', data)}
                            />
                        )}
                        {activeSection === 'education' && (
                            <Education
                                data={portfolio.content.education}
                                onChange={(data) => updateContent('education', data)}
                            />
                        )}
                        {activeSection === 'projects' && (
                            <Projects
                                data={portfolio.content.projects}
                                onChange={(data) => updateContent('projects', data)}
                            />
                        )}
                        {activeSection === 'skills' && (
                            <Skills
                                data={portfolio.content.skills}
                                onChange={(data) => updateContent('skills', data)}
                            />
                        )}
                        {activeSection === 'certifications' && (
                            <Certifications
                                data={portfolio.content.certifications}
                                onChange={(data) => updateContent('certifications', data)}
                            />
                        )}
                        {activeSection === 'achievements' && (
                            <Achievements
                                data={portfolio.content.achievements}
                                onChange={(data) => updateContent('achievements', data)}
                            />
                        )}
                        {activeSection === 'languages' && (
                            <Languages
                                data={portfolio.content.languages}
                                onChange={(data) => updateContent('languages', data)}
                            />
                        )}
                        {activeSection === 'interests' && (
                            <Interests
                                data={portfolio.content.interests}
                                onChange={(data) => updateContent('interests', data)}
                            />
                        )}
                    </div>

                    {/* Live Preview Area */}
                    <div className="w-1/2 bg-gray-50 overflow-y-auto p-8">
                        <div className="bg-white shadow-lg min-h-[800px] transform scale-90 origin-top">
                            <Preview portfolio={portfolio} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
