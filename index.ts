<script src="/js/judge.js"></script>
<script>
  fix1099BindJudgeFromSelects({
    payeeSelectId: "q1",
    reasonSelectId: "q2",
    methodSelectId: "q3"
  });
</script>
import express from "express";
import path from "path";
import judge1099Router from "./routes/judge1099";
import policiesRouter from "./routes/policies";

const app = express();
app.use(express.json());

// API
app.use("/api", judge1099Router);
app.use("/api", policiesRouter);

// static
const publicDir = path.join(process.cwd(), "public");
app.use(express.static(publicDir));

// basic health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Fix1099 server running on http://localhost:${PORT}`);
});
