import Link from 'next/link'

export const metadata = { title: 'ECS med EC2 — AWS Kurs' }

export default function ECSPage() {
  return (
    <>
      <div className="page-hero">
        <div className="hero-eyebrow">🐳 Del 1 · Containrar på AWS</div>
        <h1>Amazon ECS <span>med EC2</span></h1>
        <p className="lead">
          Elastic Container Service (ECS) är AWS:s fully managed container orchestration-tjänst.
          Med EC2-starttypen kör du dina containers på egna virtuella maskiner — med full kontroll
          över instanstyp, nätverk och kostnad.
        </p>
        <div className="pill-row" style={{ marginTop: '20px' }}>
          <span className="pill pill-orange">Amazon ECS</span>
          <span className="pill pill-blue">EC2 Launch Type</span>
          <span className="pill pill-teal">Docker</span>
          <span className="pill pill-green">Container Orchestration</span>
        </div>
      </div>

      <div className="content-area">

        {/* ── VAD ÄR ECS ── */}
        <h2 className="section-title">Vad är Amazon ECS?</h2>
        <p className="section-sub">Fullständigt hanterad orkestreringstjänst för Docker-containers</p>

        <div className="two-col">
          <div className="card card-accent">
            <h3>🎯 Syfte</h3>
            <p>
              ECS låter dig köra, stoppa och hantera Docker-containers på ett kluster av maskiner.
              Du beskriver hur din applikation ska köras i en <em>Task Definition</em> och ECS
              sköter placeringen, schemaläggningen och hälsoövervakningen.
            </p>
          </div>
          <div className="card card-blue">
            <h3>⚙️ EC2 vs Fargate</h3>
            <p>
              Med <strong>EC2-starttypen</strong> äger du infrastrukturen — du väljer instanstyp,
              betalar per server och har full nätverkskontroll. Med Fargate hanterar AWS allt
              underliggande. Den här kursen fokuserar på EC2-starttypen.
            </p>
          </div>
        </div>

        {/* ── ARKITEKTURDIAGRAM ── */}
        <h2 className="section-title" style={{ marginTop: '40px' }}>ECS-arkitektur</h2>
        <p className="section-sub">Hierarkin från kluster ner till enskild container</p>

        <div className="diagram-wrap">
          <svg viewBox="0 0 700 340" width="100%" style={{ maxWidth: 700 }}>
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {/* Cluster box */}
            <rect x="20" y="20" width="660" height="300" rx="14" fill="none" stroke="rgba(255,153,0,0.3)" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x="36" y="44" fill="#FF9900" fontSize="11" fontWeight="600" letterSpacing="0.1em" fontFamily="IBM Plex Mono, monospace">ECS CLUSTER</text>

            {/* Service box */}
            <rect x="40" y="58" width="620" height="240" rx="10" fill="none" stroke="rgba(91,187,240,0.25)" strokeWidth="1" strokeDasharray="4 3" />
            <text x="56" y="78" fill="#5BBBF0" fontSize="10" fontWeight="600" letterSpacing="0.08em" fontFamily="IBM Plex Mono, monospace">ECS SERVICE</text>

            {/* EC2 instances */}
            <rect x="60" y="90" width="185" height="190" rx="8" fill="rgba(26,115,200,0.08)" stroke="rgba(26,115,200,0.3)" strokeWidth="1" />
            <text x="152" y="112" fill="#5BBBF0" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="IBM Plex Mono, monospace">EC2 Instance</text>

            <rect x="76" y="124" width="153" height="50" rx="6" fill="rgba(255,153,0,0.1)" stroke="rgba(255,153,0,0.3)" strokeWidth="1" />
            <text x="152" y="146" fill="#FF9900" fontSize="11" fontWeight="600" textAnchor="middle">Task</text>
            <text x="152" y="162" fill="#7A8A9A" fontSize="10" textAnchor="middle">web:80 · api:3000</text>

            {/* Repeat other EC2 instances and tasks as before ... */}
          </svg>
        </div>

        {/* ── NYCKELBEGREPP ── */}
        <h2 className="section-title">Nyckelbegrepp</h2>
        <p className="section-sub">Fyra lager du måste förstå</p>

        <div className="two-col">
          <div className="card card-accent">
            <h3>📋 Task Definition</h3>
            <p>
              Ritningen för din applikation. Definierar vilka Docker-images som ska användas,
              CPU/minne, portar, miljövariabler och IAM-roller. Versionshanterad — varje uppdatering
              skapar en ny revision.
            </p>
          </div>
          <div className="card card-teal">
            <h3>🏃 Task</h3>
            <p>
              En körande instans av en Task Definition. En task kan innehålla en eller flera
              containers som delar nätverk och lagring. ECS startar och stoppar tasks baserat
              på din Service-konfiguration.
            </p>
          </div>
          <div className="card card-blue">
            <h3>🔧 Service</h3>
            <p>
              Säkerställer att ett angivet antal tasks alltid körs. Om en task kraschar startar
              Service automatiskt en ny. Kopplas till en Load Balancer för att distribuera trafik
              mellan tasks.
            </p>
          </div>
          <div className="card card-green">
            <h3>🖥️ Cluster</h3>
            <p>
              En logisk gruppering av EC2-instanser (Container Instances). ECS-agenten körs på
              varje instans och rapporterar tillgänglig CPU och minne till ECS-kontrollplanet.
            </p>
          </div>
        </div>

        {/* ── TASK DEFINITION JSON ── */}
        <h2 className="section-title">Task Definition — JSON-exempel</h2>
        <p className="section-sub">Grundläggande definition med en web-container</p>

        <div className="code-block flex flex-col items-center">
          <div className="code-header">
            <span className="code-lang">JSON</span>
            <br />
            <span className="code-file">task-definition.json</span>
          </div>
          <pre className="code-body w-3xl">{`{
  "family": "min-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["EC2"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "123456.dkr.ecr.eu-north-1.amazonaws.com/min-app:latest",
      "portMappings": [
        { "containerPort": 80, "protocol": "tcp" }
      ],
      "environment": [
        { "name": "NODE_ENV", "value": "production" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/min-app",
          "awslogs-region": "eu-north-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost/ || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  ]
}`}</pre>
        </div>

        {/* ── DEPLOY BASH ── */}
        <div className="code-block" style={{ marginTop: '20px' }}>
          <div className="code-header">
            <span className="code-lang">BASH</span>
            <span className="code-file">deploy.sh</span>
          </div>
          <pre className="code-body">{`# 1. Logga in på ECR
aws ecr get-login-password --region eu-north-1 | \\
  docker login --username AWS --password-stdin \\
  123456.dkr.ecr.eu-north-1.amazonaws.com

# 2. Bygg och pusha
docker build -t min-app .
docker tag min-app:latest 123456.dkr.ecr.eu-north-1.amazonaws.com/min-app:latest
docker push 123456.dkr.ecr.eu-north-1.amazonaws.com/min-app:latest

# 3. Uppdatera ECS Service
aws ecs update-service \\
  --cluster min-cluster \\
  --service min-service \\
  --force-new-deployment \\
  --region eu-north-1`}</pre>
        </div>

        {/* ── QUIZ ── */}
        <div className="quiz-wrap">
          <h2>Repetitionsfrågor — ECS</h2>
          <div className="quiz-item"><span className="quiz-num">Q1</span><span className="quiz-q">Vad är skillnaden mellan en Task Definition och en Task i ECS?</span></div>
          <div className="quiz-item"><span className="quiz-num">Q2</span><span className="quiz-q">Varför behöver vi två separata IAM-roller (ExecutionRole vs TaskRole)?</span></div>
          <div className="quiz-item"><span className="quiz-num">Q3</span><span className="quiz-q">Vad händer med trafiken när ECS kör en rolling deployment?</span></div>
          <div className="quiz-item"><span className="quiz-num">Q4</span><span className="quiz-q">Nämn tre fördelar med EC2-starttypen jämfört med Fargate.</span></div>
        </div>
      </div>

      <nav className="page-nav">
        <div />
        <Link href="/loadbalancer" className="next">
          <span className="nav-dir">Nästa →</span>
          <span className="nav-title">Load Balancer</span>
        </Link>
      </nav>
    </>
  )
}