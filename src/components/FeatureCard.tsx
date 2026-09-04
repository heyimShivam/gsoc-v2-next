export function FeatureCard(
    {
        icon, title, copy
    }: {
        icon: React.ReactNode; title: string; copy: string
    }) {
    return (
        <div className="feature-card">
            <span className="feature-icon">{icon}</span>
            <div>
                <h3>{title}</h3>
                <p>{copy}</p>
            </div>
        </div>
    );
}