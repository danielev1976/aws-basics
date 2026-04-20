import Image from 'next/image';

export default function APIGWPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-52">
      <h1 className="text-2xl font-bold mb-4">API Gateway</h1>
      <p className="mb-4">
        Amazon API Gateway är en fullt hanterad tjänst som gör det enkelt för
        utvecklare att skapa, publicera, underhålla, övervaka och säkra API:er i
        vilken skala som helst. API Gateway hanterar alla uppgifter som är
        involverade i att ta emot och bearbeta upp till hundratusentals
        samtidiga API-anrop, inklusive trafikhantering, auktorisering och
        åtkomstkontroll, övervakning och API-versionering.
      </p>

    <Image src="/aws_lambda_apigw_ec2_architecture.svg" 
        alt="API Gateway" 
        className="mx-auto my-4" 
        width={600} 
        height={400} />


      <ul className="list-disc list-inside mb-4">
        {[
          'Skapa API Gateway med http apier som fungerar som en "front door" för applikationer som körs på AWS Lambda.',
          "I varje API skapar vi routes där varje route fungerar som en ingångsport till en endpunkt för Spring Boot Applikationen.",
          "Vi skapar en lambda funktion som integreras med varje route. Koden i lambda funtionen är den som anropar endpunkten för applikationen på EC2an",
          "Det säkraste är att låta kommunikationen mellan lambda funktionerna och EC2an ske via EC2 private ip-adress.",
          "För detta måste lambda funktionerna placeras i VPCn där EC2an körs.",
        ].map((point, index) => (
          <li key={index} className="mb-2">
            {point}
          </li>
        ))}
      </ul>
      <p>
        API Gateway är en kraftfull tjänst som gör det möjligt för utvecklare
        att snabbt och enkelt skapa och hantera API:er, vilket gör det till ett
        utmärkt val för både små och stora applikationer.
      </p>

        <Image src="/aws_lambda_vpc_ec2_private_ip.svg" 
        alt="API Gateway" 
        className="mx-auto my-4" 
        width={600} 
        height={400} />
    </div>
  );
}
