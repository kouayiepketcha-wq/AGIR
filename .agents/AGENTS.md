# Project Rules - AGIR

This file defines project-specific guidelines and authorizations for agent actions in the AGIR codebase.

## 🚀 Git & GitHub Automations
- The agent is fully authorized to commit and push changes automatically to the remote GitHub repository (`https://github.com/kouayiepketcha-wq/AGIR.git`) on the `main` branch.
- Pushes should be made after validating file edits or implementing new features to keep the remote repository synchronized.

## 🗄️ Supabase Database Management
- The agent is authorized to design, construct, and modify database tables, relationships, constraints, and Row-Level Security (RLS) policies on Supabase.
- The agent can write SQL migration scripts, execute SQL queries via API, or configure database settings to support real-time user portfolios, savings plans, and transaction feeds.

## 🔒 Key Security & Backend Architecture
- Access keys to database systems must remain secure. Client-side code should exclusively use public anonymous keys combined with strict Supabase Row-Level Security (RLS) policies, ensuring client requests are filtered and authenticated on the database/API backend. The private admin bypass keys (`service_role` keys) must never be embedded in the client.

## 📱 Cross-Platform Target (App Store, Play Store, Desktop)
- The codebase is structured as a cross-platform progressive shell targetable to:
  - Google Play Store & Apple App Store (using **Capacitor** to compile native iOS/Android wrappers).
  - Desktop PC/Mac (using **Electron** or **Tauri** for desktop compilation).
- Any modifications to HTML/CSS/JS must remain compatible with native web-view rendering engines.

## 🖥️ Auto-Opening Verification
- The agent will automatically invoke the local browser opening command (`Start-Process`) after significant updates to enable visual testing by the user.
