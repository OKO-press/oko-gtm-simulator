// Import the 'fs' module with promises for asynchronous file operations
import { writeFile } from 'fs/promises';

/**
 * Asynchronously creates a JSON file at the specified path with the provided data
 * @param filePath - The path where the JSON file will be created
 * @param data - The object to be written to the JSON file
 * @returns Promise<void> - Resolves when the file is successfully created
 */
export async function createJsonFile(filePath: string, data: object): Promise<void> {
  try {
    // Convert the data object into a JSON string with indentation for readability
    const jsonString: string = JSON.stringify(data, null, 2);
    
    // Write the JSON string to the specified file path
    await writeFile(filePath, jsonString, 'utf8');
  } catch (error) {
    // Log any errors that occur during file creation
    console.error('Error creating JSON file:', error);
    throw error; // Re-throw the error to allow calling code to handle it
  }
}
