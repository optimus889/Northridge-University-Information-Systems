import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function startServer() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Northridge backend running on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
