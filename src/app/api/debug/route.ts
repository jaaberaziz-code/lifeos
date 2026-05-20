export async function GET() {
  const info = {
    node: process.version,
    vercel: !!process.env.VERCEL,
    kv_url: !!process.env.KV_REST_API_URL,
    kv_token: !!process.env.KV_REST_API_TOKEN,
    upstash_url: !!process.env.UPSTASH_REDIS_REST_URL,
    upstash_token: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    cwd: process.cwd(),
    tmp_writable: false,
  };
  
  try {
    const fs = await import("fs");
    fs.writeFileSync("/tmp/test.txt", "ok");
    info.tmp_writable = true;
  } catch {}

  return Response.json(info);
}
