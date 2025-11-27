import { useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, disabled, placeholder }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command) => {
        editorRef.current?.focus();
        document.execCommand(command, false, null);
        handleInput();
    };

    return (
        <div className="border border-gray-300 rounded-md overflow-hidden">
            {/* Toolbar - Only working buttons */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-1">
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="px-3 py-1.5 hover:bg-gray-200 rounded text-sm font-bold transition"
                    title="Bold (Ctrl+B)"
                    disabled={disabled}
                >
                    <span className="font-bold">B</span>
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="px-3 py-1.5 hover:bg-gray-200 rounded text-sm italic transition"
                    disabled={disabled}
                >
                    <span className="italic">I</span>
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    className="px-3 py-1.5 hover:bg-gray-200 rounded text-sm underline transition"
                    disabled={disabled}
                >
                    <span className="underline">U</span>
                </button>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable={!disabled}
                onInput={handleInput}
                className={`p-3 min-h-[120px] max-h-[300px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-50' : 'bg-white'
                    }`}
                style={{
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                }}
                suppressContentEditableWarning
            >
                {!value && !disabled && (
                    <span className="text-gray-400 pointer-events-none select-none">
                        {placeholder}
                    </span>
                )}
            </div>
        </div>
    );
};

export default RichTextEditor;
