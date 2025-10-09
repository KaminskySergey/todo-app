export function getTrimmedText(text: string, limit: number, expanded: boolean) {
    if (expanded || text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  }