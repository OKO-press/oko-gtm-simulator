import { promises as fs } from "fs";
import * as path from "path";

/**
 * Deletes all files and directories in a directory except .gitkeep files
 * @param directoryPath - The path to the directory to clean
 * @returns Promise<void> - Resolves when cleanup is complete
 */
export async function cleanupDirectory(directoryPath: string): Promise<void> {
  try {
    // Check if directory exists
    const stats = await fs.stat(directoryPath);
    if (!stats.isDirectory()) {
      throw new Error(`Path ${directoryPath} is not a directory`);
    }

    // Read all items in the directory
    const items = await fs.readdir(directoryPath);

    // Process each item
    for (const item of items) {
      const itemPath = path.join(directoryPath, item);

      // Skip .gitkeep files
      if (item === ".gitkeep") {
        continue;
      }

      // Remove the item (file or directory)
      await fs.rm(itemPath, { recursive: false, force: true });
    }
  } catch (error) {
    console.error("Error cleaning directory:", error);
    throw error;
  }
}
