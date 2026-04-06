interface NetworkCardProps {
  badge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  description: string;
  useCases: string[];
}

function NetworkCard({ badge, badgeClass, title, subtitle, description, useCases }: NetworkCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
        <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide ${badgeClass}`}>{badge}</span>
        <div>
          <div className="text-[15px] font-semibold text-gray-900">{title}</div>
          <div className="text-[13px] text-gray-500">{subtitle}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {useCases.map((uc) => (
          <span key={uc} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            {uc}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Networking() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Networking
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Networking — <span className="text-[#FF9900]">Koppla ihop dina resurser</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          AWS Networking ger dig fullständig kontroll över hur dina resurser kommunicerar — internt, mot internet och mot ditt lokala nätverk.
        </p>
      </div>

      {/* VPC diagram */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">VPC — Nätverkshierarki</div>
        <div className="border-2 border-dashed border-[#FF9900] rounded-xl p-5 relative">
          <span className="absolute -top-3 left-4 bg-[#FF9900] text-[#232F3E] text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">
            VPC
          </span>
          <div className="font-mono text-xs font-semibold text-gray-700 mb-4 mt-1">10.0.0.0/16</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-xs font-bold text-green-700 mb-2">Public Subnet</div>
              <div className="text-xs text-gray-600 mb-3">10.0.1.0/24 · Route → IGW</div>
              <div className="bg-green-600 text-white text-xs text-center rounded px-2 py-1.5 mb-1.5">EC2 med publik IP</div>
              <div className="bg-green-600 text-white text-xs text-center rounded px-2 py-1.5">NAT Gateway</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-xs font-bold text-blue-700 mb-2">Private Subnet</div>
              <div className="text-xs text-gray-600 mb-3">10.0.2.0/24 · Route → NAT</div>
              <div className="bg-blue-600 text-white text-xs text-center rounded px-2 py-1.5 mb-1.5">EC2 (backend)</div>
              <div className="bg-blue-600 text-white text-xs text-center rounded px-2 py-1.5">RDS Databas</div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-3">↑ Internet Gateway (IGW) ↑</div>
        </div>
      </div>

      {/* Services */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Tjänster</h2>

      <NetworkCard
        badge="Grund"
        badgeClass="bg-blue-100 text-blue-700"
        title="VPC — Virtual Private Cloud"
        subtitle="Ditt privata nätverk i AWS"
        description="Du definierar IP-adressrymden (CIDR), subnät, route tables och internet gateways. Varje region har en default VPC. Resurser i en VPC är isolerade från andra AWS-kunder."
        useCases={["Nätverksisolering", "Subnät (public/private)", "Security groups", "NACLs", "Peering"]}
      />

      <NetworkCard
        badge="Grund"
        badgeClass="bg-blue-100 text-blue-700"
        title="Subnät, Route Tables & Internet Gateway"
        subtitle="Grundläggande nätverksbyggstenar"
        description="Subnät delar upp VPC i delar (per AZ). Public subnät har route till Internet Gateway — instanser kan nå internet. Private subnät har ingen direkt route till internet, men kan använda NAT Gateway för utgående trafik."
        useCases={["Public subnet → EC2 med publik IP", "Private subnet → databaser", "NAT Gateway → utgående trafik"]}
      />

      <NetworkCard
        badge="Lastbalansering"
        badgeClass="bg-green-100 text-green-700"
        title="ELB — Elastic Load Balancing"
        subtitle="Distribuera inkommande trafik"
        description="Tre typer: ALB (Application, HTTP/HTTPS, layer 7 — path-baserad routing), NLB (Network, TCP/UDP, layer 4, extremt låg latens), GLB (Gateway, för tredjepartsapparater som brandväggar)."
        useCases={["Hög tillgänglighet", "Skalning", "SSL-terminering", "Health checks", "Path-routing"]}
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded">DNS</span>
            <span className="text-[15px] font-semibold text-gray-900">Route 53</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            AWS:s DNS-tjänst. Routing policies: Simple, Weighted, Latency, Failover, Geolocation.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Domänregistrering", "Health checks", "Failover"].map((t) => (
              <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded">CDN</span>
            <span className="text-[15px] font-semibold text-gray-900">CloudFront</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Content Delivery Network med 400+ edge locations globalt. Integreras med S3, ALB och API Gateway.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Statiska tillgångar", "Låg latens", "HTTPS"].map((t) => (
              <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <NetworkCard
        badge="Säkerhet"
        badgeClass="bg-red-100 text-red-700"
        title="Security Groups & NACLs"
        subtitle="Brandväggar i lager"
        description="Security Groups: stateful brandvägg på instansnivå — träder i kraft omedelbart, bara allow-regler. NACLs (Network ACLs): stateless brandvägg på subnetenivå — kräver både inbound och outbound-regler, utvärderas i nummerordning."
        useCases={["SG: per instans", "NACL: per subnät", "SG: stateful", "NACL: stateless", "NACL: allow + deny"]}
      />

      {/* SG vs NACL table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Security Group vs. NACL</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                <th className="text-left px-4 py-2.5 text-xs font-semibold rounded-tl-md">Egenskap</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold">Security Group</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold rounded-tr-md">NACL</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {(
                [
                  { prop: "Nivå", sg: "Instans", nacl: "Subnät" },
                  { prop: "Stateful?", sg: "Ja — returntrafik tillåts automatiskt", nacl: "Nej — kräver separata outbound-regler" },
                  { prop: "Regeltyper", sg: "Bara Allow", nacl: "Allow och Deny" },
                  { prop: "Utvärdering", sg: "Alla regler utvärderas", nacl: "Nummerordning, första träff vinner" },
                  { prop: "Ändras direkt?", sg: "Ja — omedelbar effekt", nacl: "Ja — omedelbar effekt" },
                ] as const
              ).map((row, i) => (
                <tr key={row.prop} className={`border-b border-gray-100 last:border-0 ${i % 2 !== 0 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">{row.prop}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.sg}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.nacl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LB types */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Lastbalanserare — Välj rätt typ</h2>
        <div className="grid grid-cols-3 gap-4">
          {(
            [
              { name: "ALB", full: "Application LB", layer: "Layer 7", color: "bg-blue-50 border-blue-200 text-blue-700", desc: "HTTP/HTTPS, path-baserad routing, host-baserad routing. Bäst för webbapplikationer." },
              { name: "NLB", full: "Network LB", layer: "Layer 4", color: "bg-green-50 border-green-200 text-green-700", desc: "TCP/UDP, extremt låg latens, statisk IP. Bäst för realtidsapplikationer." },
              { name: "GLB", full: "Gateway LB", layer: "Layer 3", color: "bg-purple-50 border-purple-200 text-purple-700", desc: "För tredjepartsapparater — brandväggar, intrusion detection. Transparent proxy." },
            ] as const
          ).map((lb) => (
            <div key={lb.name} className={`border rounded-xl p-4 ${lb.color.split(" ").slice(0, 2).join(" ")}`}>
              <div className={`text-sm font-bold mb-0.5 ${lb.color.split(" ")[2]}`}>{lb.name}</div>
              <div className="text-xs text-gray-500 mb-1">{lb.full} · {lb.layer}</div>
              <p className="text-xs text-gray-600 leading-relaxed">{lb.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-[#FF9900] rounded-r-lg px-4 py-3 text-sm text-amber-900 mt-6">
        <strong>Minnesregel:</strong> Security Groups ändras direkt och är stateful — börja alltid med dem. Lägg till NACLs som ett extra lager när du behöver explicita Deny-regler på subnetenivå.
      </div>

    </div>
  );
}