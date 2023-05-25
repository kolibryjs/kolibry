import { release } from '@kolibryjs/release-scripts'
import colors from '@nyxb/picocolors'
import { logRecentCommits, run, updateTemplateVersions } from './releaseUtils'

release({
   repo: 'kolibry',
   packages: ['kolibry', 'create-kolibry', 'plugin-legacy'],
   toTag: (pkg, version) =>
      pkg === 'kolibry' ? `v${version}` : `${pkg}@${version}`,
   logChangelog: pkg => logRecentCommits(pkg),
   generateChangelog: async (pkgName) => {
      if (pkgName === 'create-kolibry')
         await updateTemplateVersions()

      console.log(colors.cyan('\nGenerating changelog...'))
      const changelogArgs = [
         'conventional-changelog',
         '-p',
         'angular',
         '-i',
         'CHANGELOG.md',
         '-s',
         '--commit-path',
         '.',
      ]
      if (pkgName !== 'kolibry')
         changelogArgs.push('--lerna-package', pkgName)
      await run('npx', changelogArgs, { cwd: `packages/${pkgName}` })
   },
})
