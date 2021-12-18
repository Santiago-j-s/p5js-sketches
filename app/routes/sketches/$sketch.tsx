import { json, LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { getSketch } from "~/getSketch";
import css from "~/styles/sketch.css";

interface Props {
  sketch: string;
  name: string;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};

export const handle = {
  withoutLayout: true,
};

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.sketch) {
    throw json("must have sketch", { status: 400 });
  }

  let sketch;
  try {
    sketch = await getSketch(params.sketch);
  } catch (err) {
    throw json("sketch not found", { status: 404 });
  }

  return { sketch, name: params.sketch };
};

export default function Index() {
  const data = useLoaderData<Props>();

  return (
    <div>
      <script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"></script>
      <script dangerouslySetInnerHTML={{ __html: data.sketch }}></script>
    </div>
  );
}
