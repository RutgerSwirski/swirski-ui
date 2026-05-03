import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
    children: ReactNode;
    href?: string;
    variant?: "blue" | "yellow" | "white";
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
declare function Button({ children, href, variant, className, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

type CardProps = {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
};
declare function Card({ children, className, interactive }: CardProps): react_jsx_runtime.JSX.Element;

type CardMediaProps = {
    children: ReactNode;
    className?: string;
    aspect?: string;
};
declare function CardMedia({ children, className, aspect, }: CardMediaProps): react_jsx_runtime.JSX.Element;

declare function CardContent({ children, className, }: {
    children: ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

declare function CardTitle({ children }: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;

declare function CardMeta({ children }: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;

declare function CardBadge({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

export { Button, Card, CardBadge, CardContent, CardMedia, CardMeta, CardTitle };
