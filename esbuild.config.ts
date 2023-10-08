import { type BuildOptions } from "esbuild";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";
export const outdir = "dist";

const htmlTemplate = (dev: boolean): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    ${
      dev
        ? "<script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>"
        : ""
    }
    <div id="root"></div>
</body>
</html>
`;

export const generateConfig = (dev: boolean): BuildOptions => ({
  entryPoints: [{ in: "packages/app/index.tsx", out: "index" }],
  format: "esm",
  outdir,
  bundle: true,
  metafile: true,
  splitting: true,
  chunkNames: "chunks/[name]-[hash]",
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: ["packages/app/index.tsx"],
          filename: "index.html",
          htmlTemplate: htmlTemplate(dev),
        },
      ],
    }),
  ],
});
