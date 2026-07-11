# Grimoire 🪄

A minimal developer journal that lives in your terminal. Create projects, log milestones as you build, and never lose track of what you worked on.

## Installation

```bash
git clone https://github.com/yourusername/grimoire
cd grimoire
npm install -g .
```

`grimoire` is now available anywhere on your system.

## Usage

**Create a new project**
```bash
grimoire new myapp
```

**List all projects**
```bash
grimoire projects
```

**Set active project**
```bash
grimoire use myapp
```

**Add a log to active project**
```bash
grimoire add built the auth system
```

**View all logs for a project**
```bash
grimoire logs myapp
```

**Show today's logs across all projects**
```bash
grimoire today
```

## Example

```bash
$ grimoire new grimoire
Project Registered

$ grimoire use grimoire
Active project set to grimoire

$ grimoire add built the CLI from scratch
Entry Registered

$ grimoire add added global install via npm link
Entry Registered

$ grimoire logs grimoire
built the CLI from scratch
added global install via npm link

$ grimoire today
[
  { id: 1751234567890, entry: 'built the CLI from scratch', timeStamp: '2026-07-01T10:23:00' },
  { id: 1751234599999, entry: 'added global install via npm link', timeStamp: '2026-07-01T11:00:00' }
]
```

## Data structure

Everything stored locally in a single JSON file on your machine. No cloud, no accounts, no tracking.

```json
{
  "activeProject": "grimoire",
  "projects": [
    {
      "id": 1751234567890,
      "name": "grimoire",
      "created": "2026-07-01",
      "logs": [
        { "id": 1751234599999, "entry": "built the CLI from scratch", "timeStamp": "2026-07-01T10:23:00" }
      ]
    }
  ]
}
```

## Tech

Pure Node.js. Zero dependencies. Your data stays on your machine.

## Why

Because developers forget what they built. Grimoire remembers.