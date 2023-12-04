import type { Voice } from './speaker'

export interface Chat {
  speaker: Voice
  message: string
}

export interface Chats extends Array<Chat> {}
