interface MemoEditorProps {
  breadName: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function MemoEditor({ breadName, content, setContent }: MemoEditorProps) {
  return (
    <>
      <label htmlFor="breadMemo" className="sr-only">
        {breadName}에 대한 메모
      </label>
      <textarea
        name="breadMemo"
        id="breadMemo"
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        className="h-full w-full p-1 rounded-lg border-2 border-accentgold resize-none"
        autoFocus
      ></textarea>
    </>
  );
}
