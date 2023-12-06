import { defineStore } from 'pinia'

const INTERNAL_ACCESS_CODE_TO_FRIENDLY = import.meta.env.VITE_INTERNAL_ACCESS_CODE
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const XI_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY

export const useAccessControlStore = defineStore('accessControl', {
    state: () => ({
        isAuthorized: false,
        openaiAPIKey: OPENAI_API_KEY,
        elevenLabsAPIKey: XI_API_KEY,
    }),
    actions: {
        validatePassword(pass: string) {
            if(pass==INTERNAL_ACCESS_CODE_TO_FRIENDLY)
            {
                this.isAuthorized = true;
            }
            return(pass == INTERNAL_ACCESS_CODE_TO_FRIENDLY)
        }
    },
})