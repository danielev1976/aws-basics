import LessonLayout from "../../../../components/course/LessonLayout";
import CodeBlock from "../../../../components/course/CodeBlock";
import ExerciseList from "../../../../components/course/ExerciseList";
import exerciseData from "../../../../data/exercises/webbgrunder.json";

const exercises = exerciseData.exercises.filter(
  (ex) => ex.lesson === "filstruktur"
);

export default function FilstrukturPage() {
  return (
    <LessonLayout
      moduleTitle="Webb Grunder"
      lessonTitle="Filstruktur i ett webbprojekt"
      prevHref="/webbgrunder/internet-och-webblasare"
    >
      <p>
        Ett projekt med en enda fil är enkelt att hålla ordning på. Men
        filmsidan vi bygger genom kursen kommer växa med fler HTML-sidor,
        stilar och skript — och då spelar det stor roll hur du organiserar
        filerna från början.
      </p>

      <h2>En vanlig grundstruktur</h2>
      <p>
        Det finns inget universellt "rätt" sätt att strukturera ett
        projekt, men den här uppdelningen är vanlig för mindre
        webbprojekt och är den vi kommer använda:
      </p>
      <CodeBlock
        label="projektstruktur"
        code={`mitt-projekt/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── assets/
    └── img/
        └── logo.png`}
      />
      <ul>
        <li>
          <code>index.html</code> ligger i projektets rot — det är
          standardnamnet för startsidan och det som visas om någon bara
          anger mappens adress.
        </li>
        <li>
          <code>styles/</code> samlar all CSS på ett ställe, istället för
          att sprida ut den i varje HTML-fil.
        </li>
        <li>
          <code>scripts/</code> samlar all JavaScript på samma sätt.
        </li>
        <li>
          <code>assets/</code> innehåller sådant som inte är kod: bilder,
          ikoner, typsnitt. Undermappen <code>img/</code> gör det tydligt
          vad som är vad när <code>assets/</code> växer.
        </li>
      </ul>

      <h2>Relativa sökvägar</h2>
      <p>
        När du länkar en fil från en annan behöver webbläsaren veta var den
        ska leta. En <strong>absolut sökväg</strong> pekar på en exakt
        adress (t.ex. en hel URL). En <strong>relativ sökväg</strong> pekar
        istället utifrån var filen som länkar ligger — vilket är det du
        oftast vill ha inom ett projekt, eftersom det fungerar oavsett var
        projektet läggs.
      </p>
      <CodeBlock
        label="index.html"
        code={`<link rel="stylesheet" href="styles/main.css">
<script src="scripts/main.js"></script>
<img src="assets/img/logo.png" alt="Logotyp">`}
      />
      <p>
        Sökvägarna ovan utgår från var <code>index.html</code> ligger. Om du
        istället länkar från en fil i en undermapp, t.ex.{" "}
        <code>pages/om.html</code>, måste du kliva upp ett steg med{" "}
        <code>../</code> för att komma tillbaka till roten:
      </p>
      <CodeBlock
        label="pages/om.html"
        code={`<link rel="stylesheet" href="../styles/main.css">
<img src="../assets/img/logo.png" alt="Logotyp">`}
      />

      <h2>Namngivning</h2>
      <p>
        Använd gemener och bindestreck istället för mellanslag eller stor
        bokstav i filnamn — t.ex. <code>movie-card.js</code> istället för{" "}
        <code>Movie Card.js</code>. Vissa servrar och verktyg är
        skiftlägeskänsliga, och mellanslag i filnamn skapar problem i
        URL:er. Det kallas <em>kebab-case</em> och är standard i
        webbprojekt.
      </p>

      <ExerciseList exercises={exercises} />
    </LessonLayout>
  );
}