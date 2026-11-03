const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith(".tsx") || full.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

const dir = path.join("src", "components", "math", "grade-9", "fuggvenyek");
const allFiles = walk(dir);
let errors = 0;
for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");
  try {
    esbuild.transformSync(content, { loader: file.endsWith(".tsx") ? "tsx" : "ts" });
  } catch (err) {
    console.error("Syntax error in " + file + ":", err.message);
    errors++;
  }
}
if (errors === 0) {
  console.log("All " + allFiles.length + " files parsed successfully with esbuild transform!");
} else {
  process.exit(1);
}
