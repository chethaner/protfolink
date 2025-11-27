// Improve text with AI
async function improveText(text, instruction = 'improve') {
    const prompts = {
        improve: `Improve the following text to be more professional, clear, and impactful. Return ONLY the improved text:\n\n${text}`,
        professional: `Rewrite the following text in a professional tone suitable for a resume. Return ONLY the rewritten text:\n\n${text}`,
        shorten: `Make the following text more concise while keeping key information. Return ONLY the shortened text:\n\n${text}`,
        expand: `Expand the following text with more details while maintaining professionalism. Return ONLY the expanded text:\n\n${text}`,
        bullets: `Convert the following text into an HTML unordered list with <ul> and <li> tags. Each key point should be a separate <li> item. Return ONLY the HTML:\n\n${text}`
    };

    const prompt = prompts[instruction] || prompts.improve;
    const rawResponse = await generateText(prompt);

    // For bullets, ensure proper HTML list format
    if (instruction === 'bullets') {
        // Check if response already has HTML tags
        if (rawResponse.includes('<ul>') || rawResponse.includes('<li>')) {
            // Clean up and return
            let cleaned = rawResponse
                .replace(/```html/g, '')
                .replace(/```/g, '')
                .replace(/^(Here is|Here's).*?:/gim, '')
                .trim();
            return cleaned;
        }

        // Convert plain bullet points to HTML list
        const lines = rawResponse
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const listItems = lines.map(line => {
            // Remove bullet characters
            const text = line.replace(/^[•\-\*\d\.]\s*/, '').trim();
            return `  <li>${text}</li>`;
        }).join('\n');

        return `<ul>\n${listItems}\n</ul>`;
    }

    // For other actions, just clean up
    return rawResponse
        .replace(/^(Here is|Here's|I've|I have).*?:/gim, '')
        .replace(/\*\*[^*]+\*\*:/g, '')
        .trim();
}
