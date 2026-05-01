import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
    children: ReactNode;
    href?: string;
    variant?: "blue" | "yellow" | "white";
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
declare function Button({ children, href, variant, className, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

export { Button };
