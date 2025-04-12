import { useState } from "react";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { JavaObjectDisplay } from "./ui/JavaObjectDisplay";

export default function JavaObjectVisualizer() {
  const [input, setInput] = useState<string>("");
  const [formatted, setFormatted] = useState<string>("");
  const [isFormatted, setIsFormatted] = useState<boolean>(false);
  const [indentSize, setIndentSize] = useState<number>(4);

  const formatJavaObject = (input: string): void => {
    try {
      const objStr = input.trim();
      if (!objStr.includes("{") || !objStr.includes("}")) {
        throw new Error("Invalid Java object format");
      }

      const parseObject = (str: string): string => {
        let formattedStr = "";
        let depth = 0;

        for (let i = 0; i < str.length; i++) {
          const char = str[i];
          if (char === "{" || char === "[") {
            depth++;
            formattedStr += `${char}\n${" ".repeat(indentSize * depth)}`;
          } else if (char === "}" || char === "]") {
            depth--;
            formattedStr += `\n${" ".repeat(indentSize * depth)}${char}`;
          } else if (char === ",") {
            formattedStr += `,\n${" ".repeat(indentSize * depth)}`;
          } else {
            formattedStr += char;
          }
        }
        return formattedStr;
      };

      const formattedOutput = parseObject(objStr);
      setFormatted(formattedOutput);
      setIsFormatted(true);
    } catch (error) {
      if (error instanceof Error) {
        alert("Error formatting Java object: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-navy p-8 text-white">
      <h1 className="text-4xl mb-8 text-center">Java Object Visualizer</h1>

      <div className="w-[100vw] flex justify-center">
        <div className="flex w-[400px] flex-col">
          <div className="flex gap-4 mb-4">
            <Button onClick={() => formatJavaObject(input)}>Format</Button>
            <Button onClick={() => setIsFormatted(false)}>Raw</Button>
            <div className="flex items-center">
              <label className="mr-2">Indent Size:</label>
              <input
                type="number"
                min="1"
                max="8"
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="p-1 text-white w-16"
              />
            </div>
          </div>
          <Textarea
            className="h-full w-[400] p-2 border-black border-3 text-white resize-none rounded-md shadow-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Java object here..."
          />
        </div>

        <div className="w-1/2 h-full border-3 border-black rounded-md shadow-md ml-4 p-1 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none mt-[59px]">
          {/* {isFormatted && <JavaObjectDisplay content={formatted} />} */}
          {<JavaObjectDisplay content={isFormatted ? formatted : "Java Object Formatted..."} />}
        </div>
      </div>
    </div>
  );
}
