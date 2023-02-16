export type Target = EventTarget & (HTMLTextAreaElement | HTMLInputElement)
    & {
        files?: FileList | null
    }