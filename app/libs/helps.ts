export const formatDate = (date:string)=>{
    const dt = new Date(date);
    return dt.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    }).replace(',', ' ');
}


import { JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/html";
import { EditorExtensions } from "../components/ui/richTextInput/Extensions";
export const giveHTML = async (jsonData: JSONContent)=>{
    const html = await generateHTML(jsonData, EditorExtensions);
    return html;
}








interface FormUrlQueryProps {
    params: string;
    key?: string;
    value?: string | null;
    keysToRemove?: string[];
}

import qs from 'query-string';
export const formUrlQuery = ({params, key, value, keysToRemove}: FormUrlQueryProps)=>{
    const currentUrl = qs.parse(params);
    if(keysToRemove){
        keysToRemove.forEach((keyToRemove)=>{
            delete currentUrl[keyToRemove]
        })
    }else if(key && value){
        currentUrl[key] = value;
    }
    return qs.stringifyUrl(
        {
            url: window.location.pathname, 
            query: currentUrl
        },{
            skipNull: true
        }
    )
}