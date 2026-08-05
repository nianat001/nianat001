# Luminary Companions

A dependency-free, mobile-first companion app for guided practices, reflective journaling, and supportive conversations.

## Test it locally

You only need Node.js 18 or newer—there is no install step and no package download.

1. Open a terminal in this repository.
2. Start the app (do **not** close the terminal afterward):

   ```bash
   npm start
   ```

3. Wait until the terminal says `Luminary is running`, then open **http://localhost:4173** in the browser on the **same computer**. `localhost` only works while this command is running.

If port 4173 is occupied, choose another port:

```bash
PORT=4174 npm start
```

Then visit **http://localhost:4174**. To test the mobile layout, open your browser's developer tools and select a phone-sized viewport.

### No-server option

You can also double-click `index.html` and use the app directly from your filesystem. The assets use relative URLs and the app has no external runtime dependencies.

To verify the production output:

```bash
npm run build
npm run preview
```

The build is written to `dist/`. Practice progress and journal entries are stored locally in your browser.

## Launch it yourself with GitHub Pages

You do not need to hand this project to another developer. This repository includes an automatic deployment workflow.

1. Push this repository to GitHub.
2. On the repository page, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open **Actions → Deploy Luminary to GitHub Pages → Run workflow** and run it from `main` or `work`.
5. When the workflow finishes, open the URL shown in its **Deploy site** result. It will normally look like `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

Every later push to `main` or `work` automatically rebuilds and publishes the site. You can also connect a domain you own from **Settings → Pages → Custom domain**.

### What this launch includes

- A public install-free website that works on phones and desktops.
- Companion search, guided-practice tracking, journaling, and the current scripted chat experience.
- A **Leads** tab for finding cold-outreach targets: enter a location and radius, and it returns nearby organisations — GP surgeries, community/social care groups, care homes, solicitors, financial advisers, local employers, pharmacies, places of worship, and libraries — ranked by a fit score (channel relevance, distance, and contact-info completeness). Results can be exported to CSV.
- Private browser storage: journal entries and completed practices remain on that user's device and are not sent to a server.

### How the Leads finder works

Everything runs client-side, directly from the visitor's browser — there is no backend and no data collection:

1. The location text is geocoded with the free [Nominatim](https://nominatim.openstreetmap.org/) API (OpenStreetMap).
2. Nearby organisations are queried from the [Overpass API](https://overpass-api.de/) (OpenStreetMap) within the chosen radius.
3. Results are deduplicated, scored, and ranked in the browser; nothing is sent to or stored on a server.

Because it depends on OpenStreetMap's public data and free APIs, coverage and contact-detail completeness vary by area, and heavy or rapid-fire searching may be rate-limited — it's meant for occasional prospecting, not bulk scraping.

### Before inviting real users

This is a functional prototype, not yet a production mental-health service. The companion replies are scripted and there are no user accounts, cloud backups, moderation tools, analytics, emergency resources, or AI service connected. Before marketing it broadly, add a privacy policy, terms, support contact, crisis disclaimer/resources, accessibility review, and a real secure backend if accounts or AI conversations are required.

---

# 👩🏽‍💻 Adediwura Oluwaseun – Cybersecurity Analyst

Hi there! 👋 I'm *Adediwura Oluwaseun*, a passionate and hands-on **Cybersecurity Analyst** with a growing portfolio of real-world projects focused on threat detection, system hardening, and security monitoring. I believe in learning by doing, and I’m on a mission to make the digital world safer — one packet at a time.

---

## 🛡 My Cybersecurity Projects

Here's a curated list of projects I’ve completed as part of my cybersecurity learning journey. Each project is designed to replicate real-world scenarios, using industry tools and best practices.

### 🧪 Lab Environments
- ✅ *Setting Up a Virtual Home Lab* (on macOS and Windows)
- ☁ *Cloud Home Lab Setup* (for scalable, remote testing)

### 🔍 Reconnaissance & Threat Analysis
- 🌐 *Footprinting* – Passive and active info gathering
- 🐟 *Phishing Email Analysis* – Identifying spoofed domains, headers, and payloads
- 🧫 *Vulnerability Assessment* – Using tools like OpenVAS, Nessus, and Nmap

### 🚨 Threat Detection & Monitoring
- 📊 *SIEM Setup with Wazuh* – Centralized log analysis and alerting
- 🔎 *Elastic SIEM Setup* – Kibana dashboards and threat hunting
- 🛡 *Suricata IDS Setup* – Intrusion detection using signature-based rules
- 🧲 *Honeypot Deployment* – Detecting and analyzing attacker behavior

### 🔬 Malware & Exploit Analysis
- 🧾 *Malicious PDF Analysis* – Dissecting payloads and embedded scripts
- 🧟 *Malware Analysis* – Using tools like Ghidra and VirusTotal

### 🔐 Network Security
- 🔒 *Setting Up a Personal VPN Server* – Secure remote connections using WireGuard/OpenVPN

---

## 🧰 Tools & Skills

- 🖥 VirtualBox, VMware, AWS Free Tier
- 🧪 Wireshark, Nmap, Metasploit
- 🔐 Wazuh, Suricata, Elastic Stack
- 🐧 Linux, macOS, Windows
- 📄 Markdown, Git, GitHub

---

## 📁 Featured Repositories

| Project | Description | Link |
|--------|-------------|------|
| virtual-home-lab | Setting up a local cyber lab on macOS/Windows | [View Repo](#) |
| cloud-home-lab | Building a cloud-based home lab for cybersecurity practice | [View Repo](#) |
| footprinting-techniques | Info gathering via open-source intelligence and active scanning | [View Repo](#) |
| vulnerability-assessment | Scan and assess network vulnerabilities using security tools | [View Repo](#) |
| phishing-email-analysis | Analyzing phishing emails and spotting key red flags | [View Repo](#) |
| wazuh-siem-lab | End-to-end guide for setting up Wazuh SIEM | [View Repo](#) |
| elastic-siem-setup | Configuring Elastic Stack for threat hunting | [View Repo](#) |
| suricata-ids-lab | Step-by-step IDS setup using Suricata | [View Repo](#) |
| honeypot-deployment | Deceptive traps to attract and analyze cyber attackers | [View Repo](#) |
| pdf-malware-analysis | Reverse engineering malicious PDFs | [View Repo](#) |
| malware-analysis-basics | Using Ghidra and online sandboxes to inspect malware | [View Repo](#) |
| vpn-server-setup | Create a personal VPN on the cloud | [View Repo](#) |

---

## 📫 Get in Touch

- 💼 [LinkedIn]( https://www.linkedin.com/in/adediwura-olagoke/)  
- ✉ Email: adediwuraoluwaseun@gmail.com   
- 🌐 Portfolio Site (coming soon!)

---

> “Cybersecurity is not just a skill — it's a mindset.”  
> – Adediwura Oluwaseun

Thanks for visiting my GitHub! Don’t forget to ⭐ star any repo you find helpful 💻🔥
