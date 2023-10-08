import { build } from "esbuild";
import { rm } from "fs/promises";
import { generateConfig, outdir } from "./esbuild.config";

const buildApp = async (): Promise<void> => {
  await rm(outdir, { recursive: true });
  await build({
    ...generateConfig(false),
    minify: true,
  });
};

void buildApp();
