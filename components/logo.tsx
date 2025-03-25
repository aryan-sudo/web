import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-8', className)}
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* Flow line */}
            <path
                d="M2 12 H38"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Nodes representing workflow stages */}
            <circle cx="8" cy="12" r="5" fill="currentColor" />
            <circle cx="20" cy="12" r="5" fill="currentColor" />
            <circle cx="32" cy="12" r="5" fill="currentColor" />
            {/* Connections to represent intelligence/automation */}
            <path
                d="M8 6 L20 2 L32 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 18 L20 22 L32 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-8', className)}
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* Flow line */}
            <path
                d="M2 12 H38"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            {/* Nodes representing workflow stages */}
            <circle cx="8" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="20" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="32" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Connections to represent intelligence/automation */}
            <path
                d="M8 6 L20 2 L32 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M8 18 L20 22 L32 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
}
