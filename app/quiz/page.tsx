"use client";

import { useState } from "react";

interface Question {
  id: number;
  area: "Compute" | "Storage" | "Networking";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    area: "Compute",
    question: "Du har en Spring Boot-applikation och vill ha full kontroll över servern, inklusive OS och nätverkskonfiguration. Vilken AWS-tjänst passar bäst?",
    options: ["Lambda", "EC2", "S3", "EFS"],
    answer: 1,
    explanation: "EC2 ger dig en fullständig virtuell server med kontroll över OS, brandväggar och nätverksinställningar — perfekt för traditionella applikationer som Spring Boot.",
  },
  {
    id: 2,
    area: "Compute",
    question: "Du vill köra en funktion som triggas när en bild laddas upp till S3. Körningstiden är under 30 sekunder. Vilken tjänst är mest kostnadseffektiv?",
    options: ["EC2 t3.micro", "Elastic Beanstalk", "Lambda", "ECS med Fargate"],
    answer: 2,
    explanation: "Lambda är perfekt för event-driven, kortlivade funktioner. Du betalar bara per anrop och millisekund körtid — ingen kostnad när funktionen inte körs.",
  },
  {
    id: 3,
    area: "Compute",
    question: "Vilket påstående om Lambda är korrekt?",
    options: [
      "Lambda kan köra i max 1 minut",
      "Lambda kräver att du väljer OS",
      "Lambda skalas automatiskt och du betalar per anrop",
      "Lambda är billigast för jämn hög last",
    ],
    answer: 2,
    explanation: "Lambda skalas automatiskt från 0 till tusentals parallella anrop och faktureras per anrop + ms körtid. Max körtid är 15 minuter. För jämn hög last är EC2/Reserved ofta billigare.",
  },
  {
    id: 4,
    area: "Storage",
    question: "Vilket lagringssätt kan monteras av flera EC2-instanser samtidigt, även i olika Availability Zones?",
    options: ["EBS", "S3", "EFS", "Instance Store"],
    answer: 2,
    explanation: "EFS (Elastic File System) är ett delat NFS-filsystem som kan monteras av flera EC2-instanser parallellt, även över AZ-gränser.",
  },
  {
    id: 5,
    area: "Storage",
    question: "Vilket AWS-lagringsalternativ passar bäst för att spara en databas-backup som du sällan behöver komma åt?",
    options: ["EBS gp3", "S3 Glacier", "EFS", "CloudFront"],
    answer: 1,
    explanation: "S3 Glacier är designat för långtidsarkivering med extremt låg kostnad. Åtkomst tar minuter till timmar, men för sällan använda backuper är det det billigaste alternativet.",
  },
  {
    id: 6,
    area: "Storage",
    question: "Du har en EC2-instans som kör en databas och behöver snabb diskåtkomst med hög IOPS. Vilket lagringsalternativ väljer du?",
    options: ["S3 Standard", "EFS", "EBS io2", "S3 Intelligent-Tiering"],
    answer: 2,
    explanation: "EBS io2 är optimerad för hög IOPS och låg latens — perfekt för databaser. Den monteras direkt på EC2-instansen som en blocklagringsenhet.",
  },
  {
    id: 7,
    area: "Networking",
    question: "Din EC2-instans kan inte köra 'sudo apt update' och får timeout-fel. Vad är den troligaste orsaken?",
    options: [
      "Security Group blockerar port 22",
      "Ingen route till Internet Gateway i route table",
      "EBS-volymen är full",
      "Lambda-funktionen är pausad",
    ],
    answer: 1,
    explanation: "Det vanligaste problemet är att subnätets route table saknar en route 0.0.0.0/0 → Internet Gateway. Utan den når instansen inte internet, oavsett Security Group.",
  },
  {
    id: 8,
    area: "Networking",
    question: "Vad är skillnaden mellan en Security Group och en NACL?",
    options: [
      "SG gäller subnät, NACL gäller instanser",
      "SG är stateful och gäller instanser; NACL är stateless och gäller subnät",
      "De är identiska — välj endera",
      "NACL gäller bara för VPC peering",
    ],
    answer: 1,
    explanation: "Security Groups är stateful (returntrafik tillåts automatiskt) och appliceras per instans. NACLs är stateless (du måste tillåta inbound och outbound separat) och appliceras per subnät.",
  },
  {
    id: 9,
    area: "Networking",
    question: "Du vill distribuera inkommande HTTP-trafik baserat på URL-sökväg (/api/* vs /static/*). Vilken lastbalanserare väljer du?",
    options: [
      "NLB — Network Load Balancer",
      "ALB — Application Load Balancer",
      "GLB — Gateway Load Balancer",
      "Route 53",
    ],
    answer: 1,
    explanation: "ALB (Application Load Balancer) opererar på Layer 7 och kan ruttera trafik baserat på HTTP-headers, sökvägar och host-namn — perfekt för path-baserad routing.",
  },
  {
    id: 10,
    area: "Networking",
    question: "Du vill blockera all trafik från en specifik IP-adress till ditt subnät. Vilket verktyg använder du?",
    options: ["Security Group", "NACL", "Route Table", "Internet Gateway"],
    answer: 1,
    explanation: "NACLs stöder Deny-regler och appliceras på subnetenivå. Security Groups har bara Allow-regler, så de kan inte aktivt blockera en specifik IP.",
  },
];

const areaColors: Record<Question["area"], string> = {
  Compute: "bg-blue-100 text-blue-700",
  Storage: "bg-green-100 text-green-700",
  Networking: "bg-red-100 text-red-700",
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [filter, setFilter] = useState<Question["area"] | "Alla">("Alla");

  const filtered = filter === "Alla" ? questions : questions.filter((q) => q.area === filter);
  const q = filtered[current];

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= filtered.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  const pct = Math.round((score / filtered.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
          AWS · Quiz
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Testa dina <span className="text-[#FF9900]">kunskaper</span>
        </h1>
        <p className="text-gray-500 text-sm">10 frågor inom Compute, Storage och Networking.</p>
      </div>

      {/* Filter */}
      {!finished && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["Alla", "Compute", "Storage", "Networking"] as const).map((area) => (
            <button
              key={area}
              onClick={() => { setFilter(area); handleRestart(); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === area
                  ? "bg-[#232F3E] text-white border-[#232F3E]"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      )}

      {/* Finished */}
      {finished ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">{pct}%</div>
          <div className="text-gray-500 text-sm mb-6">
            {score} av {filtered.length} rätt
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xl font-bold text-gray-900">{score}</div>
              <div className="text-xs text-gray-500 mt-1">Rätt svar</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xl font-bold text-gray-900">{filtered.length - score}</div>
              <div className="text-xs text-gray-500 mt-1">Fel svar</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xl font-bold text-gray-900">{pct >= 70 ? "✓" : "↻"}</div>
              <div className="text-xs text-gray-500 mt-1">{pct >= 70 ? "Godkänt" : "Öva mer"}</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            {pct >= 80
              ? "Utmärkt! Du har en stark förståelse för AWS-grunderna."
              : pct >= 60
              ? "Bra jobbat! Gå igenom de områden du missade."
              : "Fortsätt öva — läs igenom materialet och försök igen."}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-2.5 bg-[#232F3E] text-white rounded-lg text-sm font-medium hover:bg-[#1a2530] transition-colors"
          >
            Gör om quizet
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          {/* Progress */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-400">Fråga {current + 1} av {filtered.length}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${areaColors[q.area]}`}>{q.area}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1 mb-6">
            <div
              className="bg-[#FF9900] h-1 rounded-full transition-all"
              style={{ width: `${((current) / filtered.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <p className="text-base font-semibold text-gray-900 mb-5 leading-relaxed">{q.question}</p>

          {/* Options */}
          <div className="space-y-2 mb-5">
            {q.options.map((opt, i) => {
              let cls = "border border-gray-200 text-gray-700 hover:bg-gray-50";
              if (selected !== null) {
                if (i === q.answer) cls = "border-green-400 bg-green-50 text-green-800";
                else if (i === selected) cls = "border-red-400 bg-red-50 text-red-800";
                else cls = "border-gray-100 text-gray-400";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selected !== null && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 leading-relaxed mb-5">
              {q.explanation}
            </div>
          )}

          {/* Next */}
          {selected !== null && (
            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-[#232F3E] text-white rounded-lg text-sm font-medium hover:bg-[#1a2530] transition-colors"
            >
              {current + 1 >= filtered.length ? "Se resultat" : "Nästa fråga →"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}