export const profile = {
  name: 'Ayberk Aydın',
  handle: 'ayberk@ayberkayd.in',
  role: 'Computer Engineer · Security Researcher · Builder',
  university: 'Eskişehir Technical University',
  degree: 'Computer Engineering',
  period: '2021 – 2026',
  email: 'ay.ayberkaydin@gmail.com',
  linkedin: 'linkedin.com/in/ayberk-aydin',
}

export const experience = [
  {
    id: 'bilisim',
    company: 'Bilishim Cyber Security and Artificial Intelligence Ltd',
    role: 'Cyber Security Intern',
    period: 'Jul 2025 – Aug 2025',
    location: 'Remote',
    bullets: [
      'Conducted vulnerability scans and security testing on web applications',
      'Monitored network logs to detect anomalies and potential threats',
      'Contributed to AI-focused cybersecurity project research and documentation',
    ],
  },
  {
    id: 'estu-it',
    company: 'Eskişehir Technical University — IT Department',
    role: 'Network & Cyber Security Assistant',
    period: 'Oct 2025 – Jun 2026',
    location: 'Eskişehir (Hybrid)',
    bullets: [
      'Deployed a local VoIP system — configured servers, switches, and IP phones end-to-end',
      'Managed network infrastructure: routing, switching, VLAN assignments',
      'Monitored network traffic and flagged vulnerabilities using analysis tools',
    ],
  },
]

export const projects = [
  {
    id: 'careershipai',
    name: 'CareerShipAI',
    tagline: 'AI-Powered Career Platform',
    url: 'careershipai.com',
    stack: ['Next.js 16', 'TypeScript', 'Anthropic API', 'Supabase', 'Vercel'],
    bullets: [
      'Designed, built, and shipped a production SaaS with 6 AI-powered career tools',
      'CV optimization · ATS matching · Mock interviews · Cover letters · LinkedIn rewrites',
      'Integrated Claude Sonnet (premium) and claude-haiku (free tier) with real-time streaming',
      'Freemium model via Lemon Squeezy subscriptions + Google AdSense rewarded ads',
      'Fully bilingual (EN/TR) with next-intl, auth and data via Supabase PostgreSQL',
    ],
  },
  {
    id: 'bug-bounty',
    name: 'Bug Bounty Research',
    tagline: '[CLASSIFIED]',
    url: null,
    stack: ['Burp Suite', 'Nmap', 'Recon', 'HackerOne'],
    bullets: [
      'Active bug bounty hunter on HackerOne',
      'Reported critical vulnerabilities in real production systems',
      'Focus: web vulnerabilities, API security, misconfiguration',
    ],
  },
]

export const skills = {
  security: ['Burp Suite', 'Wireshark', 'Nmap', 'Linux', 'VMs', 'CTF'],
  webdev: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'REST APIs'],
  ai: ['Anthropic Claude API', 'Streaming responses', 'Freemium model design'],
  systems: ['Linux sysadmin', 'VoIP config', 'Routing & Switching', 'VLANs', 'Git'],
}

export const certifications = [
  { name: 'BTK – Hacktrick 2024', detail: 'Cyber Security Fundamentals' },
  { name: 'Siber Vatan CTF', detail: '2nd place in Eskişehir — web vulns, crypto, network analysis' },
]

export const writeups = [
  {
    id: 'google-maps-api-key',
    title: 'Exposed Google Maps API Key',
    severity: 'MEDIUM',
    program: 'Private Program (HackerOne)',
    status: 'Resolved',
    summary: 'Discovered a Google Maps API key hardcoded in client-side JavaScript with no domain restriction. Key was active and usable by third parties, exposing the organization to unexpected billing.',
    impact: 'Unauthorized API usage, potential billing abuse, quota exhaustion.',
    tags: ['recon', 'api-key', 'javascript'],
  },
  {
    id: 's3-bucket-listing',
    title: 'Public S3 Bucket Directory Listing',
    severity: 'HIGH',
    program: 'Private Program (HackerOne)',
    status: 'Resolved',
    summary: 'Found a misconfigured S3 bucket with public listing enabled, exposing internal filenames, backup archives, and configuration files. No authentication required to enumerate contents.',
    impact: 'Information disclosure, potential access to sensitive internal files.',
    tags: ['recon', 'misconfiguration', 'aws', 's3'],
  },
]

export const lsOutput    = `about.txt       experience/     projects/       skills.txt      certs.txt       contact.txt     downloads/      logs/        writeups/`
export const lsOutputAll = `.               ..              .config/\n${`about.txt       experience/     projects/       skills.txt      certs.txt       contact.txt     downloads/      logs/        writeups/`}`

export const helpText = `
Available Commands

  Navigation
    ls [path]          List directories and files
    cat <path>         Read a file
    open <url>         Open URL in a new tab
    clear              Clear terminal
    pwd                Print working directory
    tree               Show directory tree
    cd                 (filesystem is read-only)

  Shell
    echo <text>        Print text
    date               Show current date/time
    uptime             Show session uptime
    history            Show command history
    ping <host>        Ping a host
    man <command>      Show command manual

  Portfolio
    whoami             Guided CV walkthrough
    ask <question>     Ask about my background
    neofetch           System info + ASCII logo

  Examples
    ls
    ls projects/
    cat about.txt
    cat skills.txt
    cat experience/README.md
    cat projects/careershipai/README.md
    ask about projects
    man ls
`
