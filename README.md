# 🏠 Smart Home Monitoring System

A modern, real-time web dashboard for monitoring IoT sensors and simulated CCTV feeds across a smart home environment. Built with Next.js 14 and designed for seamless deployment on Vercel.

---

## ✨ Features

- **Real-Time Sensor Dashboard** — Monitor temperature, humidity, light levels, and motion across multiple rooms.
- **Room-by-Room Overview** — View and control individual rooms with thermostat targets, lighting, and lock status.
- **CCTV Feed Simulation** — Simulated live camera feeds with motion detection indicators and status monitoring.
- **Alert Management** — Prioritized alerts for motion, temperature anomalies, smoke detection, and intrusion events.
- **Historical Data Charts** — Interactive charts powered by Recharts displaying sensor trends over time.
- **Dark & Light Mode Support** — Sleek true-black interface optimized for high contrast, low power draw, and reduced eye fatigue, with seamless theme toggling.
- **Responsive Design** — Fully responsive layout that works across desktop, tablet, and mobile devices.

---

## 🛠 Tech Stack

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| **Next.js 14**   | App Router, SSR, Framework |
| **React 18**     | UI Components              |
| **TypeScript**   | Type Safety                |
| **Tailwind CSS** | Utility-First Styling      |
| **Recharts**     | Data Visualization         |
| **Lucide React** | Icon Library               |
| **date-fns**     | Date Formatting            |
| **MQTT.js**      | IoT Protocol Support       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-home-monitoring.git
cd smart-home-monitoring

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com):

1. **Push** your code to a GitHub repository.
2. **Connect** the repository to your Vercel account at [vercel.com/new](https://vercel.com/new).
3. Vercel will automatically detect the Next.js framework and configure the build settings.
4. **Deploy** — your dashboard will be live in seconds.

> The included `vercel.json` ensures the framework is correctly identified.

---

## 📁 Project Structure

```
.
├── IoT_Application_Project_Report.pdf                # Primary Formal Academic Report (PDF)
├── IoT_Application_Project_Report.docx               # Primary Formal Academic Report (DOCX)
├── IoT_Application_Project_Report_v1_Rubric_and_Viva.pdf   # Version 1: Rubric & Viva Embedded (PDF)
├── IoT_Application_Project_Report_v1_Rubric_and_Viva.docx  # Version 1: Rubric & Viva Embedded (DOCX)
├── IoT_Application_Project_Report_v2_Formal_Academic.pdf  # Version 2: Formal Academic Thesis (PDF)
├── IoT_Application_Project_Report_v2_Formal_Academic.docx # Version 2: Formal Academic Thesis (DOCX)
├── Viva_Voce_Preparation_Guide.pdf                  # Standalone Viva Voce Defense Guide (PDF)
├── Viva_Voce_Preparation_Guide.docx                 # Standalone Viva Voce Defense Guide (DOCX)
├── diagrams/                                        # High-resolution architectural vector/PNG diagrams
│   ├── system_block_diagram.png
│   ├── four_layer_architecture.png
│   └── cctv_motion_pipeline.png
├── screenshots/                                     # Live dashboard proofs and CCTV feed captures
├── slides/                                          # 20 Presentation slides for project defense
├── src/
│   ├── app/                                         # Next.js App Router pages and API routes
│   ├── components/                                  # Modular UI, CCTV HUD, and sensor components
│   └── lib/                                         # Mock data engines and WebSocket/MQTT handlers
├── generate_report_docx.py                          # Automated Python DOCX generator (Academic v2)
├── generate_report_pdf.py                           # Automated Playwright PDF generator (Academic v2)
├── generate_report_v1_docx.py                       # Automated Python DOCX generator (Rubric v1)
├── generate_report_v1_pdf.py                        # Automated Playwright PDF generator (Rubric v1)
├── generate_viva_guide.py                           # Automated DOCX generator for Viva Guide
└── generate_viva_pdf.py                             # Automated Playwright PDF generator for Viva Guide
```

---

## 📚 Project Reports & Defense Material

Both versions of the project report are included to cater to distinct evaluation and archiving requirements:

| Document | Format | Description |
| :--- | :--- | :--- |
| **Academic Project Report (v2 - Formal)** | [PDF](IoT_Application_Project_Report_v2_Formal_Academic.pdf) \| [DOCX](IoT_Application_Project_Report_v2_Formal_Academic.docx) | Formal academic thesis format: Declaration, Certificate, Abstract, Chapters 1 to 6 (Introduction, Literature Review, System Architecture, Implementation, Results, Conclusion), IEEE References, and Appendix. Clean and publication-ready. |
| **Academic Project Report (v1 - Rubric Edition)** | [PDF](IoT_Application_Project_Report_v1_Rubric_and_Viva.pdf) \| [DOCX](IoT_Application_Project_Report_v1_Rubric_and_Viva.docx) | Direct mapping to evaluation rubrics: Application Explanation (10M), Architecture (05M), Code (10M), Results (05M), and Viva Guide (20M). |
| **Viva Voce Defense Guide** | [PDF](Viva_Voce_Preparation_Guide.pdf) \| [DOCX](Viva_Voce_Preparation_Guide.docx) | Comprehensive oral defense preparation covering top 16 technical examiner questions with authoritative architectural answers. |
| **Presentation Slide Deck** | [20 PNG Slides](slides/) | 20 high-fidelity visual slides covering project motivation, architecture, software stack, CCTV pipelines, live HUDs, and performance benchmarks. |

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 🙏 Credits

- **Venkata Rao Dechiraju** — Development & Design
- **Sivanesan** — Guidance & Mentorship
- **SRMIST** — Institution

---

Built with ❤️ using Next.js and Tailwind CSS.
