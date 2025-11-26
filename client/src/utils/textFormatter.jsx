/**
 * Text Formatter Utility
 * Handles formatting of text with bullets, newlines, and links
 */

/**
 * Format text to preserve newlines and convert bullets to HTML
 * @param {string} text - Raw text that may contain \n and bullet points
 * @returns {JSX} - Formatted JSX with proper line breaks and bullets
 */
export const formatText = (text) => {
    if (!text) return null;

    // Split by newlines
    const lines = text.split('\n').filter(line => line.trim());

    // Check if text contains bullet points
    const hasBullets = lines.some(line =>
        line.trim().startsWith('•') ||
        line.trim().startsWith('-') ||
        line.trim().startsWith('*') ||
        /^\d+\./.test(line.trim()) // Numbered lists
    );

    if (hasBullets) {
        // Render as list
        return (
            <ul className="list-disc list-inside space-y-1">
                {lines.map((line, index) => {
                    // Remove bullet characters
                    const cleanLine = line
                        .trim()
                        .replace(/^[•\-\*]\s*/, '')
                        .replace(/^\d+\.\s*/, '');

                    return cleanLine ? (
                        <li key={index} className="text-gray-700">
                            {linkifyText(cleanLine)}
                        </li>
                    ) : null;
                })}
            </ul>
        );
    }

    // Regular text with line breaks
    return (
        <div className="space-y-2">
            {lines.map((line, index) => (
                <p key={index} className="text-gray-700">
                    {linkifyText(line)}
                </p>
            ))}
        </div>
    );
};

/**
 * Convert URLs in text to clickable links
 * @param {string} text - Text that may contain URLs
 * @returns {JSX} - Text with clickable links
 */
export const linkifyText = (text) => {
    if (!text) return null;

    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
        if (part.match(urlPattern)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};

/**
 * Format text for plain display (preserves newlines with CSS)
 * @param {string} text - Raw text
 * @returns {string} - Text with preserved formatting
 */
export const preserveNewlines = (text) => {
    return text;
};

export default {
    formatText,
    linkifyText,
    preserveNewlines
};
