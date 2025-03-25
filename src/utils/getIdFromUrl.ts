export function getIdFromUrl(url: string): number | null {
    const regex = /\/(\d+)\//; 
    const match = url.match(regex);
  
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  
    return null;
}
