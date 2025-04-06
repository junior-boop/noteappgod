"use dom"

// src/Tiptap.tsx
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from "@tiptap/extension-placeholder"
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// importation du composant de la bible
import { useEffect, useState } from 'react'
import BibleVerset from './Extension-bible'
import NoteExtension from './Extension-note'
import TitleExtension from "./Extension-title"

import '@/global.css'
// define your extension array
const extensions = [
    StarterKit.configure({
        heading: {
            levels: [1, 2, 3]
        }
    }),
    Placeholder.configure({
        placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
                return 'What’s the title?'
            }

            if (node.type.name === "list") return "entrer votre element de la liste"

            return 'Can you add some further context?'
        }
    }),
    Highlight.configure({
        multicolor: true,
    }),
    Link.configure({
        autolink: true,
        openOnClick: true,
        shouldAutoLink: (url) => url.startsWith('https://'),
    }),
    BibleVerset,
    NoteExtension,
    TitleExtension,
    Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { class: "image-load" }
    })
]



const Tiptap = ({ data, onChange }: { data: string, onChange: ({ json: { }, html }: { json: {}, html: string, raw: string }) => Promise<{ json: {}, html: string, raw: string }> }) => {
    const [inputValue, setInputValue] = useState('')
    const [openVerset, setOpenVerset] = useState(false)
    const [image, setImage] = useState([])

    const content = `<title-component>Votre titre</title-component><p>Faites-nous grandir dans la foi.</p><p></p>`
    console.log(typeof data)
    const editor = useEditor({
        extensions,
        content: data,

        onBeforeCreate({ editor }) {
            // Before the view is created.
            // editor.isFocused = true
        },
        // onCreate({ editor }) {
        //     // The editor is ready.
        // },
        onUpdate({ editor }) {
            // The content has changed.
            // console.log(editor.getJSON(), editor.getHTML())
            onChange({
                json: editor.getJSON(),
                html: editor.getHTML(),
                raw: editor.getText()
            });
        },
        // onSelectionUpdate({ editor }) {
        //     // The selection has changed.
        // },
        // onTransaction({ editor, transaction }) {
        //     // The editor state has changed.
        // },
        // onFocus({ editor, event }) {
        //     // The editor is focused.
        // },
        // onBlur({ editor, event }) {
        //     // The editor isn’t focused anymore.
        // },
        // onDestroy() {
        //     // The editor is being destroyed.
        // },
        // onPaste(event: ClipboardEvent, slice: Slice) {
        //     // The editor is being pasted into.
        // },
        // onDrop(event: DragEvent, slice: Slice, moved: boolean) {
        //     // The editor is being pasted into.
        // },
        onContentError({ editor, error, disableCollaboration }) {
            // The editor content does not match the schema.
            console.error(error, editor)
        },
    })

    const handleBibleVerset = () => {
        editor?.commands.setVerset({ entry: inputValue })
        setOpenVerset(false)
        setInputValue('')
    }

    const handleImage = () => {
        console.log(image)
    }

    useEffect(() => {
        const base64 = async () => {
            const listImage = image[0]

            const fileReader = new FileReader()

            fileReader.addEventListener('load', () => {
                const result = fileReader.result
                editor?.commands.setImage({ src: result as string })
            })

            if (image.length !== 0) fileReader.readAsDataURL(listImage)
        }


        base64()
    }, [image])

    return (
        <div className='flex h-dvh w-full flex-col overflow-y-auto overflow-x-hidden'>
            <div className='flex-1 px-4 pt-2 pb-[150px]'>
                <EditorContent editor={editor} />
                <FloatingMenu className='floating-menu' editor={editor}>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={editor?.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M13 4h8v2h-8zm0 7h8v2h-8zm0 7h8v2h-8zm-6.5 1a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 2a4 4 0 1 0 0-8a4 4 0 0 0 0 8M5 6v3h3V6zM3 4h7v7H3z" /></svg>
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={editor?.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5.75 3.5H4.717l-1.467.393v1.553l1-.268V8.5H3V10h4V8.5H5.75zM10 4h11v2H10zm0 7h11v2H10zm0 7h11v2H10zm-7.125-2.375a2.125 2.125 0 1 1 3.812 1.292l-.004.006L5.316 18.5H7V20H3v-1.121l2.472-2.844a.625.625 0 1 0-1.094-.466l-.013.306h-1.49z" /></svg>
                    </button>
                    <button
                        onClick={handleImage}
                        className='relative'
                    >
                        <input type='file' className='input-image' onChange={({ target }) => setImage(target.files)} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3zm.008-12c.548 0 .992.445.992.993V13h-2V5H4v13.999L14 9l3 3v2.829l-3-3L6.827 19H14v2H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3zM8 7a2 2 0 1 1 0 4a2 2 0 0 1 0-4" /></svg>
                    </button>

                </FloatingMenu>
                <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={editor?.isActive('bold') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5M8 13v5h5.5a2.5 2.5 0 0 0 0-5z" /></svg>
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className={editor?.isActive('italic') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" /></svg>
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        className={editor?.isActive('strike') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M17.154 14q.346.774.346 1.72q0 2.014-1.571 3.147Q14.357 20 11.586 20q-2.46 0-4.87-1.145v-2.254q2.28 1.316 4.666 1.316q3.826 0 3.839-2.197a2.2 2.2 0 0 0-.648-1.603l-.12-.117H3v-2h18v2zm-4.078-3H7.629a4 4 0 0 1-.481-.522Q6.5 9.643 6.5 8.452q0-1.854 1.397-3.153T12.222 4q2.207 0 4.222.984v2.152q-1.8-1.03-3.946-1.03q-3.72 0-3.719 2.346q0 .63.654 1.099q.654.47 1.613.75q.93.27 2.03.699" /></svg>
                    </button>
                    <button
                        onClick={() => editor?.commands.toggleLink({ href: 'https://example.com', target: "_blank" })}
                        className={editor?.isActive('strike') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 0 0-7.071-7.071L9.878 7.05L8.464 5.636l1.414-1.414a7 7 0 0 1 9.9 9.9zm-2.829 2.828l-1.414 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 0 0 7.07 7.071l1.415-1.414zm-.707-10.607l1.415 1.415l-7.072 7.07l-1.414-1.414z" /></svg>
                    </button>
                    <button
                        onClick={() => editor?.commands.toggleHighlight({ color: '#ffcc00' })}
                        className={editor?.isActive('strike') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M15.243 4.511L8.505 11.25l-.707 2.121l-1.04 1.041l2.828 2.828l1.04-1.04l2.122-.708l6.737-6.737zm6.364 3.536a1 1 0 0 1 0 1.414l-7.778 7.778l-2.122.707l-1.414 1.415a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414L6.05 12.29l.707-2.122l7.779-7.778a1 1 0 0 1 1.414 0zm-6.364-.707l1.414 1.414l-4.95 4.95l-1.414-1.414zm-10.96 9.546l2.828 2.828l-1.414 1.415l-4.243-1.415z" /></svg>
                    </button>
                </BubbleMenu>
            </div>
            <div className='fixed bottom-0 w-full'>
                <div className='relative'>
                    <div className={`h-[52px] absolute w-full bg-slate-200 flex transition-all duration-300 z-[-1] ${openVerset ? "top-[-52px]" : "top-[0]"}`}>
                        <input value={inputValue} onChange={({ target }) => setInputValue(target.value)} type="text" className='flex-1 h-full px-4 outline-none' placeholder='Votre verset' />
                        <button onClick={handleBibleVerset} className=' aspect-square flex items-center justify-center actived:bg-slate-300' style={{ height: 52, aspectRatio: 1 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 7.828V20h-2V7.828l-5.364 5.364l-1.414-1.414L12 4l7.778 7.778l-1.414 1.414z" /></svg>
                        </button>
                    </div>
                    <div className='w-full bg-[#f2f2f2] h-[52px] flex gap-[2px] menu-bottom'>
                        <button
                            onClick={() => editor?.commands.setTitle()}
                            className={editor?.isActive('title') ? 'is-active' : ''}>
                            T
                        </button>
                        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
                        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}>H3</button>
                        <button onClick={() => editor?.chain().focus().setHardBreak().run()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M15 18h1.5a2.5 2.5 0 0 0 0-5H3v-2h13.5a4.5 4.5 0 1 1 0 9H15v2l-4-3l4-3zM3 4h18v2H3zm6 14v2H3v-2z" /></svg>
                        </button>

                        <button onClick={() => setOpenVerset(!openVerset)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3M8 7h3V5h2v2h3v2h-3v6h-2V9H8z" /></svg></button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Tiptap

