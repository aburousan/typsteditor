# Release notes

Paste the current section into the GitHub release when you cut a tag.

---

## 0.1.6

A hotfix for three things people ran into with 0.1.5.

### Undo no longer resurrects the starter template

Reopening the app and pressing Ctrl+Z could replace your document with the
default starter text. The editor was quietly stacking your restored file on
top of the template it seeds new documents with. Fixed — undo now stops at
your own edits. Switching between projects also can't leak one document's
undo history into another anymore.

### The preview stopped flickering

Typing used to blank the preview to white on every recompile before the pages
came back. Pages now refresh in place: the old render stays on screen until
the new one is ready, so nothing flashes. The compile-error bar moved to the
bottom of the preview as well, so it no longer shoves the PDF down when an
error appears mid-edit.

### Export dialog, second pass

PDF version and conformance standard (PDF/A, PDF/UA) are now separate
choices instead of one mixed list. Exporting a project produces a single
`.zip` through the save dialog rather than copying loose files into a folder
— and the writer is built in, so it works the same on Windows. The redundant
"save straight to a folder" path is gone, the fields match the rest of the
UI, and the layout no longer jumps around when you switch formats.

---

## 0.1.5

### Python and Julia notebooks

Write code straight into the document and press Run Notebook. Every code block in the
file runs as one session, so variables carry from cell to cell. Output is written back
underneath each block, plots come back as figures, and the compiled PDF marks each
block with its language logo.

![Python and Julia notebook cells](notebook-python-julia.png)

Saving no longer runs your code. A save typesets the document; only Run Notebook
executes anything.

### Finding things

⌘K opens a command palette covering every menu action, searchable by name.

Help → Features & Help opens a searchable list of what the app can do, where each
thing lives, and its shortcut.

### Export

The export dialog now offers PDF with page ranges, PDF/A archival standards, tagging
and pretty-printing, plus PNG, SVG, HTML, plain `.typ`, or the whole project folder.
It opens your system's save dialog instead of quietly writing to Downloads, remembers
your last format and folder, and can open the file when it is done.

### Editing

Feynman loops take fermion-flow arrows, clockwise or counter-clockwise.

The draw-a-symbol pad now recognises about 45 hand-drawn shapes and is no longer
marked experimental. Enter inserts the top match, 1 to 9 pick another, and Backspace
removes the last stroke.

Spelling and grammar checking (a basic checker: it catches misspellings and common
grammar slips, not subtle style problems). It is off by default; switch it on with the
tick icon in the header.

Data import reads CSV, TSV, and Excel, and will plot the columns you choose.

There is a two-column journal template, and ⌘⇧H inserts a full-width rule.

### Fixes

A failed compile no longer takes over the screen. The last good PDF stays up and the
errors move to their own tab.

The first load no longer shows a compile error before the backend has started.

Idle memory dropped from 173 MB to 12 MB. The spelling and grammar dictionaries cost
around 150 MB and were being preloaded at launch even though the checker is off by
default; they now load the first time you turn it on.

Exporting an SVG now shows the file in Finder rather than opening it, because the app
registered for `.svg` is often a source editor and would show you a wall of XML.

A GitHub personal access token is no longer written into `.git/config` when you push,
and it is stripped from any repository URL the app displays. A push that needs
credentials now fails quickly instead of hanging.

Requires Typst 0.15 or newer.
