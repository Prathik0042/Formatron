import React from "react";

interface JavaObjectDisplayProps {
  content: string;
}

export const JavaObjectDisplay: React.FC<JavaObjectDisplayProps> = ({ content }) => {
  return (
    <div
      className="text-white p-4 rounded h-full w-full overflow-auto whitespace-pre-wrap font-mono text-sm select-none"
      aria-label="Formatted Java Object Display"
    >
      {content}
    </div>
  );
};
