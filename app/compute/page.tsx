import Link from "next/link";

interface ServiceCardProps {
  badge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  description: string;
  useCases: string[];
}

function ServiceCard({ badge, badgeClass, title, subtitle, description, useCases }: ServiceCardProps) {
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
  control: string;
  scaling: string;
  billing: string;
}

function CompareRow({ service, control, scaling, billing }: CompareRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="px-4 py-3 font-semibold text-gray-900 text-sm">{service}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{control}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{scaling}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{billing}</td>
    </tr>
  );
}

export default function Compute() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Compute
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Compute — <span className="text-[#FF9900]">Kör din kod</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          AWS Compute-tjänster låter dig köra applikationer utan att äga fysisk hårdvara — från fullständiga virtuella servrar till helt serverless funktioner.
        </p>
      </div>

      {/* Services */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Tjänster</h2>

      <ServiceCard
        badge="IaaS"
        badgeClass="bg-orange-100 text-orange-700"
        title="EC2 — Elastic Compute Cloud"
        subtitle="Virtuella servrar i molnet"
        description="Full kontroll över servern — välj OS, CPU, RAM och lagring. Du ansvarar för OS, patching och skalning. Faktureras per sekund (minimum 60s). Över 400 instanstyper tillgängliga."
        useCases={["Webb- och app-servrar", "Databaser", "HPC", "ML-träning", "Legacy-applikationer"]}
      />

      <ServiceCard
        badge="PaaS"
        badgeClass="bg-blue-100 text-blue-700"
        title="Elastic Beanstalk"
        subtitle="Ladda upp din kod — AWS sköter resten"
        description="AWS hanterar infrastrukturen åt dig. Stöder Java, .NET, Python, Node.js, Ruby, Go och Docker. Underliggande EC2-instanser är fortfarande synliga och konfigurerbara."
        useCases={["Spring Boot", "Django", "Rails", "Snabb deploy", "Litet ops-team"]}
      />

      <ServiceCard
        badge="Serverless"
        badgeClass="bg-purple-100 text-purple-700"
        title="Lambda"
        subtitle="Kör kod utan att hantera servrar"
        description="Betala per anrop och körtid (ms). Max 15 minuters exekveringstid per anrop. Skalas automatiskt från 0 till tusentals parallella anrop. Stöder Node.js, Python, Java, Go med flera."
        useCases={["API-backends", "Event-driven", "Bildbehandling", "Schemalagda jobb", "S3-triggers"]}
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">Container</span>
            <span className="text-[15px] font-semibold text-gray-900">
                <Link href="/ecs">ECS</Link>
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            AWS:s egna container-orkestrerare. Kör Docker-containers på EC2 eller Fargate.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Microservices", "Fargate", "Docker"].map((t) => (
              <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">Container</span>
            <span className="text-[15px] font-semibold text-gray-900">EKS</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Managed Kubernetes på AWS. Noderna kan köra på EC2 eller Fargate.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Kubernetes", "Multi-cloud", "Helm"].map((t) => (
              <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <ServiceCard
        badge="Serverless"
        badgeClass="bg-purple-100 text-purple-700"
        title="Fargate"
        subtitle="Serverless compute för containers"
        description="Kör containers utan att hantera EC2-instanser. Används tillsammans med ECS eller EKS. Definiera bara CPU och RAM per container — AWS sköter resten."
        useCases={["Containers utan serverhantering", "Variabel last", "Kostnadseffektivt"]}
      />

      {/* Comparison table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Jämförelse — Välj rätt tjänst</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#232F3E] text-white">
                <th className="text-left px-4 py-2.5 text-xs font-semibold rounded-tl-md">Tjänst</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold">Kontroll</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold">Skalning</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold rounded-tr-md">Betalar för</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <CompareRow service="EC2" control="Hög — full OS-kontroll" scaling="Manuell / Auto Scaling" billing="Tid instansen kör" />
              <CompareRow service="Beanstalk" control="Medel — hanterar infra" scaling="Automatisk" billing="Underliggande EC2" />
              <CompareRow service="Lambda" control="Låg — bara koden" scaling="Automatisk, till 0" billing="Anrop + ms körtid" />
              <CompareRow service="ECS/Fargate" control="Medel — container-nivå" scaling="Automatisk" billing="vCPU + RAM/sekund" />
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-amber-50 border-l-4 border-[#FF9900] rounded-r-lg px-4 py-3 text-sm text-amber-900 mt-6">
        <strong>Tips:</strong> Kombinera tjänsterna — EC2 för stateful workloads, Lambda för event-driven logik och Fargate för containers utan serverhantering.
      </div>

    </div>
  );
}