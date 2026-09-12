import LessonLayout from "../../../../components/course/LessonLayout";
import ExerciseList from "../../../../components/course/ExerciseList";
import exerciseData from "../../../../data/exercises/webbgrunder.json";
import CodeBlock from "@/components/course/CodeBlock";

const exercises = exerciseData.exercises.filter(
  (ex) => ex.lesson === "verktyg-och-devtools"
);

export default function VerktygOchDevToolsPage() {
  return (
    <LessonLayout
      moduleTitle="Webb Grunder"
      lessonTitle="Verktyg och DevTools"
      nextHref="/webbgrunder/internet-och-webblasare"
    >
      <p>
        Innan vi börjar skriva kod behöver du en grundläggande verktygslåda.
        Samma verktyg kommer du använda genom hela kursen, så det är värt
        att lägga tio minuter på att få dem på plats ordentligt nu.
      </p>

      <h2>Kodredigerare</h2>
      <p>
        Vi kommer använda <strong>VS Code</strong> genom hela kursen. Det är
        gratis, snabbt och har ett gigantiskt ekosystem av tillägg. När du
        har installerat det, lägg till dessa två tillägg via
        Extensions-panelen (ikonen med fyra rutor i sidopanelen):
      </p>
      <ul>
        <li>
          <strong>Live Server</strong> — startar en lokal server och
          uppdaterar sidan automatiskt varje gång du sparar en fil. Utan
          detta måste du manuellt ladda om sidan i webbläsaren för varje
          ändring.
        </li>
        <li>
          <strong>Prettier</strong> — formaterar din kod automatiskt så den
          ser enhetlig ut. Slipper du tänka på indentering och radbrytningar
          för hand.
        </li>
      </ul>

      <h2>Terminalen</h2>
      <p>
        Terminalen är hur du pratar med datorn med text istället för att
        klicka. Du kommer inte behöva mycket till en början, men de här
        kommandona dyker upp om och om igen:
      </p>
      <CodeBlock
      label="terminal"
      code={`cd min-mapp        # byt till mappen "min-mapp"
ls                  # lista filer i nuvarande mapp (dir på Windows)
mkdir ny-mapp       # skapa en ny mapp
touch index.html    # skapa en ny, tom fil (Windows: New-Item index.html)`}
      />
      <p>
        VS Code har en inbyggd terminal du kan öppna med{" "}
        <code>Ctrl + `</code> (backtick-tangenten, ofta under Esc). Då slipper
        du växla mellan fönster.
      </p>

      <h2>Git och GitHub</h2>
      <p>
        <strong>Git</strong> sparar versioner av din kod så du alltid kan gå
        tillbaka om något går sönder. <strong>GitHub</strong> är en tjänst
        där du lagrar dina Git-projekt online — det blir både en backup och
        ett sätt att visa upp det du byggt. De fyra kommandona nedan täcker
        det du behöver för att komma igång:
      </p>
      <CodeBlock
        label="terminal"
        code={`git init                        # gör mappen till ett Git-projekt
git add .                       # markera alla ändringar för commit
git commit -m "Första commiten" # spara en version med ett meddelande
git push                        # skicka upp dina commits till GitHub`}
      />

      <h2>DevTools</h2>
      <p>
        Varje webbläsare har ett inbyggt verktyg för att inspektera och
        felsöka sidor — <strong>DevTools</strong>. Öppna det med{" "}
        <code>F12</code> eller <code>Ctrl + Shift + I</code> (
        <code>Cmd + Option + I</code> på Mac). Tre flikar du kommer använda
        mest:
      </p>
      <ul>
        <li>
          <strong>Elements</strong> — visar HTML-strukturen och CSS:en för
          det du ser på skärmen. Du kan klicka på ett element och se exakt
          vilka stilar som gäller för det.
        </li>
        <li>
          <strong>Console</strong> — här skriver JavaScript ut meddelanden
          och felmeddelanden. Blir din bästa vän när något inte fungerar som
          det ska.
        </li>
        <li>
          <strong>Network</strong> — visar varje request sidan gör: bilder,
          CSS-filer, JS-filer och senare API-anrop. Ovärderlig när vi börjar
          jobba mot externa API:er längre fram i kursen.
        </li>
      </ul>

      <ExerciseList exercises={exercises} />
    </LessonLayout>
  );
}