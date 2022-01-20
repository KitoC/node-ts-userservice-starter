const fs = require("fs");
const path = require("path");

const fileLoaderBlacklist = ["index.ts", "index.js", "autoLoader"];
const fileLoaderWhitelist = [".ts", ".js"];
const dirLoaderBlacklist = [".ts", ".js", "__tests__"];

const shouldLoadFile = (file: string) => {
  return (
    (file.includes(".js") || file.includes(".ts")) &&
    !file.includes("index") &&
    !file.includes("autoLoader")
  );
};

const shouldLoadDir = (file: string) => {
  return !file.includes(".js") && !file.includes(".ts");
};

const autoLoader = (dirname: string) => {
  const files = {} as any;

  if (!files["autoLoader"]) {
    files["autoLoader"] = autoLoader;
  }

  fs.readdirSync(dirname).forEach((fileName: string) => {
    const filePath = path.join(dirname, fileName);

    if (shouldLoadFile(fileName)) {
      files[
        fileName.replace(".ts", "").replace(".js", "")
      ] = require(filePath).default;
    } else if (shouldLoadDir(fileName)) {
      files[fileName] = autoLoader(filePath);
    }
  });

  return files;
};

export default autoLoader;
