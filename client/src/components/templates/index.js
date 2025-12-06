import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import CorporateTemplate from './CorporateTemplate';
import TwoColumnTemplate from './TwoColumnTemplate';
import ThreeDTemplate from './ThreeDTemplate';
import LuxuryTemplate from './LuxuryTemplate';
import CyberTemplate from './CyberTemplate';

const templates = {
    modern: {
        id: 'modern',
        name: 'Modern',
        description: 'Gradient header with bold colors',
        component: ModernTemplate
    },
    minimal: {
        id: 'minimal',
        name: 'Minimal',
        description: 'Ultra-clean and elegant',
        component: MinimalTemplate
    },
    creative: {
        id: 'creative',
        name: 'Creative',
        description: 'Colorful sidebar design',
        component: CreativeTemplate
    },
    corporate: {
        id: 'corporate',
        name: 'Corporate',
        description: 'Professional blue theme',
        component: CorporateTemplate
    },
    'two-column': {
        id: 'two-column',
        name: 'Two Column',
        description: 'Sidebar layout for designers',
        component: TwoColumnTemplate
    },
    '3d': {
        id: '3d',
        name: '3D Immersive',
        description: '🚀 3D interactive portfolio with floating elements',
        component: ThreeDTemplate
    },
    'luxury': {
        id: 'luxury',
        name: 'Luxury Edition',
        description: '🎩 Premium Audemars Piguet-inspired design',
        component: LuxuryTemplate
    },
    'cyber': {
        id: 'cyber',
        name: 'Cyber Neon',
        description: '⚡ Futuristic dark theme with animated effects',
        component: CyberTemplate
    }
};

export const getTemplate = (templateId) => {
    return templates[templateId] || templates['modern'];
};

export { templates };
