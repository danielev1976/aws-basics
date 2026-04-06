interface TableRow {
  cells: string[];
  highlight?: boolean;
}

interface SectionTableProps {
  title: string;
  headers: string[];
  rows: TableRow[];
}

function SectionTable({ title, headers, rows }: SectionTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <h2 className="text-sm font-bold text-gray-800 mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#232F3E] text-white">
              {headers.map((h) => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold first:rounded-tl-md last:rounded-tr-md">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 !== 0 ? "bg-gray-50" : ""}`}>
                {row.cells.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 text-sm ${j === 0 ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Compare() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Jämförelse
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Välj rätt <span className="text-[#FF9900]">AWS-tjänst</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          Snabbreferens för att välja rätt tjänst inom Compute, Storage och Networking.
        </p>
      </div>

      {/* Compute */}
      <SectionTable
        title="Compute — när använder jag vad?"
        headers={["Tjänst", "Kontroll", "Skalning", "Betalar för", "Passar för"]}
        rows={[
          { cells: ["EC2", "Hög — full OS-kontroll", "Manuell / Auto Scaling", "Tid instansen kör", "Legacy, databaser, full kontroll"] },
          { cells: ["Elastic Beanstalk", "Medel — infra hanteras", "Automatisk", "Underliggande EC2", "Snabb deploy, litet team"] },
          { cells: ["Lambda", "Låg — bara koden", "Automatisk, till 0", "Anrop + ms körtid", "Event-driven, korta jobb"] },
          { cells: ["ECS / Fargate", "Medel — container-nivå", "Automatisk", "vCPU + RAM/sekund", "Microservices, containers"] },
          { cells: ["EKS", "Hög — Kubernetes", "Automatisk", "EC2 eller Fargate", "Kubernetes-workloads"] },
        ]}
      />

      {/* Storage */}
      <SectionTable
        title="Storage — välj lagringstyp"
        headers={["Tjänst", "Typ", "Åtkomst", "Passar för", "Kostnad"]}
        rows={[
          { cells: ["S3", "Objekt", "HTTP/API, en fil i taget", "Filer, backup, data lake", "Låg"] },
          { cells: ["EBS", "Block", "Monteras på EC2 (1:1)", "OS-disk, databas", "Medel"] },
          { cells: ["EFS", "Fil (NFS)", "Monteras av många EC2", "Delad lagring, CMS", "Hög"] },
          { cells: ["S3 Glacier", "Arkiv", "Minuter till timmar", "Långtidsarkivering", "Mycket låg"] },
          { cells: ["Storage Gateway", "Hybrid", "On-prem + cloud", "Migration, backup", "Variabel"] },
        ]}
      />

      {/* Networking — SG vs NACL */}
      <SectionTable
        title="Networking — Security Group vs. NACL"
        headers={["Egenskap", "Security Group", "NACL"]}
        rows={[
          { cells: ["Nivå", "Instans", "Subnät"] },
          { cells: ["Stateful?", "Ja — returntrafik automatisk", "Nej — kräver outbound-regler"] },
          { cells: ["Regeltyper", "Bara Allow", "Allow och Deny"] },
          { cells: ["Utvärdering", "Alla regler", "Nummerordning, första träff"] },
          { cells: ["Ändras direkt?", "Ja", "Ja"] },
        ]}
      />

      {/* Load balancer types */}
      <SectionTable
        title="Networking — Lastbalanserare"
        headers={["Typ", "Layer", "Protokoll", "Passar för"]}
        rows={[
          { cells: ["ALB — Application", "Layer 7", "HTTP / HTTPS", "Webbappar, path-routing, microservices"] },
          { cells: ["NLB — Network", "Layer 4", "TCP / UDP", "Realtid, gaming, låg latens, statisk IP"] },
          { cells: ["GLB — Gateway", "Layer 3", "GENEVE", "Brandväggar, IDS/IPS från tredje part"] },
        ]}
      />

      {/* Quick decision cards */}
      <h2 className="text-lg font-bold text-gray-800 mb-4 mt-8">Snabbguide — Vanliga scenarios</h2>
      <div className="grid grid-cols-2 gap-4">
        {(
          [
            {
              scenario: "Jag vill deploya en Spring Boot-app",
              answer: "EC2 (full kontroll) eller Elastic Beanstalk (enklare deploy)",
              color: "border-blue-200 bg-blue-50",
              badge: "Compute",
              badgeColor: "bg-blue-100 text-blue-700",
            },
            {
              scenario: "Jag vill lagra bilder som användare laddar upp",
              answer: "S3 — objektlagring med HTTP-åtkomst, skalas obegränsat",
              color: "border-green-200 bg-green-50",
              badge: "Storage",
              badgeColor: "bg-green-100 text-green-700",
            },
            {
              scenario: "Min Lambda-funktion ska triggas när en fil sparas i S3",
              answer: "Lambda + S3 Event Notification — serverless, betala per anrop",
              color: "border-purple-200 bg-purple-50",
              badge: "Compute",
              badgeColor: "bg-purple-100 text-purple-700",
            },
            {
              scenario: "Jag vill blockera en specifik IP-adress",
              answer: "NACL — Security Groups har bara Allow-regler, NACLs har Deny",
              color: "border-red-200 bg-red-50",
              badge: "Networking",
              badgeColor: "bg-red-100 text-red-700",
            },
            {
              scenario: "Databas som behöver snabb disk med hög IOPS",
              answer: "EBS io2 — block storage monterat direkt på EC2-instansen",
              color: "border-amber-200 bg-amber-50",
              badge: "Storage",
              badgeColor: "bg-amber-100 text-amber-700",
            },
            {
              scenario: "Flera EC2-instanser behöver läsa samma konfigfiler",
              answer: "EFS — delat NFS-filsystem som kan monteras av många instanser",
              color: "border-teal-200 bg-teal-50",
              badge: "Storage",
              badgeColor: "bg-teal-100 text-teal-700",
            },
          ] as const
        ).map((item) => (
          <div key={item.scenario} className={`border rounded-xl p-5 ${item.color}`}>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded mb-3 inline-block ${item.badgeColor}`}>
              {item.badge}
            </span>
            <p className="text-sm font-semibold text-gray-900 mb-2">{item.scenario}</p>
            <p className="text-xs text-gray-600 leading-relaxed">→ {item.answer}</p>
          </div>
        ))}
      </div>

    </div>
  );
}