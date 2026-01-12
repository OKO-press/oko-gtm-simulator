import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { join } from "path";
import { slugify, createJsonFile, cleanupDirectory } from "./lib/index.js";

const LOG_PATH = join(".", "log");

cleanupDirectory(LOG_PATH);

const app = new Hono();
app.use("*", cors());

app.get("/", (c) => {
  return c.text("GTM simulator here, please send POST requests");
});

app.post("/", async (c) => {
  const body = await c.req.json<Record<string, any>>();
  const eventSource = c.req.header("x-event-source");
  const fileName =
    new Date().toISOString() + '_' + (eventSource ? slugify(eventSource) : undefined) +  ".json";

  await createJsonFile(join(LOG_PATH, fileName), body ?? {});

  console.log(`🗄️  Successfully created ${fileName} log file with content:\n`, body);

  return c.body(null, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 4012,
  },
  (info) => {
    console.log(`GTM simulator is running on http://localhost:${info.port}`);
  }
);
