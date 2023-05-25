import type { Plugin } from '../plugin'
import { cleanUrl, queryRE } from '../utils'

/**
 * plugin to ensure rollup can watch correctly.
 */
export function ensureWatchPlugin(): Plugin {
   return {
      name: 'kolibry:ensure-watch',
      load(id) {
         if (queryRE.test(id))
            this.addWatchFile(cleanUrl(id))

         return null
      },
   }
}
