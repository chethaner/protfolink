import { useState } from 'react';

const Certifications = ({ data = [], onChange }) => {
    const [certifications, setCertifications] = useState(data);

    const addCertification = () => {
        const newCert = { name: '', issuer: '', date: '', credentialId: '', link: '' };
        const updated = [...certifications, newCert];
        setCertifications(updated);
        onChange(updated);
    };

    const updateCertification = (index, field, value) => {
        const updated = certifications.map((cert, i) =>
            i === index ? { ...cert, [field]: value } : cert
        );
        setCertifications(updated);
        onChange(updated);
    };

    const removeCertification = (index) => {
        const updated = certifications.filter((_, i) => i !== index);
        setCertifications(updated);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            {certifications.map((cert, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Certification Name *
                            </label>
                            <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., AWS Cloud Practitioner"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Issuing Organization
                            </label>
                            <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Amazon Web Services"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Issue Date
                                </label>
                                <input
                                    type="text"
                                    value={cert.date}
                                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., June 2023"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Credential ID
                                </label>
                                <input
                                    type="text"
                                    value={cert.credentialId}
                                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="Optional"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Credential URL
                            </label>
                            <input
                                type="url"
                                value={cert.link}
                                onChange={(e) => updateCertification(index, 'link', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="https://..."
                            />
                        </div>
                        <button
                            onClick={() => removeCertification(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                            Remove Certification
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={addCertification}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
            >
                + Add Certification
            </button>
        </div>
    );
};

export default Certifications;
