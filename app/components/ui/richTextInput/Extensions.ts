import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight, all, common } from "lowlight";
const LowLight = createLowlight(all);
import js from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";












LowLight.register('js', js);
export const EditorExtensions = [
    StarterKit.configure({
        code: {
            HTMLAttributes: {
                class: "font-mono font-semibold py-1 bg-slate-800 rounded-sm px-1" 
            }
        },  
        bulletList: {
            HTMLAttributes: {
                class: "list-disc px-4 p-2"
            }
        },
        paragraph: {
            HTMLAttributes: {
                class: ''
            }
        },
        heading: {
            HTMLAttributes: {

            }
        }
    }),
    CodeBlockLowlight.configure({
        lowlight: LowLight,
        HTMLAttributes: {
            class: "p-2 rounded-sm font-mono text-xs border"
        }
    }),
    Underline.configure({
        HTMLAttributes: {
            class: "text-underline"
        }
    }),
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https'
    }),
    Heading.configure({
        levels: [1,2,3,4,5,6],
    })
]
