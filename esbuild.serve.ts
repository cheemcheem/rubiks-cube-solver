import { type TsconfigRaw, context } from "esbuild";
import { generateConfig, outdir } from "./esbuild.config";

const tsconfigRaw: TsconfigRaw & { extends: string } = {
  extends: "./tsconfig.json",
  compilerOptions: {
    jsx: "react-jsxdev",
  },
};

const start = async (): Promise<void> => {
  const { serve, watch } = await context({
    ...generateConfig(true),
    tsconfigRaw,
    sourcemap: true,
  });
  await watch();
  await serve({ port: 3000, servedir: outdir });
};

void start();
