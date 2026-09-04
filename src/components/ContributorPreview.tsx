import { Star } from "lucide-react";

const contributorData = [
    ["Aarav Sharma", "Core Maintainer", "AboutCode", "Python · Django · React", "1,248", "blue"], ["Priya Nair", "Backend Developer", "52°North", "Python · Flask · PostGIS", "986", "violet"], ["Miguel Santos", "Full Stack Developer", "Accord Project", "JavaScript · Node.js · Vue", "845", "green"], ["Aisha Khan", "ML Engineer", "ASWF", "Python · TensorFlow · PyTorch", "712", "orange"], ["Liam O’Connor", "DevOps Engineer", "AerospaceResearch.net", "Go · Kubernetes · Terraform", "678", "cyan"], ["Sofia Petrova", "Technical Writer", "3DTK", "Docs · Markdown · Git", "589", "pink"]
];

export default function ContributorPreview() {
    return <div className="contributor-mini-grid">
        {
            contributorData.slice(0, 3).map(
                (
                    [name, role, org, skills, score, color]
                ) => <article key={name}>
                        <div className={`profile-avatar ${color}`}>
                            {name.split(" ").map((part) => part[0]).join("")}
                        </div>
                        <h3>{name}</h3>
                        <p>{role} · {org}</p>
                        <div className="chips">
                            {skills.split(" · ").map(
                                (skill) => <span key={skill}>{skill}</span>
                            )}
                        </div>
                        <b>
                            <Star size={14} />{score} contributions</b></article>)}
    </div>;
}