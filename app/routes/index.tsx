import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { listSketches } from "~/getSketch";

type IndexData = string[];

export let loader: LoaderFunction = async () => {
  return json(await listSketches());
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "p5js sketches",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const sketches = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main>
        <h2>Sketches</h2>
        {sketches.map((sketch) => (
          <section key="sketch">
            <h3>{sketch}</h3>
            <iframe
              width="400"
              height="400"
              src={`/sketches/${sketch}`}
            ></iframe>
          </section>
        ))}
      </main>
    </div>
  );
}
