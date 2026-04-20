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

/* ── HELPERS ── */

function SectionHeader({ number, title, highlight }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-12">
      <div className="w-9 h-9 rounded-full bg-[#232F3E] text-[#FF9900] text-sm font-bold flex items-center justify-center">
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
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-[13px] text-gray-600 flex gap-1.5">
            <span className="text-[#FF9900] text-xs">→</span>
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
      <div className="flex items-center gap-3 mb-4 pb-3 border-b">
        <span className={`px-3 py-1 rounded-md text-xs font-bold ${badgeClass}`}>
          {badge}
        </span>
        <div>
          <div className="font-semibold text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
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
    <div className={`border-l-4 px-4 py-3 my-4 text-sm ${styles[variant]}`}>
      {children}
    </div>
  );
}

function Divider() {
  return <hr className="my-8 border-gray-200" />;
}

/* ── PAGE ── */

export default function EC2Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-52">

      {/* Hero */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-xs font-bold px-3 py-1 rounded mb-3">
          AWS · Compute
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          EC2 <span className="text-[#FF9900]">Instances</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          Amazon EC2 låter dig köra virtuella servrar i molnet. Perfekt för backend, API:er och fullstack-appar.
        </p>
      </div>

      {/* SECTION 1 */}
      <SectionHeader number="1" title="Vad är" highlight="EC2?" />

      <ConceptCard
        badge="EC2"
        badgeClass="bg-blue-100 text-blue-700"
        title="Elastic Compute Cloud"
        subtitle="Virtuella servrar i AWS"
        description="EC2 ger dig full kontroll över en server — du väljer OS, CPU, RAM och nätverk.
        Du SSH:ar in och kör din applikation precis som på en vanlig Linux-server."
        col1Title="Används för"
        col1Items={[
          "Hosta backend/API",
          "Next.js server (Node)",
          "Databaser (ibland)",
          "Docker containers",
        ]}
        col2Title="Fördelar"
        col2Items={[
          "Full kontroll",
          "Skalbarhet",
          "Betala per användning",
          "Flexibla instanstyper",
        ]}
      />

      <Divider />

      {/* SECTION 2 */}
      <SectionHeader number="2" title="Instance" highlight="Types" />

      <ConceptCard
        badge="Types"
        badgeClass="bg-purple-100 text-purple-700"
        title="Instance Types"
        subtitle="Olika prestanda-profiler"
        description="Olika EC2-instanser är optimerade för olika workloads — CPU, minne eller kostnad.
        Du väljer rätt typ beroende på din applikation."
        col1Title="Vanliga typer"
        col1Items={[
          "t3 / t4g — billiga, burst",
          "m5 — balanserad",
          "c5 — CPU-optimerad",
          "r5 — RAM-optimerad",
        ]}
        col2Title="När använda"
        col2Items={[
          "t3: små appar",
          "m5: produktion",
          "c5: CPU-tunga jobb",
          "r5: databaser",
        ]}
      />

      <Divider />

      {/* SECTION 3 */}
      <SectionHeader number="3" title="Nyckelpar &" highlight="SSH" />

      <div className="grid grid-cols-2 gap-4">
        <InfoBlock
          title="Key Pair"
          items={[
            "Privat + publik nyckel",
            "Laddas ner som .pem",
            "Används för SSH-login",
          ]}
        />
        <InfoBlock
          title="SSH"
          items={[
            "ssh -i key.pem ec2-user@ip",
            "Port 22",
            "Säker anslutning",
          ]}
        />
      </div>

      <Notice variant="warning">
        Tappa inte bort din .pem-fil — du kan inte logga in utan den.
      </Notice>

      <Divider />

      {/* SECTION 4 */}
      <SectionHeader number="4" title="Deploy" highlight="Next.js" />

      <div className="bg-white border rounded-xl p-6 mb-4">
        <div className="text-sm font-bold mb-3">Deploy steg</div>
        <ol className="space-y-2 text-sm text-gray-600">
          <li>1. SSH in i EC2</li>
          <li>2. Installera Node.js</li>
          <li>3. Git clone repo</li>
          <li>4. npm install</li>
          <li>5. npm run build</li>
          <li>6. npm start</li>
        </ol>
      </div>

      <Notice variant="info">
        Använd gärna PM2 eller Docker för att hålla din app igång i produktion.
      </Notice>

      <Divider />

      {/* QUESTIONS */}
      <div className="bg-[#232F3E] rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">
          🎯 <span className="text-[#FF9900]">Diskussionsfrågor</span>
        </h2>
        {[
          "När ska du använda EC2 istället för serverless?",
          "Vad händer om du tappar din .pem-fil?",
          "Vilken instance type väljer du för en liten app?",
          "Hur deployar du en Next.js app på EC2?",
        ].map((q, i) => (
          <div key={i} className="bg-white/10 text-white p-3 rounded mb-2">
            Q{i + 1}: {q}
          </div>
        ))}
      </div>

      <Link href="/" className="block mt-10 text-sm text-gray-400">
        ← Tillbaka
      </Link>
    </div>
  );
}
