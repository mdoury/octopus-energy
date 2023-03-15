import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3001",
  documents: "pages/**/*.tsx",
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
