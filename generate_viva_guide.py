import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
from playwright.sync_api import sync_playwright

def create_viva_docx():
    doc = docx.Document()
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)
        
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("SRMIST • IoT Application Laboratory | Presentation & Viva Voce Guide")
        hrun.font.name = "Arial"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(148, 163, 184)
        
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Smart Home Monitoring System: Viva Voce Defense Kit  |  Page ")
        frun.font.name = "Arial"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(148, 163, 184)
        f_p = fp._element
        f_run = parse_xml(r'<w:r %s><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="17"/><w:color w:val="94A3B8"/></w:rPr><w:fldSimple w:instr="PAGE"/></w:r>' % nsdecls('w'))
        f_p.append(f_run)

    C_NAVY = RGBColor(30, 58, 138)
    C_BLUE = RGBColor(37, 99, 235)
    C_SLATE = RGBColor(71, 85, 105)
    C_DARK = RGBColor(15, 23, 42)

    def set_cell_background(cell, fill_hex):
        tcPr = cell._element.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        tcPr.append(shd)

    def set_cell_margins(cell, top=60, bottom=60, left=90, right=90):
        tcPr = cell._element.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    # Title
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(10)
    p_inst.paragraph_format.space_after = Pt(2)
    r_inst = p_inst.add_run("SRM INSTITUTE OF SCIENCE AND TECHNOLOGY")
    r_inst.bold = True
    r_inst.font.name = "Arial"
    r_inst.font.size = Pt(15)
    r_inst.font.color.rgb = C_NAVY

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(4)
    r_t = p_title.add_run("PRESENTATION & VIVA VOCE DEFENSE GUIDE")
    r_t.bold = True
    r_t.font.name = "Arial"
    r_t.font.size = Pt(18)
    r_t.font.color.rgb = C_NAVY

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(16)
    r_s = p_sub.add_run("Smart Home Monitoring System (IoT & CCTV Feed Analysis)\nCandidates: Venkata Rao Dechiraju & Sivanesan | 15-Minute Two-Student Examination Strategy")
    r_s.font.name = "Arial"
    r_s.font.size = Pt(10)
    r_s.font.color.rgb = C_SLATE

    # Section 1: Presentation Schedule
    p_h1 = doc.add_paragraph()
    p_h1.paragraph_format.space_before = Pt(10)
    p_h1.paragraph_format.space_after = Pt(4)
    r_h1 = p_h1.add_run("1. Synchronized 15-Minute Two-Student Presentation Strategy")
    r_h1.bold = True
    r_h1.font.name = "Arial"
    r_h1.font.size = Pt(13)
    r_h1.font.color.rgb = C_NAVY

    # Schedule Table
    tbl_s = doc.add_table(rows=6, cols=4)
    tbl_s.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_s.autofit = False
    tbl_s.columns[0].width = Inches(1.1)
    tbl_s.columns[1].width = Inches(1.4)
    tbl_s.columns[2].width = Inches(1.8)
    tbl_s.columns[3].width = Inches(2.6)

    sched_headers = ["Time Window", "Lead Speaker", "Slides & Topic", "Key Content to Emphasize"]
    for i, h in enumerate(sched_headers):
        c = tbl_s.cell(0, i)
        set_cell_background(c, "1E3A8A")
        set_cell_margins(c, top=70, bottom=70, left=70, right=70)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Arial"
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    sched_data = [
        ("00:00 – 03:30", "Student 1\n(Venkata Rao D.)", "Slides 1 – 5:\nIntroduction & Problem", "Highlight the visual ambiguity of standalone sensors and why CCTV integration is crucial."),
        ("03:30 – 07:00", "Student 2\n(Sivanesan)", "Slides 6 – 10:\nFeatures & Architecture", "Explain the 4-layer architecture, hardware specs (ESP32/Pi), and DHT11/PIR/LDR sensors."),
        ("07:00 – 10:30", "Student 1\n(Venkata Rao D.)", "Slides 11 – 14:\nSoftware & Block Diagram", "Walk through the Next.js/React stack, optical motion pipeline, and system block diagram."),
        ("10:30 – 13:30", "Student 2\n(Sivanesan)", "Slides 15 – 18:\nDemonstration Results", "Explain block diagram components, live telemetry results, and 24/7 CCTV surveillance HUD."),
        ("13:30 – 15:00", "Both Students\n(Joint Defense)", "Slides 19 – 20:\nReferences & Viva Q&A", "Summarize findings, present 12 IEEE references, and address examiner technical questions.")
    ]
    for idx, row in enumerate(sched_data, start=1):
        for col_idx, val in enumerate(row):
            c = tbl_s.cell(idx, col_idx)
            set_cell_background(c, "F8FAFC" if idx % 2 == 0 else "FFFFFF")
            set_cell_margins(c, top=45, bottom=45, left=70, right=70)
            p = c.paragraphs[0]
            r = p.add_run(val)
            r.font.name = "Arial"
            r.font.size = Pt(8)
            r.font.color.rgb = C_DARK
            if col_idx == 0:
                r.bold = True
                r.font.color.rgb = C_NAVY

    # Section 2: Viva Q&A
    p_h2 = doc.add_paragraph()
    p_h2.paragraph_format.space_before = Pt(16)
    p_h2.paragraph_format.space_after = Pt(4)
    r_h2 = p_h2.add_run("2. Top 16 Technical Viva Voce Questions & Authoritative Answers")
    r_h2.bold = True
    r_h2.font.name = "Arial"
    r_h2.font.size = Pt(13)
    r_h2.font.color.rgb = C_NAVY

    viva_qa = [
        ("Q1: Why did you choose MQTT over HTTP for sensor telemetry transmission in an IoT environment?",
         "Answer: HTTP is a request-response protocol imposing substantial overhead (200–800 bytes per HTTP header), requiring continuous polling which wastes network bandwidth and edge battery power. In contrast, MQTT operates on an asynchronous Publish/Subscribe model with ultra-lightweight 2-byte packet headers. It maintains a persistent TCP connection with keep-alive pings, enabling edge sensors to publish readings only when new data is acquired. Furthermore, MQTT brokers handle topic filtering and one-to-many multicast distribution effortlessly."),

        ("Q2: What are MQTT Quality of Service (QoS) levels, and which level did your architecture adopt?",
         "Answer: MQTT defines three QoS levels: QoS 0 ('At most once') transmits packets without acknowledgment (best effort); QoS 1 ('At least once') guarantees delivery via PUBACK packet handshakes but permits duplicate delivery upon network timeout; QoS 2 ('Exactly once') guarantees delivery without duplicates via a four-step handshake (PUBLISH, PUBREC, PUBREL, PUBCOMP), which incurs latency. Our architecture adopts QoS 1 for sensor telemetry and alert notifications, ensuring that critical alarms are never lost over transient wireless connections while avoiding the heavy handshake latency of QoS 2."),

        ("Q3: How does your application satisfy the assignment requirement when physical sensors are unavailable?",
         "Answer: The professor's assignment guidelines state: 'You can generate in the software itself the required sensor data if you don’t have the hardware.' To satisfy this with high academic rigor, we engineered a mathematical diurnal simulation engine in src/lib/mock-data.ts. The engine models solar heating curves using sinusoidal equations (peaking at 15:00), inverse relative humidity shifts, solar lux illumination profiles, and Gaussian perturbation. When physical hardware is connected, the same REST API and MQTT ingestion pipelines process actual ADC and GPIO signals without requiring any frontend code changes."),

        ("Q4: How is optical CCTV feed analysis integrated with physical IoT sensor telemetry?",
         "Answer: The system integrates optical CCTV and IoT sensors through an event-driven correlation pipeline. When an environmental sensor (such as an HC-SR501 PIR motion sensor or MQ-2 gas transducer) triggers an anomaly threshold, an event is dispatched to the central hub. The hub correlates the sensor's physical room location (e.g., 'backyard') and directs the web dashboard to highlight the corresponding CCTV feed, triggering optical motion analysis and alerting the user with both quantitative telemetry and visual verification simultaneously."),

        ("Q5: What algorithm is employed for motion detection in the CCTV video processing pipeline?",
         "Answer: The video processing pipeline uses optical frame differencing combined with background subtraction (MOG2 Gaussian Mixture Models). Consecutive frames are captured at 30 FPS, converted to grayscale, downsampled to 640x360 pixels, and smoothed using a 5x5 Gaussian blur kernel to remove sensor noise. The absolute difference matrix ΔI = |I(t) - I(t-1)| is computed and binarized via Otsu's adaptive thresholding. Morphological dilation fills small gaps, and contours exceeding a threshold area of 500 pixels trigger motion bounding boxes and alert flags."),

        ("Q6: What are the primary hardware trade-offs between ESP32 and Raspberry Pi 4 in edge IoT deployments?",
         "Answer: The ESP32 is a low-cost ($4–$6), ultra-low-power microcontroller (drawing ~15–150 mA) featuring instant boot times, real-time deterministic FreeRTOS execution, and integrated Wi-Fi/Bluetooth, making it ideal for battery-operated sensor nodes. However, it lacks sufficient RAM and compute power for high-definition video processing. Conversely, the Raspberry Pi 4 is a single-board computer ($45–$75) with a quad-core 1.5 GHz ARM CPU, up to 8 GB RAM, and a full Linux OS, capable of running OpenCV and YOLO object detection models, but draws significant power (5–15W) and requires cooling."),

        ("Q7: How does Next.js 14 App Router benefit an IoT web server application?",
         "Answer: Next.js 14 App Router provides several advantages: (1) It unifies frontend UI components and backend serverless REST API route handlers within a single project, eliminating separate server maintenance; (2) React Server Components (RSC) enable server-side pre-rendering of initial sensor telemetry, minimizing client bundle sizes and accelerating initial page load; (3) Built-in edge runtime optimizations route API requests to globally distributed edge nodes near the client, reducing roundtrip latency below 50ms."),

        ("Q8: How does the system handle security, device authentication, and video stream privacy?",
         "Answer: IoT security is implemented across multiple layers: (1) Transport Security: All MQTT and HTTP transmissions are encrypted using TLS 1.3 / HTTPS, preventing man-in-the-middle eavesdropping; (2) Authentication: Sensor nodes authenticate with the MQTT broker using unique device credentials and client certificates; (3) Web Server Protection: API route handlers validate incoming JSON schemas and sanitize actuator commands; (4) Video Privacy: Live CCTV streams are routed through secure tokens and obfuscated URL proxies rather than exposing open camera IP addresses."),

        ("Q9: What role does Edge Computing play in this architecture versus Cloud Computing?",
         "Answer: The architecture implements a hybrid edge-cloud paradigm. Edge nodes (ESP32/Pi) execute high-frequency sensor signal sampling, ADC calibration, analog filtering, and local motion frame differencing locally. Only processed telemetry packets and detected anomaly alerts are published to the cloud web server. This edge intelligence drastically conserves wide-area network bandwidth, guarantees real-time local actuator responses (< 5ms) even if internet connectivity drops, and protects user privacy."),

        ("Q10: How do you mitigate false positives in PIR motion sensors and CCTV motion detection?",
         "Answer: PIR sensors are susceptible to false alarms from sudden sunlight changes or air conditioning drafts, while optical motion detection can trigger on wind-blown curtains or shadows. Our system mitigates false positives through cross-modal sensor fusion: a high-priority intruder alarm is only escalated if both the physical PIR sensor AND optical frame differencing detect motion simultaneously within a 2-second time window in the same zone."),

        ("Q11: How would you scale this architecture to support thousands of smart homes?",
         "Answer: Scaling involves three architectural enhancements: (1) Distributed MQTT Clustering: Deploy an enterprise EMQX or HiveMQ cluster behind a Layer-4 load balancer (HAProxy), supporting millions of concurrent persistent connections; (2) Time-Series Database: Replace in-memory state with an optimized time-series database (TimescaleDB or InfluxDB) with data retention and compression policies; (3) Serverless Edge Caching: Utilize Vercel/Cloudflare edge workers to cache read-heavy telemetry dashboards near end-users."),

        ("Q12: How does the bidirectional actuator feedback loop prevent state divergence?",
         "Answer: In IoT actuation (e.g., toggling a light relay or unlocking a door), sending a command does not guarantee physical execution if the device is offline. Our system implements optimistic UI updates paired with closed-loop acknowledgment: when the user toggles a switch, the UI indicates a pending state; the edge actuator executes the physical relay toggle and publishes a confirmed state packet back via /api/controls. If no acknowledgment arrives within 3 seconds, the UI rolls back and notifies the user."),

        ("Q13: Explain the role of ADC and calibration in physical DHT11 and LDR sensors.",
         "Answer: The LDR produces an analog voltage that varies with ambient light resistance. The microcontroller's Analog-to-Digital Converter (ADC), such as the ESP32's 12-bit SAR ADC, converts this voltage into a discrete digital value (0 to 4095). Calibration curves map the digital reading to physical lux units (E = (V_in - V_out) / R_fixed). For DHT11, a dedicated single-wire digital protocol transfers 40-bit data packets comprising integer and decimal bytes for relative humidity and temperature, validated using a checksum byte."),

        ("Q14: What database would you choose for production historical logging and why?",
         "Answer: For production smart home logging, InfluxDB or TimescaleDB (PostgreSQL time-series extension) is ideal. Traditional relational databases (MySQL) degrade significantly under high-frequency time-stamped inserts. Time-series databases utilize Log-Structured Merge (LSM) trees, automatic chunk-based partitioning by timestamp, continuous aggregations (calculating 1-minute, 1-hour rollups), and delta-of-delta compression, reducing disk storage footprint by over 90%."),

        ("Q15: How does the system ensure fault tolerance if a sensor node disconnects?",
         "Answer: The MQTT broker implements Last Will and Testament (LWT) messages. When an edge sensor node connects, it registers an LWT message on topic home/{room_id}/status with payload 'offline'. If the node crashes or loses power, the broker detects the missing keepalive ping and automatically broadcasts the LWT message. The web dashboard immediately flags the node as disconnected, updates the health badge to amber/red, and logs a warning alert."),

        ("Q16: How is the Next.js server configured for deployment on Vercel?",
         "Answer: The project includes a dedicated vercel.json configuration defining framework presets and edge routing. Because Next.js is developed by Vercel, the App Router route handlers (/api/*) are automatically compiled into serverless and edge functions distributed across global points of presence (PoPs), delivering low-latency response times without manual container or Kubernetes configuration.")
    ]

    for q, a in viva_qa:
        p_q = doc.add_paragraph()
        p_q.paragraph_format.space_before = Pt(6)
        p_q.paragraph_format.space_after = Pt(2)
        r_q = p_q.add_run(q)
        r_q.bold = True
        r_q.font.name = "Arial"
        r_q.font.size = Pt(10)
        r_q.font.color.rgb = C_NAVY

        p_a = doc.add_paragraph()
        p_a.paragraph_format.space_after = Pt(6)
        p_a.paragraph_format.line_spacing = 1.15
        r_a = p_a.add_run(a)
        r_a.font.name = "Arial"
        r_a.font.size = Pt(9.5)
        r_a.font.color.rgb = C_DARK

    doc.save("Viva_Voce_Preparation_Guide.docx")
    print("Viva_Voce_Preparation_Guide.docx generated successfully!")

if __name__ == "__main__":
    create_viva_docx()
