import { BarChart3 } from "lucide-react";
import TagContent from "./TagContent";

export default function OverviewContent() {
  return <div className="overview-grid">
    <article className="about-card">
      <h2>
        About
      </h2>
      <p>
        52°North develops open source software for geoinformatics, spatial data infrastructures and sensor web technologies. We contribute to open standards and research.
      </p>
      <div className="summary-stats">
        <div>
          <small>
            Years active
          </small>
          <b>
            2016 – 2026
          </b>
        </div>
        <div>
          <small>
            Total projects
          </small>
          <b>
            42
          </b>
        </div>
        <div>
          <small>
            Total contributors
          </small>
          <b>
            87
          </b>
        </div>
      </div>
    </article>
    <article className="chart-card">
      <h2>
        Projects completed in previous years
      </h2>
      <div className="large-chart">
        <BarChart3 size={32} />
        <svg viewBox="0 0 600 180">
          <path d="M0 140 C70 100,110 170,175 128 S270 78,330 88 S410 25,470 64 S545 104,600 136" />
        </svg>
      </div>
    </article>
    <TagContent
      title="Technologies"
      tags={["JavaScript", "Java", "Web Services", "OGC Standards", "Web", "Spring", "Big Data", "Android", "Python", "React"]}
    />
    <TagContent
      title="Topics"
      tags={["Geoinformatics", "Sensor Web", "Web-based Geoprocessing", "Spatial Data", "Earth Observation", "Remote Sensing", "Geostatistics", "OGC"]}
    />
  </div>;
}