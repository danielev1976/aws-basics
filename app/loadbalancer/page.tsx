import Link from 'next/link'

export const metadata = { title: 'Load Balancer — AWS Kurs' }

export default function LoadBalancerPage() {
  return (
    <>
      <div className="page-hero">
        <div className="hero-eyebrow">⚖️ Del 2 · Genomgång</div>
        <h1>AWS <span>Load Balancer</span></h1>
        <p className="lead">
          En Load Balancer distribuerar inkommande trafik över flera targets (EC2-instanser, containers,
          Lambda-funktioner) för att säkerställa hög tillgänglighet och feltolerans.
          AWS erbjuder tre varianter — vi går igenom alla tre.
        </p>
        <div className="pill-row" style={{ marginTop: '20px' }}>
          <span className="pill pill-orange">ALB</span>
          <span className="pill pill-blue">NLB</span>
          <span className="pill pill-teal">GLB</span>
          <span className="pill pill-purple">Target Groups</span>
        </div>
      </div>

      <div className="content-area">

        {/* ── VARFÖR LB ── */}
        <h2 className="section-title">Varför behöver vi en Load Balancer?</h2>
        <p className="section-sub">Tre kärnfunktioner</p>

        <div className="three-col">
          <div className="card card-accent">
            <h3>🔄 Trafikdistribution</h3>
            <p>Sprider requests jämnt (round-robin, least-connections) över alla friska targets så ingen enskild instans överbelastas.</p>
          </div>
          <div className="card card-blue">
            <h3>❤️ Hälsokontroll</h3>
            <p>Pingar regelbundet varje target. Osunda targets tas ur rotation automatiskt och återkopplas när de är friska igen.</p>
          </div>
          <div className="card card-teal">
            <h3>🔒 SSL-terminering</h3>
            <p>LB hanterar TLS-certifikat (via ACM). Backends kommunicerar internt på HTTP — enklare certifikathantering.</p>
          </div>
        </div>

        {/* ── LB TYPER ── */}
        <h2 className="section-title">De tre Load Balancer-typerna</h2>

        <div className="card card-accent" style={{ marginBottom: '12px' }}>
          <h3>🌐 Application Load Balancer (ALB) — Layer 7</h3>
          <p style={{ marginBottom: '12px' }}>
            Förstår HTTP/HTTPS. Kan routa trafik baserat på URL-sökväg, host-header, query-strängar
            och HTTP-metod. Standard-valet för webbapplikationer och mikrotjänster med ECS.
          </p>
          <div className="pill-row">
            <span className="pill pill-orange">Path-based routing</span>
            <span className="pill pill-orange">Host-based routing</span>
            <span className="pill pill-orange">WebSocket</span>
            <span className="pill pill-orange">gRPC</span>
            <span className="pill pill-orange">HTTP/2</span>
          </div>
          <div className="callout callout-orange" style={{ margin: '14px 0 0' }}>
            <span className="callout-icon">💡</span>
            <span>ALB + ECS: Varje ECS Service kopplas till en <strong>Target Group</strong>. ALB-listeners med regler
            routar trafik till rätt Target Group baserat på URL-prefix, t.ex. <code>/api/*</code> → api-service.</span>
          </div>
        </div>

        <div className="card card-blue" style={{ marginBottom: '12px' }}>
          <h3>⚡ Network Load Balancer (NLB) — Layer 4</h3>
          <p style={{ marginBottom: '12px' }}>
            Opererar på TCP/UDP-nivå. Extremt låg latens (microsekunder) och kan hantera
            miljontals requests per sekund. Statisk IP-adress per AZ.
          </p>
          <div className="pill-row">
            <span className="pill pill-blue">TCP / UDP / TLS</span>
            <span className="pill pill-blue">Statisk IP</span>
            <span className="pill pill-blue">Ultra-låg latens</span>
            <span className="pill pill-blue">PrivateLink</span>
          </div>
        </div>

        <div className="card card-teal">
          <h3>🛡️ Gateway Load Balancer (GLB) — Layer 3</h3>
          <p style={{ marginBottom: '12px' }}>
            Designad för att distribuera trafik till tredjepartsnätverksapparater — brandväggar,
            intrusion detection-system, deep packet inspection. Använder GENEVE-protokollet.
          </p>
          <div className="pill-row">
            <span className="pill pill-teal">Firewall appliances</span>
            <span className="pill pill-teal">IDS / IPS</span>
            <span className="pill pill-teal">GENEVE</span>
          </div>
        </div>

        {/* ── JÄMFÖRELSE ── */}
        <h2 className="section-title">Jämförelse</h2>

        <table className="compare-table">
          <thead>
            <tr>
              <th>Egenskap</th>
              <th>ALB</th>
              <th>NLB</th>
              <th>GLB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OSI-lager</td>
              <td>Layer 7 (HTTP)</td>
              <td>Layer 4 (TCP/UDP)</td>
              <td>Layer 3 (IP)</td>
            </tr>
            <tr>
              <td>Protokoll</td>
              <td>HTTP, HTTPS, WebSocket, gRPC</td>
              <td>TCP, UDP, TLS</td>
              <td>IP (GENEVE)</td>
            </tr>
            <tr>
              <td>Routing-logik</td>
              <td>Path, host, headers, metod</td>
              <td>Port, protokoll</td>
              <td>Transparent vidarebefordran</td>
            </tr>
            <tr>
              <td>Latens</td>
              <td>Millisekunder</td>
              <td>Microsekunder</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Statisk IP</td>
              <td>Nej (DNS)</td>
              <td>Ja (per AZ)</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Passar för</td>
              <td>Webb, API, mikrotjänster</td>
              <td>Gaming, IoT, realtid</td>
              <td>Säkerhetsapparater</td>
            </tr>
          </tbody>
        </table>

        {/* ── TARGET GROUPS ── */}
        <h2 className="section-title">Target Groups</h2>
        <p className="section-sub">Logiska grupper av targets som LB skickar trafik till</p>

        <div className="card">
          <p style={{ marginBottom: '14px' }}>
            En Target Group definierar <em>vad</em> trafiken ska skickas till och <em>hur</em>
            hälsokontroller ska utföras. Targets kan vara EC2-instanser, ECS-tasks (IP-mode),
            Lambda-funktioner eller IP-adresser.
          </p>
          <div className="two-col">
            <div className="info-block" style={{ background: 'rgba(255,153,0,0.05)', border: '1px solid rgba(255,153,0,0.1)', borderRadius: 8, padding: 16 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 8 }}>Konfiguration</h4>
              <ul className="bullet-list">
                <li>Target type: instance / ip / lambda</li>
                <li>Protocol &amp; Port</li>
                <li>VPC</li>
                <li>Health check path &amp; intervall</li>
              </ul>
            </div>
            <div className="info-block" style={{ background: 'rgba(26,115,200,0.05)', border: '1px solid rgba(26,115,200,0.1)', borderRadius: 8, padding: 16 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 8 }}>ECS-integration</h4>
              <ul className="bullet-list">
                <li>En Service = en Target Group</li>
                <li>awsvpc-läge → IP-mode targets</li>
                <li>ECS registrerar tasks automatiskt</li>
                <li>Deregistration delay vid deploy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── ROUTING RULES ── */}
        <h2 className="section-title">ALB Listener Rules — Exempel</h2>

        <div className="code-block">
          <div className="code-header">
            <span className="code-lang">YAML · AWS CloudFormation</span>
            <span className="code-file">alb-listener-rules.yml</span>
          </div>
          <pre className="code-body">{`<span className="c-comment"># Listener på port 443 (HTTPS)</span>
<span className="c-key">ListenerRules</span>:
  <span className="c-comment"># Regel 1: /api/* → api-service Target Group</span>
  - <span className="c-key">Priority</span>: <span className="c-num">10</span>
    <span className="c-key">Conditions</span>:
      - <span className="c-key">Field</span>: <span className="c-str">path-pattern</span>
        <span className="c-key">Values</span>: [<span className="c-str">"/api/*"</span>]
    <span className="c-key">Actions</span>:
      - <span className="c-key">Type</span>: <span className="c-str">forward</span>
        <span className="c-key">TargetGroupArn</span>: !Ref ApiServiceTargetGroup

  <span className="c-comment"># Regel 2: /admin/* med host-header</span>
  - <span className="c-key">Priority</span>: <span className="c-num">20</span>
    <span className="c-key">Conditions</span>:
      - <span className="c-key">Field</span>: <span className="c-str">host-header</span>
        <span className="c-key">Values</span>: [<span className="c-str">"admin.example.com"</span>]
    <span className="c-key">Actions</span>:
      - <span className="c-key">Type</span>: <span className="c-str">forward</span>
        <span className="c-key">TargetGroupArn</span>: !Ref AdminServiceTargetGroup

  <span className="c-comment"># Default: allt annat → web-frontend</span>
  - <span className="c-key">Priority</span>: <span className="c-str">default</span>
    <span className="c-key">Actions</span>:
      - <span className="c-key">Type</span>: <span className="c-str">forward</span>
        <span className="c-key">TargetGroupArn</span>: !Ref WebFrontendTargetGroup`}</pre>
        </div>

        <div className="callout callout-blue">
          <span className="callout-icon">ℹ️</span>
          <span>
            Regler utvärderas i prioritetsordning — lägst nummer = högst prioritet.
            Default-regeln (lägst prioritet) triggas alltid om ingen annan regel matchar.
          </span>
        </div>

      </div>

      <nav className="page-nav">
        <Link href="/ecs">
          <span className="nav-dir">← Föregående</span>
          <span className="nav-title">ECS med EC2</span>
        </Link>
        <Link href="/eks" className="next">
          <span className="nav-dir">Nästa →</span>
          <span className="nav-title">EKS — Kubernetes</span>
        </Link>
      </nav>
    </>
  )
}