export interface historyTagsConfig {
    path?: string,
    pathname: string
} 

export interface historyTagsPayload {
    type: "add" | "delete",
    historyLink: historyTagsConfig
}