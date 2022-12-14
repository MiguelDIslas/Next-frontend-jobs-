import { NextResponse } from "next/server";

const allowedParams = [
  "keyword",
  "location",
  "page",
  "education",
  "experience",
  "salary",
  "jobType",
  "id",
  "job"
];

export async function middleware(req) {
  const url = req.nextUrl;
  let changed = false;

  url.searchParams.forEach((params, key) => {
    if (!allowedParams.includes(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  });

  if (changed) return NextResponse.redirect(url);
}
