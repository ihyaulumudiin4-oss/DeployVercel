import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { 
  Terminal as TerminalIcon, 
  Download, 
  Copy, 
  Play, 
  Loader2, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  FileCode, 
  CheckCircle, 
  RefreshCw, 
  ExternalLink, 
  Sparkles, 
  Info, 
  Layers, 
  ChevronRight, 
  Cpu, 
  Smartphone, 
  Monitor, 
  Undo2, 
  Code2, 
  HelpCircle, 
  CheckCircle2,
  FileJson,
  X,
  FileText
} from "lucide-react";

// Types for Files
interface ProjectFiles {
  html: string;
  vercelJson: string;
  packageJson: string;
  readme: string;
}

// Initial Templates
const SYSTEM_TEMPLATES: Record<string, { title: string; desc: string; files: ProjectFiles }> = {
  portfolio: {
    title: "Eco Bio Portfolio",
    desc: "A clean and green personal profile page with project catalog and interactive web cost estimator.",
    files: {
      html: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SustainDev | Personal Space</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-[#FAFDFB] text-slate-800 min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
    <div class="max-w-xl mx-auto px-6 py-16">
        <!-- Profile Header -->
        <div class="flex items-center space-x-5 mb-10">
            <div class="relative">
                <div class="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-white shadow-md">
                    SD
                </div>
                <span class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-ping"></span>
                <span class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div>
                <h1 class="text-2xl font-bold tracking-tight text-slate-900">SustainDev</h1>
                <p class="text-slate-500 text-sm">Eco-Conscious Web Developer</p>
                <p class="text-xs text-emerald-600 font-medium mt-1">Yogyakarta, ID • Active On Vercel</p>
            </div>
        </div>

        <!-- Bio -->
        <p class="text-slate-600 leading-relaxed text-sm mb-8">
            Halo! Saya merancang dan membangun situs web dengan kode yang minimal, bersih, dan memuat super cepat. Fokus pada performa lingkungan digital yang berkelanjutan dengan optimasi total.
        </p>

        <!-- Interactive Calculator Module -->
        <div class="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm mb-8 transition-transform duration-300 hover:shadow-md hover:border-emerald-200">
            <h3 class="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>💡 Estimasi Kecepatan Website</span>
            </h3>
            <p class="text-xs text-slate-400 mb-4">Ukur seberapa efisien website Anda berdasarkan jumlah media yang dikompresi.</p>
            
            <div class="space-y-4">
                <div>
                    <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                        <span>Efisiensi Kompresi Gambar:</span>
                        <span id="compress-pct-label" class="text-emerald-600">80%</span>
                    </div>
                    <input type="range" id="compress-range" min="20" max="100" value="80" class="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer">
                </div>

                <div class="bg-emerald-50/50 rounded-xl p-4 flex justify-between items-center text-center">
                    <div>
                        <div class="text-[10px] uppercase font-bold tracking-wider text-slate-400">Page Size</div>
                        <div id="size-est" class="text-lg font-extrabold text-slate-800">1.2 MB</div>
                    </div>
                    <div class="h-6 w-px bg-slate-200"></div>
                    <div>
                        <div class="text-[10px] uppercase font-bold tracking-wider text-slate-400">Load Time</div>
                        <div id="load-est" class="text-lg font-extrabold text-emerald-600">0.4s</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Project List -->
        <div class="space-y-4 mb-10">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Proyek Unggulan</h3>
            
            <div class="group border border-slate-100 rounded-xl p-4 bg-white hover:border-emerald-100 hover:shadow-sm transition-all duration-300">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">PlantCare Web Platform</h4>
                        <p class="text-slate-500 text-xs mt-1">Analisis kelembaban tanah cerdas berbasis sensor real-time.</p>
                    </div>
                    <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-full">Vercel Edge</span>
                </div>
            </div>

            <div class="group border border-slate-100 rounded-xl p-4 bg-white hover:border-emerald-100 hover:shadow-sm transition-all duration-300">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">ZeroCarbon API</h4>
                        <p class="text-slate-500 text-xs mt-1">Mengukur jejak karbon dari operasi transfer data cloud.</p>
                    </div>
                    <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-full">Static SDK</span>
                </div>
            </div>
        </div>

        <!-- Dynamic Counter Button (User Interaction) -->
        <div class="text-center bg-[#F2FAF6] rounded-xl p-4 mb-10">
            <p class="text-xs text-slate-500 mb-2">Kasih dukungan Anda dengan klik tombol di bawah:</p>
            <button id="clap-btn" class="px-5 py-2 bg-white hover:bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-full text-xs shadow-sm transition-all hover:scale-102 cursor-pointer inline-flex items-center space-x-2">
                <span>👏 Beri Tepuk Tangan</span>
                <span id="clap-count" class="bg-emerald-600 text-white rounded-full px-2 py-0.5 text-[9px]">12</span>
            </button>
        </div>

        <!-- Footer -->
        <div class="pt-8 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
            <p>© 2026 SustainDev. Built for Vercel.</p>
            <div class="flex space-x-4">
                <a href="#" class="hover:text-emerald-600 transition-colors font-medium">GitHub</a>
                <a href="#" class="hover:text-emerald-600 transition-colors font-medium">Twitter</a>
            </div>
        </div>
    </div>

    <!-- Active Scripts -->
    <script>
        // Interactive Logic for Compton Rate
        const slider = document.getElementById('compress-range');
        const pctLabel = document.getElementById('compress-pct-label');
        const sizeEst = document.getElementById('size-est');
        const loadEst = document.getElementById('load-est');

        if (slider && pctLabel && sizeEst && loadEst) {
            slider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value);
                pctLabel.textContent = val + '%';
                
                // Estimate size (100% comp = smallest size)
                const baseSize = 4.8; // max file size in MB
                const calcSize = (baseSize * (1 - (val / 120))).toFixed(1);
                sizeEst.textContent = calcSize + ' MB';
                
                // Estimate load time (approx 1s per 3MB)
                const calcTime = Math.max(0.1, (calcSize / 3)).toFixed(1);
                loadEst.textContent = calcTime + 's';
            });
        }

        // Support Like Counter Claps
        const clapBtn = document.getElementById('clap-btn');
        const clapCount = document.getElementById('clap-count');
        
        if (clapBtn && clapCount) {
            let claps = 12;
            clapBtn.addEventListener('click', () => {
                claps += 1;
                clapCount.textContent = claps;
                
                // Sparkle impact effect
                clapBtn.classList.add('bg-emerald-100', 'scale-105');
                setTimeout(() => {
                    clapBtn.classList.remove('bg-emerald-100', 'scale-105');
                }, 150);
            });
        }
    </script>
</body>
</html>`,
      vercelJson: `{
  "version": 2,
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}`,
      packageJson: `{
  "name": "eco-bio-portfolio",
  "version": "1.0.0",
  "description": "Custom static site designed to be instantly hosted on Vercel.",
  "scripts": {
    "start": "serve ."
  },
  "dependencies": {
    "serve": "^14.2.1"
  }
}`,
      readme: `# 🌿 Eco Bio Portfolio on Vercel

Unduhan arsip kode statis ini siap dideploy langsung di platform **Vercel** Anda!

## Cara Deploy ke Vercel via Git:
1. Hubungkan repository GitHub berisi kode-kode ini.
2. Impor di dashboard Vercel milik Anda.
3. Klik tombol **Deploy** dan website langsung online tanpa perlu build command apa pun!

## Cara Deploy via Vercel CLI:
\`\`\`bash
# Instal vercel secara global jika belum
npm install -g vercel

# Deploy instan dari root folder ini
vercel --prod
\`\`\`
`
    }
  },
  saas: {
    title: "Eco Product Landing",
    desc: "A stunning corporate marketing checkout page for digital greens, fitted with active pricing calculations.",
    files: {
      html: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CarbonSave | Premium SaaS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen">
    <!-- Navigation Navbar -->
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
        <div class="max-w-4xl mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <span class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-base">C</span>
                <span class="font-extrabold text-slate-900 tracking-tight">Carbon<span class="text-emerald-600">Save</span></span>
            </div>
            <nav class="hidden md:flex space-x-6 text-xs font-semibold text-slate-500">
                <a href="#" class="hover:text-emerald-600 transition-colors">Fitur</a>
                <a href="#" class="hover:text-emerald-600 transition-colors">Harga</a>
                <a href="#" class="hover:text-emerald-600 transition-colors">FAQ</a>
            </nav>
            <button class="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors">Unduh App</button>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="max-w-4xl mx-auto px-6 py-16 text-center">
        <span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full tracking-wider">Layanan Terpercaya #1</span>
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight max-w-2xl mx-auto">
            Kurangi Emisi Karbon Kantor Anda Secara Otomatis
        </h1>
        <p class="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Menghitung secara real-time penghematan emisi, mengoptimasi server cloud, dan mengimbangi karbon bisnis Anda hanya dengan satu klik integrasi.
        </p>
    </section>

    <!-- Interactive ROI Estimator -->
    <section class="max-w-3xl mx-auto px-6 pb-20">
        <div class="bg-white border border-slate-200/50 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-5">
            <!-- Parameters Left -->
            <div class="p-8 md:col-span-3 space-y-6">
                <h3 class="text-base font-extrabold text-slate-900">Hitung Efisiensi Biaya Hijau</h3>
                <p class="text-xs text-slate-400">Pilih skala operasi perusahaan Anda untuk melihat dampak instan.</p>
                
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-xs font-semibold mb-1">
                            <span>Banyak Karyawan:</span>
                            <span id="karyawan-count" class="text-emerald-600 font-bold">50 Orang</span>
                        </div>
                        <input type="range" id="param-karyawan" min="10" max="500" value="50" class="w-full accent-emerald-500">
                    </div>

                    <div>
                        <div class="flex justify-between text-xs font-semibold mb-1">
                            <span>Sewa Server Cloud (Bulanan):</span>
                            <span class="text-emerald-600 font-bold">$<span id="server-cost">500</span></span>
                        </div>
                        <input type="range" id="param-server" min="100" max="5000" step="100" value="500" class="w-full accent-emerald-500">
                    </div>
                </div>
            </div>

            <!-- ROI Results Right -->
            <div class="bg-emerald-950 p-8 md:col-span-2 text-white flex flex-col justify-between">
                <div>
                    <span class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block mb-4">ESTIMASI ROI</span>
                    
                    <div class="space-y-6">
                        <div>
                            <span class="text-xs text-emerald-200">Karbon Terselamatkan</span>
                            <div class="text-3xl font-extrabold mt-1 text-emerald-400"><span id="carbon-saved">1,240</span> kg CO₂</div>
                        </div>
                        <div>
                            <span class="text-xs text-emerald-200">Hemat Anggaran Server</span>
                            <div class="text-3xl font-extrabold mt-1 text-white">$<span id="budget-saved">150</span> /bln</div>
                        </div>
                    </div>
                </div>

                <div class="pt-6 border-t border-emerald-800 text-[10px] text-emerald-300">
                    Berdasarkan skema audit sertifikasi lingkungan digital.
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-slate-900 py-12 px-6 text-slate-500 text-xs text-center border-t border-slate-800">
        <p>© 2026 CarbonSave Inc. Deployed securely on Vercel Network Edge.</p>
    </footer>

    <!-- Interactive script -->
    <script>
        const pk = document.getElementById('param-karyawan');
        const ps = document.getElementById('param-server');
        
        const countK = document.getElementById('karyawan-count');
        const costS = document.getElementById('server-cost');
        
        const resCarbon = document.getElementById('carbon-saved');
        const resBudget = document.getElementById('budget-saved');

        function updateStats() {
            if (!pk || !ps || !countK || !costS || !resCarbon || !resBudget) return;
            const karyawan = parseInt(pk.value);
            const server = parseInt(ps.value);

            countK.textContent = karyawan + ' Orang';
            costS.textContent = server.toLocaleString('en-US');

            // Calculation rules
            const carbon = Math.floor((karyawan * 12) + (server * 0.88));
            const budget = Math.floor(server * 0.3);

            resCarbon.textContent = carbon.toLocaleString('en-US');
            resBudget.textContent = budget.toLocaleString('en-US');
        }

        if (pk && ps) {
            pk.addEventListener('input', updateStats);
            ps.addEventListener('input', updateStats);
        }
    </script>
</body>
</html>`,
      vercelJson: `{
  "version": 2,
  "cleanUrls": true,
  "trailingSlash": false
}`,
      packageJson: `{
  "name": "eco-product-landing",
  "version": "1.0.0",
  "description": "Premium landing page for digital carbon savings with dynamic widgets.",
  "scripts": {
    "start": "serve ."
  },
  "dependencies": {
    "serve": "^14.2.1"
  }
}`,
      readme: `# 🚀 High-Converting Clean Landing Page

Selamat! Berkas proyek pendaratan statis Anda siap diluncurkan di Vercel.

## Fitur Utama:
- Struktur website modern dengan header mengambang
- Panel interaktif menghitung ROI dan emisi karbon secara langsung
- Sangat ringan (Lighthouse score mendekati 100)

## Langkah Mengunggah ke Vercel:
1. Klik tombol **Download ZIP** di dashboard simulator ini.
2. Ekstrak file zip atau unggah langsung ke github Anda.
3. Hubungkan di dashboard vercel untuk mendapatkan alamat URL gratis seperti https://test.vercel.app`
    }
  },
  todo: {
    title: "Minimal Task Kanban",
    desc: "A slick, micro-animated green productivity manager. Fits seamlessly as an utility checklist.",
    files: {
      html: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Flow | Kanban Checklist</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-zinc-50 text-slate-800 min-h-screen py-12 px-6">
    <div class="max-w-md mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8 border-b border-zinc-100 pb-5">
            <div>
                <h1 class="text-xl font-bold tracking-tight text-slate-900">Daily Flow</h1>
                <p class="text-xs text-slate-400">Atur prioritas kerja dengan nuansa rimbun hijau.</p>
            </div>
            <div class="bg-emerald-50 px-3 py-1 rounded-full text-emerald-800 font-bold text-[10px] uppercase">
                Hari Ini
            </div>
        </div>

        <!-- Submit Form -->
        <form id="todo-form" class="flex gap-2 mb-6">
            <input type="text" id="todo-input" placeholder="Tuliskan tugas penting hari ini..." required class="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 transition-colors">
            <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer">Tambah</button>
        </form>

        <!-- List Group -->
        <div class="space-y-3" id="todo-list">
            <!-- Active Demo Card 1 -->
            <div class="flex justify-between items-center bg-white border border-zinc-100 rounded-xl p-4 shadow-sm group">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" onchange="toggleStrike(this)" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500 cursor-pointer">
                    <span class="text-xs text-zinc-700 font-medium">Buat proposal presentasi Vercel</span>
                </div>
                <button onclick="this.parentElement.remove()" class="text-slate-300 hover:text-red-500 text-xs font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">Hapus</button>
            </div>

            <!-- Active Demo Card 2 -->
            <div class="flex justify-between items-center bg-white border border-zinc-100 rounded-xl p-4 shadow-sm group">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" onchange="toggleStrike(this)" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500 cursor-pointer">
                    <span class="text-xs text-zinc-700 font-medium">Tinjau struktur direktori vercel.json</span>
                </div>
                <button onclick="this.parentElement.remove()" class="text-slate-300 hover:text-red-500 text-xs font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">Hapus</button>
            </div>
        </div>
    </div>

    <!-- Logic -->
    <script>
        const form = document.getElementById('todo-form');
        const input = document.getElementById('todo-input');
        const list = document.getElementById('todo-list');

        function toggleStrike(cb) {
            const nextSpan = cb.nextElementSibling;
            if (nextSpan) {
                if (cb.checked) {
                    nextSpan.classList.add('line-through', 'text-zinc-400');
                } else {
                    nextSpan.classList.remove('line-through', 'text-zinc-400');
                }
            }
        }

        if (form && input && list) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const taskText = input.value.trim();
                if (!taskText) return;

                // Create Card element
                const card = document.createElement('div');
                card.className = "flex justify-between items-center bg-white border border-zinc-100 rounded-xl p-4 shadow-sm group animate-fadeIn";
                card.innerHTML = \`
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" onchange="toggleStrike(this)" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500 cursor-pointer">
                        <span class="text-xs text-zinc-700 font-medium">\${taskText}</span>
                    </div>
                    <button onclick="this.parentElement.remove()" class="text-slate-300 hover:text-red-500 text-xs font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">Hapus</button>
                \`;

                list.insertBefore(card, list.firstChild);
                input.value = '';
            });
        }
    </script>
</body>
</html>`,
      vercelJson: `{
  "version": 2,
  "cleanUrls": true
}`,
      packageJson: `{
  "name": "minimal-task-kanban",
  "version": "1.0.0",
  "description": "A lightweight green micro todo manager statics site.",
  "scripts": {
    "start": "serve ."
  },
  "dependencies": {
    "serve": "^14.2.1"
  }
}`,
      readme: `# ✅ Slick Kanban List for Vercel

Kelola harian kerja Anda dengan meluncurkan daftar tugas ini di link kustom Vercel secara cuma-cuma!

## Cara Menjalankan secara Lokal:
\`\`\`bash
# Jalankan web server instan
npx serve .
\`\`\`

## Cara Deploy ke Vercel:
Unggah folder hasil ekstrak zip langsung ke website Vercel di menu "Deploy Static Folder" atau impor repo GitHub.`
    }
  }
};

export default function App() {
  // Config States
  const [webName, setWebName] = useState<string>("test");
  const [suffix, setSuffix] = useState<string>(".vercel.app");
  const [activeTemplate, setActiveTemplate] = useState<string>("portfolio");
  
  // Custom generated files state (defaults to selected template)
  const [projectFiles, setProjectFiles] = useState<ProjectFiles>(SYSTEM_TEMPLATES.portfolio.files);
  const [activeTab, setActiveTab] = useState<keyof ProjectFiles>("html");

  // AI Generation States
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isAIGenerating, setIsAIGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Deployment States
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [showDeployCompleteModal, setShowDeployCompleteModal] = useState<boolean>(false);

  // Sync state if template changes (only if not customized yet)
  useEffect(() => {
    setProjectFiles(SYSTEM_TEMPLATES[activeTemplate].files);
    setDeployedUrl(null); // Clear previous deployment if switching
  }, [activeTemplate]);

  // Edit file handler
  const handleFileChange = (key: keyof ProjectFiles, val: string) => {
    setProjectFiles(prev => ({
      ...prev,
      [key]: val
    }));
    // Reset deploy status since code modified
    setDeployedUrl(null);
  };

  // Generate with AI
  const handleAIGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAIGenerating(true);
    setAiError(null);

    try {
      const response = await fetch("/api/generate-site", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          title: webName,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Gagal menghubungi modul Gemini API");
      }

      const rawData = await response.json();
      
      // Update custom project files with AI generation
      setProjectFiles({
        html: rawData.html || "",
        vercelJson: rawData.vercelJson || "",
        packageJson: rawData.packageJson || "",
        readme: rawData.readme || "",
      });

      setActiveTab("html");
      setDeployedUrl(null); // Reset deploy so user must test new build
      setAiPrompt(""); // Clear input on success
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Terjadi kesalahan sistem ketika memproses kode.");
    } finally {
      setIsAIGenerating(false);
    }
  };

  // Simulate Vercel Deployment Lifecycle
  const triggerSimulationDeploy = () => {
    if (!webName.trim()) return;
    setIsDeploying(true);
    setDeployLogs([]);
    setDeployedUrl(null);

    const fullUrl = `https://${webName.toLowerCase().replace(/[^a-z0-9-]/g, "")}${suffix}`;

    const stages = [
      `🔍 [vercel] Memvalidasi metadata proyek '${webName.toLowerCase()}'...`,
      `📦 [vercel] Membaca konfigurasi deployment vercel.json...`,
      `⚙️ [vercel] Menyusun aset statis (HTML, Javascript, Core CSS)...`,
      `🚀 [vercel] Mengunggah 4 fail bundel ke CDN Vercel Edge...`,
      `🔐 [vercel] Mengalokasikan sertifikat keamanan SSL gratis...`,
      `⚡ [vercel] Deployment sukses! Diarahkan ke jaringan global.`,
      `🔗 [vercel] URL Aktif: ${fullUrl}`
    ];

    let delay = 300;
    stages.forEach((phrase, i) => {
      setTimeout(() => {
        setDeployLogs(prev => [...prev, phrase]);
        if (i === stages.length - 1) {
          setIsDeploying(false);
          setDeployedUrl(fullUrl);
          setShowDeployCompleteModal(true);
        }
      }, delay);
      delay += 850; // Delay transition feel
    });
  };

  // Download ZIP archive handler
  const handleZipDownload = async () => {
    try {
      const zip = new JSZip();
      
      // Standard deployment directory structure
      zip.file("index.html", projectFiles.html);
      zip.file("vercel.json", projectFiles.vercelJson);
      zip.file("package.json", projectFiles.packageJson);
      zip.file("README.md", projectFiles.readme);

      // Generate base64 blob ZIP
      const content = await zip.generateAsync({ type: "blob" });
      const docUrl = URL.createObjectURL(content);

      // Link trigger download
      const tag = document.createElement("a");
      tag.href = docUrl;
      tag.download = `${webName.toLowerCase().trim() || "project"}-vercel-bundle.zip`;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    } catch (err) {
      alert("Gagal merangkai berkas ZIP. Pastikan browser mendukung ekspor data.");
    }
  };

  // Copy Clipboard Helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Berhasil menyalin konten dokumen ke papan klip!");
  };

  // Safe Iframe Source Generator code
  const getIframeSrcDoc = () => {
    // Injecting safety overrides or sandbox tags inside simulation if required
    return projectFiles.html;
  };

  return (
    <div id="app-root" className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans">
      
      {/* Top Navigation - Professional Polish Inspired */}
      <nav className="h-16 border-b border-slate-100 flex items-center justify-between px-6 sm:px-8 bg-white shrink-0 sticky top-0 z-40 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 22h20L12 2z"/>
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">Vercel<span className="text-emerald-500">Deployer</span></span>
              <span className="text-[10px] text-slate-400 font-medium block">Interactive AI Sandbox & Packager</span>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-semibold text-slate-500">
            <span className="text-slate-900 border-b-2 border-emerald-500 h-16 flex items-center px-1">Site Creator</span>
            <span className="text-slate-400 hover:text-slate-600 h-16 flex items-center px-1">Simulated Edge Network</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Normal
          </div>
          <button 
            id="header-download-btn"
            onClick={handleZipDownload}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ekspor ZIP Proyek</span>
            <span className="sm:hidden">ZIP</span>
          </button>
        </div>
      </nav>

      {/* Main Container Layout */}
      <main id="main-content" class="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Controller & Project Configuration (Grid Col 4) */}
        <section id="control-panel" className="lg:col-span-4 space-y-6">
          
          {/* Step 1: Naming & Hosting Configuration */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
            
            <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-extrabold border border-emerald-100">STEP 1</span>
              <span>Nama URL & Domain Vercel</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Prefix Alamat Website:</label>
                <div className="flex rounded-xl border border-slate-205 overflow-hidden shadow-xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all">
                  <span className="bg-slate-50 px-3 py-3 text-xs text-slate-400 font-mono border-r border-slate-200 flex items-center">https://</span>
                  <input 
                    type="text" 
                    id="project-domain-input"
                    value={webName} 
                    onChange={(e) => setWebName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} 
                    placeholder="nama-proyek-anda" 
                    className="flex-1 px-3.5 py-3 text-xs font-bold font-mono text-slate-800 bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Suffix Alamat (Pilihan):</label>
                <div className="grid grid-cols-2 gap-2">
                  {[".vercel.app", ".vercel.com"].map((dom) => (
                    <button
                      key={dom}
                      onClick={() => setSuffix(dom)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer ${
                        suffix === dom 
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm" 
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Path Card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center transition-all group-hover:border-slate-200">
                <div className="overflow-hidden mr-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Simulasi URL Aktif</span>
                  <span className="text-xs font-bold font-mono text-emerald-700 block truncate mt-0.5">
                    {webName || "test"}{suffix}
                  </span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Step 2: Source Code Boilerplate Templates */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/40">
            <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-extrabold border border-emerald-100">STEP 2</span>
              <span>Pilih Template Dasar Instan</span>
            </h2>

            <div className="space-y-3">
              {Object.entries(SYSTEM_TEMPLATES).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTemplate(key);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 group/btn ${
                    activeTemplate === key 
                      ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-905/10" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-emerald-250 hover:bg-[#FAFDFB]"
                  }`}
                >
                  <div className={`h-8.5 w-8.5 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    activeTemplate === key 
                      ? "bg-emerald-500 text-white" 
                      : "bg-slate-50 text-slate-500 group-hover/btn:bg-emerald-50 group-hover/btn:text-emerald-600"
                  }`}>
                    {key === "portfolio" ? <Layers className="w-4 h-4" /> : key === "saas" ? <Sparkles className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className={`text-xs font-extrabold tracking-tight ${activeTemplate === key ? "text-white" : "text-slate-800"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[11px] mt-1 leading-relaxed ${activeTemplate === key ? "text-slate-300" : "text-slate-400"}`}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: AI Website Builder Powered by Gemini */}
          <div className="bg-emerald-950 text-white border border-emerald-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
            
            <h2 className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest mb-2 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Bangun Situs dengan Gemini AI</span>
            </h2>

            <p className="text-[11px] text-emerald-200/90 leading-relaxed mb-4 font-medium">
              Punya konsep kustom? Ketik topik web apa saja (cth: "halaman kalkulator diet sehat", "halaman kafe kopi minimalis modern"), AI akan mengarang struktur HTML lengkap dan logika interaktifnya!
            </p>

            <form onSubmit={handleAIGenerate} className="space-y-3">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Deskripsikan fitur website yang ingin dideploy..."
                rows={3}
                required
                className="w-full bg-emerald-900/40 border border-emerald-800 rounded-xl px-3.5 py-3 text-xs text-emerald-50 placeholder:text-emerald-400/65 focus:outline-none focus:border-emerald-500 resize-none transition-colors"
              />

              {aiError && (
                <div className="p-3 bg-red-950/50 border border-red-900 rounded-xl flex items-start space-x-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-red-100 leading-relaxed">{aiError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isAIGenerating}
                className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:bg-emerald-900 text-emerald-950 font-extrabold py-3 rounded-xl text-xs transition-all shadow-md shadow-emerald-400/10 inline-flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isAIGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Meresapi Ide & Coding...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-3.5 h-3.5" />
                             </>
                )}
              </button>
            </form>
          </div>

        </section>

        {/* Middle + Right Area: Files, Direct Editor & Deploy Sim & Previews (Grid Col 8) */}
        <section id="display-section" className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* Active Worksite Code & Config Files */}
          <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 flex flex-col">
            
            {/* Folder Header-Tabs */}
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200/60 flex flex-wrap justify-between items-center gap-2">
              <div className="flex space-x-1.5 overflow-x-auto">
                {[
                  { key: "html", label: "index.html", icon: FileCode, accent: "text-orange-500" },
                  { key: "vercelJson", label: "vercel.json", icon: FileJson, accent: "text-blue-500" },
                  { key: "packageJson", label: "package.json", icon: FileJson, accent: "text-emerald-500" },
                  { key: "readme", label: "README.md", icon: FileText, accent: "text-slate-500" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as keyof ProjectFiles)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      activeTab === tab.key 
                        ? "bg-white text-slate-900 border border-slate-200 shadow-sm" 
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <tab.icon className={`w-3.5 h-3.5 ${tab.accent}`} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Action utilities */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => copyToClipboard(projectFiles[activeTab])}
                  className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-505 transition-all cursor-pointer hover:text-slate-700 active:scale-95"
                  title="Salin Konten File"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider hidden sm:block">Dapat Diedit</span>
              </div>
            </div>

            {/* Editor Area */}
            <div className="p-5 bg-slate-950 font-mono relative border-b border-slate-800">
              <div className="absolute top-3 right-4 text-[9px] uppercase font-bold text-slate-655 tracking-wider select-none pointer-events-none">Source Code Viewer</div>
              <textarea
                value={projectFiles[activeTab]}
                onChange={(e) => handleFileChange(activeTab, e.target.value)}
                rows={12}
                spellCheck={false}
                className="w-full bg-transparent text-emerald-400 text-[11.5px] font-mono border-0 focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </div>
                       {/* Trigger Deployment Control Bar */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800 shadow-xl shadow-slate-905/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Simulator Deployment Engine</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">Kompatibilitas Global Edge</h3>
              <p className="text-xs text-slate-350 max-w-lg leading-relaxed">
                Pencet "Luncurkan Sekarang" untuk menguji kecocokan vercel spesifikasi pada domain alamat kustom Anda <span className="text-emerald-405 font-mono font-bold">https://{webName || "test"}{suffix}</span>.
              </p>
            </div>
            
            <button
              onClick={triggerSimulationDeploy}
              disabled={isDeploying}
              className="px-6 py-3.5 bg-emerald-505 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2.5 shadow-lg shadow-emerald-500/10 cursor-pointer disabled:cursor-not-allowed transition-all hover:scale-[1.02] shrink-0"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Diarahkan...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-emerald-950" />
                  <span>Luncurkan Sekarang</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal deployment process logger */}
          {deployLogs.length > 0 && (
            <div id="terminal-console" className="bg-[#0b0f0c] rounded-3xl p-6 border border-emerald-950/80 font-mono text-xs shadow-inner">
              <div className="flex justify-between items-center pb-4 border-b border-emerald-950/60 mb-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                <div className="flex items-center space-x-2">
                  <TerminalIcon className="w-4 h-4 text-emerald-500" />
                  <span>Terminal Deployment Log Vercel</span>
                </div>
                <button 
                  onClick={() => setDeployLogs([])}
                  className="text-zinc-500 hover:text-zinc-400 cursor-pointer transition-colors"
                >
                  Clear Console
                </button>
              </div>
              <div className="space-y-2 text-zinc-300">
                {deployLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-2 animate-fadeIn">
                    <span className="text-emerald-600 font-bold shrink-0">➔</span>
                    <span className={log.includes("sukses") || log.includes("URL Hack") || log.includes("URL Aktif") ? "text-emerald-400 font-extrabold" : ""}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sandboxed Live Preview Panel of deployed or generated site */}
          <div className="bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col">
            
            {/* Preview Control bar */}
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-800">Pratinjau Langsung (Sandbox)</span>
                  {deployedUrl ? (
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">Deployed</span>
                  ) : (
                    <span className="bg-orange-50 text-orange-700 border border-orange-100 text-[9px] font-bold px-1.5 py-0.5 rounded">Local</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">Sandbox Iframe merender modul HTML statis & javascript interaktif secara instan.</p>
              </div>

              {/* Simulated Address Bar status */}
              <div className="flex items-center space-x-2 bg-white border border-slate-200 py-2 px-3.5 rounded-xl w-full sm:max-w-xs text-[11px] font-bold font-mono tracking-tight shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate flex-1 text-slate-650">
                  {webName || "test"}{suffix}
                </span>
                {deployedUrl && (
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Ini adalah halaman website simulasi sandbox.\nJika ingin mengonlinekan aslinya pada domain ini kelak, silakan klik tombol "Ekspor ZIP Proyek" di atas lalu impor ZIP tersebut ke akun Vercel Anda yang dihubungkan dengan domain ini!`);
                    }} 
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    title="Buka Info Deploy"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Iframe Rendering Canvas */}
            <div className="bg-slate-100/50 p-4 shrink-0 min-h-[440px] relative">
              <iframe
                id="sandbox-mock-preview-iframe"
                srcDoc={getIframeSrcDoc()}
                title="Vercel Preview Sandbox"
                sandbox="allow-scripts allow-popups-to-escape-sandbox"
                className="w-full min-h-[420px] border border-slate-200/80 bg-white rounded-2xl shadow-sm"
              />
            </div>
          </div>

          {/* Quick Real Vercel Setup Educational Guide */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-6 flex items-center space-x-2">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>Panduan Manual Hubungkan ke Vercel Asli</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50/60 hover:bg-emerald-50/10 rounded-2xl space-y-3.5 border border-slate-200/30 transition-all">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-extrabold flex items-center justify-center border border-emerald-100">1</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">Unduh ZIP Bundel</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Ekspor ZIP template kustom ini dari simulator menggunakan tombol ekspor gratis di pojok kanan atas.</p>
                </div>
              </div>

              <div className="p-5 bg-slate-50/60 hover:bg-emerald-50/10 rounded-2xl space-y-3.5 border border-slate-200/30 transition-all">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-extrabold flex items-center justify-center border border-emerald-100">2</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">Unggah Kode ke GitHub</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Ekstrak berkas ZIP hasil unduhan dan buat repository git baru di akun GitHub Anda berisi berkas-berkas tersebut.</p>
                </div>
              </div>

              <div className="p-5 bg-slate-50/60 hover:bg-emerald-50/10 rounded-2xl space-y-3.5 border border-slate-200/30 transition-all">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-extrabold flex items-center justify-center border border-emerald-100">3</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">Deploy di vercel.com</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Buka Vercel Dashboard, hubungkan ke repo Anda, setel nama proyek kustom "{webName || "test"}", lalu klik Deploy!</p>
                </div>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Deploy Success Elegant Modal Popup */}
      {showDeployCompleteModal && (
        <div id="deploy-modal-overlay" className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md w-full text-center relative shadow-2xl animate-scaleUp">
            
            <button 
              onClick={() => setShowDeployCompleteModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:bg-slate-105 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-955">Website Berhasil Dideploy!</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Website siap saji Anda kini disimulasikan aktif pada sistem hosting edge jaringan Vercel global:
            </p>

            {/* Simulated live domain url highlight bar */}
            <div className="my-5 bg-slate-900 text-white rounded-xl p-3.5 border border-slate-800 text-xs font-mono font-bold flex justify-between items-center shadow-md">
              <span className="truncate flex-1 text-left text-emerald-400 mr-2">
                {deployedUrl}
              </span>
              <button
                onClick={() => {
                  if (deployedUrl) copyToClipboard(deployedUrl);
                }}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-705 text-white rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 border border-slate-700 cursor-pointer active:scale-95"
              >
                <Copy className="w-3 h-3" />
                <span>Salin</span>
              </button>
            </div>

            <p className="text-[10.5px] text-zinc-400 leading-relaxed mb-6">
              *Ingat ini merupakan lingkungan simulator. Untuk mengklaim domain asli secara gratis dari Vercel asli, gunakan ZIP yang dihasilkan oleh VercelDeployer!
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleZipDownload}
                className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ZIP Proyek</span>
              </button>
              <button
                onClick={() => setShowDeployCompleteModal(false)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl cursor-pointer transition-colors"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Standard Footer */}
      <footer id="app-footer" className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 VercelDeployer • Didesain minimalis dengan tema hijau ramah lingkungan.</p>
          <div className="flex items-center space-x-1.5 text-slate-500 font-bold">
            <span>Ditenagai oleh</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Gemini 3.5 Flash & Veloce Engine</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
