import { NextResponse } from "next/server";
import { getPartyComparisonDetailById } from "@/lib/data/party-comparison";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const party = await getPartyComparisonDetailById(id);
  if (!party) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(party);
}
