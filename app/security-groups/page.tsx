import Link from "next/link";
import Image from "next/image";
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

interface RuleRowProps {
  type: string;
  protocol: string;
  port: string;
  source: string;
  description: string;
  highlight?: boolean;
}

interface NoticeProps {
  children: ReactNode;
  variant?: "warning" | "info" | "danger";
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

function RuleRow({
  type,
  protocol,
  port,
  source,
  description,
  highlight,
}: RuleRowProps) {
  return (
    <tr
      className={`border-b border-gray-100 last:border-0 ${highlight ? "bg-amber-50" : ""}`}
    >
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{type}</td>
      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{protocol}</td>
      <td className="px-4 py-3 text-sm font-mono text-gray-700">{port}</td>
      <td className="px-4 py-3 text-sm font-mono text-gray-700">{source}</td>
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
    <div
      className={`border-l-4 rounded-r-lg px-4 py-3 text-sm leading-relaxed my-4 ${styles[variant]}`}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-gray-200 my-8" />;
}

/* ── PAGE ── */

export default function SecurityGroups() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Nätverk · Säkerhet
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Security Groups —{" "}
          <span className="text-[#FF9900]">EC2, Lambda &amp; RDS</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
          Security Groups är din första försvarslinje i AWS. De styr exakt
          vilken trafik som når Lambda-funktioner i VPC, EC2 med Spring Boot,
          och RDS-databaser — på port- och protokollnivå.
        </p>
      </div>

      {/* ══════════════════════════════
          DEL 1 — VAD ÄR SECURITY GROUPS
      ══════════════════════════════ */}
      <SectionHeader number="1" title="Security Groups" highlight="— grunden" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        En Security Group är en stateful, virtuell brandvägg som kopplas direkt
        till en AWS-resurs. Den arbetar på instansnivå — inte på subnät-nivå
        (det är NACLs uppgift). Ändringar träder i kraft direkt, utan omstart.
      </p>

      <ConceptCard
        badge="SG"
        badgeClass="bg-indigo-100 text-indigo-700"
        title="Security Group"
        subtitle="Stateful brandvägg på resursnivå"
        description="En Security Group innehåller inbound rules (trafik in till resursen) och outbound rules (trafik ut från resursen). Den är stateful — om du tillåter inkommande trafik tillåts svaret automatiskt ut, utan att du behöver skapa en outbound-regel för retursvaret."
        col1Title="Vad den skyddar"
        col1Items={[
          "EC2-instanser (webbservrar, bastion hosts)",
          "RDS-databaser (MySQL, PostgreSQL, Aurora)",
          "Lambda-funktioner i VPC",
          "Load Balancers (ALB/NLB)",
          "ElastiCache-kluster",
        ]}
        col2Title="Viktiga egenskaper"
        col2Items={[
          "Stateful — returtrafik tillåts automatiskt",
          "Default: all inbound NEKAD, all outbound tillåten",
          "Kan referera andra Security Groups som källa",
          "En resurs kan ha upp till 5 Security Groups",
          "Ändringar gäller omedelbart",
        ]}
      />

      {/* Stateful vs Stateless */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          Stateful vs. Stateless — Security Group vs. NACL
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
              Security Group — Stateful
            </div>
            <ul className="space-y-1.5">
              {[
                "Tillåt inbound port 443 → HTTPS in",
                "Svar ut tillåts automatiskt",
                "Ingen outbound-regel krävs för svaret",
                "Arbetar på instansnivå",
                "Bara Allow-regler — ingen explicit Deny",
              ].map((item) => (
                <li key={item} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-green-500 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              NACL — Stateless (jämförelse)
            </div>
            <ul className="space-y-1.5">
              {[
                "Tillåt inbound port 443 → HTTPS in",
                "Svar måste tillåtas explicit ut",
                "Kräver outbound port 1024–65535",
                "Arbetar på subnät-nivå",
                "Både Allow och Deny-regler",
              ].map((item) => (
                <li key={item} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-gray-400 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Notice variant="info">
          <strong>I praktiken:</strong> Använd Security Groups för finkorning
          kontroll på resursnivå. NACLs är ett extra lager för subnät-nivå —
          t.ex. för att blockera specifika IP-adresser helt.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 2 — ARKITEKTURÖVERSIKT
      ══════════════════════════════ */}
      <SectionHeader
        number="2"
        title="Arkitektur"
        highlight="API GW → Lambda → EC2 → RDS + S3"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Trafiken flödar från internet via API Gateway. Varje HTTP-metod (GET,
        POST, PUT, DELETE) är kopplad till sin <em>egen</em> Lambda-funktion.
        Lambda kommunicerar sedan med EC2 som kör en Spring Boot-applikation på
        port 8080. EC2 når i sin tur RDS-databasen och S3 för fillagring.
      </p>

      <Image src="/aws_lambda_apigw_ec2_architecture.svg" alt="Arkitekturdiagram" width={800} height={400} className="mb-6 rounded-lg border" />

      {/* Architecture diagram */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-5">
          Trafikflöde &amp; Security Groups — lager för lager
        </div>

        {/* Layer 0: Internet */}
        <div className="flex justify-center mb-1">
          <div className="bg-gray-100 border border-gray-300 rounded-lg px-8 py-2.5 text-center">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Internet / Klienter
            </div>
            <div className="text-[10px] text-gray-400 font-mono mt-0.5">
              Browser, mobil, tredjepartstjänst
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gray-300" />
        </div>
        <div className="flex justify-center mb-1">
          <div className="text-[10px] text-gray-400 font-mono bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
            HTTPS :443
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gray-300" />
        </div>

        {/* Layer 1: API Gateway */}
        <div className="flex justify-center mb-1">
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl px-8 py-3 text-center w-full max-w-sm">
            <div className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-1">
              AWS Managed — ingen SG
            </div>
            <div className="text-xs font-bold text-purple-800">
              API Gateway (HTTP API)
            </div>
            <div className="text-[11px] text-purple-600 font-mono mt-0.5">
              api.execute-api.eu-west-1.amazonaws.com
            </div>
            <div className="mt-2 text-[10px] bg-purple-100 text-purple-700 rounded px-2 py-0.5 inline-block">
              Routar anrop → Lambda via IAM
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gray-300" />
        </div>
        <div className="flex justify-center mb-1">
          <div className="text-[10px] text-gray-400 font-mono bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
            Lambda trigger (ingen nätverksport — IAM-baserat)
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gray-300" />
        </div>

        {/* Layer 2: Lambda — one per method */}
        <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4 mb-1">
          <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">
            SG-LAMBDA — Private Subnet — en Lambda per HTTP-metod
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                {
                  method: "GET",
                  color: "bg-blue-100 text-blue-700 border-blue-200",
                  fn: "getUsersHandler",
                },
                {
                  method: "POST",
                  color: "bg-green-100 text-green-700 border-green-200",
                  fn: "createUserHandler",
                },
                {
                  method: "PUT",
                  color: "bg-amber-100 text-amber-700 border-amber-200",
                  fn: "updateUserHandler",
                },
                {
                  method: "DELETE",
                  color: "bg-red-100 text-red-700 border-red-200",
                  fn: "deleteUserHandler",
                },
              ] as const
            ).map((l) => (
              <div
                key={l.method}
                className={`bg-white border rounded-lg p-2 text-center ${l.color.split(" ")[2]}`}
              >
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${l.color}`}
                >
                  {l.method}
                </span>
                <div className="text-[10px] text-gray-500 font-mono mt-1.5 leading-tight">
                  {l.fn}
                </div>
                <div className="text-[10px] text-indigo-500 mt-1 font-mono">
                  → :8080
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <div className="text-[10px] bg-gray-100 text-gray-600 rounded px-1.5 py-0.5 font-mono">
              Inbound: ingen
            </div>
            <div className="text-[10px] bg-indigo-100 text-indigo-600 rounded px-1.5 py-0.5 font-mono">
              Outbound → SG-EC2 :8080
            </div>
            <div className="text-[10px] bg-purple-100 text-purple-600 rounded px-1.5 py-0.5 font-mono">
              Alla 4 delar samma SG-LAMBDA
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gray-300" />
        </div>
        <div className="flex justify-center mb-1">
          <div className="text-[10px] text-gray-400 font-mono bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
            HTTP :8080 — Spring Boot internt i VPC
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gray-300" />
        </div>

        {/* Layer 3: EC2 Spring Boot */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-1">
          <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
            SG-EC2 — Private Subnet
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-xs font-bold text-blue-700 mb-1">
              EC2-instans — Spring Boot
            </div>
            <div className="text-[11px] text-gray-500 font-mono">
              java -jar myapp.jar · port 8080
            </div>
            <div className="mt-2 flex flex-wrap gap-1 justify-center">
              <div className="text-[10px] bg-blue-100 text-blue-600 rounded px-1.5 py-0.5 font-mono">
                Inbound :8080 ← SG-LAMBDA
              </div>
              <div className="text-[10px] bg-amber-100 text-amber-600 rounded px-1.5 py-0.5 font-mono">
                SSH :22 ← din IP /32
              </div>
              <div className="text-[10px] bg-green-100 text-green-600 rounded px-1.5 py-0.5 font-mono">
                Outbound → SG-RDS :5432
              </div>
              <div className="text-[10px] bg-orange-100 text-orange-600 rounded px-1.5 py-0.5 font-mono">
                Outbound → S3 via HTTPS
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4: RDS + S3 side by side */}
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gray-300" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex flex-col items-center">
            <div className="text-[10px] text-gray-400 font-mono bg-gray-50 border border-gray-200 rounded px-2 py-0.5 mb-1">
              TCP :5432 ← SG-EC2
            </div>
            <div className="w-px h-4 bg-gray-300 mb-1" />
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 w-full text-center">
              <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">
                SG-RDS — Private Subnet
              </div>
              <div className="text-xs font-bold text-green-700">
                RDS PostgreSQL
              </div>
              <div className="text-[10px] text-green-600 font-mono mt-1">
                :5432 ← SG-EC2 only
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[10px] text-gray-400 font-mono bg-gray-50 border border-gray-200 rounded px-2 py-0.5 mb-1">
              HTTPS via S3 VPC Endpoint
            </div>
            <div className="w-px h-4 bg-gray-300 mb-1" />
            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-3 w-full text-center">
              <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">
                Ingen SG — AWS Managed
              </div>
              <div className="text-xs font-bold text-orange-700">S3 Bucket</div>
              <div className="text-[10px] text-orange-600 font-mono mt-1">
                IAM-policy styr åtkomst
              </div>
            </div>
          </div>
        </div>

        <Notice variant="info">
          <strong>API Gateway har ingen Security Group</strong> — det är en helt
          hanterad AWS-tjänst utanför VPC. Lambda triggas via ett IAM-baserat
          anrop, inte via en nätverksport. EC2 och RDS däremot lever i ditt VPC
          och skyddas av Security Groups.
        </Notice>
      </div>

      <Divider />

      <SectionHeader
        number="3"
        title="SG-EC2"
        highlight="— Spring Boot på port 8080"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        EC2-instansen kör en Spring Boot-applikation som lyssnar på port 8080
        (Spring Boots standardport). Den är inte publikt exponerad — bara Lambda
        får nå den via SG-LAMBDA. SSH-åtkomst för administration begränsas till
        din IP.
      </p>


      {/* Spring Boot port note */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">
          Spring Boot &amp; port 8080 — varför just den porten?
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Spring Boot använder port 8080 som default. Det är en konvention för
          att undvika konflikt med port 80 (kräver root-rättigheter på Linux). I
          Security Group-regeln matchar du exakt den port Spring Boot lyssnar
          på.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              {
                label: "Port 80",
                note: "HTTP — kräver root, ej rekommenderat för app",
                color: "bg-gray-50 border-gray-200 text-gray-600",
              },
              {
                label: "Port 8080",
                note: "Spring Boot default — används i SG-EC2",
                color: "bg-blue-50 border-blue-200 text-blue-800",
              },
              {
                label: "server.port=XXXX",
                note: "Kan ändras i application.properties",
                color: "bg-amber-50 border-amber-200 text-amber-800",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.label}
              className={`border rounded-lg p-3 ${item.color}`}
            >
              <div className="font-mono text-xs font-bold mb-1">
                {item.label}
              </div>
              <div className="text-xs leading-snug opacity-80">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          SG-EC2 — Inbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          EC2 tar bara emot trafik från Lambda på port 8080 och SSH från din IP
          — aldrig direkt från internet
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Typ", "Protokoll", "Port", "Källa", "Syfte"] as const).map(
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
              <RuleRow
                type="Custom TCP"
                protocol="TCP"
                port="8080"
                source="SG-LAMBDA"
                description="Alla 4 Lambda-funktioner anropar Spring Boot på samma port"
                highlight
              />
              <RuleRow
                type="SSH"
                protocol="TCP"
                port="22"
                source="Din IP /32"
                description="Admin-åtkomst — bara du, aldrig 0.0.0.0/0"
              />
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 shrink-0" />
          <span className="text-xs text-gray-400">
            Alla 4 Lambda-funktioner (GET/POST/PUT/DELETE) delar SG-LAMBDA — en
            enda inbound-regel på port 8080 täcker dem alla.
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          SG-EC2 — Outbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          EC2 ansluter utåt till RDS och S3 — ingenting annat behövs i
          produktion
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(
                  ["Typ", "Protokoll", "Port", "Destination", "Syfte"] as const
                ).map((h) => (
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
              <RuleRow
                type="PostgreSQL"
                protocol="TCP"
                port="5432"
                source="SG-RDS"
                description="Spring Boot DataSource ansluter till RDS"
                highlight
              />
              <RuleRow
                type="HTTPS"
                protocol="TCP"
                port="443"
                source="0.0.0.0/0"
                description="S3-anrop via AWS SDK / VPC Endpoint"
              />
            </tbody>
          </table>
        </div>
        <Notice variant="info">
          <strong>S3 och Security Groups:</strong> S3 är en AWS-hanterad tjänst
          utanför VPC — den har ingen Security Group. Åtkomst styrs med
          IAM-roller och bucket policies. Använd ett S3 VPC Endpoint för att
          hålla trafiken inom AWS-nätverket utan att gå via internet.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 4 — SG-LAMBDA
      ══════════════════════════════ */}
      <SectionHeader number="4" title="SG-LAMBDA" highlight="— Lambda i VPC" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        API Gateway triggar Lambda via ett IAM-baserat anrop — ingen
        nätverksport. Men Lambda behöver en Security Group för att kunna nå EC2
        inne i VPC. Lambda placeras i ett privat subnät och kommunicerar vidare
        till EC2 på port 3000.
      </p>

      {/* Lambda image */}
      <div className="flex justify-center mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e9/AWS_Simple_Icons_Compute_AWS_Lambda.svg"
          alt="AWS Lambda"
          className="w-16 h-16 opacity-80"
        />
      </div>

      <ConceptCard
        badge="Lambda VPC"
        badgeClass="bg-purple-100 text-purple-700"
        title="Lambda i VPC"
        subtitle="Privat nätverkstillgång för serverlösa funktioner"
        description="API Gateway triggar Lambda via AWS internt — det kräver ingen inbound-regel i Security Group. Men för att Lambda ska kunna anropa EC2 inne i VPC måste Lambda ha en Security Group med en outbound-regel mot SG-EC2. Lambda placeras i ett privat subnät."
        col1Title="Passar när Lambda behöver"
        col1Items={[
          "Anropa EC2 eller interna tjänster i VPC",
          "Nå RDS eller ElastiCache direkt",
          "Kommunicera med on-premises via VPN",
          "Strikt nätverksisolering av känslig data",
        ]}
        col2Title="Kräver i VPC-läge"
        col2Items={[
          "Minst 2 privata subnät (olika AZ)",
          "NAT Gateway om Lambda behöver internet",
          "Rätt IAM-behörigheter (ec2:CreateNetworkInterface)",
          "Tillräckligt med lediga IP-adresser i subnätet",
        ]}
      />

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          SG-LAMBDA — Inbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          API Gateway anropar Lambda via IAM — inte via ett nätverksgränssnitt.
          Inga inbound-regler behövs.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Typ", "Protokoll", "Port", "Källa", "Syfte"] as const).map(
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
              <RuleRow
                type="(inga regler)"
                protocol="—"
                port="—"
                source="—"
                description="API Gateway triggar Lambda via IAM, inte via nätverk"
              />
            </tbody>
          </table>
        </div>

        <div className="text-sm font-bold text-gray-800 mt-6 mb-1">
          SG-LAMBDA — Outbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Lambda anropar EC2 på port 3000 inuti VPC
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(
                  ["Typ", "Protokoll", "Port", "Destination", "Syfte"] as const
                ).map((h) => (
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
              <RuleRow
                type="Custom TCP"
                protocol="TCP"
                port="3000"
                source="SG-EC2"
                description="Lambda anropar EC2-appservern i VPC"
                highlight
              />
              <RuleRow
                type="HTTPS"
                protocol="TCP"
                port="443"
                source="0.0.0.0/0"
                description="Externa API:er via NAT Gateway (om konfigurerat)"
              />
            </tbody>
          </table>
        </div>
        <Notice variant="warning">
          <strong>API Gateway har ingen Security Group.</strong> Det är en fullt
          hanterad tjänst som lever utanför ditt VPC. Anropet till Lambda är
          IAM-baserat och syns aldrig som nätverkstrafik i Security
          Group-loggar.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 5 — SG-RDS
      ══════════════════════════════ */}
      <SectionHeader
        number="5"
        title="SG-RDS"
        highlight="— Databas i privat subnät"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        RDS-databasens Security Group är den viktigaste att konfigurera rätt.
        Den ska <strong>enbart</strong> tillåta trafik från EC2:s Security Group
        (SG-EC2) — aldrig från internet, aldrig från Lambda direkt i denna
        arkitektur.
      </p>

      {/* RDS image */}
      <div className="flex justify-center mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Amazon-Relational-Database-Service-RDS.svg/256px-Amazon-Relational-Database-Service-RDS.svg.png"
          alt="Amazon RDS"
          className="w-16 h-16 opacity-80"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          SG-RDS — Source som Security Group, inte IP
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Istället för att ange en IP-adress som källa pekar du på{" "}
          <em>SG-EC2</em>. Det innebär att bara resurser som tillhör EC2:s
          Security Group får ansluta — oavsett vad deras IP råkar vara.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-3">
              Fel — IP som källa
            </div>
            <ul className="space-y-1.5">
              {[
                "Source: 10.0.1.45/32",
                "Slutar fungera om EC2 byts ut",
                "Svårt att hantera i skala",
                "Kräver manuell uppdatering vid IP-byte",
              ].map((item) => (
                <li key={item} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-red-400 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
              Rätt — SG som källa
            </div>
            <ul className="space-y-1.5">
              {[
                "Source: sg-0abc123 (SG-EC2)",
                "Fungerar även om EC2 byts ut",
                "Skalbart — alla nya EC2-instanser i SG-EC2 får åtkomst",
                "Självdokumenterande — tydlig avsikt",
              ].map((item) => (
                <li key={item} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-green-500 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          SG-RDS — Inbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Databasen accepterar <em>bara</em> trafik från EC2-lagrets Security
          Group
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Typ", "Protokoll", "Port", "Källa", "Syfte"] as const).map(
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
              <RuleRow
                type="PostgreSQL"
                protocol="TCP"
                port="5432"
                source="SG-EC2"
                description="EC2-instansen får ansluta till databasen"
                highlight
              />
            </tbody>
          </table>
        </div>
        <Notice variant="danger">
          <strong>
            Lägg aldrig till 0.0.0.0/0 som källa på port 5432 eller 3306.
          </strong>{" "}
          En publik databas är ett av de vanligaste och allvarligaste
          säkerhetshålen på AWS. Kryptera alltid data in transit med SSL och in
          rest med KMS.
        </Notice>
      </div>

      {/* S3 section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg"
            alt="Amazon S3"
            className="w-10 h-10 opacity-80 shrink-0"
          />
          <div>
            <div className="text-sm font-bold text-gray-800">
              S3 — Ingen Security Group
            </div>
            <div className="text-xs text-gray-400">
              Åtkomst styrs via IAM-roller och bucket policies
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          S3 är en globalt hanterad AWS-tjänst som lever utanför VPC. Den har
          ingen Security Group. Istället kontrolleras åtkomsten av IAM:
          EC2-instansen tilldelas en IAM Role med rätt S3-behörighet, och bucket
          policyn kan begränsa vilka roller och konton som har åtkomst.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <InfoBlock
            title="EC2 → S3 kräver"
            items={[
              "IAM Role kopplad till EC2-instansen",
              "Policy med s3:GetObject, s3:PutObject etc.",
              "S3 VPC Endpoint (rekommenderas) för privat trafik",
              "Bucket policy som tillåter IAM Role",
            ]}
          />
          <InfoBlock
            title="S3 VPC Endpoint — varför?"
            items={[
              "Trafiken lämnar aldrig AWS-nätverket",
              "Ingen kostnad för NAT Gateway-datatransfer",
              "Bucket policy kan kräva VPC Endpoint som källa",
              "Lägre latens och högre säkerhet",
            ]}
          />
        </div>
      </div>

      {/* Ports reference */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          Standardportar för vanliga RDS-motorer
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                engine: "PostgreSQL",
                port: "5432",
                color: "bg-blue-50 border-blue-200 text-blue-800",
              },
              {
                engine: "MySQL / MariaDB",
                port: "3306",
                color: "bg-orange-50 border-orange-200 text-orange-800",
              },
              {
                engine: "Aurora PostgreSQL",
                port: "5432",
                color: "bg-blue-50 border-blue-200 text-blue-800",
              },
              {
                engine: "Aurora MySQL",
                port: "3306",
                color: "bg-orange-50 border-orange-200 text-orange-800",
              },
              {
                engine: "Microsoft SQL Server",
                port: "1433",
                color: "bg-gray-50 border-gray-200 text-gray-700",
              },
              {
                engine: "Oracle",
                port: "1521",
                color: "bg-red-50 border-red-200 text-red-700",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.engine}
              className={`border rounded-lg p-3 flex justify-between items-center ${item.color}`}
            >
              <div className="text-xs font-semibold">{item.engine}</div>
              <div className="font-mono text-xs font-bold">:{item.port}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 6 — RDS PROXY
      ══════════════════════════════ */}
      <SectionHeader
        number="6"
        title="RDS Proxy"
        highlight="+ EC2 — Connection Pooling"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        EC2 håller typiskt en connection pool mot RDS. Vid skalning med flera
        EC2-instanser kan antalet öppna anslutningar snabbt bli för högt. RDS
        Proxy sitter som mellanhand och hanterar poolning centralt.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          Utan vs. Med RDS Proxy
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-3">
              Utan RDS Proxy
            </div>
            <div className="flex flex-col gap-2 mb-3">
              {[
                "EC2 #1 → 10 DB-anslutningar",
                "EC2 #2 → 10 DB-anslutningar",
                "EC2 #3 → 10 DB-anslutningar",
                "RDS: Too many connections!",
              ].map((item, i) => (
                <div
                  key={item}
                  className={`text-[11px] font-mono rounded px-2 py-1 ${i === 3 ? "bg-red-200 text-red-800 font-bold" : "bg-white text-gray-600 border border-red-100"}`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="text-xs text-red-700">
              Varje EC2-instans håller sin egen pool — vid skalning tömmer de
              tillsammans RDS connection limit
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
              Med RDS Proxy
            </div>
            <div className="flex flex-col gap-2 mb-3">
              {[
                "EC2 #1 → RDS Proxy",
                "EC2 #2 → RDS Proxy",
                "EC2 #3 → RDS Proxy",
                "RDS Proxy → 10 poolade DB-anslutningar",
              ].map((item, i) => (
                <div
                  key={item}
                  className={`text-[11px] font-mono rounded px-2 py-1 ${i === 3 ? "bg-green-200 text-green-800 font-bold" : "bg-white text-gray-600 border border-green-100"}`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="text-xs text-green-700">
              Proxy delar på anslutningar — RDS ser ett konstant litet antal
              connections oavsett hur många EC2-instanser som kör
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs font-bold text-gray-700 mb-3">
            Security Groups för RDS Proxy
          </div>
          <div className="space-y-2">
            {(
              [
                {
                  from: "SG-EC2",
                  arrow: "→",
                  to: "SG-PROXY",
                  port: ":5432",
                  desc: "EC2 ansluter till Proxy",
                },
                {
                  from: "SG-PROXY",
                  arrow: "→",
                  to: "SG-RDS",
                  port: ":5432",
                  desc: "Proxy ansluter till RDS",
                },
              ] as const
            ).map((row) => (
              <div
                key={row.from}
                className="flex items-center gap-2 text-xs font-mono flex-wrap"
              >
                <span className="bg-blue-100 text-blue-700 rounded px-2 py-1">
                  {row.from}
                </span>
                <span className="text-gray-400">{row.arrow}</span>
                <span className="bg-amber-100 text-amber-700 rounded px-2 py-1">
                  {row.to}
                </span>
                <span className="text-gray-400">{row.arrow}</span>
                <span className="bg-green-100 text-green-700 rounded px-2 py-1">
                  {row.to === "SG-RDS" ? "RDS" : row.to} {row.port}
                </span>
                <span className="text-gray-400 font-sans ml-1">{row.desc}</span>
              </div>
            ))}
          </div>
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
            "API Gateway har ingen Security Group — varför inte, och hur triggas Lambda om inte via en nätverksport?",
            "Lambda anropar EC2 på port 3000. Vilka Security Group-regler behövs i SG-LAMBDA (outbound) och SG-EC2 (inbound)?",
            "En kollega placerar RDS i ett publikt subnät och öppnar port 5432 mot 0.0.0.0/0 för att förenkla lokalt testande. Vilka risker innebär det?",
            "Varför ska du ange SG-EC2 som källa i SG-RDS istället för EC2-instansens privata IP-adress?",
            "S3 har ingen Security Group — hur begränsar du då vilken EC2-instans som får läsa från din bucket?",
            "Du skalar upp till 5 EC2-instanser. Hur påverkar det Security Group-konfigurationen för SG-RDS, och varför är RDS Proxy relevant här?",
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
              term: "Security Group",
              def: "Stateful brandvägg på resursnivå — styr in- och utgående trafik per instans",
            },
            {
              term: "Inbound Rule",
              def: "Regel som tillåter trafik in till en resurs — specificerar protokoll, port och källa",
            },
            {
              term: "Outbound Rule",
              def: "Regel som tillåter trafik ut från en resurs — default tillåter all utgående trafik",
            },
            {
              term: "Stateful",
              def: "Returtrafik för tillåtna anslutningar tillåts automatiskt — ingen extra outbound-regel krävs",
            },
            {
              term: "SG som källa",
              def: "Peka på en annan Security Group som källa istället för IP — skalbart och självdokumenterande",
            },
            {
              term: "API Gateway",
              def: "AWS-hanterad tjänst utanför VPC — ingen SG. Triggar Lambda via IAM-baserat anrop",
            },
            {
              term: "VPC",
              def: "Virtual Private Cloud — isolerat nätverksutrymme i AWS där EC2, Lambda och RDS körs",
            },
            {
              term: "Privat subnät",
              def: "Subnät utan direkt internetanslutning — används för EC2 (appserver), Lambda och RDS",
            },
            {
              term: "NAT Gateway",
              def: "Ger resurser i privata subnät utgående internetåtkomst utan att exponera dem inkommande",
            },
            {
              term: "S3 VPC Endpoint",
              def: "Privat anslutning från VPC till S3 — trafiken lämnar aldrig AWS-nätverket, ingen NAT-kostnad",
            },
            {
              term: "RDS Proxy",
              def: "Hanterad databasproxy som pooler anslutningar — kritisk när flera EC2-instanser delar en databas",
            },
            {
              term: "NACL",
              def: "Network Access Control List — stateless brandvägg på subnätnivå, komplement till Security Groups",
            },
            {
              term: "ENI",
              def: "Elastic Network Interface — virtuellt nätverkskort som tilldelas Lambda när den kör i VPC",
            },
            {
              term: "Port 5432",
              def: "Standardport för PostgreSQL och Aurora PostgreSQL — begränsa källan till SG-EC2 i SG-RDS",
            },
            {
              term: "IAM Role (EC2)",
              def: "Tilldelas EC2-instansen och ger den behörighet att nå S3 utan att hantera access keys manuellt",
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
