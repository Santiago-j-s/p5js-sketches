const prefix = "sketch:";

export async function listSketches() {
  return (await KV.list({ prefix })).keys.map((key) => key.name.slice(7));
}

export async function getSketch(name: string) {
  const script = await KV.get(`${prefix}${name}`);

  if (!script) {
    throw new Error("script not found");
  }

  return script;
}
