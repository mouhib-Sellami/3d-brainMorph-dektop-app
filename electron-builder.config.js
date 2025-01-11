var dotenv = require("dotenv");
dotenv.config();

const now = new Date();

var config = {
    "appId": process.env.ELECTRON_APP_BUNDLE,
    "asar": true,
    "buildVersion": process.env.ELECTRON_BUILD_VERSION,
    "productName": process.env.ELECTRON_APP_NAME,
    "copyright": `Copyright © ${now.getFullYear()}` + ' ${author}',
    "publish": null,
    "publisherName": "${author}",
    "extraMetadata": {
        'version': process.env.ELECTRON_BUILD_VERSION
    },
    "directories": {
        "output": "releases/${buildVersion}"
    },
    "icon": "./resources/icon.png",
    "extraResources": {
        "from": "./buildResources",
        "to": "buildResources/",
        "filter": "**/*"
    },
    "files": [
        "out/**/*",
        "!**/.vscode/*",
        "!src/*",
        "!electron.vite.config.{js,ts,mjs,cjs}",
        "!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}",
        "!{.env,.env.*,.npmrc,pnpm-lock.yaml}",
        "!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}"
    ],
    "mac": {
        "target": [
            "dmg"
        ],
        "artifactName": "${productName}-Mac-${buildVersion}-Installer.${ext}"
    },
    "win": {
        "executableName": process.env.ELECTRON_APP_NAME,
        "target": [
            {
                "target": "nsis",
                "arch": [
                    "x64"
                ]
            },
            {
                "target": "zip",
                "arch": [
                    "x64"
                ]
            }
        ],
        "artifactName": "${productName}-win-${buildVersion}-Setup.${ext}"
    },
    "nsis": {
        "oneClick": false,
        "perMachine": false,
        "allowToChangeInstallationDirectory": true,
        "deleteAppDataOnUninstall": false,
        "createDesktopShortcut": "always",
        "createStartMenuShortcut": true,
        "uninstallDisplayName": "${productName} ${version} uninstall"
    },
    "linux": {
        "target": [
            "AppImage"
        ],
        "artifactName": "${productName}-Linux-${buildVersion}.${ext}"
    }
};
module.exports = config;
