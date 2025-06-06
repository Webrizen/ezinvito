import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(request) {
    try {
        const { eventData } = await request.json();

        if (!eventData) {
            return NextResponse.json(
                { error: "Event data is required" },
                { status: 400 }
            );
        }

        // Generate the prompt for the AI
        const prompt = createPrompt(eventData);

        // Get the AI-generated message
        const invitationMessage = await getGeminiSummary(prompt);

        return NextResponse.json({ message: invitationMessage });
    } catch (error) {
        console.error("Error generating invitation:", error);
        return NextResponse.json(
            { error: "Failed to generate invitation message" },
            { status: 500 }
        );
    }
}

function createPrompt(eventData) {
    const {
        title,
        eventType,
        host,
        date,
        endDate,
        location,
        privacy,
        rsvpDeadline
    } = eventData;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const locationInfo = location.onlineEvent
        ? `online at ${location.meetingLink}`
        : `at ${location.venue || "a wonderful venue"} in ${location.address.city}, ${location.address.state}`;

    return `Create a beautiful, engaging invitation message for the following event:

Event Title: ${title}
Type: ${eventType}
Host: ${host}
Date: ${formattedDate}
${endDate ? `End Date: ${new Date(endDate).toLocaleDateString()}` : ""}
Location: ${locationInfo}
Privacy: ${privacy}
rsvp deadline: ${rsvpDeadline}

Please craft a warm, inviting message that includes all the key details while maintaining an elegant tone. The message should:
- Start with an engaging opening
- Include all essential details (what, when, where)
- Have a personal touch from the host
- End with a clear call-to-action (RSVP deadline only)
- Be approximately 1 paragraphs long
- Use appropriate emojis if they fit the event type
- Maintain a professional yet friendly tone

Format the response in paragraph`;
}

async function getGeminiSummary(content) {
    const response = await ai.models.generateContentStream({
        model: "gemini-1.5-flash",
        contents: content,
    });

    let summary = "";
    for await (const chunk of response) {
        summary += chunk.candidates[0]?.content?.parts[0]?.text || "";
    }

    return summary.trim() || "No invitation message could be generated.";
}