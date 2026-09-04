export default function Pill({ children, active = false, onClick }: {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={
                active ? "filter-pill active" : "filter-pill"
            }>
            {children}
        </button>
    );
}