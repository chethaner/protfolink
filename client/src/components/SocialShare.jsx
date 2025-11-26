import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';

const SocialShare = ({ portfolioUrl, portfolioTitle }) => {
    const [showQR, setShowQR] = useState(false);
    const fullUrl = `${window.location.origin}${portfolioUrl}`;

    const shareOnLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
        window.open(linkedInUrl, '_blank', 'width=600,height=400');
    };

    const shareOnTwitter = () => {
        const text = `Check out my professional portfolio: ${portfolioTitle}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(fullUrl);
        toast.success('Link copied to clipboard!');
    };

    const downloadQR = () => {
        const canvas = document.getElementById('qr-code');
        const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${portfolioTitle}-QR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        toast.success('QR Code downloaded!');
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌐</span> Share This Portfolio
            </h3>

            {/* Share Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <button
                    onClick={shareOnLinkedIn}
                    className="flex items-center justify-center gap-2 bg-[#0077B5] text-white px-4 py-3 rounded-xl hover:bg-[#006399] transition font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="hidden md:inline">LinkedIn</span>
                </button>

                <button
                    onClick={shareOnTwitter}
                    className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white px-4 py-3 rounded-xl hover:bg-[#1a8cd8] transition font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                    <span className="hidden md:inline">Twitter</span>
                </button>

                <button
                    onClick={copyLink}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="hidden md:inline">Copy Link</span>
                </button>

                <button
                    onClick={() => setShowQR(!showQR)}
                    className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-xl hover:bg-gray-900 transition font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span className="hidden md:inline">QR Code</span>
                </button>
            </div>

            {/* QR Code Section */}
            {showQR && (
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-purple-300 animate-fadeIn">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <QRCodeSVG
                                id="qr-code"
                                value={fullUrl}
                                size={200}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                                Scan to View Portfolio
                            </h4>
                            <p className="text-gray-600 mb-4 text-sm">
                                Share this QR code on your business card, resume, or anywhere else!
                            </p>
                            <button
                                onClick={downloadQR}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download QR Code
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share URL Display */}
            <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1 font-medium">Portfolio URL:</p>
                <p className="text-sm text-gray-800 font-mono break-all">{fullUrl}</p>
            </div>
        </div>
    );
};

export default SocialShare;
