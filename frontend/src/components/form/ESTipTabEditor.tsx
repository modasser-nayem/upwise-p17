// components/form/ESTiptapEditor.tsx
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import { useEffect } from "react";
import clsx from "clsx";

export default function ESTiptapEditor({
	value,
	onChange,
}: {
	value: string;
	onChange: (val: string) => void;
}) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: value,
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] p-4 rounded-md border border-gray-300",
			},
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	}, [value, editor]);

	if (!editor) return null;

	return (
		<div className="space-y-2">
			{/* Toolbar */}
			<div className="flex flex-wrap gap-2 border rounded-md p-2 bg-white">
				<Button
					active={editor.isActive("bold")}
					onClick={() => editor.chain().focus().toggleBold().run()}
					label="Bold"
				/>
				<Button
					active={editor.isActive("italic")}
					onClick={() => editor.chain().focus().toggleItalic().run()}
					label="Italic"
				/>
				<Button
					active={editor.isActive("underline")}
					onClick={() =>
						editor.chain().focus().toggleUnderline().run()
					}
					label="Underline"
				/>
				<Button
					active={editor.isActive("heading", { level: 2 })}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					label="H2"
				/>
				<Button
					active={editor.isActive("bulletList")}
					onClick={() =>
						editor.chain().focus().toggleBulletList().run()
					}
					label="• List"
				/>
				<Button
					active={editor.isActive("blockquote")}
					onClick={() =>
						editor.chain().focus().toggleBlockquote().run()
					}
					label="❝"
				/>
				<Button
					active={editor.isActive("codeBlock")}
					onClick={() =>
						editor.chain().focus().toggleCodeBlock().run()
					}
					label="Code"
				/>
				<Button
					active={editor.isActive({ textAlign: "left" })}
					onClick={() =>
						editor.chain().focus().setTextAlign("left").run()
					}
					label="Left"
				/>
				<Button
					active={editor.isActive({ textAlign: "center" })}
					onClick={() =>
						editor.chain().focus().setTextAlign("center").run()
					}
					label="Center"
				/>
				<Button
					active={editor.isActive({ textAlign: "right" })}
					onClick={() =>
						editor.chain().focus().setTextAlign("right").run()
					}
					label="Right"
				/>
			</div>

			<EditorContent editor={editor} />
		</div>
	);
}

// Reusable button component for toolbar
function Button({
	label,
	onClick,
	active,
}: {
	label: string;
	onClick: () => void;
	active?: boolean;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={clsx(
				"px-2 py-1 text-sm rounded-md border hover:bg-gray-100",
				active
					? "bg-gray-200 font-semibold border-gray-400"
					: "bg-white border-gray-300"
			)}
		>
			{label}
		</button>
	);
}
