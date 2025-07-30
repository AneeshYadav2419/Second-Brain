import { Card } from "./Cards";

type Item = {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "linkedin";
};

interface Props {
  items: Item[];
  refresh: () => void;
}

export function CardsGrid({ items, refresh }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      {/* Use auto-fit so empty tracks collapse (prevents big gaps). 
          Avoid justify-around/space-between with wrapping. */}
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] gap-6 content-start items-start">
        {items.map((i) => (
          <Card key={i.id} id={i.id} title={i.title} link={i.link} type={i.type} refresh={refresh} />
        ))}
      </div>
    </section>
  );
}
