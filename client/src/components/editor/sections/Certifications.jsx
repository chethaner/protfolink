import { useState } from 'react';

const Certifications = ({ data = [], onChange }) => {
    const [certifications, setCertifications] = useState(data);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [draggedImageIndex, setDraggedImageIndex] = useState(null);

    const addCertification = () => {
        const newCert = { name: '', issuer: '', date: '', credentialId: '', link: '', images: [] };
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

    // Image compression function (same as Achievements)
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let width = img.width;
                    let height = img.height;
                    const maxSize = 800;

                    if (width > height && width > maxSize) {
                        height = (height / width) * maxSize;
                        width = maxSize;
                    } else if (height > maxSize) {
                        width = (width / height) * maxSize;
                        height = maxSize;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressed = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressed);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (index, files) => {
        const fileArray = Array.from(files);
        const compressedImages = await Promise.all(
            fileArray.map(async (file) => {
                const compressed = await compressImage(file);
                return { data: compressed, caption: '' };
            })
        );

        const updated = certifications.map((cert, i) => {
            if (i === index) {
                const existingImages = cert.images || [];
                return { ...cert, images: [...existingImages, ...compressedImages] };
            }
            return cert;
        });

        setCertifications(updated);
        onChange(updated);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            await handleImageUpload(index, files);
        }
    };

    const removeImage = (certIndex, imageIndex) => {
        const updated = certifications.map((cert, i) => {
            if (i === certIndex) {
                const images = cert.images.filter((_, idx) => idx !== imageIndex);
                return { ...cert, images };
            }
            return cert;
        });
        setCertifications(updated);
        onChange(updated);
    };

    const updateImageCaption = (certIndex, imageIndex, caption) => {
        const updated = certifications.map((cert, i) => {
            if (i === certIndex) {
                const images = cert.images.map((img, idx) =>
                    idx === imageIndex ? { ...img, caption } : img
                );
                return { ...cert, images };
            }
            return cert;
        });
        setCertifications(updated);
        onChange(updated);
    };

    const handleImageDragStart = (e, imageIndex) => {
        setDraggedImageIndex(imageIndex);
    };

    const handleImageDrop = (e, certIndex, targetImageIndex) => {
        e.preventDefault();
        e.stopPropagation();

        if (draggedImageIndex === null || draggedImageIndex === targetImageIndex) return;

        const updated = certifications.map((cert, i) => {
            if (i === certIndex) {
                const images = [...cert.images];
                const [removed] = images.splice(draggedImageIndex, 1);
                images.splice(targetImageIndex, 0, removed);
                return { ...cert, images };
            }
            return cert;
        });

        setCertifications(updated);
        onChange(updated);
        setDraggedImageIndex(null);
    };

    return (
        <>
            <div className="space-y-6">
                {certifications.map((cert, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Certification Name *
                                </label>
                                <input
                                    type="text"
                                    value={cert.name}
                                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="https://..."
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Certificate Images
                                </label>

                                <div
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer bg-gray-50"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleImageUpload(index, e.target.files)}
                                        className="hidden"
                                        id={`cert-image-${index}`}
                                    />
                                    <label htmlFor={`cert-image-${index}`} className="cursor-pointer">
                                        <div className="text-gray-600">
                                            <span className="text-4xl mb-2 block">📷</span>
                                            <p className="text-lg font-medium">Drop certificate images here or click to upload</p>
                                            <p className="text-sm text-gray-500 mt-1">Supports: JPG, PNG, GIF (Max 10MB each)</p>
                                        </div>
                                    </label>
                                </div>

                                {cert.images && cert.images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                        {cert.images.map((img, imgIndex) => (
                                            <div
                                                key={imgIndex}
                                                draggable
                                                onDragStart={(e) => handleImageDragStart(e, imgIndex)}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleImageDrop(e, index, imgIndex)}
                                                className="relative group cursor-move"
                                            >
                                                <img
                                                    src={img.data}
                                                    alt={img.caption || `Certificate ${imgIndex + 1}`}
                                                    onClick={() => setLightboxImage(img.data)}
                                                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-purple-500 transition cursor-pointer"
                                                />

                                                <input
                                                    type="text"
                                                    value={img.caption || ''}
                                                    onChange={(e) => updateImageCaption(index, imgIndex, e.target.value)}
                                                    placeholder="Add caption..."
                                                    className="w-full mt-1 px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-purple-500"
                                                    onClick={(e) => e.stopPropagation()}
                                                />

                                                <button
                                                    onClick={() => removeImage(index, imgIndex)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                                >
                                                    ✕
                                                </button>

                                                <div className="absolute top-2 left-2 bg-gray-800 text-white rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition">
                                                    ⋮⋮
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => removeCertification(index)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium mt-4"
                            >
                                Remove Certification
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={addCertification}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 transition font-medium"
                >
                    + Add Certification
                </button>
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition"
                        onClick={() => setLightboxImage(null)}
                    >
                        ✕
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Full size"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default Certifications;
