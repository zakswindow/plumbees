// Production entry point. Reads the site's settings from AWS Systems Manager Parameter Store, puts them into
// the environment, then starts the Next.js server. No secret is kept in a file on the server.
// The instance role supplies the AWS access (ssm:GetParametersByPath on the prefix only). Never a stored key.
import { SSMClient, GetParametersByPathCommand } from "@aws-sdk/client-ssm";

const prefix = (process.env.SSM_PARAMETER_PREFIX || "/plumbees/prod").replace(/\/+$/, "");
const region = process.env.SSM_REGION || "eu-west-2";

// Only these names are ever taken from Parameter Store. Anything else is ignored, so a stray or malicious
// parameter cannot change how the process runs (NODE_OPTIONS, PATH, LD_PRELOAD and so on).
const ALLOWED = new Set([
  "SITE_URL", "SITE_PHONE", "SITE_EMAIL", "SITE_REVIEWS_URL",
  "AWS_REGION", "SES_FROM", "QUOTE_NOTIFY_TO", "QUOTE_REPLY_TO",
  "IDEALPOSTCODES_API_KEY", "TRUST_PROXY",
]);
const REQUIRED = ["SES_FROM", "QUOTE_NOTIFY_TO", "IDEALPOSTCODES_API_KEY"];

try {
  const ssm = new SSMClient({ region });
  const loaded = [];
  let token;
  do {
    const page = await ssm.send(new GetParametersByPathCommand({
      Path: prefix, Recursive: false, WithDecryption: true, MaxResults: 10, NextToken: token,
    }));
    for (const p of page.Parameters ?? []) {
      const name = p.Name?.slice(prefix.length + 1);
      if (name && ALLOWED.has(name) && p.Value !== undefined) {
        process.env[name] = p.Value; // Parameter Store wins over anything already in the environment
        loaded.push(name);
      }
    }
    token = page.NextToken;
  } while (token);

  const missing = REQUIRED.filter((n) => !process.env[n]);
  if (missing.length) throw new Error(`missing under ${prefix}: ${missing.join(", ")}`);
  console.log(`Loaded ${loaded.length} settings from ${prefix} (names only: ${loaded.join(", ")})`);
} catch (e) {
  // Fail closed: do not start a half-configured site that would accept bookings it cannot email.
  console.error(`Could not load settings from Parameter Store: ${e.name}: ${e.message}`);
  process.exit(1);
}

await import("./server.js");
