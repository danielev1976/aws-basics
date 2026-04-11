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

function RuleRow({ type, protocol, port, source, description, highlight }: RuleRowProps) {
  return (
    <tr className={`border-b border-gray-100 last:border-0 ${highlight ? "bg-amber-50" : ""}`}>
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
    <div className={`border-l-4 rounded-r-lg px-4 py-3 text-sm leading-relaxed my-4 ${styles[variant]}`}>
      {children}
    </div>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-gray-200 my-8" />;
}

/* ── PAGE ── */

export default function Security() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Hero */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Säkerhet
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          IAM &amp; <span className="text-[#FF9900]">Security Groups</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
          Åtkomstkontroll och nätverkssäkerhet är grunden i AWS. IAM styr <em>vem</em> som får göra <em>vad</em> — Security Groups styr <em>vilken trafik</em> som når dina resurser.
        </p>
      </div>

      {/* ══════════════════════════════
          DEL 1 — IAM USERS
      ══════════════════════════════ */}
      <SectionHeader number="1" title="IAM" highlight="Users" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        En IAM User representerar en person eller ett system som behöver permanent åtkomst till ditt AWS-konto. Varje användare har egna inloggningsuppgifter och behörigheter.
      </p>

      <ConceptCard
        badge="IAM"
        badgeClass="bg-blue-100 text-blue-700"
        title="IAM User"
        subtitle="En identitet med permanenta credentials"
        description="En IAM User har ett unikt namn inom AWS-kontot och kan autentisera sig med lösenord (Console) eller access keys (CLI/API). Behörigheter ges via policies — antingen direkt eller via grupper."
        col1Title="Passar för"
        col1Items={[
          "Enskilda personer i ditt team",
          "CI/CD-system med fasta credentials",
          "Applikationer som kör utanför AWS",
          "Long-lived programmatic access",
        ]}
        col2Title="Credentials-typer"
        col2Items={[
          "Lösenord — Console-inloggning",
          "Access Key ID + Secret — CLI/API",
          "MFA-enhet — extra säkerhetslager",
          "SSH-nycklar — CodeCommit",
        ]}
      />

      {/* User vs Group */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">Users &amp; Groups — Hantera behörigheter i skala</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">IAM User</div>
            <ul className="space-y-1.5">
              {[
                "En specifik person eller applikation",
                "Egna credentials (lösenord / keys)",
                "Kan tillhöra flera grupper",
                "Policies kan fästas direkt",
              ].map((item) => (
                <li key={item} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-blue-400 shrink-0">→</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">IAM Group</div>
            <ul className="space-y-1.5">
              {[
                "Samling av users med samma roll",
                "Policies kopplas till gruppen",
                "Alla users i gruppen ärver policies",
                "Exempel: Developers, Admins, ReadOnly",
              ].map((item) => (
                <li key={item} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-green-500 shrink-0">→</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Notice variant="info">
          <strong>Best practice:</strong> Lägg aldrig policies direkt på en User om du kan undvika det — använd Groups istället. Det är mycket enklare att ändra behörigheter för ett team när de hanteras på gruppnivå.
        </Notice>
      </div>

      {/* Principle of least privilege */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">Principle of Least Privilege</div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Ge varje user och roll <strong>minsta möjliga behörighet</strong> för att utföra sitt arbete — ingenting mer. Det begränsar skadan om credentials läcker eller ett konto komprometteras.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              { label: "Undvik", value: "AdministratorAccess på alla", color: "bg-red-50 border-red-200 text-red-700" },
              { label: "Bättre", value: "PowerUserAccess per team", color: "bg-amber-50 border-amber-200 text-amber-700" },
              { label: "Bäst", value: "Specifika actions per resurs", color: "bg-green-50 border-green-200 text-green-700" },
            ] as const
          ).map((item) => (
            <div key={item.label} className={`border rounded-lg p-3 text-center ${item.color}`}>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-xs leading-snug">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 2 — IAM ROLES
      ══════════════════════════════ */}
      <SectionHeader number="2" title="IAM" highlight="Roles" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        En IAM Role är en identitet med temporära credentials — ingen fast lösenord eller access key. Istället antar en tjänst eller person rollen tillfälligt och får de behörigheter som rollen har.
      </p>

      <ConceptCard
        badge="IAM"
        badgeClass="bg-purple-100 text-purple-700"
        title="IAM Role"
        subtitle="Temporär identitet som antas av en tjänst eller person"
        description="En Role har en trust policy (vem får anta rollen) och en permission policy (vad får rollen göra). AWS STS utfärdar temporära credentials (15 min – 12 h). Credentials roteras automatiskt."
        col1Title="Passar för"
        col1Items={[
          "EC2-instanser som anropar S3 eller DynamoDB",
          "Lambda-funktioner som behöver AWS-åtkomst",
          "Cross-account access",
          "Federerade användare (SSO, Active Directory)",
        ]}
        col2Title="Fördelar vs. User"
        col2Items={[
          "Inga långlivade access keys att läcka",
          "Credentials roteras automatiskt",
          "Kan antas av AWS-tjänster direkt",
          "Säkrare för applikationer i AWS",
        ]}
      />

      {/* User vs Role table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">User vs. Role — Nyckelskillnader</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Egenskap", "IAM User", "IAM Role"] as const).map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold first:rounded-tl-md last:rounded-tr-md">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  { prop: "Credentials", user: "Permanenta (lösenord / access key)", role: "Temporära (STS-token, auto-roteras)" },
                  { prop: "Används av", user: "Person eller extern applikation", role: "AWS-tjänst, applikation eller person" },
                  { prop: "Typisk livslängd", user: "Månader – år", role: "15 minuter – 12 timmar" },
                  { prop: "Säkerhetsnivå", user: "Lägre — key kan läcka", role: "Högre — ingen fast nyckel" },
                  { prop: "Exempel", user: "DevOps-ingenjör loggar in i Console", role: "EC2 läser filer från S3" },
                ] as const
              ).map((row, i) => (
                <tr key={row.prop} className={`border-b border-gray-100 last:border-0 ${i % 2 !== 0 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">{row.prop}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role example */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">Exempel — EC2 som läser från S3</div>
        <div className="flex items-center gap-3 flex-wrap">
          {(
            [
              { label: "EC2-instans", sub: "Din server", color: "bg-blue-50 border-blue-200 text-blue-700" },
              { label: "→ antar", sub: "", color: "" },
              { label: "IAM Role", sub: "EC2-S3ReadOnly", color: "bg-purple-50 border-purple-200 text-purple-700" },
              { label: "→ får åtkomst till", sub: "", color: "" },
              { label: "S3 Bucket", sub: "my-app-assets", color: "bg-green-50 border-green-200 text-green-700" },
            ] as const
          ).map((step, i) =>
            step.color ? (
              <div key={i} className={`border rounded-lg px-4 py-2.5 text-center ${step.color}`}>
                <div className="text-xs font-bold">{step.label}</div>
                {step.sub && <div className="text-[11px] font-mono mt-0.5 opacity-75">{step.sub}</div>}
              </div>
            ) : (
              <span key={i} className="text-gray-400 text-sm font-medium">{step.label}</span>
            )
          )}
        </div>
        <Notice variant="info">
          Ingen access key behövs i koden. EC2 hämtar temporära credentials automatiskt via instansens metadata-endpoint (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">169.254.169.254</code>).
        </Notice>
      </div>

      <Divider />

      {/* ══════════════════════════════
          DEL 3 — SECURITY GROUP / SSH
      ══════════════════════════════ */}
      <SectionHeader number="3" title="Security Group" highlight="som brandvägg" />

      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        En Security Group fungerar som en virtuell brandvägg för din EC2-instans. Den kontrollerar vilken inkommande och utgående trafik som tillåts. Ändringar träder i kraft omedelbart — ingen omstart krävs.
      </p>

      {/* Port 22 explained */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-4">Port 22 — SSH-åtkomst</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InfoBlock
            title="Vad är SSH?"
            items={[
              "Secure Shell — krypterat fjärrterminal-protokoll",
              "Används för att logga in på Linux-servrar",
              "Körs på port 22 per default",
              "Autentisering via nyckelpar (.pem-fil)",
            ]}
          />
          <InfoBlock
            title="Varför begränsa till din IP?"
            items={[
              "Port 22 öppen för 0.0.0.0/0 = hela internet kan försöka logga in",
              "Automatiserade bruteforce-attacker startar inom minuter",
              "Din IP (t.ex. 84.217.x.x/32) = bara du når servern",
              "/32 betyder exakt en IP-adress",
            ]}
          />
        </div>
        <Notice variant="danger">
          <strong>Säkerhetsvarning:</strong> Öppna aldrig port 22 mot <code className="text-xs bg-red-100 px-1 py-0.5 rounded">0.0.0.0/0</code> i produktion. Din server kommer att utsättas för konstanta inloggningsförsök inom minuter efter lansering.
        </Notice>
      </div>

      {/* Inbound rules table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-1">Inbound Rules — Exempel för en webbserver</div>
        <p className="text-xs text-gray-400 mb-4">Trafik som tillåts <em>in</em> till din EC2-instans</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Typ", "Protokoll", "Port", "Källa", "Syfte"] as const).map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold first:rounded-tl-md last:rounded-tr-md">
                    {h}
                  </th>
                ))}
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
                description="Webb-trafik från alla"
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
                port="8080"
                source="0.0.0.0/0"
                description="Spring Boot (om ingen reverse proxy)"
              />
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 shrink-0" />
          <span className="text-xs text-gray-400">Markerad rad = den viktiga SSH-regeln du konfigurerar</span>
        </div>
      </div>

      {/* How to find your IP */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">Hitta din IP — steg för steg</div>
        <ol className="space-y-3">
          {(
            [
              { step: "1", text: "Gå till", link: "https://whatismyip.com", linkText: "whatismyip.com" },
              { step: "2", text: "Kopiera din publika IPv4-adress, t.ex.", code: "84.217.12.34" },
              { step: "3", text: "Lägg till /32 i slutet:", code: "84.217.12.34/32" },
              { step: "4", text: "Klistra in detta värde i fältet Source när du skapar SSH-regeln i AWS Console" },
            ] as const
          ).map((item) => (
            <li key={item.step} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-[#232F3E] text-[#FF9900] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {item.step}
              </span>
              <span className="text-sm text-gray-600">
                {item.text}{" "}
                {"link" in item && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    {item.linkText}
                  </a>
                )}
                {"code" in item && (
                  <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono ml-1">{item.code}</code>
                )}
              </span>
            </li>
          ))}
        </ol>
        <Notice variant="warning">
          <strong>Obs:</strong> Om du arbetar hemifrån kan din IP förändras när routern startas om. Kontrollera alltid din aktuella IP om SSH plötsligt slutar fungera.
        </Notice>
      </div>

      {/* Stateful reminder */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="text-sm font-bold text-gray-800 mb-3">Security Groups är stateful</div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Du behöver bara skapa en inbound-regel för SSH. Security Groups minns kopplingen och tillåter automatiskt retursvaret ut — du behöver ingen separat outbound-regel för port 22.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <InfoBlock
            title="Stateful — Security Group"
            items={[
              "Tillåt inbound SSH port 22",
              "Retursvaret tillåts automatiskt ut",
              "Ingen outbound-regel krävs för port 22",
            ]}
          />
          <InfoBlock
            title="Stateless — NACL (jämförelse)"
            items={[
              "Tillåt inbound SSH port 22",
              "Måste också tillåta outbound port 1024–65535",
              "Ephemeral ports för retursvaret",
            ]}
          />
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
            "Varför är IAM Roles säkrare än IAM Users för applikationer som kör på EC2?",
            "Vad händer om du öppnar port 22 mot 0.0.0.0/0 i en Security Group?",
            "En kollega behöver tillfällig åtkomst till ditt AWS-konto. Skapar du en User eller en Role — och varför?",
            "Din IP har ändrats och du kan inte längre SSH:a till din EC2-instans. Vad gör du?",
            "Vad är Principle of Least Privilege och hur tillämpar du det med IAM?",
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
            { term: "IAM", def: "Identity and Access Management — AWS:s tjänst för åtkomstkontroll" },
            { term: "IAM User", def: "Permanent identitet med egna credentials för en person eller applikation" },
            { term: "IAM Role", def: "Temporär identitet som antas av tjänster eller användare — ingen fast nyckel" },
            { term: "IAM Policy", def: "JSON-dokument som definierar tillåtna och nekade actions på AWS-resurser" },
            { term: "IAM Group", def: "Samling av users som delar samma policies" },
            { term: "Access Key", def: "Key ID + Secret för programmatisk åtkomst via CLI eller API" },
            { term: "STS", def: "Security Token Service — utfärdar temporära credentials för Roles" },
            { term: "MFA", def: "Multi-Factor Authentication — extra säkerhetslager utöver lösenord" },
            { term: "Security Group", def: "Stateful brandvägg på instansnivå — styr inkommande och utgående trafik" },
            { term: "Port 22 / SSH", def: "Protokoll för krypterad fjärranslutning till Linux-servrar" },
            { term: "/32 CIDR", def: "Nätmask som representerar exakt en IP-adress" },
            { term: "Least Privilege", def: "Säkerhetsprincip: ge minsta möjliga behörighet för att utföra jobbet" },
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