import { execSync } from "child_process";
import fs = require("fs");

export function build(entitiesFolder: string) {
  const schemaPath = `${entitiesFolder}definitions.json`;
  if (fs.existsSync(schemaPath)) {
    fs.unlinkSync(schemaPath);
  }

  const json = execSync(`$(npm bin)/ts-json-schema-generator --path '${entitiesFolder}*.ts'`).toString();
  fs.writeFileSync(schemaPath, JSON.stringify(
    JSON.parse(json.replace(/#\/definitions\//g, "#/components/schemas/")).definitions,
    null,
    2
  ));
  // tslint:disable-next-line
  console.log(`${schemaPath} written successfully`);
}
