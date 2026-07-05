// Ad-hoc code-sign the packaged macOS app so Apple Silicon will run it.
// Without any signature, unsigned apps are reported as "damaged" on arm64 Macs.
// (This is NOT notarization — users still bypass Gatekeeper once: right-click → Open,
//  or run:  xattr -cr "/Applications/Hilbert.app")
const { execSync } = require('child_process');

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== 'darwin') return;
  const appName = context.packager.appInfo.productFilename;
  const appPath = `${context.appOutDir}/${appName}.app`;
  try {
    execSync(`codesign --deep --force --sign - "${appPath}"`, { stdio: 'inherit' });
    console.log(`  • ad-hoc signed ${appPath}`);
  } catch (e) {
    console.warn(`  ! ad-hoc signing failed: ${e.message}`);
  }
};
