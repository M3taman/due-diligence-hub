const RATE_LIMIT = 10; // 10 requests per hour
const users = new Map<string, number[]>();

export function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const hourAgo = now - (60 * 60 * 1000);
  
  // Get user's requests
  const requests = users.get(userId) || [];
  
  // Remove old requests
  const recent = requests.filter(time => time > hourAgo);
  
  // Check if under limit
  if (recent.length >= RATE_LIMIT) {
    return false;
  }
  
  // Add new request
  recent.push(now);
  users.set(userId, recent);
  
  return true;
}