import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { join } from "path";
import { slugify, createJsonFile, cleanupDirectory } from "./lib/index.js";
import chalk from "chalk";

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

  // Enhanced colored console output
  console.log(chalk.blue("📥 GTM Event Received"));
  console.log(chalk.green("📄 File created:") + chalk.yellow(` ${fileName}`));
  console.log(chalk.cyan("📅 Timestamp:") + chalk.white(` ${new Date().toISOString()}`));
  console.log(chalk.magenta("📋 Event Data:") + chalk.gray("\n" + JSON.stringify(body, null, 2)));

  return c.body(null, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 4012,
  },
  (info) => {
    console.log(chalk.cyan(`🚀 GTM Simulator is running on http://localhost:${info.port}`));
  }
);
