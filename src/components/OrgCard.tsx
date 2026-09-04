import { Organization } from "@/types/Organization";
import { Star, UsersRound } from "lucide-react";
import LogoTile from "./LogoTile";
import Link from "next/link";
export function OrgCard({ org, list = false }: {
    org: Organization;
    list?: boolean;
}) {
    console.log(org, list);
    return (<><Link
        href={`/organizations/${org.id}`}
        className={list ? "org-card list-card" : "org-card"}
    >
        <LogoTile org={org} />
        <div className="org-card-body">
            <div className="card-title">
                <h3>
                    {org.name}
                </h3>
                <span className={org.status === "Active" ? "status done" : "status inactive-status"}>
                    {org.status}
                </span>
            </div>
            <p>
                {org.description}
            </p>
            <div className="chips">
                {org.technologies.map((tag) => <span key={tag}>{tag}</span>)}
                <span>
                    +
                    {org.topics.length + 2}
                </span>
            </div>
            <div className="org-card-footer">
                <span>
                    {org.years}
                </span>
                <span>
                    <Star size={14} />
                    {org.stars}
                </span>
                <span>
                    <UsersRound size={14} />
                    {org.people}
                </span>
            </div>
        </div>
    </Link></>);
}