# 🛰️ Future Focus — Student Registration

**Orbit TVET College** event registration portal with a 200-student limit and QR code sharing.

## Live Site
```
https://mokamiAI.github.io/Orbit-College
```

## Features
- Student registration form (Student No, Surname & Initial, Program, Group)
- 200-student capacity with real-time counter
- Auto "Registration Full" message after 200 registrations
- QR code generation for easy sharing
- Fully responsive — works on mobile & desktop
- No backend required — runs entirely in the browser

## Form Fields
| Field | Required |
|-------|----------|
| Student Number | ✅ |
| Surname & Initial | ✅ |
| Program | ✅ |
| Group | ✅ |

## Admin — View Registrations
Open the live site, press **F12 → Console**, then paste:
```javascript
console.log(JSON.parse(localStorage.getItem('futureFocusRegs')));
```

## Export to CSV
```javascript
const d = JSON.parse(localStorage.getItem('futureFocusRegs'));
const csv = 'StudentNo,Surname,Program,Group,RegisteredAt\n' +
  d.map(r => `"${r.studentNo}","${r.surname}","${r.program}","${r.group}","${r.at}"`).join('\n');
console.log(csv);
```

## Reset Data
```javascript
localStorage.removeItem('futureFocusRegs'); location.reload();
```

## Deployment
Hosted on **GitHub Pages** — any push to `main` goes live within ~60 seconds.
