import { buildApp } from "./app/app";

const main = async () => {
  const app = await buildApp();

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`server on, running at http://localhost:${port}/graphql`);
  });
};

main().catch((err) => {
  console.log("error: ", err);
});
