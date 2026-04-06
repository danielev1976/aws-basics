import React from "react";
import { ReactNode } from "react";

/* ── TYPES ── */

interface SectionHeaderProps {
  number: string;
  title: string;
  highlight: string;
}

interface InfoBlockProps {
  title: string;
  items?: string[];
  children?: ReactNode;
}

interface ServiceCardProps {
  badge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  description: string;
  col1Title: string;
  col1Items: string[];
  col2Title: string;
  col2Items: string[];
  tableRow?: [string, string];
}

interface SpecSegProps {
  color: string;
  acronym: string;
  name: string;
}

interface PriceCardProps {
  accentColor: string;
  icon: string;
  name: string;
  sub: string;
  badgeClass: string;
  badgeText: string;
  pros: string[];
  cons: string[];
}

/* ── PAGE ── */

export default function Introduktion() {
  return (
    <div className="bg-[#f7f8fc] min-h-screen font-sans text-[#1a1a2e]">


      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* ══════════════════════════════
            DEL 1 — TJÄNSTEMODELLER
        ══════════════════════════════ */}
        <SectionHeader number="1" title="Tjänstemodeller:" highlight="IaaS · PaaS · SaaS · FaaS" />

        <p className="text-[#4a5568] mb-5 text-sm">
          Molntjänster delas in i fyra nivåer beroende på hur mycket du ansvarar för — och hur mycket leverantören hanterar åt dig.
        </p>

        {/* Spectrum diagram */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-7 mb-6">
          <div className="text-xs font-semibold text-[#718096] uppercase tracking-widest mb-5">
            Kontroll vs. bekvämlighet
          </div>
          <div className="grid grid-cols-4 gap-0.5 rounded-lg overflow-hidden mb-3">
            <SpecSeg color="bg-[#e65100]" acronym="IaaS" name="Infrastructure" />
            <SpecSeg color="bg-[#1565c0]" acronym="PaaS" name="Platform" />
            <SpecSeg color="bg-[#6a1b9a]" acronym="FaaS" name="Function" />
            <SpecSeg color="bg-[#1b5e20]" acronym="SaaS" name="Software" />
          </div>
          <div className="flex justify-between text-xs text-[#718096]">
            <span>← Du hanterar mer</span>
            <span>Leverantören hanterar mer →</span>
          </div>
        </div>

        {/* IaaS */}
        <ServiceCard
          badge="IaaS"
          badgeClass="bg-[#fff3e0] text-[#e65100]"
          title="Infrastructure as a Service"
          subtitle="Amazon EC2 · Google Compute Engine · Azure VMs"
          description="Leverantören tillhandahåller de fysiska byggstenar för molninfrastruktur — virtuella servrar, nätverk, lagring. Du ansvarar själv för operativsystem, middleware och applikationer."
          col1Title="När passar det?"
          col1Items={["Full kontroll över miljön krävs", "Lift-and-shift migration", "Dedikerat devops-team finns", "Specialkonfigurerade OS-miljöer"]}
          col2Title="Du ansvarar för"
          col2Items={["Operativsystem (patchar, uppdateringar)", "Runtime & middleware", "Applikation & data", "Säkerhetskonfiguration"]}
          tableRow={["OS, runtime, applikation, data", "Nätverk, hårdvara, virtualisering, datacenter"]}
        />

        {/* PaaS */}
        <ServiceCard
          badge="PaaS"
          badgeClass="bg-[#e3f2fd] text-[#1565c0]"
          title="Platform as a Service"
          subtitle="AWS Elastic Beanstalk · Heroku · Azure App Service"
          description="Leverantören tillhandahåller en komplett plattform. Du fokuserar enbart på din kod och data — OS och runtime hanteras åt dig."
          col1Title="När passar det?"
          col1Items={["Snabb driftsättning utan serverconfig", "Liten eller ingen ops-personal", "Standardiserade miljöer räcker"]}
          col2Title="Leverantören sköter"
          col2Items={["OS, runtime & middleware", "Säkerhetsuppdateringar", "Skalning & lastbalansering"]}
          tableRow={["Applikation, data", "OS, runtime, middleware, infrastruktur"]}
        />

        {/* SaaS */}
        <ServiceCard
          badge="SaaS"
          badgeClass="bg-[#e8f5e9] text-[#1b5e20]"
          title="Software as a Service"
          subtitle="Gmail · Microsoft 365 · Salesforce · Slack"
          description="Färdiga applikationer levererade via internet. Du använder produkten — ingen infrastruktur att konfigurera eller underhålla."
          col1Title="Passar för"
          col1Items={["Standardiserade affärsbehov", "Ingen teknisk personal för driften", "Snabb onboarding utan installation"]}
          col2Title="Du ansvarar bara för"
          col2Items={["Din data", "Användarkonfiguration", "Behörigheter & åtkomst"]}
        />

        {/* FaaS */}
        <ServiceCard
          badge="FaaS"
          badgeClass="bg-[#f3e5f5] text-[#6a1b9a]"
          title="Function as a Service — Serverless"
          subtitle="AWS Lambda · Google Cloud Functions · Azure Functions"
          description="Du skriver enskilda funktioner som körs vid behov — du betalar per anrop, inte per server. Infrastrukturen är helt osynlig."
          col1Title="Fördelar"
          col1Items={["Automatisk skalning till noll", "Betala bara när kod körs", "Ingen serverhantering", "Perfekt för händelsedriven arkitektur"]}
          col2Title="Begränsningar"
          col2Items={["Cold starts kan ge latens", "Max körtid per anrop (15 min på Lambda)", "Svårare att debugga lokalt", "Ej optimalt för jämn hög last"]}
        />

        <Divider />

        {/* ══════════════════════════════
            DEL 2 — GLOBAL INFRASTRUKTUR
        ══════════════════════════════ */}
        <SectionHeader number="2" title="AWS Global" highlight="Infrastruktur" />

        <p className="text-[#4a5568] mb-5 text-sm">
          AWS är byggt för hög tillgänglighet och feltolerans genom en hierarkisk global infrastruktur med tre nivåer.
        </p>

        {/* Infra Diagram */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-7 mb-4">
          <div className="text-xs font-semibold text-[#718096] uppercase tracking-widest mb-5">
            Region — eu-north-1 (Stockholm)
          </div>
          <div className="border-2 border-dashed border-[#FF9900] rounded-xl p-5 relative mb-6">
            <span className="absolute -top-3 left-4 bg-[#FF9900] text-[#232F3E] text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">
              Region
            </span>
            <div className="font-mono text-sm font-semibold text-[#232F3E] mb-4 mt-1">eu-north-1</div>
            <div className="grid grid-cols-3 gap-2.5">
              {(["a", "b", "c"] as const).map((az) => (
                <div key={az} className="bg-[#e3f2fd] border border-[#90caf9] rounded-lg p-3">
                  <div className="font-mono text-[11px] font-bold text-[#1565c0] mb-2">
                    eu-north-1<strong>{az}</strong>
                  </div>
                  <div className="bg-[#1565c0] text-white text-center text-[11px] rounded px-2 py-1 mb-1">Datacenter</div>
                  <div className="bg-[#1565c0] text-white text-center text-[11px] rounded px-2 py-1">Datacenter</div>
                </div>
              ))}
            </div>
            <div className="text-center text-xs text-[#1565c0] mt-3">⟵ Låglatensnätverk &lt;2 ms ⟶</div>
          </div>

          <div className="text-xs font-semibold text-[#718096] uppercase tracking-widest mb-3">
            Edge Locations — Globalt (100+ platser)
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {(
              [
                { icon: "🌐", name: "CloudFront", sub: "CDN · Statiskt innehåll" },
                { icon: "🔗", name: "Route 53", sub: "DNS · Routing" },
                { icon: "⚡", name: "Global Accelerator", sub: "Nätverksoptimering" },
              ] as const
            ).map((edge) => (
              <div key={edge.name} className="bg-[#f3e5f5] border border-[#ce93d8] rounded-lg p-3 text-center">
                <div className="text-xl mb-1">{edge.icon}</div>
                <div className="text-xs font-semibold text-[#6a1b9a]">{edge.name}</div>
                <div className="text-[11px] text-[#7b1fa2] mt-0.5">{edge.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Region card */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 mb-4">
          <div className="text-[15px] font-semibold mb-3">🗺️ Regioner — Vad du bör tänka på</div>
          <div className="grid grid-cols-2 gap-4">
            <InfoBlock title="Tillgängliga regioner (urval)">
              {(
                [
                  { code: "eu-north-1", label: "Stockholm" },
                  { code: "eu-west-1", label: "Irland" },
                  { code: "us-east-1", label: "N. Virginia" },
                  { code: "ap-southeast-1", label: "Singapore" },
                ] as const
              ).map((r) => (
                <li key={r.code} className="text-[13px] text-[#4a5568] py-0.5 flex items-start gap-1.5">
                  <span className="text-[#FF9900] text-xs mt-0.5 shrink-0">→</span>
                  <span>
                    <code className="text-[12px] bg-gray-100 px-1 py-0.5 rounded">{r.code}</code> {r.label}
                  </span>
                </li>
              ))}
            </InfoBlock>
            <InfoBlock
              title="Välj region baserat på"
              items={["Compliance (GDPR → EU-region)", "Latens — nära slutanvändarna", "Tjänsttillgänglighet", "Kostnad — varierar per region"]}
            />
          </div>
          <div className="bg-[#fff8e1] border-l-4 border-[#FF9900] rounded-r-lg px-4 py-3 text-[13px] text-[#5f4c00] mt-4">
            Data stannar i regionen om du inte aktivt väljer att flytta den — viktigt för GDPR-efterlevnad.
          </div>
        </div>

        {/* AZ card */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 mb-4">
          <div className="text-[15px] font-semibold mb-3">🏢 Availability Zones — Feltolerans i praktiken</div>
          <p className="text-[#4a5568] text-sm mb-3">
            Varje region har 2–6 AZ. Varje AZ är ett eller flera fysiskt separerade datacenter med egna el- och nätverkskretsar.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <InfoBlock
              title="Egenskaper"
              items={["Fysiskt separerade byggnader", "Oberoende el, kylning, nätverk", "Sammankopplade med <2 ms latens", "En AZ kan falla utan att påverka de andra"]}
            />
            <InfoBlock
              title="AWS-tjänster som nyttjar Multi-AZ"
              items={["RDS Multi-AZ (databas)", "ELB — Elastic Load Balancer", "Auto Scaling Groups", "S3 — replikeras inom region"]}
            />
          </div>
        </div>

        <Divider />

        {/* ══════════════════════════════
            DEL 3 — PRISMODELLER
        ══════════════════════════════ */}
        <SectionHeader number="3" title="Prismodeller på" highlight="AWS" />

        <p className="text-[#4a5568] mb-5 text-sm">
          AWS erbjuder tre huvudsakliga prismodeller — välj beroende på hur förutsägbar och stabil din last är.
        </p>

        {/* Pricing cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <PriceCard
            accentColor="bg-[#1A73C8]"
            icon="💳"
            name="Pay-as-you-go"
            sub="Betala per användning"
            badgeClass="bg-[#e3f2fd] text-[#1565c0]"
            badgeText="Ingen rabatt"
            pros={["Ingen bindningstid", "Betala exakt vad du använder", "Passar för testning & prototyper"]}
            cons={["Dyraste per enhet", "Oväntad kostnad vid trafikspikar"]}
          />
          <PriceCard
            accentColor="bg-[#1D8348]"
            icon="📅"
            name="Reserved Instances"
            sub="1 eller 3 år bindning"
            badgeClass="bg-[#e8f5e9] text-[#1b5e20]"
            badgeText="Upp till 72% rabatt"
            pros={["Stor kostnadsbesparing", "Passar stabil basbelastning", "Savings Plans = modern variant"]}
            cons={["Bindningstid 1–3 år", "Betalar oavsett användning"]}
          />
          <PriceCard
            accentColor="bg-[#7B61FF]"
            icon="⚡"
            name="Spot Instances"
            sub="Outnyttjad AWS-kapacitet"
            badgeClass="bg-[#f3e5f5] text-[#6a1b9a]"
            badgeText="Upp till 90% rabatt"
            pros={["Billigaste alternativet", "Perfekt för batchjobb & ML", "Ingen bindningstid"]}
            cons={["Kan avbrytas med 2 min varning", "Ej för kritiska produktionstjänster"]}
          />
        </div>

        {/* Comparison table */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 mb-4">
          <div className="text-sm font-semibold mb-4">Jämförelse — Prismodeller</div>
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {(["Modell", "Rabatt", "Bindning", "Passar för"] as const).map((h) => (
                  <th
                    key={h}
                    className="bg-[#232F3E] text-white text-left px-4 py-2.5 text-xs font-semibold tracking-wide first:rounded-l-md last:rounded-r-md"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  { model: "Pay-as-you-go", tag: "Ingen", tagClass: "bg-[#e3f2fd] text-[#1565c0]", bind: "Ingen", use: "Testning, variabel & oförutsägbar trafik" },
                  { model: "Reserved (1 år)", tag: "~40%", tagClass: "bg-[#e8f5e9] text-[#1b5e20]", bind: "1 år", use: "Stabil basbelastning" },
                  { model: "Reserved (3 år)", tag: "~72%", tagClass: "bg-[#f3e5f5] text-[#6a1b9a]", bind: "3 år", use: "Långsiktig stabil drift" },
                  { model: "Spot", tag: "upp till 90%", tagClass: "bg-[#fce4ec] text-[#b71c1c]", bind: "Ingen", use: "Avbrytbara batchjobb, ML-träning" },
                ] as const
              ).map((row, i) => (
                <tr key={row.model} className={i % 2 !== 0 ? "bg-[#f7f8fc]" : ""}>
                  <td className="px-4 py-2.5 border-b border-[#e2e8f0] font-medium">{row.model}</td>
                  <td className="px-4 py-2.5 border-b border-[#e2e8f0]">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${row.tagClass}`}>{row.tag}</span>
                  </td>
                  <td className="px-4 py-2.5 border-b border-[#e2e8f0] text-[#4a5568]">{row.bind}</td>
                  <td className="px-4 py-2.5 border-b border-[#e2e8f0] text-[#4a5568]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost strategy */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 mb-4">
          <div className="text-sm font-semibold mb-4">Rekommenderad kombinationsstrategi</div>
          <div className="flex rounded-lg overflow-hidden h-14 mb-4">
            <div className="flex flex-col items-center justify-center bg-[#1D8348] text-white" style={{ flex: 4 }}>
              <span className="text-base font-bold">~50%</span>
              <span className="text-[11px]">Reserved</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#1A73C8] text-white" style={{ flex: 3 }}>
              <span className="text-base font-bold">~30%</span>
              <span className="text-[11px]">On-Demand</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#7B61FF] text-white" style={{ flex: 2 }}>
              <span className="text-base font-bold">~20%</span>
              <span className="text-[11px]">Spot</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            {(
              [
                { color: "bg-[#1D8348]", text: "Reserved — Basbelastning som alltid körs (databaser, kärnservrar)" },
                { color: "bg-[#1A73C8]", text: "On-Demand — Variabel men förutsägbar last" },
                { color: "bg-[#7B61FF]", text: "Spot — Batchjobb, ML-träning, CI/CD" },
              ] as const
            ).map((l) => (
              <div key={l.text} className="flex items-center gap-1.5 text-xs text-[#4a5568]">
                <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${l.color}`} />
                {l.text}
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ══════════════════════════════
            DISKUSSIONSFRÅGOR
        ══════════════════════════════ */}
        <div className="bg-[#232F3E] rounded-xl p-7 mt-10">
          <h2 className="text-white text-lg font-bold mb-5">
            🎯 <span className="text-[#FF9900]">Diskussionsfrågor</span>
          </h2>
          {(
            [
              "Vad är den huvudsakliga skillnaden mellan IaaS och PaaS ur ett ansvarsperspektiv?",
              "Varför bör en produktionsapplikation distribueras över flera Availability Zones?",
              "Vilket AWS-koncept används för att leverera innehåll med låg latens globalt?",
              "Du driver en webbshop med stabil trafik på vardagar och hög trafik vid kampanjer. Vilken kombination av prismodeller vore lämplig?",
              "Varför lämpar sig FaaS/Serverless dåligt för applikationer med jämnt hög last?",
            ] as const
          ).map((q, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 mb-2.5 flex gap-4">
              <span className="text-[#FF9900] text-[13px] font-bold shrink-0 mt-0.5">Q{i + 1}</span>
              <span className="text-[#e2e8f0] text-sm">{q}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════
            NYCKELBEGREPP
        ══════════════════════════════ */}
        <div className="flex items-center gap-3 mt-12 mb-6">
          <div className="w-9 h-9 rounded-full bg-[#FF9900] text-[#232F3E] text-sm font-bold flex items-center justify-center shrink-0">
            📖
          </div>
          <h2 className="text-[22px] font-bold">Nyckelbegrepp</h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {(
            [
              { term: "IaaS", def: "Virtuella servrar & nätverk — du sköter OS och uppåt" },
              { term: "PaaS", def: "Plattform för att köra kod — du sköter applikation och data" },
              { term: "SaaS", def: "Färdig programvara levererad som tjänst via internet" },
              { term: "FaaS", def: "Händelsedriven körning av enskilda funktioner (serverless)" },
              { term: "Region", def: "Geografisk AWS-plats, fullt oberoende av andra regioner" },
              { term: "Availability Zone", def: "Isolerat datacenter-kluster inom en region" },
              { term: "Edge Location", def: "Global cachepunkt för CloudFront CDN och Route 53 DNS" },
              { term: "Pay-as-you-go", def: "Betala per faktisk användning, ingen bindningstid" },
              { term: "Reserved Instance", def: "Förbetald kapacitet med 1–3 år bindning, upp till 72% rabatt" },
              { term: "Spot Instance", def: "Outnyttjad AWS-kapacitet till rabatt — kan avbrytas" },
            ] as const
          ).map((g) => (
            <div key={g.term} className="bg-white border border-[#e2e8f0] rounded-lg px-4 py-3">
              <div className="font-mono text-[13px] font-bold text-[#232F3E] mb-1">{g.term}</div>
              <div className="text-[13px] text-[#4a5568]">{g.def}</div>
            </div>
          ))}
        </div>

      </div>

      {/* ── FOOTER ── */}
      <div className="text-center px-6 py-8 text-[#718096] text-[13px] border-t border-[#e2e8f0] mt-10">
        Lektionsmaterial för introduktionskurs i molntjänster &nbsp;·&nbsp;{" "}
        <strong className="text-[#FF9900]">AWS fokus</strong>
      </div>
    </div>
  );
}

/* ── HELPER COMPONENTS ── */

function SectionHeader({ number, title, highlight }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-12">
      <div className="w-9 h-9 rounded-full bg-[#232F3E] text-[#FF9900] text-sm font-bold flex items-center justify-center shrink-0">
        {number}
      </div>
      <h2 className="text-[22px] font-bold">
        {title} <span className="text-[#FF9900]">{highlight}</span>
      </h2>
    </div>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-[#e2e8f0] my-8" />;
}

function InfoBlock({ title, items, children }: InfoBlockProps) {
  return (
    <div className="bg-[#f7f8fc] rounded-lg p-3.5">
      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#718096] mb-2">{title}</h4>
      <ul className="list-none p-0">
        {items
          ? items.map((item) => (
              <li key={item} className="text-[13px] text-[#4a5568] py-0.5 flex items-start gap-1.5">
                <span className="text-[#FF9900] text-xs mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))
          : children}
      </ul>
    </div>
  );
}

function ServiceCard({ badge, badgeClass, title, subtitle, description, col1Title, col1Items, col2Title, col2Items, tableRow }: ServiceCardProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 mb-4">
      <div className="flex items-center gap-3 mb-4 pb-3.5 border-b border-[#e2e8f0]">
        <span className={`px-3 py-1 rounded-md text-[12px] font-bold tracking-wide ${badgeClass}`}>{badge}</span>
        <div>
          <div className="text-[15px] font-semibold">{title}</div>
          <div className="text-[13px] text-[#718096]">{subtitle}</div>
        </div>
      </div>
      <p className="text-[#4a5568] text-sm mb-3">{description}</p>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <InfoBlock title={col1Title} items={col1Items} />
        <InfoBlock title={col2Title} items={col2Items} />
      </div>
      {tableRow && (
        <table className="w-full border-collapse text-[13px] mt-3">
          <thead>
            <tr>
              <th className="bg-[#232F3E] text-white text-left px-3 py-2 text-[11px] font-semibold tracking-wide rounded-l-md">
                Du ansvarar för
              </th>
              <th className="bg-[#232F3E] text-white text-left px-3 py-2 text-[11px] font-semibold tracking-wide rounded-r-md">
                Leverantören ansvarar för
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 text-[#4a5568] bg-[#fafafa] border-b border-[#e2e8f0]">{tableRow[0]}</td>
              <td className="px-3 py-2 text-[#4a5568] bg-[#fafafa] border-b border-[#e2e8f0]">{tableRow[1]}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

function SpecSeg({ color, acronym, name }: SpecSegProps) {
  return (
    <div className={`${color} text-white py-3.5 px-2.5 text-center`}>
      <div className="text-lg font-bold">{acronym}</div>
      <div className="text-[10px] mt-0.5 opacity-85">{name}</div>
    </div>
  );
}

function PriceCard({ accentColor, icon, name, sub, badgeClass, badgeText, pros, cons }: PriceCardProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`} />
      <div className="text-3xl mb-2.5">{icon}</div>
      <div className="text-[15px] font-bold mb-1">{name}</div>
      <div className="text-[12px] text-[#718096] mb-3">{sub}</div>
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[12px] font-bold mb-3 ${badgeClass}`}>{badgeText}</span>
      <ul className="list-none p-0 space-y-1">
        {pros.map((p) => (
          <li key={p} className="text-[13px] text-[#4a5568] flex gap-1.5">
            <span className="text-[#1D8348] text-xs mt-0.5 shrink-0">✓</span>
            {p}
          </li>
        ))}
        {cons.map((c) => (
          <li key={c} className="text-[13px] text-[#4a5568] flex gap-1.5">
            <span className="text-[#D13212] text-xs mt-0.5 shrink-0">✗</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}