interface StorageCardProps {
  badge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  description: string;
  useCases: string[];
}

function StorageCard({ badge, badgeClass, title, subtitle, description, useCases }: StorageCardProps) {
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

interface CompareRowProps {
  service: string;
  type: string;
  access: string;
  useCase: string;
  cost: string;
}

function CompareRow({ service, type, access, useCase, cost }: CompareRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="px-4 py-3 font-semibold text-gray-900 text-sm">{service}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{type}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{access}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{useCase}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{cost}</td>
    </tr>
  );
}

export default function Storage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Storage
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Storage — <span className="text-[#FF9900]">Spara din data</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          AWS erbjuder tre grundläggande lagringstyper: objekt, block och fil. Rätt val beror på hur data ska läsas, skrivas och delas.
        </p>
      </div>

      {/* Storage type overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(
          [
            { type: "Objekt", color: "bg-blue-50 border-blue-200", text: "text-blue-700", desc: "Filer adresseras via unik nyckel (URL). Obegränsad kapacitet. Passar stora mängder ostrukturerad data." },
            { type: "Block", color: "bg-green-50 border-green-200", text: "text-green-700", desc: "Fungerar som en hårddisk. Monteras på en server. Låg latens, hög IOPS. Passar databaser och OS." },
            { type: "Fil (NFS)", color: "bg-amber-50 border-amber-200", text: "text-amber-700", desc: "Delat filsystem som kan monteras av flera servrar samtidigt. Passar team-miljöer och delad config." },
          ] as const
        ).map((s) => (
          <div key={s.type} className={`border rounded-xl p-4 ${s.color}`}>
            <div className={`text-sm font-bold mb-2 ${s.text}`}>{s.type}</div>
            <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Services */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Tjänster</h2>

      <StorageCard
        badge="Objekt"
        badgeClass="bg-blue-100 text-blue-700"
        title="S3 — Simple Storage Service"
        subtitle="Obegränsad objektlagring"
        description="Lagra filer upp till 5 TB per objekt. Elva nior (99,999999999%) hållbarhet. Organiseras i buckets med global namnrymd. Stöder versionering, livscykelregler och replikering."
        useCases={["Statiska webbsidor", "Backup", "Data lake", "Mediafiler", "Artifact storage"]}
      />

      <StorageCard
        badge="Block"
        badgeClass="bg-green-100 text-green-700"
        title="EBS — Elastic Block Store"
        subtitle="Nätverksansluten hårddisk för EC2"
        description="Kvarstår när instansen stoppas. En EBS-volym kan bara kopplas till en EC2-instans åt gången (inom samma AZ). Typer: gp3 (generell), io2 (IOPS-intensiv), st1 (genomströmning), sc1 (kall data)."
        useCases={["OS-volym", "Databas", "Boot volume", "Hög IOPS"]}
      />

      <StorageCard
        badge="Fil (NFS)"
        badgeClass="bg-amber-100 text-amber-700"
        title="EFS — Elastic File System"
        subtitle="Delat NFS-filsystem"
        description="Kan monteras av flera EC2-instanser samtidigt — även över flera AZ:s. Skalas automatiskt. Dyrare än EBS men mer flexibelt för delad åtkomst. Stöder Linux-baserade workloads."
        useCases={["Delad config", "CMS", "Bioinformatik", "Home directories", "Multi-AZ"]}
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded">Arkiv</span>
            <span className="text-[15px] font-semibold text-gray-900">S3 Glacier</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Extremt billig långtidslagring. Hämtning tar minuter till timmar. Används för compliance-arkiv och backup.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Arkivering", "Compliance", "Långtidsbackup"].map((t) => (
              <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded">Hybrid</span>
            <span className="text-[15px] font-semibold text-gray-900">Storage Gateway</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Kopplar lokala datacenter till AWS-lagring. Lägen: File Gateway, Volume Gateway och Tape Gateway.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["On-prem + cloud", "Backup", "Hybrid"].map((t) => (
              <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* S3 storage classes */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-bold text-gray-800 mb-4">S3 Storage Classes — Kostnad vs. åtkomsttid</h2>
        <div className="space-y-2">
          {(
            [
              { name: "S3 Standard", access: "Omedelbar", cost: "Högst", use: "Aktiv data, webbsidor" },
              { name: "S3 Intelligent-Tiering", access: "Omedelbar", cost: "Variabel", use: "Okänt åtkomstmönster" },
              { name: "S3 Standard-IA", access: "Omedelbar", cost: "Lägre", use: "Sällan åtkommen data" },
              { name: "S3 Glacier Instant", access: "Millisekunder", cost: "Låg", use: "Arkiv med snabb åtkomst" },
              { name: "S3 Glacier Flexible", access: "Minuter–timmar", cost: "Mycket låg", use: "Backup, compliance" },
              { name: "S3 Glacier Deep Archive", access: "Timmar", cost: "Lägst", use: "Långtidsarkivering 7–10 år" },
            ] as const
          ).map((row, i) => (
            <div key={row.name} className={`grid grid-cols-4 gap-4 px-3 py-2 rounded-lg text-sm ${i % 2 === 0 ? "bg-gray-50" : ""}`}>
              <span className="font-medium text-gray-900">{row.name}</span>
              <span className="text-gray-600">{row.access}</span>
              <span className="text-gray-600">{row.cost}</span>
              <span className="text-gray-500 text-xs">{row.use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Jämförelse — Välj rätt lagringstyp</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                {(["Tjänst", "Typ", "Åtkomst", "Passar för", "Kostnad"] as const).map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold first:rounded-tl-md last:rounded-tr-md">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              <CompareRow service="S3" type="Objekt" access="HTTP/API" useCase="Filer, backup, data lake" cost="Låg" />
              <CompareRow service="EBS" type="Block" access="Monteras på EC2 (1:1)" useCase="OS-disk, databas" cost="Medel" />
              <CompareRow service="EFS" type="Fil (NFS)" access="Monteras av många" useCase="Delad lagring" cost="Hög" />
              <CompareRow service="Glacier" type="Arkiv" access="Minuter–timmar" useCase="Långtidsarkivering" cost="Mycket låg" />
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-[#FF9900] rounded-r-lg px-4 py-3 text-sm text-amber-900 mt-6">
        <strong>Minnesregel:</strong> S3 för filer du läser via URL, EBS för diskvolymer monterade på en server, EFS när flera servrar behöver läsa samma filer.
      </div>

    </div>
  );
}