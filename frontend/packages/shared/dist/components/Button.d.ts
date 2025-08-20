import React from 'react';
export interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    className?: string;
}
export declare const Button: React.FC<ButtonProps>;
