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

export default function S3Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Hero */}
      <div className="mb-8">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-xs font-bold px-3 py-1 rounded mb-3">
          AWS · Storage
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          S3 <span className="text-[#FF9900]">Buckets</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          Amazon S3 är en objektlagringstjänst där du lagrar filer i buckets.
          Perfekt för bilder, statiska filer och backups i Next.js-appar.
        </p>
      </div>

      {/* SECTION 1 */}
      <SectionHeader number="1" title="Vad är" highlight="S3?" />

      <ConceptCard
        badge="S3"
        badgeClass="bg-green-100 text-green-700"
        title="Amazon S3"
        subtitle="Object Storage"
        description="S3 lagrar data som objekt i buckets. Varje objekt har en key (filnamn) och metadata."
        col1Title="Används för"
        col1Items={[
          "Bilder och videos",
          "Static assets (Next.js)",
          "Backups",
          "Loggfiler",
        ]}
        col2Title="Egenskaper"
        col2Items={[
          "Extrem skalbarhet",
          "99.999999999% durability",
          "Global tillgänglighet",
          "Pay-as-you-go",
        ]}
      />

      <Divider />

      {/* SECTION 2 */}
      <SectionHeader number="2" title="S3" highlight="Bucket" />

      <ConceptCard
        badge="Bucket"
        badgeClass="bg-blue-100 text-blue-700"
        title="Bucket"
        subtitle="Container för filer"
        description="En bucket är som en mapp på toppnivå där alla objekt lagras. Namnet måste vara globalt unikt."
        col1Title="Regler"
        col1Items={[
          "Globalt unikt namn",
          "Lowercase + inga mellanslag",
          "Region-specifik",
        ]}
        col2Title="Exempel"
        col2Items={[
          "my-app-images",
          "nextjs-assets-prod",
          "backup-2026",
        ]}
      />

      <Notice variant="info">
        Bucket-namn används i URL:er → https://bucket-name.s3.amazonaws.com/file.jpg
      </Notice>

      <Divider />

      {/* SECTION 3 */}
      <SectionHeader number="3" title="Public vs" highlight="Private" />

      <div className="grid grid-cols-2 gap-4">
        <InfoBlock
          title="Public Bucket"
          items={[
            "Alla kan läsa filer",
            "Används för images/static assets",
            "Kräver rätt bucket policy",
          ]}
        />
        <InfoBlock
          title="Private Bucket"
          items={[
            "Endast via IAM",
            "Säkrare",
            "Används för backups & känslig data",
          ]}
        />
      </div>

      <Notice variant="danger">
        Gör aldrig en bucket public om den innehåller känslig data.
      </Notice>

      <Divider />

      {/* SECTION 4 */}
      <SectionHeader number="4" title="Next.js" highlight="Integration" />

      <div className="bg-white border rounded-xl p-6 mb-4">
        <div className="text-sm font-bold mb-3">Upload till S3 (exempel)</div>
        <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-north-1" });

export async function upload(file: Buffer) {
  await s3.send(new PutObjectCommand({
    Bucket: "my-bucket",
    Key: "image.jpg",
    Body: file,
  }));
}`}
        </pre>
      </div>

      <Notice variant="warning">
        Använd alltid IAM Roles eller miljövariabler — hårdkoda aldrig credentials i koden.
      </Notice>

      <Divider />

      {/* QUESTIONS */}
      <div className="bg-[#232F3E] rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">
          🎯 <span className="text-[#FF9900]">Diskussionsfrågor</span>
        </h2>
        {[
          "När ska du använda public vs private bucket?",
          "Varför måste bucket-namn vara globalt unika?",
          "Hur kopplar du S3 till en Next.js app?",
          "Vad är skillnaden mellan object och bucket?",
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
