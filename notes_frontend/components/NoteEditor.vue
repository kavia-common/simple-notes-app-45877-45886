<script setup lang="ts">
import { computed } from 'vue';
import type { Note } from '../composables/useNotes';

const props = defineProps<{
  note: Note | null;
}>();

const emit = defineEmits<{
  (e: 'update', payload: { title?: string; body?: string }): void;
}>();

const hasNote = computed(() => !!props.note);
</script>

<template>
  <section class="editor" aria-label="Note editor">
    <div v-if="!hasNote" class="editor-empty card-like">
      <div class="emoji" aria-hidden="true">✨</div>
      <div class="headline">Select or create a note</div>
      <div class="desc">Your edits will be saved automatically</div>
    </div>
    <div v-else class="editor-form card-like">
      <div class="field">
        <label for="note-title">Title</label>
        <input
          id="note-title"
          type="text"
          :value="props.note!.title"
          placeholder="Note title"
          @input="emit('update', { title: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div class="field">
        <label for="note-body">Body</label>
        <textarea
          id="note-body"
          :value="props.note!.body"
          placeholder="Write your note here..."
          @input="emit('update', { body: ($event.target as HTMLTextAreaElement).value })"
          rows="12"
        />
        <small class="hint">Supports plain text. Markdown-friendly content is preserved.</small>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editor {
  display: grid;
  min-height: 0;
}

.card-like {
  background: var(--theme-bg-elevated, #ffffff);
  border: 1px solid rgba(17,24,39,0.08);
  border-radius: 16px;
  padding: 14px;
  min-height: 240px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
}

.editor-empty {
  display: grid;
  place-items: center;
  text-align: center;
  color: #6b7280;
}
.editor-empty .emoji { font-size: 40px; margin-bottom: 8px; }
.editor-empty .headline { color: #111827; font-weight: 700; }
.editor-empty .desc { color: #6b7280; }

.editor-form {
  display: grid;
  gap: 12px;
}
.field {
  display: grid;
  gap: 6px;
}
label {
  font-weight: 700;
  color: #111827;
}
input, textarea {
  width: 100%;
  padding: 10px 12px;
  background: #f9fafb;
  border: 1px solid rgba(17,24,39,0.12);
  border-radius: 12px;
  outline: none;
  color: #111827;
  transition: box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
}
input:focus, textarea:focus {
  border-color: #2563EB;
  box-shadow: 0 0 0 3px #2563EB33;
  background: #ffffff;
}
textarea {
  resize: vertical;
}
.hint {
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  .card-like {
    border-color: var(--line, rgba(255,255,255,0.08));
  }
  label { color: var(--theme-text-primary, #e5e7eb); }
  input, textarea {
    background: var(--theme-bg-elev-2, #1f2937);
    color: var(--theme-text-primary, #e5e7eb);
    border-color: var(--line, rgba(255,255,255,0.08));
  }
}
</style>
