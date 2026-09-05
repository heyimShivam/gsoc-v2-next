import { Organization, organizationImage } from "@/types/Organization";
import Image from "next/image";
export default function LogoTile({ org }: {
    org: Organization | organizationImage;
}) {
    return <div className={`logo-tile`} style={{ backgroundColor: org.imageBackgroundColor }}>
        <div className="org-logo-container">
            <Image
                src={org.imageUrl}
                alt={org.name}
                width={org.width | 200}
                height={org.height | 300}
                className="org-logo-image"
            />
        </div>
    </div>;
}