// File: src/app/api/health-data/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'sahha_sample_data', 'sahha_output.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  console.log("sahha health data loaded");
  
  return NextResponse.json({ data: fileContents });
}
