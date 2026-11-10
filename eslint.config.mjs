import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", ".release/**", "node_modules/**"] }];
export default config;
