export interface Message {
    role?: "user" | "assistant" | "system";
    content: string;
}

export interface UserMessage extends Message {
    role?: "user";
    content: string; // Hindi content
}

export interface AssistantMessage extends Message {
    role?: "assistant";
    content: string; // Hindi content
}

export interface SystemMessage extends Message {
    role?: "system";
    content: string; // Hindi content
}