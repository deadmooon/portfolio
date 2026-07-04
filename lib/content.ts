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
    id: 'vuln-scanner',
    name: 'AI Vulnerability Scanner',
    tagline: 'Thesis — Fine-tuned LLM for Security Analysis',
    url: null,
    stack: ['WhiteRabbitNeo-13B', 'LoRA / PEFT', '4-bit NF4', 'FastAPI', 'Next.js'],
    bullets: [
      'Fine-tuned WhiteRabbitNeo-13B on cybersecurity datasets using LoRA and 4-bit quantization',
      'Model analyzes source code and returns structured findings: CVE/CWE, CVSS score, vulnerable snippet, and patched code',
      'Supports Python, JS, TS, PHP, Java, Go, Rust, Swift, C++ and more',
      'FastAPI backend served from Colab GPU via ngrok; Next.js frontend with severity dashboard',
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

// ─── Turkish content ───────────────────────────────────────────

export const profileTr = {
  ...profile,
  role: 'Bilgisayar Mühendisi · Güvenlik Araştırmacısı · Geliştirici',
  university: 'Eskişehir Teknik Üniversitesi',
  degree: 'Bilgisayar Mühendisliği',
}

export const experienceTr = [
  {
    id: 'bilisim',
    company: 'Bilişim Siber Güvenlik ve Yapay Zeka Ltd',
    role: 'Siber Güvenlik Stajyeri',
    period: 'Tem 2025 – Ağu 2025',
    location: 'Uzaktan',
    bullets: [
      'Web uygulamalarında güvenlik açığı taraması ve güvenlik testleri gerçekleştirdim',
      'Anormallikleri ve potansiyel tehditleri tespit etmek için ağ kayıtlarını izledim',
      'Yapay zeka odaklı siber güvenlik projesi araştırma ve dokümantasyonuna katkı sağladım',
    ],
  },
  {
    id: 'estu-it',
    company: 'Eskişehir Teknik Üniversitesi — Bilgi İşlem Daire Başkanlığı',
    role: 'Ağ ve Siber Güvenlik Asistanı',
    period: 'Eki 2025 – Haz 2026',
    location: 'Eskişehir (Hibrit)',
    bullets: [
      'Yerel VoIP sistemi kurdum — sunucuları, switchleri ve IP telefonları uçtan uca yapılandırdım',
      'Ağ altyapısını yönettim: routing, switching, VLAN atamaları',
      'Analiz araçlarıyla ağ trafiğini izledim ve güvenlik açıklarını raporladım',
    ],
  },
]

export const projectsTr = [
  {
    id: 'careershipai',
    name: 'CareerShipAI',
    tagline: 'Yapay Zeka Destekli Kariyer Platformu',
    url: 'careershipai.com',
    stack: ['Next.js 16', 'TypeScript', 'Anthropic API', 'Supabase', 'Vercel'],
    bullets: [
      '6 yapay zeka destekli kariyer aracıyla üretim SaaS tasarlayıp geliştirdim ve yayınladım',
      'CV optimizasyonu · ATS eşleştirme · Sahte mülakatlar · Kapak mektupları · LinkedIn düzenlemeleri',
      'Gerçek zamanlı streaming ile Claude Sonnet (premium) ve claude-haiku (ücretsiz) entegre ettim',
      'Lemon Squeezy abonelikleri + Google AdSense ödüllü reklamlarla freemium model',
      'next-intl ile tam iki dilli (EN/TR), Supabase PostgreSQL üzerinde auth ve veri',
    ],
  },
  {
    id: 'vuln-scanner',
    name: 'Yapay Zeka Güvenlik Açığı Tarayıcı',
    tagline: 'Tez — Güvenlik Analizi için Fine-tuned LLM',
    url: null,
    stack: ['WhiteRabbitNeo-13B', 'LoRA / PEFT', '4-bit NF4', 'FastAPI', 'Next.js'],
    bullets: [
      "WhiteRabbitNeo-13B'yi LoRA ve 4-bit quantization ile siber güvenlik veri setleri üzerinde fine-tune ettim",
      'Model kaynak kodu analiz edip yapılandırılmış bulgular döndürüyor: CVE/CWE, CVSS skoru, zafiyetli kod ve düzeltilmiş versiyon',
      'Python, JS, TS, PHP, Java, Go, Rust, Swift, C++ ve daha fazlasını destekliyor',
      'FastAPI backend Colab GPU üzerinde ngrok ile yayınlanıyor; Next.js frontend ile severity dashboard',
    ],
  },
  {
    id: 'bug-bounty',
    name: 'Bug Bounty Araştırması',
    tagline: '[GİZLİ]',
    url: null,
    stack: ['Burp Suite', 'Nmap', 'Recon', 'HackerOne'],
    bullets: [
      "HackerOne'da aktif bug bounty avcısı",
      'Gerçek üretim sistemlerinde kritik güvenlik açıkları raporladım',
      'Odak: web güvenlik açıkları, API güvenliği, yanlış yapılandırma',
    ],
  },
]

export const skillsTr = {
  güvenlik:       skills.security,
  'web geliştirme': skills.webdev,
  'yapay zeka':   skills.ai,
  sistemler:      skills.systems,
}

export const certificationsTr = [
  { name: 'BTK – Hacktrick 2024', detail: 'Siber Güvenlik Temelleri' },
  { name: 'Siber Vatan CTF', detail: 'Eskişehir 2.si — web açıkları, kriptografi, ağ analizi' },
]

export const helpTextTr = `
Kullanılabilir Komutlar

  Gezinme
    ls [yol]           Dizin ve dosyaları listele
    cat <yol>          Dosya içeriğini oku
    open <url>         URL'yi yeni sekmede aç
    clear              Terminali temizle
    pwd                Çalışma dizinini göster
    tree               Dizin ağacını göster

  Kabuk
    echo <metin>       Metin yazdır
    date               Tarih ve saati göster
    uptime             Oturum süresini göster
    history            Komut geçmişini göster
    ping <host>        Host'a ping at
    man <komut>        Komut kılavuzunu göster

  Portfolyo
    whoami             Rehberli CV turu
    ask <soru>         Arka planım hakkında sor
    neofetch           Sistem bilgisi + ASCII logo

  Örnekler
    ls
    ls projects/
    cat about.txt
    cat skills.txt
    ask projeler hakkında
    lang en            (İngilizce'ye geç)
`

// ─── Filesystem ────────────────────────────────────────────────

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
