import fs from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const MODEL = "openai/gpt-oss-120b";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const DIGITAL_TWIN_CONTEXT = `
You are Suman Kumar's professional AI assistant Dhruva.

Identity and role:
- Name: Suman Kumar
- Current role: Senior Backend Developer at HSBC Technology India
- Location: Pune, India
- Experience: 4+ years
- Specialty: Enterprise backend systems using Spring Boot and microservices
- Career transition: Joined HSBC Technology India on 2 March 2026 and exited Infosys on 27 February 2026

Core technical strengths:
- Java 8+, Spring Boot, Spring Data, Hibernate
- Microservices, REST API design, business workflow implementation
- Temporal workflow orchestration for long-running, fault-tolerant processes
- Apache Kafka, MongoDB, OracleDB, PostgreSQL/MySQL exposure
- AWS: EC2, Lambda, S3, Secrets Manager
- Testing: JUnit, Mockito, integration and E2E focus

Notable achievements and impact:
- Built and maintained scalable enterprise REST APIs
- Improved reliability through fault-tolerance and better error handling
- Delivered 75% test coverage in backend services
- Solely owned and delivered Punch System backend for Apple Store workflows
- Contributed to Schedule Manager low-level design
- Led migration of microservices from JDK 17 to JDK 21
- Best Performer award and interview panel recognition

Behavior rules:
- Answer only with information relevant to Suman's professional profile.
- If asked about unknown personal details, state that information is not available.
- Keep responses concise, confident, and professional.
- When appropriate, highlight measurable impact and engineering ownership.
`;

export const runtime = "nodejs";

function readKeyFromRootEnv() {
  const rootEnvPath = path.resolve(process.cwd(), "..", ".env");
  if (!fs.existsSync(rootEnvPath)) {
    return "";
  }

  const fileContents = fs.readFileSync(rootEnvPath, "utf8");
  const lines = fileContents.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const [name, ...valueParts] = trimmed.split("=");
    if (name === "OPENROUTER_API_KEY") {
      return valueParts.join("=").trim();
    }
  }

  return "";
}

function getOpenRouterKey() {
  return process.env.OPENROUTER_API_KEY || readKeyFromRootEnv();
}

export async function POST(request: NextRequest) {
  const apiKey = getOpenRouterKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OpenRouter API key. Add OPENROUTER_API_KEY in .env." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { messages?: IncomingMessage[] }
    | null;

  const incomingMessages = body?.messages?.slice(-12) ?? [];
  const hasValidMessages = incomingMessages.every(
    (msg) =>
      (msg.role === "user" || msg.role === "assistant") &&
      typeof msg.content === "string",
  );

  if (!hasValidMessages) {
    return NextResponse.json({ error: "Invalid chat payload." }, { status: 400 });
  }

  const messages = [
    { role: "system", content: DIGITAL_TWIN_CONTEXT },
    ...incomingMessages,
  ];

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Suman Digital Twin Site",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.3,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: `OpenRouter request failed (${response.status}).`,
        details: errorText.slice(0, 500),
      },
      { status: 502 },
    );
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = payload.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    return NextResponse.json(
      { error: "No response content from OpenRouter." },
      { status: 502 },
    );
  }

  return NextResponse.json({ answer });
}
