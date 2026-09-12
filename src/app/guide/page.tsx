import "@/css/GuidePage.css";
import { SiteHeader } from "@/components/SiteHeader";
import GuideHeader from "@/components/GuideHeader";

export default function GuideJourney() {
    return (
        <main className="app-shell landing-shell">
            <SiteHeader landing />
            <GuideHeader />

        </main>
    );
}