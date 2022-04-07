import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNote } from "../../contexts/Note/NoteContext";
import "./Editor.css";

export default function Editor({ value, func }) {
  const { note, setNote } = useNote();
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  return (
    <ReactQuill
      modules={modules}
      placeholder="Enter Note..."
      value={value}
      onChange={func}
    />
  );
}
