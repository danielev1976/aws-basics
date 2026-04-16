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

interface StatusRowProps {
  method: string;
  methodColor: string;
  path: string;
  status: string;
  statusColor: string;
  description: string;
  highlight?: boolean;
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
          <li key={item} className="text-[13px] text-gray-600 flex items-start gap-1.5">
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
        <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide ${badgeClass}`}>
          {badge}
        </span>
        <div>
          <div className="text-[15px] font-semibold text-gray-900">{title}</div>
          <div className="text-[13px] text-gray-500">{subtitle}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
      <div className="grid grid-cols-2 gap-4">
        <InfoBlock title={col1Title} items={col1Items} />
        <InfoBlock title={col2Title} items={col2Items} />
      </div>
    </div>
  );
}

function StatusRow({ method, methodColor, path, status, statusColor, description, highlight }: StatusRowProps) {
  return (
    <tr className={`border-b border-gray-100 last:border-0 ${highlight ? "bg-amber-50" : ""}`}>
      <td className="px-4 py-3">
        <span className={`text-xs font-bold px-2 py-1 rounded font-mono ${methodColor}`}>{method}</span>
      </td>
      <td className="px-4 py-3 text-sm font-mono text-gray-700">{path}</td>
      <td className="px-4 py-3">
        <span className={`text-xs font-bold px-2 py-1 rounded font-mono ${statusColor}`}>{status}</span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{description}</td>
    </tr>
  );
}

function Notice({ children, variant = "warning" }: NoticeProps) {
  const styles: Record<string, string> = {
    warning: "bg-amber-50 border-[#FF9900] text-amber-900",
    info: "bg-blue-50 border-blue-400 text-blue-900",
    danger: "bg-red-50 border-red-400 text-red-900",
  };
  return (
    <div className={`border-l-4 rounded-r-lg px-4 py-3 text-sm leading-relaxed my-4 ${styles[variant]}`}>
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
        <span className="ml-2 text-[11px] text-gray-400 font-mono uppercase tracking-widest">{lang}</span>
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

export default function RestLambda() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Hero */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Node.js · Lambda
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          RESTful API &amp; <span className="text-[#FF9900]">Lambda Functions</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
          REST definierar <em>hur</em> resurser exponeras via HTTP — Lambda låter dig köra din Node.js-kod utan att hantera servrar. Tillsammans bildar de grunden för moderna serverlösa API:er.
        </p>
      </div>

      {/* ══════════════════════════════
          DEL 1 — REST & RESURSER
      ══════════════════════════════ */}
      <SectionHeader number="1" title="RESTful" highlight="Design" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        REST (Representational State Transfer) är en arkitekturstil för API:er. Kärnan: resurser identifieras av URL:er, och HTTP-verb beskriver <em>vad</em> du vill göra med dem.
      </p>

      <ConceptCard
        badge="REST"
        badgeClass="bg-green-100 text-green-700"
        title="Resurser &amp; Endpoints"
        subtitle="URL:en representerar en resurs, inte en handling"
        description="En REST-resurs är ett substantiv — /users, /products, /orders. HTTP-verbet (GET, POST, PUT, DELETE) är verbet som beskriver operationen. Kombinationen av URL + verb + statuskod utgör REST-kontraktet."
        col1Title="Rätt REST"
        col1Items={[
          "GET /users — hämta alla användare",
          "GET /users/42 — hämta användare #42",
          "POST /users — skapa ny användare",
          "PUT /users/42 — uppdatera användare #42",
          "DELETE /users/42 — radera användare #42",
        ]}
        col2Title="Fel REST"
        col2Items={[
          "GET /getUsers — verb i URL:en",
          "POST /users/delete — fel verb för delete",
          "GET /createUser — GET ska inte skapa",
          "POST /users/42/update — onödig nesting",
        ]}
      />

      {/* HTTP Verbs table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">HTTP-verb &amp; Statuskoder</div>
        <p className="text-xs text-gray-400 mb-4">Standardiserade kombinationer för en /users-resurs</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Metod", "Endpoint", "Statuskod", "Beskrivning"] as const).map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold first:rounded-tl-md last:rounded-tr-md">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <StatusRow
                method="GET"
                methodColor="bg-blue-100 text-blue-700"
                path="/users"
                status="200 OK"
                statusColor="bg-green-100 text-green-700"
                description="Returnerar lista av alla användare"
              />
              <StatusRow
                method="GET"
                methodColor="bg-blue-100 text-blue-700"
                path="/users/:id"
                status="200 OK"
                statusColor="bg-green-100 text-green-700"
                description="Returnerar en specifik användare"
              />
              <StatusRow
                method="POST"
                methodColor="bg-green-100 text-green-700"
                path="/users"
                status="201 Created"
                statusColor="bg-teal-100 text-teal-700"
                description="Ny resurs skapad — returnerar den nya resursen"
                highlight
              />
              <StatusRow
                method="PUT"
                methodColor="bg-amber-100 text-amber-700"
                path="/users/:id"
                status="200 OK"
                statusColor="bg-green-100 text-green-700"
                description="Resurs uppdaterad — returnerar den uppdaterade resursen"
              />
              <StatusRow
                method="DELETE"
                methodColor="bg-red-100 text-red-700"
                path="/users/:id"
                status="204 No Content"
                statusColor="bg-gray-100 text-gray-600"
                description="Resurs raderad — inget body i svaret"
              />
              <StatusRow
                method="GET"
                methodColor="bg-blue-100 text-blue-700"
                path="/users/999"
                status="404 Not Found"
                statusColor="bg-red-100 text-red-700"
                description="Resursen existerar inte — returnera tydligt felmeddelande"
              />
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 shrink-0" />
          <span className="text-xs text-gray-400">POST returnerar 201 — inte 200 — för att signalera att något nytt skapades</span>
        </div>
      </div>

      {/* Status codes deep-dive */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">Statuskoder — varför spelar de roll?</div>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              {
                code: "200 OK",
                color: "bg-green-50 border-green-200 text-green-800",
                desc: "Allt gick bra. GET och PUT svarar med detta.",
              },
              {
                code: "201 Created",
                color: "bg-teal-50 border-teal-200 text-teal-800",
                desc: "POST lyckades och skapade en ny resurs.",
              },
              {
                code: "204 No Content",
                color: "bg-gray-50 border-gray-200 text-gray-700",
                desc: "DELETE lyckades. Inget att returnera.",
              },
              {
                code: "400 Bad Request",
                color: "bg-amber-50 border-amber-200 text-amber-800",
                desc: "Klienten skickade felaktig data eller saknade fält.",
              },
              {
                code: "404 Not Found",
                color: "bg-red-50 border-red-200 text-red-800",
                desc: "Resursen med det ID:t finns inte.",
              },
              {
                code: "500 Internal Error",
                color: "bg-red-50 border-red-200 text-red-800",
                desc: "Något gick fel på servern — dölj aldrig detaljer i produktion.",
              },
            ] as const
          ).map((item) => (
            <div key={item.code} className={`border rounded-lg p-3 ${item.color}`}>
              <div className="font-mono text-xs font-bold mb-1">{item.code}</div>
              <div className="text-xs leading-snug opacity-80">{item.desc}</div>
            </div>
          ))}
        </div>
        <Notice variant="info">
          <strong>Tumregel:</strong> 2xx = lyckat, 4xx = klientens fel, 5xx = serverns fel. Rätt statuskod hjälper klienter att hantera fel programmatiskt utan att parsa felmeddelanden.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 2 — NODE.JS PÅ LAMBDA
      ══════════════════════════════ */}
      <SectionHeader number="2" title="Node.js på" highlight="AWS Lambda" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Lambda kör din kod som svar på events — HTTP-anrop via API Gateway, meddelanden från SQS, schemalagda jobb via EventBridge. Du betalar per anrop, inte för inaktiv server.
      </p>

      <ConceptCard
        badge="Lambda"
        badgeClass="bg-orange-100 text-orange-700"
        title="Lambda Function"
        subtitle="Serverlös Node.js-kod triggas av events"
        description="En Lambda-funktion är en zip-fil med din kod och en handler-funktion. AWS hanterar servrar, skalning och uppdateringar. Funktionen vaknar när ett event kommer in, kör koden och svarar — sedan sovar den igen."
        col1Title="Lambda passar för"
        col1Items={[
          "API-endpoints via API Gateway",
          "Bearbeta S3-uploads automatiskt",
          "Webhook-mottagare (Stripe, GitHub)",
          "Schemalagda bakgrundsjobb (cron)",
          "SQS/SNS event-konsumenter",
        ]}
        col2Title="Begränsningar att känna till"
        col2Items={[
          "Max 15 minuters körtid per anrop",
          "Max 10 GB RAM (standard: 128 MB)",
          "Stateless — ingen persistent data lokalt",
          "Cold start: ~100–500 ms för Node.js",
          "Deployment package max 50 MB (zip)",
        ]}
      />

      {/* Handler anatomy */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">Handler-funktionen — anatomi</div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Lambda anropar din <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">handler</code>-funktion med ett <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">event</code>-objekt (indata) och ett <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">context</code>-objekt (metadata om körningen).
        </p>
        <CodeBlock
          lang="node.js"
          code={`// Enklaste möjliga Lambda-handler
export const handler = async (event, context) => {
  console.log("Event:", JSON.stringify(event));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Hello from Lambda!" }),
  };
};`}
        />
        <div className="grid grid-cols-2 gap-4 mt-2">
          <InfoBlock
            title="event-objektet innehåller"
            items={[
              "HTTP-metod (GET, POST, ...)",
              "Path och query parameters",
              "Request headers",
              "Body (som sträng — JSON.parse krävs)",
            ]}
          />
          <InfoBlock
            title="context-objektet innehåller"
            items={[
              "functionName — Lambda-funktionens namn",
              "awsRequestId — unikt ID per anrop",
              "getRemainingTimeInMillis() — tid kvar",
              "invokedFunctionArn — full ARN",
            ]}
          />
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 3 — REST + LAMBDA
      ══════════════════════════════ */}
      <SectionHeader number="3" title="CRUD API med" highlight="Lambda + Node.js" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        En typisk pattern: API Gateway tar emot HTTP-anrop och routar dem till rätt Lambda-funktion. Funktionen läser event-objektet, utför logiken och returnerar ett HTTP-svar.
      </p>

      {/* GET example */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold font-mono">GET</span>
          <code className="text-sm font-mono text-gray-700">/users/:id → 200 OK</code>
        </div>
        <CodeBlock
          lang="node.js"
          code={`export const handler = async (event) => {
  const userId = event.pathParameters?.id;

  // Simulerad databas-lookup
  const user = await getUserById(userId);

  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "User not found" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
};`}
        />
        <Notice variant="info">
          Returnera alltid <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">404</code> om resursen inte finns — inte ett tomt 200-svar. Det hjälper klienten att skilja på "tom lista" och "finns inte".
        </Notice>
      </div>

      {/* POST example */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold font-mono">POST</span>
          <code className="text-sm font-mono text-gray-700">/users → 201 Created</code>
        </div>
        <CodeBlock
          lang="node.js"
          code={`export const handler = async (event) => {
  // Body kommer som sträng från API Gateway
  const body = JSON.parse(event.body ?? "{}");
  const { name, email } = body;

  // Enkel validering
  if (!name || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "name and email are required" }),
    };
  }

  const newUser = await createUser({ name, email });

  return {
    statusCode: 201,          // 201, inte 200 — resursen skapades
    headers: {
      "Content-Type": "application/json",
      "Location": \`/users/\${newUser.id}\`,  // peka på den nya resursen
    },
    body: JSON.stringify(newUser),
  };
};`}
        />
      </div>

      {/* DELETE example */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold font-mono">DELETE</span>
          <code className="text-sm font-mono text-gray-700">/users/:id → 204 No Content</code>
        </div>
        <CodeBlock
          lang="node.js"
          code={`export const handler = async (event) => {
  const userId = event.pathParameters?.id;

  const existed = await deleteUser(userId);

  if (!existed) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "User not found" }),
    };
  }

  return {
    statusCode: 204,   // 204 = success, men inget body
    body: "",          // tomt body — viktigt för 204
  };
};`}
        />
        <Notice variant="warning">
          <strong>Obs:</strong> <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">204 No Content</code> ska alltid ha ett tomt body. Skickar du JSON ändå bryter det HTTP-specen och kan förvirra klienter.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 4 — LAMBDA + API GATEWAY
      ══════════════════════════════ */}
      <SectionHeader number="4" title="API Gateway" highlight="+ Lambda — Flödet" />

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">Från HTTP-anrop till Lambda-svar</div>
        <div className="space-y-3">
          {(
            [
              {
                step: "1",
                label: "Klient skickar request",
                detail: "POST /users med JSON-body",
                color: "bg-blue-50 border-blue-200 text-blue-700",
              },
              {
                step: "2",
                label: "API Gateway tar emot",
                detail: "Mappar HTTP → Lambda event-objekt",
                color: "bg-purple-50 border-purple-200 text-purple-700",
              },
              {
                step: "3",
                label: "Lambda vaknar (cold/warm start)",
                detail: "Node.js runtime laddas, handler körs",
                color: "bg-orange-50 border-orange-200 text-orange-700",
              },
              {
                step: "4",
                label: "Handler returnerar response-objekt",
                detail: "{ statusCode: 201, body: JSON.stringify(...) }",
                color: "bg-green-50 border-green-200 text-green-700",
              },
              {
                step: "5",
                label: "API Gateway svarar klienten",
                detail: "HTTP 201 Created med rätt headers",
                color: "bg-teal-50 border-teal-200 text-teal-700",
              },
            ] as const
          ).map((item) => (
            <div key={item.step} className={`flex gap-4 items-start border rounded-lg px-4 py-3 ${item.color}`}>
              <span className="text-xs font-bold mt-0.5 shrink-0">Steg {item.step}</span>
              <div>
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs opacity-75 mt-0.5 font-mono">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <Notice variant="info">
          <strong>Cold start:</strong> Första anropet efter en period av inaktivitet tar längre tid (~100–500 ms för Node.js) eftersom Lambda måste starta containern. Efterföljande anrop till samma instans är snabbare (warm start).
        </Notice>
      </div>

      {/* event object structure */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">Event-objektet från API Gateway (HTTP API)</div>
        <CodeBlock
          lang="json"
          code={`{
  "version": "2.0",
  "routeKey": "POST /users",
  "rawPath": "/users",
  "requestContext": {
    "http": {
      "method": "POST",
      "path": "/users",
      "sourceIp": "84.217.12.34"
    }
  },
  "pathParameters": { "id": "42" },      // finns vid /users/:id
  "queryStringParameters": { "limit": "10" },
  "headers": {
    "content-type": "application/json",
    "authorization": "Bearer eyJ..."
  },
  "body": "{\"name\":\"Anna\",\"email\":\"anna@example.com\"}",
  "isBase64Encoded": false
}`}
        />
        <Notice variant="warning">
          <strong>Kom ihåg:</strong> <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">body</code> är alltid en sträng — aldrig ett objekt. Använd alltid <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">JSON.parse(event.body)</code> innan du accessar fälten.
        </Notice>
      </div>

      <Divider />

      {/* Diskussionsfrågor */}
      <div className="bg-[#232F3E] rounded-xl p-7 mt-2">
        <h2 className="text-white text-lg font-bold mb-5">
          🎯 <span className="text-[#FF9900]">Diskussionsfrågor</span>
        </h2>
        {(
          [
            "Varför returnerar POST 201 och inte 200? Vad signalerar det till klienten?",
            "En DELETE-request returnerar 200 med ett JSON-body. Vad är fel med det, och varför?",
            "Din Lambda-funktion tar emot event.body och anropar JSON.parse direkt. Vad kan gå fel om klienten skickar ett tomt body?",
            "Vad är skillnaden mellan cold start och warm start, och hur påverkar det API-svarstider?",
            "Varför ska URL:er i REST vara substantiv (/users) och inte verb (/getUsers)?",
            "En kollega returnerar alltid 200 OK — även för fel. Vilka problem skapar det för klienter som konsumerar API:et?",
          ] as const
        ).map((q, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 mb-2.5 flex gap-4">
            <span className="text-[#FF9900] text-[13px] font-bold shrink-0 mt-0.5">Q{i + 1}</span>
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
            { term: "REST", def: "Representational State Transfer — arkitekturstil för HTTP-API:er baserat på resurser och verb" },
            { term: "HTTP-verb", def: "GET (hämta), POST (skapa), PUT (uppdatera), DELETE (radera) — beskriver operationen" },
            { term: "Statuskod 200", def: "OK — anropet lyckades, svar innehåller data (GET, PUT)" },
            { term: "Statuskod 201", def: "Created — POST lyckades och ny resurs skapades" },
            { term: "Statuskod 204", def: "No Content — DELETE lyckades, inget body returneras" },
            { term: "Statuskod 404", def: "Not Found — resursen med angivet ID finns inte" },
            { term: "Lambda handler", def: "Den exporterade async-funktion som AWS anropar med event och context" },
            { term: "event.body", def: "HTTP request body som sträng — måste JSON.parse:as manuellt" },
            { term: "pathParameters", def: "URL-parametrar extraherade av API Gateway, t.ex. { id: '42' } från /users/42" },
            { term: "Cold start", def: "Fördröjning (~100–500 ms) när Lambda startar en ny container-instans" },
            { term: "API Gateway", def: "AWS-tjänst som tar emot HTTP-anrop och routar dem till Lambda-funktioner" },
            { term: "Stateless", def: "Lambda-funktioner har inget minne mellan anrop — all state lagras externt (DynamoDB, S3)" },
          ] as const
        ).map((g) => (
          <div key={g.term} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
            <div className="font-mono text-[13px] font-bold text-[#232F3E] mb-1">{g.term}</div>
            <div className="text-[13px] text-gray-500">{g.def}</div>
          </div>
        ))}
      </div>

      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
        ← Tillbaka till startsidan
      </Link>
    </div>
  );
}