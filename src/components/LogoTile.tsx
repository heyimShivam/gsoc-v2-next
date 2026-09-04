import { Organization } from "@/types/Organization";

export default function LogoTile({ org }: {
    org: Organization;
}) {
    return <div className={`logo-tile ${org.color}`}>
        <span>
            {org.initials}
        </span>
        <b>
            {org.name}
        </b>
    </div>;
}