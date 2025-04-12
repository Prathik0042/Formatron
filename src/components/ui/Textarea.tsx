import React, { useRef, useEffect } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ value, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scroll height
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      {...props}
      className={`w-full p-2 border rounded focus:outline-none font-mono shadow-md resize-none ${props.className}`}
    />
  );
};
