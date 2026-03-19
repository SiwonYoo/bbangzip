"use client";

import { useId } from "react";

interface MemoEditorProps {
  breadName: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function MemoEditor({ breadName, content, setContent }: MemoEditorProps) {
  const textareaId = useId();

  return (
    <>
      <label htmlFor={textareaId} className="sr-only">
        {breadName}에 대한 메모
      </label>
      <textarea
        name={`breadMemo-${textareaId}`}
        id={textareaId}
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        className="h-full w-full p-1 rounded-lg border-2 border-accentgold resize-none"
        autoFocus
      ></textarea>
    </>
  );
}
