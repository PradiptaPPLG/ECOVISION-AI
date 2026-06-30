# EcoVision AI 🌍🤖

EcoVision AI adalah aplikasi web berbasis Artificial Intelligence yang dirancang untuk membantu masyarakat memilah sampah dengan benar menggunakan analisis gambar. Aplikasi ini juga memberikan edukasi lingkungan dan rekomendasi daur ulang guna mendorong aksi nyata terhadap pengelolaan sampah.

Proyek ini dikembangkan khusus untuk mengikuti **Ekshibisi Kecerdasan Artifisial (AI) pada LKS Nasional 2026**.

---

## 🚀 Fitur Utama

1. **Modern Landing Page**: UI/UX premium yang bersih, cepat, terinspirasi dari gaya desain Apple dan OpenAI.
2. **AI Waste Scanner**: Antarmuka unggah gambar (drag & drop) untuk menganalisis objek sampah secara langsung.
3. **Gemini 2.0 Flash Integration**: Didukung oleh SDK resmi `@google/genai` untuk klasifikasi gambar secara asinkron.
4. **Fuzzy Label Mapper**: Algoritma pemetaan label dari AI ke Database pengetahuan lokal secara cerdas dan toleran terhadap teks bebas.
5. **Knowledge Engine**: Basis data edukasi lokal lengkap mengenai jenis sampah, cara pembuangan, dan waktu dekomposisi.
6. **Responsible AI UI**: Menampilkan skor tingkat kepercayaan (*confidence score*) serta anjuran verifikasi jika tingkat kepercayaan rendah.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **AI SDK**: `@google/genai` (Gemini 2.0 Flash)
- **State Persistence**: `sessionStorage` (untuk pratinjau gambar antar rute secara aman)

---

## 📋 Prasyarat Penginstalan

Sebelum menjalankan proyek ini, pastikan komputer Anda sudah terpasang:
1. **Node.js** (Rekomendasi Versi 18 atau lebih baru). Unduh di [nodejs.org](https://nodejs.org/).
2. **NPM** (Biasanya otomatis terpasang bersama Node.js).
3. **Google Gemini API Key**:
   - Buka [Google AI Studio](https://aistudio.google.com/).
   - Buat API Key baru. Simpan kodenya (API key biasanya diawali dengan format `AIzaSy...` atau `AQ...` tergantung dari jenis proyek).

---

## 💻 Langkah Setup & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan EcoVision AI di komputer lokal teman-teman:

### 1. Unduh dan Masuk ke Direktori
Buka terminal/command prompt, klon repositori ini, lalu masuk ke foldernya:
```bash
cd ecovision-ai
```

### 2. Pasang Dependensi
Jalankan perintah berikut untuk menginstal semua library yang dibutuhkan (termasuk Next.js, React, dan SDK Gemini):
```bash
npm install
```

### 3. Konfigurasi Environment Variables (PENTING)
Salin file template `.env.example` menjadi `.env.local`:
- **Di Windows (PowerShell)**:
  ```powershell
  Copy-Item .env.example .env.local
  ```
- **Di Windows (CMD)**:
  ```cmd
  copy .env.example .env.local
  ```
- **Di Linux / macOS**:
  ```bash
  cp .env.example .env.local
  ```

Buka file `.env.local` yang baru dibuat dengan teks editor (seperti VS Code), lalu konfigurasikan isinya:
```env
# Masukkan API Key Gemini yang Anda salin dari Google AI Studio di sini
GEMINI_API_KEY=TULIS_API_KEY_ANDA_DI_SINI

# Pilih provider AI: 
# - Gunakan 'gemini' untuk koneksi AI asli (membutuhkan API Key valid)
# - Gunakan 'mock' untuk simulasi lokal (tidak membutuhkan API key/internet, aman untuk demo offline)
NEXT_PUBLIC_AI_PROVIDER=gemini
```

### 4. Jalankan Aplikasi di Mode Development
Jalankan server lokal dengan perintah:
```bash
npm run dev
```

Buka browser Anda dan akses:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Struktur Folder Utama

- `docs/`: Dokumentasi arsitektur, visi-misi, panduan AI, dan roadmap proyek.
- `src/app/`: Rute halaman Next.js App Router (Landing Page, `/scan`, `/result`, dan API `/api/analyze`).
- `src/components/`: Komponen UI modular (Navbar, Hero, Features, Footer, UploadZone, ResultCard, dll).
- `src/data/`: `wasteKnowledge.ts` yang berisi basis data edukasi lokal untuk semua jenis sampah.
- `src/services//ai/`: Lapisan layanan AI dengan *Factory Pattern* (`AIService`, `MockProvider`, `GeminiProvider`, `ProviderManager`).
- `src/lib/`: Fungsi pembantu untuk normalisasi label (`labelMapper.ts`) dan pemanggilan database lokal (`knowledge.ts`).
- `src/types/`: Definisi tipe data TypeScript (`waste.ts`, `ai.ts`).

---

## 💡 Tips Pengujian (Diagnostic Test)

Jika Anda mengalami masalah koneksi API Key saat integrasi Gemini (seperti error 403 / PERMISSION_DENIED), jalankan script diagnostik terisolasi yang sudah disediakan di root folder:
```bash
node test-gemini.mjs
```
Script ini akan langsung membaca `.env.local` Anda dan memberikan laporan masalah koneksi secara rinci ke layar terminal.
