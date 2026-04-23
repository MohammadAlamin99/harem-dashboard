"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Highlighter,
    Heading1,
    Heading2,
    Pilcrow,
    List,
    ListOrdered,
    Quote,
    Minus,
    AlignLeft,
    Type,
    RotateCcw,
    RotateCw,
    CheckSquare,
} from "lucide-react";

export default function WaiverBasicDetails() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            TaskList,
            TaskItem.configure({ nested: true }),
        ],
        content: "",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none min-h-[300px] p-4 max-w-none",
            },
        },
    });

    if (!editor) {
        return (
            <div className="w-full bg-white border border-[#E0E6EB] rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-[#29343D] text-lg font-bold mb-6">Basic Details</h2>
                <div className="animate-pulse bg-gray-50 h-64 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="font-manrope w-full bg-white rounded-2xl p-6 md:p-8 mt-6">
            <h2 className="text-[#29343D] text-lg font-bold mb-6">Basic Details</h2>

            {/* Waiver Name Input */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-[#29343D] mb-2">
                    Waiver Name *
                </label>
                <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-sm border border-[#E0E6EB] focus:outline-none focus:border-[#635BFF] transition-all text-[#29343D] placeholder:text-[#A3B1BB]"
                />
            </div>

            {/* Workable Text Editor */}
            <div>
                <label className="block text-sm font-semibold text-[#29343D] mb-2">
                    Text Editor
                </label>

                <div className="border border-[#E0E6EB] rounded-xl overflow-hidden focus-within:border-[#635BFF] transition-colors">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-[#FBFBFF] border-b border-[#E0E6EB]">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            active={editor.isActive("bold")}
                            icon={<Bold size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            active={editor.isActive("italic")}
                            icon={<Italic size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            active={editor.isActive("strike")}
                            icon={<Strikethrough size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            active={editor.isActive("code")}
                            icon={<Code size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHighlight().run()}
                            active={editor.isActive("highlight")}
                            icon={<Highlighter size={18} />}
                        />

                        <div className="w-px h-6 bg-[#E0E6EB] mx-1" />

                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            active={editor.isActive("heading", { level: 1 })}
                            icon={<Heading1 size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            active={editor.isActive("heading", { level: 2 })}
                            icon={<Heading2 size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setParagraph().run()}
                            active={editor.isActive("paragraph")}
                            icon={<Pilcrow size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            active={editor.isActive("bulletList")}
                            icon={<List size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            active={editor.isActive("orderedList")}
                            icon={<ListOrdered size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleTaskList().run()}
                            active={editor.isActive("taskList")}
                            icon={<CheckSquare size={18} />}
                        />

                        <div className="w-px h-6 bg-[#E0E6EB] mx-1" />

                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            active={editor.isActive("blockquote")}
                            icon={<Quote size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            icon={<Minus size={18} />}
                        />

                        <div className="grow" />

                        <ToolbarButton icon={<AlignLeft size={18} />} />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                            icon={<Type size={18} />}
                        />

                        <div className="w-px h-6 bg-[#E0E6EB] mx-1" />

                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            icon={<RotateCcw size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            icon={<RotateCw size={18} />}
                        />
                    </div>

                    {/* Editor Content Area */}
                    <EditorContent editor={editor} />
                </div>
            </div>

            <style jsx global>{`
        .ProseMirror {
          outline: none;
        }
        .ProseMirror p { margin-bottom: 0.5em; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5em; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5em; }
        .ProseMirror h1 { font-size: 1.5em; font-weight: bold; }
        .ProseMirror h2 { font-size: 1.25em; font-weight: bold; }
      `}</style>
        </div>
    );
}

function ToolbarButton({
    icon,
    onClick,
    active = false,
}: {
    icon: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded-md transition-all ${active
                ? "bg-[#635BFF] text-white"
                : "hover:bg-[#EFF4FA] text-[#526B7A]"
                }`}
        >
            {icon}
        </button>
    );
}