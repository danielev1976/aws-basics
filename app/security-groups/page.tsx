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
          vilken trafik som når EC2-instanser, Lambda-funktioner i VPC och
          RDS-databaser — på port- och protokollnivå.
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
        highlight="EC2 + Lambda + RDS"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        En typisk tre-lagers arkitektur i AWS: EC2 (eller Lambda) exponerar ett
        API mot internet, och kommunicerar sedan privat med en RDS-databas i ett
        privat subnät. Varje lager har sin egen Security Group.
      </p>

      {/* Architecture diagram */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-5">
          Tre Security Groups — ett lager vardera
        </div>

        {/* Layer 1: Internet */}
        <div className="flex justify-center mb-2">
          <div className="bg-gray-100 border border-gray-300 rounded-lg px-6 py-2 text-xs font-mono text-gray-500 font-semibold tracking-widest uppercase">
            Internet / Klienter
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <div className="w-px h-6 bg-gray-300" />
        </div>

        {/* Layer 2: EC2 / Lambda */}
        <div className="relative mb-2">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
              SG-WEB — Public Subnet
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-xs font-bold text-blue-700 mb-1">
                  EC2-instans
                </div>
                <div className="text-[11px] text-gray-500 font-mono">
                  Node.js / Express
                </div>
                <div className="mt-2 space-y-1">
                  <div className="text-[10px] bg-blue-100 text-blue-600 rounded px-1.5 py-0.5 font-mono">
                    :80 / :443 ← 0.0.0.0/0
                  </div>
                  <div className="text-[10px] bg-amber-100 text-amber-600 rounded px-1.5 py-0.5 font-mono">
                    :22 ← din IP /32
                  </div>
                </div>
              </div>
              <div className="bg-white border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-xs font-bold text-purple-700 mb-1">
                  Lambda (VPC)
                </div>
                <div className="text-[11px] text-gray-500 font-mono">
                  REST handler
                </div>
                <div className="mt-2 space-y-1">
                  <div className="text-[10px] bg-purple-100 text-purple-600 rounded px-1.5 py-0.5 font-mono">
                    Inbound: API Gateway
                  </div>
                  <div className="text-[10px] bg-green-100 text-green-600 rounded px-1.5 py-0.5 font-mono">
                    Outbound: SG-RDS :5432
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-2">
          <div className="flex flex-col items-center">
            <div className="w-px h-4 bg-gray-300" />
            <div className="text-[10px] text-gray-400 font-mono px-2">
              Port 5432 (PostgreSQL) — bara från SG-WEB
            </div>
            <div className="w-px h-4 bg-gray-300" />
          </div>
        </div>

        {/* Layer 3: RDS */}
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
          <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-2">
            SG-RDS — Private Subnet
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-3 text-center">
            <div className="text-xs font-bold text-green-700 mb-1">
              RDS (PostgreSQL / MySQL)
            </div>
            <div className="text-[11px] text-gray-500 font-mono">
              my-app-db.cluster-xxx.eu-west-1.rds.amazonaws.com
            </div>
            <div className="mt-2">
              <div className="text-[10px] bg-green-100 text-green-700 rounded px-1.5 py-0.5 font-mono inline-block">
                :5432 ← SG-WEB (Security Group som källa — inte IP)
              </div>
            </div>
          </div>
        </div>

        <Notice variant="danger">
          <strong>RDS ska aldrig ha en publik IP.</strong> Placera alltid RDS i
          ett privat subnät och låt bara applikationens Security Group (SG-WEB)
          nå databasen. En öppen databas mot internet är ett kritiskt
          säkerhetshål.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 3 — SG-WEB: EC2
      ══════════════════════════════ */}
      <SectionHeader number="3" title="SG-WEB" highlight="— EC2 / Webbserver" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        EC2-instansen är det publikt tillgängliga lagret. Den tar emot
        HTTP/HTTPS-trafik från hela internet, men SSH-åtkomst begränsas till din
        specifika IP-adress.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          SG-WEB — Inbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Trafik som tillåts <em>in</em> till EC2-instansen
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
                type="SSH"
                protocol="TCP"
                port="22"
                source="Din IP /32"
                description="SSH-åtkomst — bara du"
                highlight
              />
              <RuleRow
                type="HTTP"
                protocol="TCP"
                port="80"
                source="0.0.0.0/0"
                description="Webb-trafik från alla — omdirigera till 443"
              />
              <RuleRow
                type="HTTPS"
                protocol="TCP"
                port="443"
                source="0.0.0.0/0"
                description="Krypterad webb-trafik från alla"
              />
              <RuleRow
                type="Custom TCP"
                protocol="TCP"
                port="3000"
                source="0.0.0.0/0"
                description="Node.js dev-server (ta bort i produktion)"
              />
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 shrink-0" />
          <span className="text-xs text-gray-400">
            SSH begränsas alltid till /32 — aldrig mot 0.0.0.0/0
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          SG-WEB — Outbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Trafik som EC2-instansen får skicka <em>ut</em>
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
                type="All traffic"
                protocol="All"
                port="All"
                source="0.0.0.0/0"
                description="Default — tillåt all utgående trafik"
              />
              <RuleRow
                type="PostgreSQL"
                protocol="TCP"
                port="5432"
                source="SG-RDS"
                description="Kommunikation med RDS-databas"
                highlight
              />
              <RuleRow
                type="HTTPS"
                protocol="TCP"
                port="443"
                source="0.0.0.0/0"
                description="npm-paket, externa API:er, AWS-tjänster"
              />
            </tbody>
          </table>
        </div>
        <Notice variant="info">
          <strong>Best practice:</strong> I produktion bör du begränsa outbound
          till bara det du behöver — RDS-porten + HTTPS. Default "all traffic
          out" är bekvämt men ger angripare mer spelrum om instansen
          komprometteras.
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 4 — SG-LAMBDA
      ══════════════════════════════ */}
      <SectionHeader number="4" title="SG-LAMBDA" highlight="— Lambda i VPC" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Lambda-funktioner kör normalt utanför ett VPC och kan inte nå resurser i
        ditt privata nätverk. Genom att placera Lambda <em>i</em> ett VPC kan
        den kommunicera direkt med RDS — men det kräver en egen Security Group.
      </p>

      <ConceptCard
        badge="Lambda VPC"
        badgeClass="bg-purple-100 text-purple-700"
        title="Lambda i VPC"
        subtitle="Privat nätverkstillgång för serverlösa funktioner"
        description="När Lambda placeras i ett VPC kopplas en ENI (Elastic Network Interface) till funktionen. Lambda tilldelas en privat IP i ditt subnät och kan nå RDS, ElastiCache och andra privata resurser. Nackdelen: utan NAT Gateway når Lambda inte internet — t.ex. för externa API-anrop."
        col1Title="Passar när Lambda behöver"
        col1Items={[
          "Ansluta till RDS eller ElastiCache",
          "Nå interna mikrotjänster i VPC",
          "Kommunicera med on-premises via VPN",
          "Strikt nätverksisolering av känslig data",
        ]}
        col2Title="Kräver i VPC-läge"
        col2Items={[
          "Minst 2 privata subnät (olika AZ)",
          "NAT Gateway för internet-utgående",
          "Rätt IAM-behörigheter (ec2:CreateNetworkInterface)",
          "Tillräckligt med lediga IP-adresser i subnätet",
        ]}
      />

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">
          SG-LAMBDA — Inbound Rules
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Lambda i VPC behöver sällan inbound-regler — API Gateway anropar
          Lambda via AWS internt, inte via VPC-nätverket
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
          Det kritiska: Lambda måste kunna nå ut till RDS
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
                description="Lambda ansluter till RDS-databasen"
                highlight
              />
              <RuleRow
                type="MySQL/Aurora"
                protocol="TCP"
                port="3306"
                source="SG-RDS"
                description="Alternativt om du kör MySQL"
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
          <strong>Connection pooling:</strong> Lambda startar en ny
          databasanslutning vid varje cold start. Med många samtida anrop kan du
          tömma RDS connection pool. Använd RDS Proxy som buffer mellan Lambda
          och databasen för att undvika detta.
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
        RDS-databasens Security Group är den viktigaste att konfigurera korrekt.
        Den ska <strong>enbart</strong> tillåta trafik från applikationslagret —
        aldrig från internet.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          SG-RDS — Source som Security Group, inte IP
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Istället för att ange en IP-adress som källa pekar du på{" "}
          <em>en annan Security Group</em>. Det innebär att bara resurser som
          tillhör den angivna Security Group (SG-WEB eller SG-LAMBDA) får
          ansluta — oavsett vad deras IP råkar vara.
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
                "Source: sg-0abc123def (SG-WEB)",
                "Fungerar även om EC2 byts ut",
                "Skalbart — alla nya instanser i SG-WEB får åtkomst",
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
          Databasen accepterar <em>bara</em> trafik från applikationslagrets
          Security Groups
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
                source="SG-WEB"
                description="EC2-instansen får ansluta"
                highlight
              />
              <RuleRow
                type="PostgreSQL"
                protocol="TCP"
                port="5432"
                source="SG-LAMBDA"
                description="Lambda-funktionen får ansluta"
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

      {/* RDS Ports reference */}
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
        highlight="+ Lambda — Connection Pooling"
      />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        Lambda öppnar en ny databasanslutning vid varje anrop. Vid hög
        belastning kan det snabbt tömma RDS connection pool. RDS Proxy löser
        detta genom att sitta som mellanhand och poola anslutningarna.
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
                "Lambda #1 → ny DB-anslutning",
                "Lambda #2 → ny DB-anslutning",
                "Lambda #3 → ny DB-anslutning",
                "Lambda #100 → DB: Too many connections!",
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
              RDS har en begränsad connection pool — en stor Lambda-burst kan
              krascha databasen
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
              Med RDS Proxy
            </div>
            <div className="flex flex-col gap-2 mb-3">
              {[
                "Lambda #1 → RDS Proxy",
                "Lambda #2 → RDS Proxy",
                "Lambda #3 → RDS Proxy",
                "RDS Proxy → 5 poolade DB-anslutningar",
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
              Proxy återanvänder anslutningar — databasen ser bara ett fåtal
              kopplingar oavsett Lambda-volym
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
                  from: "SG-LAMBDA",
                  arrow: "→",
                  to: "SG-PROXY",
                  port: ":5432",
                  desc: "Lambda ansluter till Proxy",
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
                className="flex items-center gap-2 text-xs font-mono"
              >
                <span className="bg-purple-100 text-purple-700 rounded px-2 py-1">
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
                <span className="text-gray-400 font-sans ml-2">{row.desc}</span>
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
            "Varför är Security Groups stateful, och vad innebär det konkret när du konfigurerar en inbound SSH-regel?",
            "Du skapar en RDS-databas och vill att din EC2-instans ska nå den. Ska du ange EC2-instansens IP eller SG-WEB som källa i SG-RDS — och varför?",
            "En kollega placerar RDS i ett publikt subnät och öppnar port 5432 mot 0.0.0.0/0 för att förenkla lokalt testande. Vilka risker innebär det?",
            "Lambda i VPC kan inte längre nå externa API:er efter att du lade den i ett privat subnät. Vad saknas i infrastrukturen?",
            "Vad är RDS Proxy och varför är det särskilt viktigt när Lambda anropar RDS?",
            "Du har tre miljöer: dev, staging, prod. Bör de dela Security Groups eller ha egna — och varför?",
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
              term: "VPC",
              def: "Virtual Private Cloud — isolerat nätverksutrymme i AWS där dina resurser körs",
            },
            {
              term: "Privat subnät",
              def: "Subnät utan direkt internetanslutning — används för databaser och interna tjänster",
            },
            {
              term: "Publikt subnät",
              def: "Subnät med internetgateway — används för webbservrar och publika load balancers",
            },
            {
              term: "NAT Gateway",
              def: "Ger resurser i privata subnät utgående internetåtkomst utan att exponera dem inkommande",
            },
            {
              term: "RDS Proxy",
              def: "Hanterad databasproxy som pooler anslutningar — kritisk för Lambda + RDS-kombination",
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
              def: "Standardport för PostgreSQL och Aurora PostgreSQL — begränsa källan till SG-WEB/SG-LAMBDA",
            },
            {
              term: "Connection Pool",
              def: "Uppsättning befintliga DB-anslutningar som återanvänds — viktigt för Lambda som öppnar många connections",
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
