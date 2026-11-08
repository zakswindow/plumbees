import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
let bad = [];
for (const group of ["dependencies", "devDependencies"]) {
  for (const [name, range] of Object.entries(pkg[group] ?? {})) {
    if (!/^\d+\.\d+\.\d+$/.test(range)) bad.push(`${name}@${range} is not an exact version`);
  }
}
for (const [path, info] of Object.entries(lock.packages ?? {})) {
  if (path && !info.link && !info.integrity) bad.push(`${path} has no integrity hash in package-lock.json`);
}
if (bad.length) {
  console.error(bad.join("\n"));
  process.exit(1);
}
console.log("All dependencies are pinned and carry integrity hashes.");
