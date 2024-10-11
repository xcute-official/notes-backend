"use client";

import clsx from "clsx";
import React from "react";
import { LuLoader2 } from "react-icons/lu";
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: ()=>void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
};
export const Button: React.FC<ButtonProps>=({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
})=>{
    return (
        <button onClick={onClick} type={type} disabled={disabled} className={clsx("flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", 
            disabled && "opacity-50 cursor-default",
            fullWidth && 'w-full',
            secondary ? 'text-gray-900' : 'text-white',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
        )}>
            {children}
        </button>
    )
}   








interface LoadingButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: ()=>void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    texts: [string, string];
};
export const LoadingButton: React.FC<LoadingButtonProps>=({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
    texts
})=>{
    return (
        <button onClick={onClick} type={type} disabled={disabled} className={clsx("flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", 
            disabled && "opacity-50 cursor-default",
            fullWidth && 'w-full',
            secondary ? 'text-gray-900' : 'text-white',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
        )}>
            {
                disabled ? (
                    <div className="flex items-center gap-2">
                        <span>{texts[1]}</span>
                        <span><LuLoader2 className="animate-spin"/></span>
                    </div>
                ):(
                    <div>
                        <span>{texts[0]}</span>
                    </div>
                )
            }
        </button>
    )
}