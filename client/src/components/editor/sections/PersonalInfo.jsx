import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import RichTextEditor from '../RichTextEditor';

const PersonalInfo = ({ data, onChange }) => {
    const [uploading, setUploading] = useState(false);
    const [showAIMenu, setShowAIMenu] = useState(false);
    const [aiProcessing, setAiProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleAIImprove = async (action) => {
        const text = data?.summary || '';
        if (!text.trim()) {
            toast.error('Please enter some text first');
            return;
        }

        setAiProcessing(true);
        setShowAIMenu(false);

        try {
            const { data: result } = await axios.post('/api/ai/improve', {
                text,
                action
            }, { withCredentials: true });

            onChange({ ...data, summary: result.improvedText });
            toast.success('Text improved!');
        } catch (error) {
            console.error('AI error:', error);
            toast.error('Failed to improve text. Make sure Ollama is running.');
        } finally {
            setAiProcessing(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            setUploading(true);

            const img = new Image();
            const reader = new FileReader();

            reader.onload = (event) => {
                img.src = event.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const maxWidth = 400;
                    const maxHeight = 400;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    onChange({ ...data, profileImage: compressedBase64 });
                    setUploading(false);
                };
            };

            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        onChange({ ...data, profileImage: '' });
    };

    return (
        <div className="space-y-4">
            {/* Profile Picture Upload */}
            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                    {data?.profileImage ? (
                        <div className="relative">
                            <img
                                src={data.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                                title="Remove image"
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-image-upload"
                        disabled={uploading}
                    />
                    <label
                        htmlFor="profile-image-upload"
                        className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {uploading ? 'Compressing...' : 'Upload Photo'}
                    </label>
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF. Auto-compressed to 400x400.</p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={data?.fullName || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    name="position"
                    value={data?.position || ''}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data?.email || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={data?.phone || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    value={data?.location || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={data?.linkedin || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                    <input
                        type="text"
                        name="github"
                        value={data?.github || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>
            </div>

            {/* Professional Summary with AI Dropdown */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                    <div className="relative">
                        <button
                            onClick={() => setShowAIMenu(!showAIMenu)}
                            disabled={aiProcessing}
                            className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition flex items-center gap-1 disabled:opacity-50"
                        >
                            {aiProcessing ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>✨</span>
                                    <span>AI Improve</span>
                                    <span className="ml-1">{showAIMenu ? '▲' : '▼'}</span>
                                </>
                            )}
                        </button>

                        {showAIMenu && !aiProcessing && (
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                                <button onClick={() => handleAIImprove('improve')} className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-sm rounded-t-lg">
                                    <span>✨</span><span>Improve Text</span>
                                </button>
                                <button onClick={() => handleAIImprove('professional')} className="w-full text-left px-4 py-2 hover:bg-purple-50 flex items-center gap-2 text-sm">
                                    <span>💼</span><span>Make Professional</span>
                                </button>
                                <button onClick={() => handleAIImprove('shorten')} className="w-full text-left px-4 py-2 hover:bg-orange-50 flex items-center gap-2 text-sm">
                                    <span>✂️</span><span>Make Shorter</span>
                                </button>
                                <button onClick={() => handleAIImprove('expand')} className="w-full text-left px-4 py-2 hover:bg-green-50 flex items-center gap-2 text-sm">
                                    <span>📝</span><span>Expand Details</span>
                                </button>
                                <button onClick={() => handleAIImprove('bullets')} className="w-full text-left px-4 py-2 hover:bg-pink-50 flex items-center gap-2 text-sm rounded-b-lg">
                                    <span>•</span><span>Convert to Bullets</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <RichTextEditor
                    value={data?.summary || ''}
                    onChange={(html) => onChange({ ...data, summary: html })}
                    disabled={aiProcessing}
                    placeholder="Briefly describe your professional background..."
                />
            </div>
        </div>
    );
};

export default PersonalInfo;
