
export interface Chat {
    id?: string;
    conversationId: string;
    userId?: string | null;
    content: string;
    role: string;
    createdAt?: Date;
}

export interface Conversation {
    id?: string;
    name?: string | null;
    userId: string;
    createdAt?: Date;
    messages?: Chat[];
}

export type ServerActionResult<Result> = Promise<
    | Result
    | {
          error: string;
      }
>;

export interface Session {
    user: {
        id: string;
        email: string;
    };
}

export interface AuthResult {
    type: string;
    message: string;
}

export interface User extends Record<string, any> {
    id: string;
    email: string;
    password: string;
    salt: string;
}

export interface ClientMessage {
    id: string;
    role: "user" | "assistant";
    display: React.ReactNode;
}

export type Message =  {
    id: string;
    content: string,
    role:"user"|"assistant"
};

export interface AIState {
    chatId: string;
    messages: Message[];
}
