/**
 * Slugifies a string into a safe kebab-case filename
 * @param input - The input string to slugify
 * @returns A safe filename in kebab-case format
 */
export function slugify(input: string): string {
  if (!input) return '';
  
  // Convert to lowercase
  let result = input;
  
  // Replace spaces and special characters with hyphens
  result = result.replace(/[^a-zA-Z0-9]+/g, '-');
  
  // Remove leading and trailing hyphens
  result = result.replace(/^-+|-+$/g, '');
  
  // Ensure we don't have consecutive hyphens
  result = result.replace(/-+/g, '-');
  
  return result;
}