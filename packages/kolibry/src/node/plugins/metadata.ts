import type { Plugin } from '../plugin'

/**
 * Prepares the rendered chunks to contain additional metadata during build.
 */
export function metadataPlugin(): Plugin {
   return {
      name: 'kolibry:build-metadata',

      async renderChunk(_code, chunk) {
         chunk.kolibryMetadata = {
            importedAssets: new Set(),
            importedCss: new Set(),
         }
         return null
      },
   }
}
