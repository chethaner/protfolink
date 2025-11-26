import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import CorporateTemplate from './CorporateTemplate';
import TwoColumnTemplate from './TwoColumnTemplate';

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
    }
};

export const getTemplate = (templateId) => {
    return templates[templateId] || templates['modern'];
};

export { templates };
