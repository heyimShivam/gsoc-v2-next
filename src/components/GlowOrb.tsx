import { Code2, UsersRound } from "lucide-react";

export function GlowOrb({ variant = "landing" }: { variant?: "landing" | "about" }) {
    return (
        <div className={`orb-scene globe-${variant}`} aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="orbit orbit-four" />
            <div className="globe">
                <svg className="globe-art" viewBox="0 0 240 240" focusable="false">
                    <defs>
                        <radialGradient id="globe-ocean" cx="30%" cy="16%" r="87%"><stop offset="0" stopColor="#b6f6ff" /><stop offset=".045" stopColor="#58d5ff" /><stop offset=".19" stopColor="#147bc9" /><stop offset=".48" stopColor="#0a438d" /><stop offset=".76" stopColor="#052554" /><stop offset="1" stopColor="#010916" /></radialGradient>
                        <linearGradient id="globe-land" x1=".1" y1=".05" x2=".86" y2="1"><stop stopColor="#79edff" /><stop offset=".4" stopColor="#32aeea" /><stop offset="1" stopColor="#0b579e" /></linearGradient>
                        <radialGradient id="globe-shine" cx="0" cy="0" r="1"><stop stopColor="#d6fbff" stopOpacity=".88" /><stop offset=".32" stopColor="#75e4ff" stopOpacity=".27" /><stop offset="1" stopColor="#78e8ff" stopOpacity="0" /></radialGradient>
                        <radialGradient id="globe-shadow" cx="0" cy=".5" r="1"><stop offset=".12" stopColor="#010815" stopOpacity="0" /><stop offset=".78" stopColor="#010815" stopOpacity=".08" /><stop offset="1" stopColor="#010815" stopOpacity=".82" /></radialGradient>
                        <linearGradient id="globe-rim" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b5f8ff" stopOpacity=".94" /><stop offset=".35" stopColor="#38ceff" stopOpacity=".58" /><stop offset=".72" stopColor="#126dce" stopOpacity=".14" /><stop offset="1" stopColor="#59d4ff" stopOpacity=".7" /></linearGradient>
                        <filter id="globe-soft-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.7" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                        <clipPath id="globe-clip"><circle cx="120" cy="120" r="116" /></clipPath>
                    </defs>
                    <circle className="globe-halo" cx="120" cy="120" r="119" />
                    <circle className="globe-base" cx="120" cy="120" r="116" fill="url(#globe-ocean)" />
                    <circle className="globe-shine" cx="77" cy="65" r="72" fill="url(#globe-shine)" />
                    <g className="globe-grid" clipPath="url(#globe-clip)">
                        <ellipse cx="120" cy="120" rx="115" ry="25" /><ellipse cx="120" cy="120" rx="115" ry="56" /><ellipse cx="120" cy="120" rx="115" ry="87" /><ellipse cx="120" cy="120" rx="115" ry="108" />
                        <ellipse cx="120" cy="120" rx="24" ry="116" /><ellipse cx="120" cy="120" rx="54" ry="116" /><ellipse cx="120" cy="120" rx="86" ry="116" /><path d="M4 120h232" />
                    </g>
                    <g className="globe-lands" clipPath="url(#globe-clip)" filter="url(#globe-soft-glow)">
                        <path d="M26 74c8-14 23-25 39-29l18 7 8 11 17 6 4 14-12 8-13-2-10 11-18-1-12 13-13-8-8-17z" />
                        <path d="M74 101l17 3 12 13 2 13 13 17-7 16-10 2-6 19-13 22-10-12 3-23-10-18 4-13-10-15z" />
                        <path d="M112 74l15-19 19 3 8 8 16-1 16 12 23 5 12 15-10 13-21 1-11 9-16-6-12 7-11-15-15-5-7-17z" />
                        <path d="M135 112l19-7 16 10 7 18-9 19 4 14-13 25-14-3-10-23 5-18-9-16z" />
                        <path d="M181 151l19 4 19 13-8 15-31-3-9-12z" /><path d="M195 61l14 2 13 13-8 10-20-7-7-11z" />
                        <path d="M44 57l8-8 11 5-3 7-10 3z" /><path d="M205 119l9 3-2 8-9-2z" />
                    </g>
                    <g className="globe-connections" clipPath="url(#globe-clip)">
                        <path d="M38 103Q71 84 105 95T172 85 208 105M49 146Q80 118 114 129T176 145 208 122M63 178Q95 145 126 156T179 177M83 56Q103 87 124 108T179 136M151 56Q146 86 165 102T200 157" />
                        <circle cx="38" cy="103" r="2.8" /><circle cx="73" cy="85" r="2.6" /><circle cx="105" cy="95" r="2.8" /><circle cx="142" cy="100" r="2.4" /><circle cx="172" cy="85" r="2.8" /><circle cx="208" cy="105" r="2.6" /><circle cx="49" cy="146" r="2.5" /><circle cx="84" cy="122" r="2.7" /><circle cx="114" cy="129" r="2.7" /><circle cx="151" cy="139" r="2.7" /><circle cx="176" cy="145" r="2.5" /><circle cx="63" cy="178" r="2.4" /><circle cx="126" cy="156" r="2.8" /><circle cx="179" cy="177" r="2.6" />
                    </g>
                    <circle className="globe-night-side" cx="120" cy="120" r="116" fill="url(#globe-shadow)" />
                    <path className="globe-limb" d="M38 70A116 116 0 0 1 209 178" /><circle className="globe-outline" cx="120" cy="120" r="116" stroke="url(#globe-rim)" />
                </svg>
            </div>
            <div className="orb-note note-top"><strong>500+</strong><small>Organizations</small></div>
            <div className="orb-note note-right">Real Data<br />Past Years</div>
            <div className="google-node" aria-label="Google"><span className="google-glyph">G</span></div>
            <div className="orb-icon code"><Code2 size={25} /></div>
            <div className="orb-icon people"><UsersRound size={25} /></div>
            <div className="orb-note impact-note">Make an Impact</div>
        </div>
    );
}
