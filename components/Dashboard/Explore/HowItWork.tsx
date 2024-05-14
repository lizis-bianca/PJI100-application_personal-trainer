import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Acessibilidade",
    description:
      "Acesse pelo computador ou celular, sempre com layouts intuitivos",
  },
  {
    icon: <MapIcon />,
    title: "Comunidade",
    description:
      "Ferramenta open-source usufruindo de suas vantagens e recursos",
  },
  {
    icon: <PlaneIcon />,
    title: "Escalabilidade",
    description:
      "Atualizações estão por vir",
  },
  {
    icon: <GiftIcon />,
    title: "Gamificação",
    description:
      "Aplicando das estratégias dos jogos nas atividades do dia a dia",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 mt-11 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Como{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Funciona{" "}
        </span>
        Tudo Isso?
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Funciona aplicando um pouquinho de tudo!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};