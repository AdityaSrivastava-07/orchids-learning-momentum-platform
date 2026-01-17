import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new OpenAI({ apiKey });
}

const SYSTEM_PROMPT = `You are ऋStart's friendly AI learning assistant. ऋStart (pronounced "Ri-Start") is an all-in-one learning momentum platform that prevents course dropout and boosts learner confidence.

Your personality:
- Friendly, encouraging, and supportive
- Use relevant emojis to make responses engaging
- Keep responses concise but helpful (2-4 short paragraphs max)
- Always be positive and motivating about the user's learning journey

Key features of ऋStart you should know about:
1. **Micro-Intelligence Layer**: AI-powered summaries of learning progress, "next tiny step" recommendations, 10-minute micro-lessons
2. **Learning Momentum Timer**: Auto-splits videos into 10-min chunks, momentum graphs tracking time (not just streak days)
3. **Confidence Checkpoints**: 20-second confidence polls, adaptive clarifications, social proof from other learners
4. **Accountability System**: Learning contracts, timezone-aware buddy matching, weekly check-ins, recovery plans
5. **Dropout Radar Analytics**: ML-powered dropout predictions, quiz difficulty analysis, A/B testing
6. **Gamification**: Leaderboards, daily streaks, 5 lives system (lose 1 life per missed day, gain 1 life per 7-day streak), achievements
7. **Learning Path**: Visual course journey showing completed, current, pending, and locked courses with XP rewards
8. **Active Quests**: Daily/Weekly/Monthly challenges for bonus XP
9. **Browser Extension**: Works on Udemy, Coursera, YouTube, Notion

User stats (example data you can reference):
- Current streak: 5 days
- Lives: 4/5
- Total XP: 2,650
- Leaderboard rank: #47
- Weekly learning time: 6h 27m
- Course progress: 52%

You can answer questions about:
- How features work
- Learning tips and motivation
- Progress tracking
- Gamification mechanics
- Technical support
- General learning advice
- Study techniques and productivity

Always encourage users to keep learning and celebrate their progress!`;

export async function POST(request: NextRequest) {
  try {
    const openai = getOpenAIClient();
    
    if (!openai) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((msg: { text: string; isBot: boolean }) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again!";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    
    if (error instanceof OpenAI.APIError && error.status === 401) {
      return NextResponse.json(
        { error: "API key not configured. Please set up your OpenAI API key." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
