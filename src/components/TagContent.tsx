export default function TagContent({ title, tags }: {
    title: string;
    tags: string[];
}) {
    return <article className="tag-content">
        <h2>
            {title}
        </h2>
        <div className="chips">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
    </article>;
}