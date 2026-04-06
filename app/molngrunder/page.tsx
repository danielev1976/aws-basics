import Link from "next/link";

interface NavCardProps {
  href: string;
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  topics: string[];
  accentColor: string;
}

function NavCard({ href, badge, badgeClass, title, description, topics, accentColor }: NavCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 h-full cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group">
        <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`} />
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded tracking-wide ${badgeClass}`}>
            {badge}
          </span>
        </div>
        <h2 className="text-[17px] font-bold text-gray-900 mb-2 group-hover:text-[#FF9900] transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <span key={t} className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 text-xs font-semibold text-[#FF9900] group-hover:underline">
          Öppna →
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Hero */}
      <div className="bg-[#232F3E] rounded-2xl px-8 py-10 mb-10 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FF9900] opacity-10" />
        <div className="absolute -bottom-8 left-[40%] w-36 h-36 rounded-full bg-[#1A73C8] opacity-10" />
        <div className="relative">
          <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-4">
            AWS · Lektionsmaterial
          </span>
          <h1 className="text-3xl font-bold text-white mb-3">
            Introduktion till <span className="text-[#FF9900]">AWS</span>
          </h1>
          <p className="text-[#a0aec0] text-sm max-w-lg leading-relaxed">
            Välj ett område nedan för att läsa om AWS-tjänster inom Compute, Storage och Networking — eller testa dina kunskaper i quizet.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-5">
        <NavCard
          href="/compute"
          badge="Compute"
          badgeClass="bg-blue-100 text-blue-700"
          accentColor="bg-blue-500"
          title="Compute"
          description="Kör applikationer i molnet — från virtuella servrar med full OS-kontroll till helt serverless funktioner som skalas automatiskt."
          topics={["EC2", "Lambda", "Elastic Beanstalk", "ECS", "EKS", "Fargate"]}
        />
        <NavCard
          href="/storage"
          badge="Storage"
          badgeClass="bg-green-100 text-green-700"
          accentColor="bg-green-500"
          title="Storage"
          description="Spara och hantera data med rätt lagringstyp — objekt, block eller fil beroende på hur data ska läsas och delas."
          topics={["S3", "EBS", "EFS", "S3 Glacier", "Storage Gateway"]}
        />
        <NavCard
          href="/networking"
          badge="Networking"
          badgeClass="bg-red-100 text-red-700"
          accentColor="bg-red-500"
          title="Networking"
          description="Koppla ihop dina resurser säkert — bygg privata nätverk, styr trafik med lastbalanserare och skydda med brandväggar."
          topics={["VPC", "Subnät", "Security Groups", "ELB", "Route 53", "CloudFront"]}
        />
        <NavCard
          href="/compare"
          badge="Jämförelse"
          badgeClass="bg-amber-100 text-amber-700"
          accentColor="bg-amber-500"
          title="Jämför tjänster"
          description="Snabbreferens för att välja rätt AWS-tjänst. Tabeller och scenario-kort som hjälper dig fatta rätt beslut."
          topics={["Compute vs Serverless", "S3 vs EBS vs EFS", "SG vs NACL", "ALB vs NLB"]}
        />

        {/* Quiz card — full width */}
        <div className="col-span-2">
          <Link href="/quiz">
            <div className="bg-[#232F3E] border border-[#232F3E] rounded-xl p-6 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF9900]" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold px-2.5 py-0.5 rounded tracking-wide mb-3">
                    Quiz
                  </span>
                  <h2 className="text-[17px] font-bold text-white mb-2 group-hover:text-[#FF9900] transition-colors">
                    Testa dina kunskaper
                  </h2>
                  <p className="text-sm text-[#a0aec0] leading-relaxed max-w-lg">
                    10 frågor inom Compute, Storage och Networking. Filtrera per område eller kör alla på en gång — med förklaringar till varje svar.
                  </p>
                </div>
                <div className="text-4xl font-bold text-[#FF9900] opacity-60 group-hover:opacity-100 transition-opacity pr-4">
                  →
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {["10 frågor", "Compute", "Storage", "Networking", "Filterbar"].map((t) => (
                  <span key={t} className="bg-white/10 text-[#a0aec0] text-xs px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}