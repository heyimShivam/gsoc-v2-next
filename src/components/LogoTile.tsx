import { Organization } from "@/types/Organization";
import Image from "next/image";
export default function LogoTile({ org }: {
    org: Organization;
}) {
    console.log("logo", org);
    return <div className={`logo-tile`} style={{ backgroundColor: org.imageBackgroundColor }}>

        <div className="org-logo-container">
            <Image
                src={org.imageUrl}
                alt={org.name}
                width={200}
                height={300}
                className="org-logo-image"
            />
        </div>
    </div>;
}