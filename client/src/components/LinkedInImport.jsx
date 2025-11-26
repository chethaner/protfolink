import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const LinkedInImport = ({ onImportComplete, portfolioId }) => {
    const [file, setFile] = useState(null);
    const [importing, setImporting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
                setFile(selectedFile);
            } else {
                toast.error('Please upload a PDF file');
            }
        }
    };

    const handleImport = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        setImporting(true);
        const formData = new FormData();
        formData.append('linkedinPdf', file);
        formData.append('portfolioId', portfolioId);

        try {
            const { data } = await axios.post('/api/linkedin/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('LinkedIn data imported successfully!');
            setShowModal(false);
            setFile(null);
            if (onImportComplete) {
                onImportComplete(data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Import failed');
        } finally {
            setImporting(false);
        }
    };

    return (
        <>
            {/* Import Button */}
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import from LinkedIn
            </button>

            {/* Modal */}
            {showModal && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => !importing && setShowModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
                                <h2 className="text-2xl font-bold">Import from LinkedIn</h2>
                                <p className="text-blue-100 text-sm mt-1">
                                    Upload your LinkedIn profile PDF to auto-fill your portfolio
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {/* Instructions */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        How to get your LinkedIn PDF:
                                    </h3>
                                    <ol className="text-sm text-blue-800 space-y-1 ml-7 list-decimal">
                                        <li>Go to your LinkedIn profile</li>
                                        <li>Click "More" → "Save to PDF"</li>
                                        <li>Download the PDF file</li>
                                        <li>Upload it here</li>
                                    </ol>
                                </div>

                                {/* File Upload */}
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="linkedin-upload"
                                        disabled={importing}
                                    />
                                    <label
                                        htmlFor="linkedin-upload"
                                        className="cursor-pointer"
                                    >
                                        {file ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="font-semibold text-gray-900">{file.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFile(null);
                                                    }}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Choose different file
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="font-semibold text-gray-900">
                                                    Click to upload LinkedIn PDF
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    PDF files only, max 10MB
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                {/* Warning */}
                                <div className="mt-4 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <p>
                                        Importing will <strong>overwrite</strong> existing data in your portfolio.
                                        Make sure to save any important changes first.
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    disabled={importing}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleImport}
                                    disabled={!file || importing}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {importing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Importing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            Import Data
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LinkedInImport;
