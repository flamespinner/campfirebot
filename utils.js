import { readdirSync, readFileSync, writeFileSync } from 'fs'

/**
 * Return an array of the file names in a directory (`dir`) that end with a
 * particular substring (`ext`). Usually this will be checking for a particular
 * extension that each file has (e.g., all of the JS files in a directory).
 * @param {string} dir - The directory to search.
 * @param {string} ext - The substring that each filename must end with to be
 *   included (e.g., a file extension).
 * @returns {string[]} - An array of the file names in the given directory
 *   (`dir`) which end with the given substring (`ext`).
 */
const getExtFiles = (dir, ext) => readdirSync(dir).filter(file => file.endsWith(ext))


export {
    getExtFiles
}