const app = require("./src/app.js");
const testRoutes = require("./src/routes/test.js");
const port = process.env.PORT || 5000;

app.use("/api", testRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
