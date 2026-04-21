import Link from "next/link";
import { ReactNode } from "react";

/* ── TYPES ── */

interface InfoBlockProps {
  title: string;
  items: string[];
}

interface SectionHeaderProps {
  number: string;
  title: string;
  highlight: string;
}

interface ConceptCardProps {
  badge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  description: string;
  col1Title: string;
  col1Items: string[];
  col2Title: string;
  col2Items: string[];
}

interface NoticeProps {
  children: ReactNode;
  variant?: "warning" | "info" | "danger";
}

interface CodeBlockProps {
  code: string;
  lang?: string;
}

/* ── HELPERS ── */

function SectionHeader({ number, title, highlight }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-12">
      <div className="w-9 h-9 rounded-full bg-[#232F3E] text-[#FF9900] text-sm font-bold flex items-center justify-center shrink-0">
        {number}
      </div>
      <h2 className="text-[22px] font-bold text-gray-900">
        {title} <span className="text-[#FF9900]">{highlight}</span>
      </h2>
    </div>
  );
}

function InfoBlock({ title, items }: InfoBlockProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
        {title}
      </h4>
      <ul className="list-none p-0 space-y-1">
        {items.map((item) => (
          <li
            key={item}
            className="text-[13px] text-gray-600 flex items-start gap-1.5"
          >
            <span className="text-[#FF9900] text-xs mt-0.5 shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConceptCard({
  badge,
  badgeClass,
  title,
  subtitle,
  description,
  col1Title,
  col1Items,
  col2Title,
  col2Items,
}: ConceptCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
        <span
          className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide ${badgeClass}`}
        >
          {badge}
        </span>
        <div>
          <div className="text-[15px] font-semibold text-gray-900">{title}</div>
          <div className="text-[13px] text-gray-500">{subtitle}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <InfoBlock title={col1Title} items={col1Items} />
        <InfoBlock title={col2Title} items={col2Items} />
      </div>
    </div>
  );
}

function Notice({ children, variant = "warning" }: NoticeProps) {
  const styles: Record<string, string> = {
    warning: "bg-amber-50 border-[#FF9900] text-amber-900",
    info: "bg-blue-50 border-blue-400 text-blue-900",
    danger: "bg-red-50 border-red-400 text-red-900",
  };
  return (
    <div
      className={`border-l-4 rounded-r-lg px-4 py-3 text-sm leading-relaxed my-4 ${styles[variant]}`}
    >
      {children}
    </div>
  );
}

function CodeBlock({ code, lang = "js" }: CodeBlockProps) {
  return (
    <div className="bg-[#1e1e2e] rounded-lg overflow-hidden mb-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-[11px] text-gray-400 font-mono uppercase tracking-widest">
          {lang}
        </span>
      </div>
      <pre className="px-5 py-4 text-[13px] text-[#cdd6f4] font-mono leading-relaxed overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-gray-200 my-8" />;
}

/* ── PAGE ── */

export default function LambdaProxy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-52">
      {/* Hero */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Node.js · Lambda
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Lambda som proxy &amp;{" "}
          <span className="text-[#FF9900]">JavaScript på AWS</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
          Lambda fungerar som ett <em>proxylager</em> framför din Spring
          Boot-backend — den hanterar routing, autentisering och transformation,
          men äger aldrig affärslogiken. API Gateway tar emot HTTP-anrop och
          skickar dem vidare till Lambda, som i sin tur anropar EC2 via fetch
          eller axios.
        </p>
      </div>

      {/* ══════════════════════════════
          DEL 1 — LAMBDA-ROLLEN
      ══════════════════════════════ */}
      <SectionHeader
        number="1"
        title="Lambda-rollen i"
        highlight="arkitekturen"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Lambda är ett <em>tunnelrör</em>, inte en processor. Den tar emot,
        kontrollerar och skickar vidare — Spring Boot på EC2 äger affärslogiken.
        Tänk på Lambda som en intelligent receptionist: den verifierar vem du är
        och dirigerar dig rätt, men fattar inga beslut åt dig.
      </p>

      <ConceptCard
        badge="PROXY"
        badgeClass="bg-orange-100 text-orange-700"
        title="Lambda-rollen — vad den ska och inte ska göra"
        subtitle="Routing, autentisering, transformation — inte affärslogik"
        description="En Lambda-funktion i proxy-rollen är ansvarig för att ta emot anrop, verifiera dem och skicka dem vidare till rätt tjänst. Affärslogik — beräkningar, domänregler, databasoperationer — hör hemma i Spring Boot på EC2, inte i Lambda."
        col1Title="Lambda ansvarar för"
        col1Items={[
          "Routing — vilken endpoint ska nås?",
          "Autentisering — validera JWT-token",
          "Transformation — konvertera format (in/ut)",
          "Rate limiting och throttling",
          "Loggning, tracing och felhantering",
        ]}
        col2Title="Spring Boot ansvarar för"
        col2Items={[
          "Affärslogik — priser, rabatter, regler",
          "Databasoperationer (läs/skriv)",
          "Domänvalidering och felregler",
          "Komplexa beräkningar",
          "State — Lambda är stateless",
        ]}
      />

      {/* Architecture flow */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          Flödet — klient till Spring Boot
        </div>
        <div className="space-y-3">
          {(
            [
              {
                step: "1",
                label: "Klient skickar HTTP-anrop",
                detail: "POST /api/orders med JWT i Authorization-headern",
                color: "bg-blue-50 border-blue-200 text-blue-700",
              },
              {
                step: "2",
                label: "API Gateway tar emot och routar",
                detail: "Matchar route → skickar event-objekt till Lambda",
                color: "bg-purple-50 border-purple-200 text-purple-700",
              },
              {
                step: "3",
                label: "Lambda validerar och transformerar",
                detail: "Kontrollerar JWT, extraherar data, bygger ny request",
                color: "bg-orange-50 border-orange-200 text-orange-700",
              },
              {
                step: "4",
                label: "Lambda anropar Spring Boot via HTTP",
                detail:
                  "fetch(`http://<EC2-IP>:8080/api/orders`, { method: 'POST', ... })",
                color: "bg-amber-50 border-amber-200 text-amber-700",
              },
              {
                step: "5",
                label: "Spring Boot svarar → Lambda returnerar",
                detail: "{ statusCode: 201, body: JSON.stringify(result) }",
                color: "bg-green-50 border-green-200 text-green-700",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.step}
              className={`flex gap-4 items-start border rounded-lg px-4 py-3 ${item.color}`}
            >
              <span className="text-xs font-bold mt-0.5 shrink-0">
                Steg {item.step}
              </span>
              <div>
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs opacity-75 mt-0.5 font-mono">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 2 — HTTP-ANROP TILL SPRING BOOT
      ══════════════════════════════ */}
      <SectionHeader
        number="2"
        title="Lambda anropar"
        highlight="Spring Boot via HTTP"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Lambda når Spring Boot via EC2-instansens publika IP (enkel setup) eller
        via intern DNS inom samma VPC (rekommenderas i produktion). Nedan visas
        tre separata Lambda-funktioner — en generisk med fetch samt dedikerade
        POST- och DELETE-funktioner med axios.
      </p>

      <ConceptCard
        badge="HTTP"
        badgeClass="bg-blue-100 text-blue-700"
        title="Anslutningsalternativ — publik IP vs intern DNS"
        subtitle="Hur Lambda når EC2-instansen"
        description="Det finns två sätt att peka Lambda mot Spring Boot. Publik IP är snabbt att sätta upp för testning, men IP-adressen kan ändras vid omstart av EC2. Intern DNS via VPC är stabilare och säkrare — Lambda och EC2 kommunicerar utan att trafiken lämnar AWS nätverk."
        col1Title="Publik IP (enkel, ej produktion)"
        col1Items={[
          "Hämta IP från AWS Console → EC2",
          "Fungerar direkt utan extra konfiguration",
          "IP kan ändras vid instans-omstart",
          "Trafiken går via det publika internet",
          "Kräver att port 8080 är öppen i security group",
        ]}
        col2Title="Intern DNS via VPC (produktion)"
        col2Items={[
          "Lambda och EC2 i samma VPC",
          "Konfigurera VPC-inställningar på Lambda",
          "Privat DNS-namn är stabilt och ändras inte",
          "Trafiken stannar inom AWS nätverk",
          "Kräver rätt subnet- och security group-regler",
        ]}
      />

      {/* fetch example */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold font-mono">
            fetch
          </span>
          <code className="text-sm font-mono text-gray-700">
            Generisk proxy-handler (Node.js 18+)
          </code>
        </div>
        <CodeBlock
          lang="node.js"
          code={`const BACKEND = "http://<EC2-IP>:8080";

export const handler = async (event) => {
  const path   = event.rawPath ?? "/";
  const method = event.requestContext.http.method;
  const body   = event.body ?? null;

  // Vidarebefordra anropet till Spring Boot
  const res = await fetch(\`\${BACKEND}\${path}\`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: method !== "GET" ? body : undefined,
  });

  const data = await res.json();

  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};`}
        />
        <Notice variant="info">
          <strong>Node.js-version:</strong>{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            fetch()
          </code>{" "}
          är inbyggt från Node.js 18. Välj Node.js 18 eller 20 som runtime i
          Lambda-inställningarna — annars behöver du installera och importera{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            node-fetch
          </code>
          .
        </Notice>
      </div>

      {/* axios POST */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold font-mono">
            POST
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold font-mono">
            axios
          </span>
          <code className="text-sm font-mono text-gray-700">
            createOrderLambda — POST /orders → 201 Created
          </code>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          En dedikerad Lambda-funktion för att skapa en ny order. Den parsear
          body, validerar obligatoriska fält och skickar vidare till Spring Boot
          med axios. Vid framgång returneras{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            201 Created
          </code>{" "}
          med den skapade resursen.
        </p>
        <CodeBlock
          lang="node.js"
          code={`import axios from "axios";

const BACKEND = "http://<EC2-IP>:8080";

export const handler = async (event) => {
  // Body från API Gateway är alltid en sträng — måste parsas
  const body = JSON.parse(event.body ?? "{}");
  const { productId, quantity, customerId } = body;

  // Validera obligatoriska fält innan vi anropar Spring Boot
  if (!productId || !quantity || !customerId) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "productId, quantity och customerId krävs",
      }),
    };
  }

  // Skicka POST till Spring Boot med axios
  const { data, status } = await axios.post(
    \`\${BACKEND}/orders\`,
    { productId, quantity, customerId },   // axios serialiserar till JSON automatiskt
    {
      headers: {
        "Content-Type": "application/json",
        // Vidarebefordra Authorization-headern om Spring Boot kräver det
        Authorization: event.headers?.authorization ?? "",
      },
    }
  );

  return {
    statusCode: 201,                        // 201 = ny resurs skapades
    headers: {
      "Content-Type": "application/json",
      Location: \`/orders/\${data.id}\`,      // peka på den skapade resursen
    },
    body: JSON.stringify(data),
  };
};`}
        />
        <Notice variant="warning">
          <strong>axios vs fetch vid POST:</strong> axios serialiserar
          body-objektet till JSON automatiskt och sätter{" "}
          <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
            Content-Type: application/json
          </code>{" "}
          — med fetch måste du köra{" "}
          <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
            JSON.stringify()
          </code>{" "}
          manuellt och sätta headern explicit.
        </Notice>
      </div>

      {/* axios DELETE */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold font-mono">
            DELETE
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold font-mono">
            axios
          </span>
          <code className="text-sm font-mono text-gray-700">
            deleteOrderLambda — DELETE /orders/:id → 204 No Content
          </code>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          En dedikerad Lambda-funktion för att radera en order. Hämtar{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            id
          </code>{" "}
          från URL-parametrarna, skickar DELETE till Spring Boot och returnerar{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            204 No Content
          </code>{" "}
          vid framgång — utan body.
        </p>
        <CodeBlock
          lang="node.js"
          code={`import axios from "axios";

const BACKEND = "http://<EC2-IP>:8080";

export const handler = async (event) => {
  // Hämta id från URL — API Gateway extraherar :id från /orders/:id
  const orderId = event.pathParameters?.id;

  if (!orderId) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "order-id saknas i URL:en" }),
    };
  }

  try {
    // Skicka DELETE till Spring Boot med axios
    await axios.delete(\`\${BACKEND}/orders/\${orderId}\`, {
      headers: {
        Authorization: event.headers?.authorization ?? "",
      },
    });

    // 204 No Content — framgång, men inget att returnera
    return {
      statusCode: 204,
      body: "",                             // tomt body är obligatoriskt för 204
    };

  } catch (err) {
    // axios kastar fel vid 4xx/5xx — fånga och returnera rätt statuskod
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: \`Order \${orderId} hittades inte\` }),
      };
    }
    // Okänt fel — returnera 500
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internt serverfel" }),
    };
  }
};`}
        />
        <Notice variant="danger">
          <strong>axios och felhantering:</strong> Till skillnad från fetch
          kastar axios automatiskt ett undantag vid HTTP-statuskoder 4xx och
          5xx. Utan try/catch kraschar Lambda-funktionen och returnerar ett
          generiskt 500-fel. Använd alltid{" "}
          <code className="text-xs bg-red-100 px-1 py-0.5 rounded">
            axios.isAxiosError(err)
          </code>{" "}
          för att skilja på axios-fel och andra runtime-fel.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 3 — JAVASCRIPT PÅ LAMBDA
      ══════════════════════════════ */}
      <SectionHeader
        number="3"
        title="JavaScript på Lambda —"
        highlight="kompilering & handler"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Lambda kör din JavaScript-kod som en zip-fil. Du skriver koden lokalt,
        installerar beroenden, zippar allt och laddar upp. Handler-funktionen är
        ingångspunkten som AWS anropar med ett event-objekt.
      </p>

      {/* Handler anatomy */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">
          Handler-strukturen — tre delar
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Lambda anropar din{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            handler
          </code>
          -funktion med ett{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            event
          </code>
          -objekt (indata från API Gateway) och ett{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            context
          </code>
          -objekt (metadata om körningen). Returvärdet måste vara ett objekt med{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            statusCode
          </code>
          , valfritt{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            headers
          </code>{" "}
          och{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            body
          </code>{" "}
          (alltid sträng).
        </p>
        <CodeBlock
          lang="node.js"
          code={`export const handler = async (event, context) => {
  // event — indata från API Gateway
  // event.rawPath         → "/api/users"
  // event.requestContext.http.method → "POST"
  // event.headers         → { authorization: "Bearer ..." }
  // event.body            → JSON-sträng (JSON.parse krävs!)
  // event.pathParameters  → { id: "42" }

  // context — runtime-metadata (sällan nödvändig i proxy)
  // context.functionName          → "my-proxy-lambda"
  // context.awsRequestId          → unikt ID per anrop
  // context.getRemainingTimeInMillis() → tid kvar av timeout

  return {
    statusCode: 200,                           // number, obligatoriskt
    headers: { "Content-Type": "application/json" }, // valfritt
    body: JSON.stringify({ ok: true }),        // alltid sträng
  };
};`}
        />
        <div className="grid grid-cols-2 gap-4 mt-2">
          <InfoBlock
            title="event-objektet innehåller"
            items={[
              "rawPath — URL:en, t.ex. /api/orders",
              "requestContext.http.method — GET, POST...",
              "headers — inkl. Authorization för JWT",
              "body — JSON som sträng, måste parsas",
              "pathParameters — { id: '42' } från /:id",
            ]}
          />
          <InfoBlock
            title="Returvärdet kräver"
            items={[
              "statusCode — number (200, 201, 404...)",
              "body — string, inte objekt (JSON.stringify!)",
              "headers — objekt med Content-Type m.m.",
              "CORS-headers om klienten är en webbapp",
            ]}
          />
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 4 — API GATEWAY
      ══════════════════════════════ */}
      <SectionHeader
        number="4"
        title="API Gateway HTTP API —"
        highlight="routes, integration & CORS"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        API Gateway HTTP API (inte REST API — det är billigare och enklare) tar
        emot HTTP-anrop, matchar dem mot definierade routes och triggar rätt
        Lambda-funktion. CORS måste konfigureras antingen i API Gateway eller i
        Lambda — aldrig på båda ställena samtidigt.
      </p>

      <ConceptCard
        badge="API GW"
        badgeClass="bg-green-100 text-green-700"
        title="HTTP API — routes och Lambda-integration"
        subtitle="Skapa API → definiera routes → koppla Lambda → konfigurera CORS"
        description="API Gateway HTTP API skapas i fyra steg. En catch-all-route (ANY /{proxy+}) skickar all trafik till en enda Lambda-funktion som sköter intern routing — eller definiera specifika routes per endpoint för bättre kontroll och observability."
        col1Title="Route-alternativ"
        col1Items={[
          "ANY /{proxy+} — catch-all till en Lambda",
          "GET /users — specifik route per metod",
          "POST /orders — separata Lambda per domän",
          "Payload format 2.0 — modernt event-format",
          "Stage: $default för enkel setup",
        ]}
        col2Title="Integration-inställningar"
        col2Items={[
          "Integration type: Lambda function",
          "Välj region och Lambda-funktion",
          "Payload format version: 2.0",
          "Timeout: max 29 s (API GW-gräns)",
          "Lambda-behörighet sätts automatiskt",
        ]}
      />

      {/* CORS table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          CORS-headers — vad de betyder
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Konfigurera under API Gateway → CORS — eller returnera dem från
          Lambda-handlens svar
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Header", "Exempelvärde", "Syfte"] as const).map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2.5 text-xs font-semibold first:rounded-tl-md last:rounded-tr-md"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  {
                    header: "Access-Control-Allow-Origin",
                    value: "https://dinapp.se",
                    desc: "Vilka domäner får anropa API:et. Sätt aldrig * i produktion med autentisering.",
                    highlight: true,
                  },
                  {
                    header: "Access-Control-Allow-Methods",
                    value: "GET, POST, PUT, DELETE, OPTIONS",
                    desc: "Tillåtna HTTP-metoder. OPTIONS krävs alltid — det är preflight-anropet.",
                    highlight: false,
                  },
                  {
                    header: "Access-Control-Allow-Headers",
                    value: "Content-Type, Authorization",
                    desc: "Vilka headers klienten får skicka med. Authorization krävs för JWT.",
                    highlight: false,
                  },
                  {
                    header: "Access-Control-Max-Age",
                    value: "3600",
                    desc: "Sekunder webbläsaren cachar preflight-svaret. Minskar antal OPTIONS-anrop.",
                    highlight: false,
                  },
                ] as const
              ).map((row) => (
                <tr
                  key={row.header}
                  className={`border-b border-gray-100 last:border-0 ${row.highlight ? "bg-amber-50" : ""}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-800">
                    {row.header}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-blue-700">
                    {row.value}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Notice variant="danger">
          <strong>Undvik dubblering:</strong> Om Lambda returnerar CORS-headers
          OCH API Gateway lägger till dem uppstår duplicering — webbläsaren
          blockerar anropet. Välj ett ställe: antingen API Gateway
          CORS-konfigurationen <em>eller</em> Lambda-koden hanterar headers,
          aldrig båda.
        </Notice>
      </div>

      {/* CORS in Lambda code */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold font-mono">
            CORS
          </span>
          <code className="text-sm font-mono text-gray-700">
            Hantera CORS direkt i Lambda-handlens svar
          </code>
        </div>
        <CodeBlock
          lang="node.js"
          code={`const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "https://dinapp.se",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const handler = async (event) => {
  // Hantera OPTIONS preflight-anrop
  if (event.requestContext.http.method === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  // Normalt anrop vidare till Spring Boot
  const res = await fetch(\`http://<EC2-IP>:8080\${event.rawPath}\`, {
    method: event.requestContext.http.method,
    headers: { "Content-Type": "application/json" },
    body: event.body ?? undefined,
  });

  const data = await res.json();

  return {
    statusCode: res.status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};`}
        />
        <Notice variant="info">
          Om du hanterar CORS i Lambda-koden — stäng av CORS-konfigurationen i
          API Gateway (låt fälten vara tomma). Annars dupliceras headers.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 5 — BYGGA & DEPLOYA LOKALT VIA KONSOLEN
      ══════════════════════════════ */}
      <SectionHeader
        number="5"
        title="Bygg lokalt &"
        highlight="ladda upp via AWS Console"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Det enklaste sättet att deploya en Lambda-funktion är att bygga
        zip-filen lokalt och ladda upp den manuellt via AWS Console. Det passar
        utmärkt för testning och mindre projekt. Filstrukturen ska vara platt —
        din handler-fil och{" "}
        <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
          node_modules/
        </code>{" "}
        i zip-filens rot.
      </p>

      {/* Filstruktur */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">
          Förväntat filstruktur
        </div>
        <CodeBlock
          lang="bash"
          code={`my-lambda/
├── index.js          ← din handler-fil (handler exporteras härifrån)
├── package.json      ← "type": "module" för ESM, main: "index.js"
├── package-lock.json
└── node_modules/
    └── axios/        ← beroenden måste vara med i zip-filen`}
        />
        <Notice variant="warning">
          <strong>Viktigt:</strong> Zippa innehållet i katalogen — inte
          katalogen själv. Kör{" "}
          <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
            cd my-lambda && zip -r ../function.zip .
          </code>{" "}
          och inte{" "}
          <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
            zip -r function.zip my-lambda/
          </code>
          . Lambda letar efter{" "}
          <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
            index.js
          </code>{" "}
          i zip-filens rot.
        </Notice>
      </div>

      {/* Bygga zip */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">
          Steg 1 — Bygg zip-filen lokalt
        </div>
        <CodeBlock
          lang="bash"
          code={`# 1. Gå in i projektkatalogen
cd my-lambda

# 2. Installera beroenden (skapar node_modules/)
npm install

# 3. Zippa allt — punkt (.) = innehållet i aktuell katalog
zip -r ../function.zip .

# Verifiera att zip-filen innehåller rätt filer
unzip -l ../function.zip | head -20
# Du ska se: index.js, package.json, node_modules/axios/...`}
        />
      </div>

      {/* AWS Console upload */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          Steg 2 — Ladda upp via AWS Console
        </div>
        <div className="space-y-3">
          {(
            [
              {
                step: "1",
                label: "Öppna Lambda i AWS Console",
                detail:
                  "console.aws.amazon.com → sök Lambda → välj din funktion (eller skapa ny med Create function)",
                color: "bg-gray-50 border-gray-200 text-gray-700",
              },
              {
                step: "2",
                label: "Gå till fliken Code",
                detail: "Klicka på Code-tabben längst upp på funktionssidan",
                color: "bg-blue-50 border-blue-200 text-blue-700",
              },
              {
                step: "3",
                label: "Välj Upload from → .zip file",
                detail:
                  "Knappen Upload from finns uppe till höger i kodredigeraren",
                color: "bg-purple-50 border-purple-200 text-purple-700",
              },
              {
                step: "4",
                label: "Välj din function.zip och klicka Save",
                detail:
                  "AWS laddar upp, extraherar och deployar automatiskt — tar ~5–10 sekunder",
                color: "bg-orange-50 border-orange-200 text-orange-700",
              },
              {
                step: "5",
                label: "Kontrollera handler-inställningen",
                detail:
                  "Runtime settings → Handler ska vara index.handler (filnamn.exportnamn)",
                color: "bg-amber-50 border-amber-200 text-amber-700",
              },
              {
                step: "6",
                label: "Testa funktionen",
                detail:
                  "Test-fliken → skapa ett test-event → kör → kontrollera Response och Logs",
                color: "bg-green-50 border-green-200 text-green-700",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.step}
              className={`flex gap-4 items-start border rounded-lg px-4 py-3 ${item.color}`}
            >
              <span className="text-xs font-bold mt-0.5 shrink-0">
                Steg {item.step}
              </span>
              <div>
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs opacity-75 mt-0.5 font-mono">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Notice variant="info">
          <strong>Handler-formatet</strong> är{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            filnamn.exportnamn
          </code>
          . Om din fil heter{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            index.js
          </code>{" "}
          och du exporterar{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            export const handler
          </code>
          , ska fältet vara{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            index.handler
          </code>
          . Om filen heter{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            createOrder.js
          </code>{" "}
          →{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            createOrder.handler
          </code>
          .
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 6 — GITHUB ACTIONS
      ══════════════════════════════ */}
      <SectionHeader
        number="6"
        title="Automatisera deploy med"
        highlight="GitHub Actions"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Med GitHub Actions kan du automatisera hela deploy-processen: varje gång
        du pushar till{" "}
        <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
          main
        </code>{" "}
        byggs zip-filen och laddas upp till Lambda automatiskt. Du behöver en
        IAM-användare med rätt behörigheter och AWS-nycklar sparade som GitHub
        Secrets.
      </p>

      {/* IAM setup */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          Förutsättningar — IAM och GitHub Secrets
        </div>
        <div className="space-y-3 mb-4">
          {(
            [
              {
                step: "1",
                label: "Skapa en IAM-användare för GitHub Actions",
                detail:
                  "AWS Console → IAM → Users → Create user → namnge den t.ex. github-actions-lambda",
                color: "bg-gray-50 border-gray-200 text-gray-700",
              },
              {
                step: "2",
                label: "Ge användaren lambda:UpdateFunctionCode-behörighet",
                detail:
                  "Attach policies → skapa inline policy eller använd AWSLambda_FullAccess (begränsa i produktion)",
                color: "bg-orange-50 border-orange-200 text-orange-700",
              },
              {
                step: "3",
                label: "Skapa Access Key för användaren",
                detail:
                  "IAM → Users → din användare → Security credentials → Create access key → välj CLI",
                color: "bg-blue-50 border-blue-200 text-blue-700",
              },
              {
                step: "4",
                label: "Lägg till nycklar som GitHub Secrets",
                detail:
                  "Ditt repo → Settings → Secrets and variables → Actions → New repository secret",
                color: "bg-purple-50 border-purple-200 text-purple-700",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.step}
              className={`flex gap-4 items-start border rounded-lg px-4 py-3 ${item.color}`}
            >
              <span className="text-xs font-bold mt-0.5 shrink-0">
                Steg {item.step}
              </span>
              <div>
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs opacity-75 mt-0.5 font-mono">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InfoBlock
            title="Lägg till dessa Secrets i GitHub"
            items={[
              "AWS_ACCESS_KEY_ID — från IAM Access Key",
              "AWS_SECRET_ACCESS_KEY — från IAM Access Key",
              "AWS_REGION — t.ex. eu-north-1",
              "LAMBDA_FUNCTION_NAME — funktionens namn i AWS",
            ]}
          />
          <InfoBlock
            title="Minimal IAM-policy (principen om minsta rättighet)"
            items={[
              "lambda:UpdateFunctionCode — ladda upp ny kod",
              "lambda:GetFunction — verifiera att funktionen finns",
              "Undvik: AdministratorAccess i CI/CD-pipelines",
              "Scope till specifik function ARN vid möjlighet",
            ]}
          />
        </div>
      </div>

      {/* GitHub Actions workflow */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">
          GitHub Actions workflow —{" "}
          <code className="font-mono text-[13px]">
            .github/workflows/deploy-lambda.yml
          </code>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Skapa filen{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            .github/workflows/deploy-lambda.yml
          </code>{" "}
          i ditt repo. Workflowen triggas vid push till{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            main
          </code>
          , installerar beroenden, zippar koden och kör AWS CLI för att
          uppdatera Lambda-funktionen.
        </p>
        <CodeBlock
          lang="yaml"
          code={`name: Deploy Lambda

on:
  push:
    branches:
      - main          # kör vid varje push till main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # 1. Checka ut koden från repot
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Konfigurera Node.js (matcha din Lambda-runtime)
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      # 3. Installera npm-beroenden (axios etc.)
      - name: Install dependencies
        run: npm ci              # ci är snabbare och mer deterministisk än install

      # 4. Zippa koden — inkludera index.js och node_modules/
      - name: Create deployment package
        run: zip -r function.zip . --exclude "*.git*" --exclude "*.github*"

      # 5. Konfigurera AWS CLI med nycklar från GitHub Secrets
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id:     \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region:            \${{ secrets.AWS_REGION }}

      # 6. Ladda upp zip-filen till Lambda
      - name: Deploy to AWS Lambda
        run: |
          aws lambda update-function-code \\
            --function-name \${{ secrets.LAMBDA_FUNCTION_NAME }} \\
            --zip-file fileb://function.zip

      # 7. Vänta tills deployment är klar (valfritt men rekommenderas)
      - name: Wait for deployment
        run: |
          aws lambda wait function-updated \\
            --function-name \${{ secrets.LAMBDA_FUNCTION_NAME }}
          echo "Deploy klar!"`}
        />
      </div>

      {/* Multiple lambdas */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">
          Deploya flera Lambda-funktioner i samma workflow
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Om du har separata funktioner för POST och DELETE (som i del 2) kan du
          deploya båda i samma workflow med en matrix-strategi — jobbet körs
          parallellt för varje funktion och varje funktion har sin egen katalog
          med egna beroenden.
        </p>
        <CodeBlock
          lang="yaml"
          code={`name: Deploy Multiple Lambdas

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    # Matrix kör jobbet parallellt för varje funktion
    strategy:
      matrix:
        include:
          - function_dir: lambdas/createOrder
            function_name: createOrderLambda
          - function_dir: lambdas/deleteOrder
            function_name: deleteOrderLambda

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      # Installera beroenden i rätt katalog
      - name: Install dependencies
        run: npm ci
        working-directory: \${{ matrix.function_dir }}

      # Zippa just den funktionens katalog
      - name: Create zip
        run: zip -r function.zip .
        working-directory: \${{ matrix.function_dir }}

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id:     \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region:            \${{ secrets.AWS_REGION }}

      - name: Deploy \${{ matrix.function_name }}
        run: |
          aws lambda update-function-code \\
            --function-name \${{ matrix.function_name }} \\
            --zip-file fileb://function.zip
        working-directory: \${{ matrix.function_dir }}`}
        />
        <Notice variant="info">
          <strong>working-directory</strong> styr vilket katalog varje steg körs
          i. Det låter dig ha separata{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            package.json
          </code>{" "}
          och{" "}
          <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
            node_modules/
          </code>{" "}
          per Lambda-funktion — rekommenderat om funktionerna har olika
          beroenden.
        </Notice>
      </div>

      {/* Jämförelse manuell vs CI */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          Manuell deploy vs GitHub Actions — när passar vad?
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Välj arbetsflöde baserat på projektstorlek och teamstorlek
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["", "Manuell (Console)", "GitHub Actions"] as const).map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-xs font-semibold first:rounded-tl-md last:rounded-tr-md"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  {
                    label: "Uppstartstid",
                    manual: "0 min — direkt",
                    ci: "~10 min att sätta upp",
                    highlight: false,
                  },
                  {
                    label: "Deploy-tid",
                    manual: "~2–3 min manuellt",
                    ci: "~1–2 min automatiskt",
                    highlight: true,
                  },
                  {
                    label: "Repeterbarhet",
                    manual: "Risk för mänskliga fel",
                    ci: "Alltid samma process",
                    highlight: false,
                  },
                  {
                    label: "Passar för",
                    manual: "Testa, lära sig, enskilt arbete",
                    ci: "Team, produktion, CI/CD",
                    highlight: false,
                  },
                  {
                    label: "Kräver",
                    manual: "AWS Console-åtkomst",
                    ci: "IAM-nyckel, GitHub Secrets",
                    highlight: false,
                  },
                ] as const
              ).map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 last:border-0 ${row.highlight ? "bg-amber-50" : ""}`}
                >
                  <td className="px-4 py-3 text-xs font-semibold text-gray-600">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {row.manual}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{row.ci}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* Diskussionsfrågor */}
      <div className="bg-[#232F3E] rounded-xl p-7 mt-2">
        <h2 className="text-white text-lg font-bold mb-5">
          🎯 <span className="text-[#FF9900]">Diskussionsfrågor</span>
        </h2>
        {(
          [
            "Varför ska Lambda inte innehålla affärslogik? Vad händer om du lägger prisberäkning i Lambda-funktionen istället för i Spring Boot?",
            "Din Lambda-funktion hämtar EC2:s publika IP som en hårdkodad sträng. Vad händer om instansen startas om? Hur löser du det mer robust?",
            "En kollega har konfigurerat CORS både i API Gateway och i Lambda-handlens returvärde. Vilka symptom ser du i webbläsaren, och hur åtgärdar du det?",
            "axios kastar ett undantag vid 404 från Spring Boot, men fetch gör det inte. Hur påverkar det hur du skriver felhanteringen i de två fallen?",
            "I GitHub Actions workflowen sparas AWS-nycklar som Secrets. Varför ska de aldrig läggas direkt i workflow-filen, och vad händer om de läcker?",
            "En GET-request till din Lambda tar ibland 450 ms och ibland 12 ms. Vad är den troligaste förklaringen, och hur kan du minska förekomsten?",
            "Varför används npm ci istället för npm install i GitHub Actions-workflowen? Vad är den praktiska skillnaden i en CI/CD-miljö?",
          ] as const
        ).map((q, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 mb-2.5 flex gap-4"
          >
            <span className="text-[#FF9900] text-[13px] font-bold shrink-0 mt-0.5">
              Q{i + 1}
            </span>
            <span className="text-[#e2e8f0] text-sm">{q}</span>
          </div>
        ))}
      </div>

      {/* Glossary */}
      <div className="flex items-center gap-3 mt-12 mb-6">
        <div className="w-9 h-9 rounded-full bg-[#FF9900] text-[#232F3E] text-sm font-bold flex items-center justify-center shrink-0">
          📖
        </div>
        <h2 className="text-[22px] font-bold text-gray-900">Nyckelbegrepp</h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-10">
        {(
          [
            {
              term: "Proxy-mönster",
              def: "Lambda som mellanhand — tar emot, validerar och vidarebefordrar anrop till backend utan att äga logiken",
            },
            {
              term: "fetch()",
              def: "Inbyggt HTTP-klientbibliotek i Node.js 18+. Kastar inte fel vid 4xx/5xx — du kontrollerar res.status manuellt",
            },
            {
              term: "axios",
              def: "Populärt HTTP-bibliotek (npm). Kastar automatiskt undantag vid 4xx/5xx — kräver try/catch och axios.isAxiosError()",
            },
            {
              term: "axios.isAxiosError()",
              def: "Typguard som avgör om ett fångat undantag kom från axios — ger åtkomst till err.response.status",
            },
            {
              term: "event.rawPath",
              def: "URL:en för inkommande anrop, t.ex. /api/users — används för att bygga vidare-URL till Spring Boot",
            },
            {
              term: "event.body",
              def: "Request body som sträng — alltid sträng, aldrig objekt. Kräver JSON.parse() innan användning",
            },
            {
              term: "Payload format 2.0",
              def: "Modernt event-format från API Gateway HTTP API. Ger rawPath och requestContext.http.method",
            },
            {
              term: "Cold start",
              def: "Fördröjning (~100–500 ms) när Lambda startar en ny container-instans efter inaktivitet",
            },
            {
              term: "npm ci",
              def: "Snabbare och mer deterministisk variant av npm install — installerar exakt vad package-lock.json anger",
            },
            {
              term: "GitHub Secrets",
              def: "Krypterad lagring för känslig data (API-nycklar) i GitHub — aldrig synlig i logs eller workflow-filer",
            },
            {
              term: "IAM Access Key",
              def: "ID + hemlig nyckel som ger programmatisk åtkomst till AWS — används av GitHub Actions för att köra AWS CLI",
            },
            {
              term: "aws lambda wait function-updated",
              def: "CLI-kommando som blockerar tills Lambda-deployn är klar — förhindrar att efterföljande steg kör mot gammal kod",
            },
          ] as const
        ).map((g) => (
          <div
            key={g.term}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3"
          >
            <div className="font-mono text-[13px] font-bold text-[#232F3E] mb-1">
              {g.term}
            </div>
            <div className="text-[13px] text-gray-500">{g.def}</div>
          </div>
        ))}
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        ← Tillbaka till startsidan
      </Link>
    </div>
  );
}
