import { site } from "@/lib/site";

export function HeatingNote() {
  return (
    <section className="section" aria-labelledby="heating-h">
      <div className="container">
        <div className="panel heating-note">
          <div>
            <h2 id="heating-h" style={{ fontSize: "1.4rem", marginBottom: "0.3em" }}>Need a boiler or central heating engineer?</h2>
            <p style={{ margin: 0 }}>
              Plumbees looks after plumbing, drainage and bathrooms. For boilers, heating and gas appliances, our heating team at Heatingology is the right place to go.
            </p>
          </div>
          <a className="btn btn-outline" href={site.heatingUrl} rel="noopener">Visit Heatingology</a>
        </div>
      </div>
    </section>
  );
}
