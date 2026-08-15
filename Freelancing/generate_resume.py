#!/usr/bin/env python3
"""Generate ATS-optimized resume PDF for Fahad Ibrahim.
Positioning: Native Bengali AI Trainer + Full-Stack Developer.
"""
from fpdf import FPDF

class Resume(FPDF):
    def header(self):
        pass
    def footer(self):
        self.set_y(-12)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(150,150,150)
        self.cell(0, 8, "Fahad Ibrahim - Native Bengali AI Trainer / Full-Stack Developer", 0, 0, 'C')

pdf = Resume()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_margins(15, 15, 15)

# Name
pdf.set_font('Helvetica', 'B', 20)
pdf.set_text_color(20,20,20)
pdf.cell(0, 10, "Fahad Ibrahim", 0, 1, 'L')

# Contact
pdf.set_font('Helvetica', '', 9)
pdf.set_text_color(90,90,90)
pdf.cell(0, 5, "Email: hopetheorybd@gmail.com  |  Dhaka, Bangladesh (UTC+6)  |  GitHub: github.com/FahadIbrahim93", 0, 1, 'L')
pdf.cell(0, 5, "LinkedIn: linkedin.com/in/hopetheory-  |  X: @hopetheory__", 0, 1, 'L')
pdf.ln(2)

def section(title):
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(37, 99, 235)
    pdf.cell(0, 7, title, 0, 1, 'L')
    pdf.set_draw_color(220,220,220)
    pdf.line(15, pdf.get_y(), 195, pdf.get_y())
    pdf.ln(2)

def body(text, size=10):
    pdf.set_font('Helvetica', '', size)
    pdf.set_text_color(40,40,40)
    pdf.multi_cell(0, 5, text)
    pdf.ln(1)

def bullet(text, size=10):
    pdf.set_font('Helvetica', '', size)
    pdf.set_text_color(40,40,40)
    pdf.set_x(20)
    pdf.multi_cell(0, 5, "- " + text)

# Summary
section("Professional Summary")
body("Native Bengali speaker and full-stack developer helping build better AI for the global South. "
      "I bring native-level Bengali cultural context to AI training, voice, and annotation work, backed by "
      "real software engineering credentials (React, TypeScript, Supabase). Available 20-30 hrs/week for remote "
      "AI training, voice recording, and annotation contracts. BSc in Computer Science, builds AI agent systems professionally.")

# Skills
section("Core Skills")
body("Bengali (Native)  |  English (Fluent)  |  AI Training & Annotation  |  Voice Recording  |  "
      "React 19 / TypeScript / Supabase / Node.js  |  Technical Writing  |  Remote Collaboration (async)")
body("AI Tools: Hermes Agent (multi-agent orchestration), Gemini, OpenRouter, Groq APIs. "
      "Daily user of LLM workflows for content and data generation.")

# Projects
section("Proof of Work (Deployed)")
bullet("BugSmasher - Full-stack arcade game (React 19 + TypeScript + Supabase) with auth, XP progression, "
        "real-time global leaderboards. Shipped in 2 weeks. Source: github.com/FahadIbrahim93/BugSmasher-HopeTheory")
bullet("RollON - Custom e-commerce platform (React + TypeScript + Tailwind) with cart, checkout, admin dashboard. "
        "Live: rollon-delta.vercel.app")
bullet("AI Agent Workflows - Hermes Agent multi-profile system integrating 15+ LLM providers with automatic "
        "failover. Used daily to automate real business operations across ventures.")

# Experience
section("Experience")
pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(20,20,20)
pdf.cell(0, 5, "Founder & AI Training Lead - Hope Theory", 0, 1, 'L')
pdf.set_font('Helvetica', 'I', 9)
pdf.set_text_color(90,90,90)
pdf.cell(0, 5, "2023 - Present | Dhaka, Bangladesh (Remote)", 0, 1, 'L')
bullet("Run Bengali AI training, voice recording, and annotation workflows for emerging-market LLM projects")
bullet("Built Marjahans (e-commerce) and SnapTrap (streetwear) - end-to-end product, brand, and operations")
bullet("Deploy AI-agent automation (Hermes Agent) to run business operations; daily user of Gemini, OpenRouter, Groq")

pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(20,20,20)
pdf.cell(0, 5, "Full-Stack Developer (Self-Employed)", 0, 1, 'L')
pdf.set_font('Helvetica', 'I', 9)
pdf.set_text_color(90,90,90)
pdf.cell(0, 5, "2024 - Present | Remote", 0, 1, 'L')
bullet("Ship production React/TypeScript apps end-to-end: architecture, implementation, testing, deployment (Vercel)")
bullet("Integrated AI coding agents into build loop, cutting dev time ~60%")
bullet("Manage full software delivery independently across multiple concurrent projects")

# Education
section("Education")
pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(20,20,20)
pdf.cell(0, 5, "B.Sc. in Computer Science & Engineering", 0, 1, 'L')
pdf.set_font('Helvetica', '', 9)
pdf.set_text_color(90,90,90)
pdf.cell(0, 5, "Ahsanullah University of Science and Technology, Dhaka | 2012 - 2017", 0, 1, 'L')

# Availability
section("Availability")
body("Open to remote AI trainer, voice, annotation, and localization contracts. 20-30 hrs/week. "
      "Based in Dhaka, Bangladesh (GMT+6), comfortable working across time zones. Immediate start available. "
      "Equipment: Windows 11 workstation, fiber internet, UPS backup, quiet workspace.")

pdf.output("H:/DevJourney/Freelancing/Fahad_Ibrahim_Resume.pdf")
print("Resume PDF generated: H:/DevJourney/Freelancing/Fahad_Ibrahim_Resume.pdf")
