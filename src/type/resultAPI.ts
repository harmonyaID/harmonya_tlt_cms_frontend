// types.ts
export interface APIResponse {
    result: any
    [key: string]: any // Untuk menangani properti lain yang mungkin ada
}
