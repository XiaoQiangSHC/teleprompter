# Packaging Guide for Smart Teleprompter

## Prerequisites

1. Node.js and npm installed
2. Windows 10 or later
3. Administrator privileges

## Setup Steps

1. Fix PowerShell Execution Policy:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. Install Dependencies:
   ```bash
   npm install --force
   ```

3. Prepare Assets:
   - Place `icon.ico` in the `assets` folder
   - Icon size should be at least 256x256 pixels

4. Build Commands:
   ```bash
   # For development testing
   npm run electron-dev

   # For production build
   npm run electron-pack
   ```

## Troubleshooting

### Permission Errors
If you encounter permission errors:
1. Run PowerShell as Administrator
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules folder and package-lock.json
4. Run `npm install` again

### Build Errors
If the build fails:
1. Ensure all dependencies are installed
2. Check that the assets folder contains required files
3. Verify the build paths in package.json

## Distribution

The packaged application will be available in the `dist` folder after running `npm run electron-pack`. The installer will be named `智能提词器 Setup.exe`. 