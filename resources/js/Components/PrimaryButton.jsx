export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md bg-high px-4 py-2 text-xs font-bold uppercase tracking-widest transition duration-150 ease-in-out hover:bg-highHover focus:bg-highHover focus:outline-none focus:ring-2 focus:ring-high focus:ring-offset-2 active:bg-highHover ${disabled ? 'cursor-not-allowed opacity-25' : 'border border-transparent'} ` +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
