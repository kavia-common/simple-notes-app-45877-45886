---
# Global deck settings
theme: default
title: Notes – Ocean Professional
info: |
  Slidev-based simple notes manager
class: text-left
mdc: true
transition: slide-left
fonts:
  sans: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial
  mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
css: |
  @import "./style.css";
---

# Notes

<script setup lang="ts">
import Header from './components/Header.vue'
import NotesList from './components/NotesList.vue'
import NoteEditor from './components/NoteEditor.vue'
import FloatingCreateButton from './components/FloatingCreateButton.vue'
import { useNotes } from './composables/useNotes'

const {
  notes,
  filteredNotes,
  selectedId,
  selectedNote,
  search,
  createNote,
  selectNote,
  updateNote,
  deleteNote,
} = useNotes()

function onCreate() {
  const n = createNote()
  // Auto-focus would require refs inside NoteEditor; manual focus on title on first interaction
}

function onSelect(id: string) {
  selectNote(id)
}

function onUpdate(payload: {title?: string; body?: string}) {
  if (!selectedId.value) return
  updateNote(selectedId.value, payload)
}

function onDelete(id: string) {
  deleteNote(id)
}
</script>

<div class="notes-app-root">
  <Header title="Simple Notes – Ocean Professional">
    <button class="btn-secondary" @click="onCreate">New Note</button>
  </Header>

  <div class="notes-grid">
    <NotesList
      :notes="filteredNotes"
      :selected-id="selectedId"
      :search="search"
      @update:search="(v: string) => search = v"
      @select="onSelect"
      @delete="onDelete"
    />
    <NoteEditor
      :note="selectedNote"
      @update="onUpdate"
    />
  </div>

  <FloatingCreateButton @click="onCreate" />
</div>

<style>
.notes-app-root {
  position: relative;
  display: grid;
  gap: 14px;
  background: linear-gradient(180deg, rgba(37,99,235,0.06), rgba(249,250,251,0));
  padding: 14px;
  border-radius: 18px;
  border: 1px solid rgba(17,24,39,0.06);
  min-height: 540px;
}

.notes-grid {
  display: grid;
  grid-template-columns: 0.42fr 0.58fr;
  gap: 14px;
  min-height: 420px;
}

@media (max-width: 900px) {
  .notes-grid {
    grid-template-columns: 1fr;
  }
}

:root {
  /* Ocean Professional Palette */
  --ocean-primary: #2563EB;
  --ocean-secondary: #F59E0B;
  --ocean-error: #EF4444;
  --ocean-bg: #f9fafb;
  --ocean-surface: #ffffff;
  --ocean-text: #111827;
}
</style>
