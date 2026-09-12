type Exercise = {
  id: string;
  title: string;
  difficulty: "lätt" | "medel" | "svår";
  instructions: string;
};

const difficultyColor: Record<Exercise["difficulty"], string> = {
  lätt: "text-[#27C93F]",
  medel: "text-[#FF9900]",
  svår: "text-[#FF5F56]",
};

export default function ExerciseList({
  exercises = [],
}: {
  exercises?: Exercise[];
}) {
  if (!Array.isArray(exercises) || exercises.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-lg font-semibold text-white mb-5">Övningar</h2>
      <ol className="flex flex-col gap-3">
        {exercises.map((ex, i) => (
          <li
            key={ex.id}
            className="rounded-lg border border-white/10 bg-[#1B2531] p-4"
          >
            <div className="flex items-center justify-between mb-1.5 gap-3">
              <h3 className="text-sm font-medium text-white">
                {i + 1}. {ex.title}
              </h3>
              <span
                className={`text-[11px] uppercase tracking-wide flex-shrink-0 ${difficultyColor[ex.difficulty]}`}
              >
                {ex.difficulty}
              </span>
            </div>
            <p className="text-sm text-[#a0aec0] leading-relaxed">
              {ex.instructions}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}