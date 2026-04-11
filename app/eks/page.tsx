import Link from 'next/link'

export const metadata = { title: 'EKS — Kubernetes på AWS' }

export default function EKSPage() {
  return (
    <>
      <div className="page-hero">
        <div className="hero-eyebrow">☸️ Del 3 · En snabb titt</div>
        <h1>Amazon EKS — <span>Kubernetes</span></h1>
        <p className="lead">
          Elastic Kubernetes Service (EKS) är AWS:s hanterade Kubernetes-tjänst. AWS sköter
          control plane (API-server, etcd, scheduler) — du hanterar worker nodes och dina workloads.
          En snabb genomgång av koncept och skillnader mot ECS.
        </p>
        <div className="pill-row" style={{ marginTop: '20px' }}>
          <span className="pill pill-purple">Kubernetes</span>
          <span className="pill pill-blue">Control Plane</span>
          <span className="pill pill-teal">Worker Nodes</span>
          <span className="pill pill-orange">kubectl</span>
        </div>
      </div>

      <div className="content-area">

        {/* ── VAD ÄR EKS ── */}
        <h2 className="section-title">Vad är EKS?</h2>

        <div className="two-col">
          <div className="card card-purple">
            <h3>☸️ Kubernetes-standard</h3>
            <p>
              EKS kör standard upstream Kubernetes. Det innebär att alla verktyg, manifests och
              konfigurationer du skrivit för andra Kubernetes-kluster fungerar på EKS utan modifiering.
            </p>
          </div>
          <div className="card card-teal">
            <h3>🏗️ Hanterat Control Plane</h3>
            <p>
              AWS sköter API-servern, etcd-databasen, schedulern och controller manager —
              distribuerat över tre AZ. Du betalar $0.10/timme för control plane oavsett storlek.
            </p>
          </div>
        </div>

        {/* ── ARKITEKTUR ── */}
        <h2 className="section-title">EKS-arkitektur</h2>

        <div className="diagram-wrap">
          <svg viewBox="0 0 700 320" width="100%" style={{ maxWidth: 700 }}>
            <defs>
              <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {/* Control Plane — AWS managed */}
            <rect x="20" y="20" width="300" height="130" rx="10" fill="rgba(123,97,255,0.06)" stroke="rgba(123,97,255,0.3)" strokeWidth="1" strokeDasharray="5 3" />
            <text x="36" y="44" fill="#A08FFF" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="IBM Plex Mono, monospace">CONTROL PLANE (AWS managed)</text>
            <rect x="36" y="54" width="76" height="40" rx="6" fill="rgba(123,97,255,0.12)" stroke="rgba(123,97,255,0.3)" strokeWidth="1" />
            <text x="74" y="72" fill="#A08FFF" fontSize="10" fontWeight="600" textAnchor="middle">API</text>
            <text x="74" y="85" fill="#4A5A6A" fontSize="9" textAnchor="middle">Server</text>
            <rect x="124" y="54" width="76" height="40" rx="6" fill="rgba(123,97,255,0.12)" stroke="rgba(123,97,255,0.3)" strokeWidth="1" />
            <text x="162" y="72" fill="#A08FFF" fontSize="10" fontWeight="600" textAnchor="middle">etcd</text>
            <text x="162" y="85" fill="#4A5A6A" fontSize="9" textAnchor="middle">State store</text>
            <rect x="212" y="54" width="92" height="40" rx="6" fill="rgba(123,97,255,0.12)" stroke="rgba(123,97,255,0.3)" strokeWidth="1" />
            <text x="258" y="72" fill="#A08FFF" fontSize="10" fontWeight="600" textAnchor="middle">Scheduler</text>
            <text x="258" y="85" fill="#4A5A6A" fontSize="9" textAnchor="middle">+ Controller</text>
            <text x="170" y="130" fill="#4A5A6A" fontSize="10" textAnchor="middle">Distribuerat över 3 AZ · SLA 99.95%</text>

            {/* Worker Nodes */}
            <rect x="360" y="20" width="320" height="270" rx="10" fill="rgba(26,115,200,0.05)" stroke="rgba(26,115,200,0.25)" strokeWidth="1" strokeDasharray="5 3" />
            <text x="376" y="44" fill="#5BBBF0" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="IBM Plex Mono, monospace">WORKER NODES (du hanterar)</text>

            {/* Node 1 */}
            <rect x="376" y="54" width="128" height="220" rx="8" fill="rgba(26,115,200,0.06)" stroke="rgba(26,115,200,0.2)" strokeWidth="1" />
            <text x="440" y="74" fill="#5BBBF0" fontSize="10" fontWeight="500" textAnchor="middle" fontFamily="IBM Plex Mono, monospace">Node 1</text>
            <rect x="388" y="84" width="104" height="34" rx="5" fill="rgba(0,165,145,0.12)" stroke="rgba(0,165,145,0.3)" strokeWidth="1" />
            <text x="440" y="97" fill="#00A591" fontSize="10" fontWeight="600" textAnchor="middle">Pod</text>
            <text x="440" y="110" fill="#4A5A6A" fontSize="9" textAnchor="middle">app:web</text>
            <rect x="388" y="126" width="104" height="34" rx="5" fill="rgba(0,165,145,0.12)" stroke="rgba(0,165,145,0.3)" strokeWidth="1" />
            <text x="440" y="139" fill="#00A591" fontSize="10" fontWeight="600" textAnchor="middle">Pod</text>
            <text x="440" y="152" fill="#4A5A6A" fontSize="9" textAnchor="middle">app:api</text>
            <rect x="388" y="168" width="104" height="24" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <text x="440" y="183" fill="#4A5A6A" fontSize="9" textAnchor="middle">kubelet · kube-proxy</text>

            {/* Node 2 */}
            <rect x="518" y="54" width="128" height="220" rx="8" fill="rgba(26,115,200,0.06)" stroke="rgba(26,115,200,0.2)" strokeWidth="1" />
            <text x="582" y="74" fill="#5BBBF0" fontSize="10" fontWeight="500" textAnchor="middle" fontFamily="IBM Plex Mono, monospace">Node 2</text>
            <rect x="530" y="84" width="104" height="34" rx="5" fill="rgba(0,165,145,0.12)" stroke="rgba(0,165,145,0.3)" strokeWidth="1" />
            <text x="582" y="97" fill="#00A591" fontSize="10" fontWeight="600" textAnchor="middle">Pod</text>
            <text x="582" y="110" fill="#4A5A6A" fontSize="9" textAnchor="middle">app:web</text>
            <rect x="530" y="126" width="104" height="34" rx="5" fill="rgba(255,153,0,0.1)" stroke="rgba(255,153,0,0.25)" strokeWidth="1" />
            <text x="582" y="139" fill="#FF9900" fontSize="10" fontWeight="600" textAnchor="middle">Pod</text>
            <text x="582" y="152" fill="#4A5A6A" fontSize="9" textAnchor="middle">app:worker</text>
            <rect x="530" y="168" width="104" height="24" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <text x="582" y="183" fill="#4A5A6A" fontSize="9" textAnchor="middle">kubelet · kube-proxy</text>

            {/* Arrow: control → workers */}
            <line x1="322" y1="85" x2="358" y2="85" stroke="#7B61FF" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr2)" />
            <text x="340" y="78" fill="#4A5A6A" fontSize="9" textAnchor="middle">kubectl</text>

            {/* kubectl user */}
            <rect x="20" y="200" width="120" height="40" rx="8" fill="rgba(255,153,0,0.06)" stroke="rgba(255,153,0,0.2)" strokeWidth="1" />
            <text x="80" y="218" fill="#FF9900" fontSize="11" fontWeight="600" textAnchor="middle">Utvecklare</text>
            <text x="80" y="232" fill="#4A5A6A" fontSize="9" textAnchor="middle">kubectl apply -f ...</text>
            <line x1="140" y1="220" x2="170" y2="100" stroke="rgba(255,153,0,0.4)" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr2)" />
          </svg>
        </div>

        {/* ── KÄRNBEGREPP ── */}
        <h2 className="section-title">Kubernetes-kärnbegrepp</h2>
        <p className="section-sub">Det du måste känna till för att förstå EKS</p>

        <div className="two-col">
          <div className="card card-purple">
            <h3>🫛 Pod</h3>
            <p>Minsta deployerbara enheten i Kubernetes. En pod innehåller en eller flera tätt kopplade containers som delar nätverk (samma IP) och lagring.</p>
          </div>
          <div className="card card-teal">
            <h3>📦 Deployment</h3>
            <p>Deklarerar önskat tillstånd — t.ex. &quot;3 repliker av min-app:v2&quot;. Kubernetes controller arbetar kontinuerligt för att uppnå och hålla det tillståndet.</p>
          </div>
          <div className="card card-blue">
            <h3>🔌 Service</h3>
            <p>Stabilt nätverksslutpunkt för en grupp pods. Kubernetes tilldelar ett DNS-namn och ClusterIP. Typer: ClusterIP, NodePort, LoadBalancer.</p>
          </div>
          <div className="card card-accent">
            <h3>📐 Namespace</h3>
            <p>Logisk isolering inom klustret. Vanliga mönster: ett namespace per team, per miljö (dev/staging/prod) eller per applikation.</p>
          </div>
        </div>

        {/* ── MANIFEST EXEMPEL ── */}
        <h2 className="section-title">Deployment-manifest</h2>

        <div className="code-block">
          <div className="code-header">
            <span className="code-lang">YAML · Kubernetes</span>
            <span className="code-file">deployment.yaml</span>
          </div>
          <pre className="code-body">{`<span className="c-key">apiVersion</span>: <span className="c-str">apps/v1</span>
<span className="c-key">kind</span>: <span className="c-str">Deployment</span>
<span className="c-key">metadata</span>:
  <span className="c-key">name</span>: <span className="c-str">min-app</span>
  <span className="c-key">namespace</span>: <span className="c-str">production</span>
<span className="c-key">spec</span>:
  <span className="c-key">replicas</span>: <span className="c-num">3</span>
  <span className="c-key">selector</span>:
    <span className="c-key">matchLabels</span>:
      <span className="c-key">app</span>: <span className="c-str">min-app</span>
  <span className="c-key">strategy</span>:
    <span className="c-key">type</span>: <span className="c-str">RollingUpdate</span>
    <span className="c-key">rollingUpdate</span>:
      <span className="c-key">maxSurge</span>: <span className="c-num">1</span>
      <span className="c-key">maxUnavailable</span>: <span className="c-num">0</span>
  <span className="c-key">template</span>:
    <span className="c-key">metadata</span>:
      <span className="c-key">labels</span>:
        <span className="c-key">app</span>: <span className="c-str">min-app</span>
    <span className="c-key">spec</span>:
      <span className="c-key">containers</span>:
        - <span className="c-key">name</span>: <span className="c-str">web</span>
          <span className="c-key">image</span>: <span className="c-str">123456.dkr.ecr.eu-north-1.amazonaws.com/min-app:v2</span>
          <span className="c-key">ports</span>:
            - <span className="c-key">containerPort</span>: <span className="c-num">80</span>
          <span className="c-key">resources</span>:
            <span className="c-key">requests</span>:
              <span className="c-key">cpu</span>: <span className="c-str">"250m"</span>
              <span className="c-key">memory</span>: <span className="c-str">"256Mi"</span>
            <span className="c-key">limits</span>:
              <span className="c-key">cpu</span>: <span className="c-str">"500m"</span>
              <span className="c-key">memory</span>: <span className="c-str">"512Mi"</span>
          <span className="c-key">readinessProbe</span>:
            <span className="c-key">httpGet</span>:
              <span className="c-key">path</span>: <span className="c-str">/health</span>
              <span className="c-key">port</span>: <span className="c-num">80</span>
            <span className="c-key">initialDelaySeconds</span>: <span className="c-num">10</span>
            <span className="c-key">periodSeconds</span>: <span className="c-num">5</span>`}</pre>
        </div>

        {/* ── ECS vs EKS ── */}
        <h2 className="section-title">ECS vs EKS — När väljer du vad?</h2>

        <table className="compare-table">
          <thead>
            <tr>
              <th>Aspekt</th>
              <th>ECS</th>
              <th>EKS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inlärningskurva</td>
              <td>Låg — AWS-native koncept</td>
              <td>Brant — Kubernetes är komplext</td>
            </tr>
            <tr>
              <td>Portabilitet</td>
              <td>AWS-specifikt</td>
              <td>Standard Kubernetes — kör överallt</td>
            </tr>
            <tr>
              <td>Ekosystem</td>
              <td>AWS-verktyg</td>
              <td>Enormt open source-ekosystem (Helm, Istio...)</td>
            </tr>
            <tr>
              <td>Control plane-kostnad</td>
              <td>Gratis</td>
              <td>$0.10/timme (~$72/månad)</td>
            </tr>
            <tr>
              <td>Komplexitet</td>
              <td>Lägre — färre abstraktioner</td>
              <td>Högre — men mer flexibelt</td>
            </tr>
            <tr>
              <td>Välj om...</td>
              <td>Du kör allt på AWS, vill ha enkelhet</td>
              <td>Du behöver multi-cloud, avancerad scheduling</td>
            </tr>
          </tbody>
        </table>

        <div className="callout callout-teal">
          <span className="callout-icon">☸️</span>
          <span>
            EKS sätter upp klustret åt dig men du är fortfarande ansvarig för worker nodes (om du
            inte använder <strong>Fargate-profiler</strong> med EKS, som eliminerar nodhantering helt).
            Managed Node Groups förenklar node-livscykeln avsevärt.
          </span>
        </div>

        {/* ── KUBECTL SNABBREF ── */}
        <h2 className="section-title">kubectl — Snabbreferens</h2>

        <div className="code-block">
          <div className="code-header">
            <span className="code-lang">BASH</span>
            <span className="code-file">kubectl-kommandon.sh</span>
          </div>
          <pre className="code-body">{`<span className="c-comment"># Konfigurera kubectl för EKS</span>
aws eks update-kubeconfig --region eu-north-1 --name mitt-kluster

<span className="c-comment"># Lista resurser</span>
kubectl get pods -n production
kubectl get deployments
kubectl get services

<span className="c-comment"># Applicera manifest</span>
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

<span className="c-comment"># Rullande uppdatering</span>
kubectl set image deployment/min-app web=min-app:v3
kubectl rollout status deployment/min-app

<span className="c-comment"># Ångra senaste deployment</span>
kubectl rollout undo deployment/min-app

<span className="c-comment"># Debugga</span>
kubectl describe pod <pod-namn> -n production
kubectl logs <pod-namn> -n production --follow`}</pre>
        </div>

        {/* ── QUIZ ── */}
        <div className="quiz-wrap">
          <h2>🎯 Repetitionsfrågor — LB &amp; EKS</h2>
          <div className="quiz-item"><span className="quiz-num">Q1</span><span className="quiz-q">Vilken AWS Load Balancer-typ väljer du för en REST API med path-based routing? Varför?</span></div>
          <div className="quiz-item"><span className="quiz-num">Q2</span><span className="quiz-q">Vad är skillnaden mellan en Kubernetes Pod och ett Deployment?</span></div>
          <div className="quiz-item"><span className="quiz-num">Q3</span><span className="quiz-q">Nämn tre situationer där du väljer EKS framför ECS.</span></div>
          <div className="quiz-item"><span className="quiz-num">Q4</span><span className="quiz-q">Vad hanterar AWS i EKS och vad ansvarar du för själv?</span></div>
          <div className="quiz-item"><span className="quiz-num">Q5</span><span className="quiz-q">Vad gör <code>kubectl rollout undo</code> och när använder du det?</span></div>
        </div>
      </div>

      <nav className="page-nav">
        <Link href="/loadbalancer">
          <span className="nav-dir">← Föregående</span>
          <span className="nav-title">Load Balancer</span>
        </Link>
        <Link href="/ecs" className="next">
          <span className="nav-dir">Från början →</span>
          <span className="nav-title">ECS med EC2</span>
        </Link>
      </nav>
    </>
  )
}