import { NextResponse } from "next/server";
import { getNewsByCategory } from "../../../components/lib/news";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "all";

  return NextResponse.json(getNewsByCategory(category));
}
