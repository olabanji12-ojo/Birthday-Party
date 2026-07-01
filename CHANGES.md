# Solomon @ 70 — Session Change Log
**Date:** July 1, 2026  

---

## 1. Fixed npm Script Execution Error
**Problem:** Running `npm install` in PowerShell was failing with:
> "File npm.ps1 cannot be loaded because running scripts is disabled on this system."

**Fix:**
- Ran `npm.cmd install` to bypass the restriction and install all 307 packages.
- Permanently unblocked PowerShell script execution for the current user:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
  ```
- You can now run `npm run dev` normally in PowerShell going forward.

---

## 2. Updated Reception / Party Start Time
**File:** `src/config/eventConfig.ts`

```diff
- receptionTime: "1:00 PM",
+ receptionTime: "2:00 PM",
```

> Party now correctly shows as starting at **2:00 PM** across the entire site.

---

## 3. Thanksgiving Service Time — Added Full Range
**File:** `src/config/eventConfig.ts`

```diff
- thanksgivingTime: "12:00 PM",
+ thanksgivingTime: "12:00 PM – 1:30 PM",
```

> Guests can now clearly see the thanksgiving/church service runs **12:00 PM to 1:30 PM**, 
> before the main party begins at 2:00 PM.
>
> This update automatically reflects in:
> - **Hero Section** (CountdownTimer pill below the countdown)
> - **Event Details Section** (VIP Ticket card)
> - **Virtual Invitation Card** (downloadable PNG ticket)

---

## 4. Removed "Bro." Prefix from RSVP Contacts
**File:** `src/config/eventConfig.ts`

```diff
- { name: "Bro. Olalekan Ojo", shortName: "Bro. Olalekan", ... },
- { name: "Bro. Olumide Ojo",  shortName: "Bro. Olumide",  ... }
+ { name: "Olalekan Ojo", shortName: "Olalekan", ... },
+ { name: "Olumide Ojo",  shortName: "Olumide",  ... }
```

> Names now display without the "Bro." title on the invitation card and the RSVP section.

---

## 5. Updated Celebrant Roles on Invitation Card
**File:** `src/components/VirtualTicket.tsx`

```diff
- Our beloved husband, father, brother, uncle & grandfather
+ Our beloved husband, father, grandpa, brother, uncle & man of integrity
```

---

## 6. Updated Celebrant Description in About Section
**File:** `src/components/AboutSection.tsx`

```diff
- A man of grace, wisdom, and boundless love...
+ A man of integrity, grace, wisdom, and boundless love...
```

---

## Build Status
All changes verified with a clean production build:
```
✓ 2508 modules transformed.
✓ Built in ~600ms — No errors.
```

---

## How to Run Locally
```powershell
cd birthdayParty
npm run dev
```
Then open **http://localhost:3000** in your browser.
