# MiniTools Universe — Omini Agents Specification

> **Sole Source of Truth**  
> This file defines every Omini agent and their responsibilities.  
> • When a **new tool, feature, or workflow** is introduced, **update this file first**.  
> • Every agent consults this file before acting.  
> • A running **Task List** (at the end) tracks work in progress and completion.

---

## Core Specialist Agents

| Agent | Purpose | Key Triggers | Primary Responsibilities |
|-------|---------|--------------|--------------------------|
| **OminiDoc** | Project & user‑facing documentation | New/updated tool; request for docs | Keep README, guides, and keyword tables current; add usage instructions; log setup changes |
| **OminiUI** | UI consistency, accessibility, performance | New HTML page or style tweak | Enforce shared design; refactor HTML/CSS; improve a11y & responsiveness |
| **OminiReq** | Dependency and tooling advice | Need for new lib/tool; recurring code patterns | Recommend libraries/dev‑tools; update `requirements.txt` (or note npm/dev deps) |
| **OminiSEO** | Organic‑search optimisation | New page; content changes; scheduled audit | Craft meta tags & JSON‑LD; update sitemap & internal links; run SEO checks |
| **OminiLogic** | JavaScript logic & algorithm tuning | New tool logic; bug/perf report | Optimise code; expand features; verify correctness & suggest simple tests |

---

## Meta / Management Agents

### **OminiForge**  (Organic Custom Agent Creator)
* **Purpose ** Spawn single‑use, highly‑focused sub‑agents for one‑off or experimental tasks that don’t fit neatly into existing specialists.
* **Workflow**
  1. A developer describes the niche task and desired skills.  
  2. OminiForge generates a **temporary agent spec** (name, purpose, short duties) and appends it under **“Spawned Agents”** below.  
  3. The spawned agent completes its assignment, reports back, then is *archived* (moved to an **“Archive”** subsection) by OminiForge to keep the file tidy.

### **OminiTaskMaster**  (Task‑List Coordinator)
* **Purpose ** Maintain the **Task List** at the end of this file, ensuring everyone knows what is pending and what’s finished.
* **Workflow**
  1. When any agent identifies work, it notifies OminiTaskMaster.  
  2. OminiTaskMaster adds a new markdown checkbox item under the appropriate heading.  
  3. When an agent finishes, it pings OminiTaskMaster, who marks the box as **`[x]`** and (optionally) appends a brief result note in parentheses.  
  4. Closed tasks remain visible for historical context.

---

## Spawned Agents
*(Created dynamically by **OminiForge** – section empty until first spawn.)*

---

## Archive
*(Retired spawned agents are moved here.)*

---

## Task List

### 🔄 Active
- [ ] *example* Create meta descriptions for the new “Base‑64 Encoder” page (assigned → **OminiSEO**).

### ✅ Completed
- [x] Added `<link rel="manifest">` to all pages (OminiUI).

---
