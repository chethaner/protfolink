import { getTemplate } from '../templates';

const Preview = ({ portfolio }) => {
    if (!portfolio) return <div className="p-8 text-center text-gray-500">No data to preview</div>;

    const TemplateComponent = getTemplate(portfolio.template).component;
    return <TemplateComponent portfolio={portfolio} />;
};

export default Preview;
