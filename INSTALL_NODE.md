# Installing Node.js on macOS

Node.js is required to run the backend proxy server. Here's how to install it:

## Option 1: Install via Homebrew (Recommended)

If you have Homebrew installed:

```bash
brew install node
```

To check if you have Homebrew:
```bash
brew --version
```

If you don't have Homebrew, install it first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Option 2: Download Installer (Easiest)

1. Go to: https://nodejs.org/
2. Download the **LTS (Long Term Support)** version for macOS
3. Run the installer (.pkg file)
4. Follow the installation wizard
5. Restart your terminal

## Option 3: Install via nvm (Node Version Manager)

If you want to manage multiple Node.js versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.zshrc

# Install Node.js LTS
nvm install --lts
nvm use --lts
```

## Verify Installation

After installing, verify it works:

```bash
node --version
npm --version
```

You should see version numbers (e.g., `v20.10.0` and `10.2.3`)

## After Installing Node.js

Once Node.js is installed, come back to your project directory and run:

```bash
cd "/Users/jharris6/Desktop/RB/Cursor Projects/jdxcaptain-site"
npm install
npm start
```

## Quick Test

After installation, test it:

```bash
node --version
npm --version
```

If both commands show version numbers, you're ready to go!
