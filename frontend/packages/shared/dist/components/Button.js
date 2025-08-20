import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ title, onPress, variant = 'primary', disabled = false, className = '', }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100',
    };
    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
    return (_jsx("button", { className: buttonClasses, onClick: onPress, disabled: disabled, children: title }));
};
