import LessonLayout from "../../../../components/course/LessonLayout";
import CodeBlock from "../../../../components/course/CodeBlock";
import ExerciseList from "../../../../components/course/ExerciseList";
import exerciseData from "../../../../data/exercises/webbgrunder.json";

const exercises = exerciseData.exercises.filter(
  (ex) => ex.lesson === "internet-och-webblasare"
);

export default function InternetOchWebblasarePage() {
  return (
    <LessonLayout
      moduleTitle="Webb Grunder"
      lessonTitle="Hur internet och webbläsare fungerar"
      prevHref="/webbgrunder/verktyg-och-devtools"
      nextHref="/webbgrunder/filstruktur"
    >
      <p>
        Du kommer skriva HTML, CSS och JavaScript utan att tänka på vad som
        händer bakom kulisserna. Det är helt okej — men en grundförståelse
        gör felsökning mycket enklare senare, särskilt när vi börjar prata
        med externa API:er i modul 5 och 6.
      </p>

      <h2>Klient och server</h2>
      <p>
        Webben bygger på en <strong>klient–server-modell</strong>. Din
        webbläsare är klienten — den som frågar efter något. Servern är en
        annan dator någonstans i världen som lagrar filerna för en
        webbplats och svarar på frågor. Varje gång du besöker en sida sker
        alltså en form av konversation:
      </p>
      <CodeBlock
        label="förenklat flöde"
        code={`Klient:  "Kan jag få index.html från moviesite.dev?"
Server:  "Visst, här är den." (skickar HTML-filen)
Klient:  "Tack. Den refererar till style.css - kan jag få den också?"
Server:  "Visst, här."`}
      />

      <h2>Från URL till skärm</h2>
      <p>
        Så här ser stegen ut, lite mer i detalj, när du skriver en adress i
        adressfältet och trycker Enter:
      </p>
      <ol>
        <li>
          <strong>DNS-uppslag.</strong> Adressen (t.ex.{" "}
          <code>moviesite.dev</code>) är läsbar för människor, men datorer
          pratar med IP-adresser (t.ex. <code>93.184.216.34</code>). Ett
          system som heter DNS översätter domännamnet till rätt IP-adress —
          lite som en telefonkatalog.
        </li>
        <li>
          <strong>Request.</strong> Webbläsaren skickar en förfrågan (en{" "}
          <em>request</em>) till servern på den IP-adressen och ber om en
          sida.
        </li>
        <li>
          <strong>Response.</strong> Servern svarar med ett{" "}
          <em>response</em> — oftast en HTML-fil, tillsammans med en{" "}
          <strong>statuskod</strong> som talar om hur det gick. Koden{" "}
          <code>200</code> betyder allt gick bra, <code>404</code> betyder
          att sidan inte hittades. Vi går igenom fler statuskoder i
          Networking-modulen.
        </li>
        <li>
          <strong>Parsning.</strong> Webbläsaren läser igenom HTML-koden och
          bygger upp en struktur av den i minnet (DOM:en). Hittar den
          referenser till CSS- eller JS-filer skickar den nya requests för
          att hämta dem också.
        </li>
        <li>
          <strong>Rendering.</strong> Webbläsaren räknar ut hur allting ska
          se ut baserat på HTML och CSS, och ritar upp det på skärmen. Sist
          körs eventuell JavaScript, som kan ändra på det som visas.
        </li>
      </ol>

      <h2>Se det själv</h2>
      <p>
        Det här är inte bara teori — du kan se hela processen i DevTools.
        Öppna Network-fliken från förra lektionen, ladda om en sida och
        titta på listan som byggs upp. Varje rad är en request. Klickar du
        på en rad ser du statuskod, hur lång tid den tog, och hur stor
        filen var.
      </p>

      <ExerciseList exercises={exercises} />
    </LessonLayout>
  );
}