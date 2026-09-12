import { SiteHeader } from "@/components/SiteHeader";
import GuideHeader from "@/components/GuideHeader";
import GuideJourney from "@/components/GuideJourney";
import GuideFaq from "@/components/GuideFaq";

import "@/css/GuidePage.css";

export default function Guide() {
    return (
        <main className="app-shell landing-shell">
            <SiteHeader landing />
            <GuideHeader />
            <GuideJourney />
            <GuideFaq />
        </main>
    );
}