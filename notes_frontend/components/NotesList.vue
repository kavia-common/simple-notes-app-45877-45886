<script setup lang="ts">
import { computed } from 'vue';
import type { Note } from '../composables/useNotes';

const props = defineProps<{
  notes: Note[];
  selectedId: string | null;
  search: string;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'delete', id: string): void;
  (e: 'update:search', value: string): void;
}>();

const hasNotes = computed(() => props.notes.length > 0);

function onDelete(id: string, title: string) {
  const ok = confirm(`Delete note "${title || 'Untitled'}"? This cannot be undone.`);
  if (ok) emit('delete', id);
}
</script>

<template>
  <aside class="list-panel" aria-label="Notes list">
    <div class="search-row">
      <label class="sr-only" for="search">Search notes</label>
      <input
        id="search"
        type="text"
        :value="props.search"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
        placeholder="Search notes..."
        class="search-input"
      />
    </div>

    <div v-if="!hasNotes" class="empty">
      <div class="empty-card">
        <div class="emoji" aria-hidden="true">🗒️</div>
        <div class="headline">No notes yet</div>
        <div class="desc">Create your first note using the + button</div>
      </div>
    </div>

    <ul v-else class="items" role="listbox" aria-label="Notes">
      <li
        v-for="n in props.notes"
        :key="n.id"
        :aria-selected="props.selectedId === n.id"
        :class="['item', props.selectedId === n.id ? 'active' : '']"
      >
        <button
          class="item-btn"
          role="option"
          :aria-label="`Select note: ${n.title || 'Untitled'}`"
          @click="emit('select', n.id)"
        >
          <div class="item-title">{{ n.title || 'Untitled' }}</div>
          <div class="item-meta">{{ new Date(n.updatedAt).toLocaleString() }}</div>
        </button>
        <button
          class="delete-btn"
          aria-label="Delete note"
          title="Delete"
          @click="onDelete(n.id, n.title)"
        >
          ✕
        </button>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.list-panel {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  background: var(--theme-bg-elevated, #ffffff);
  border: 1px solid rgba(17,24,39,0.08);
  border-radius: 16px;
  padding: 12px;
  min-height: 0;
}
.search-row {
  display: flex;
}
.search-input {
  width: 100%;
  padding: 10px 12px;
  background: #f9fafb;
  border: 1px solid rgba(17,24,39,0.12);
  border-radius: 12px;
  outline: none;
  color: #111827;
  transition: box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
}
.search-input::placeholder { color: #6b7280; }
.search-input:focus {
  border-color: #2563EB;
  box-shadow: 0 0 0 3px #2563EB33;
  background: #ffffff;
}

.items {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: auto;
  display: grid;
  gap: 6px;
}
.item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  background: var(--theme-bg-elevated, #fff);
  border: 1px solid rgba(17,24,39,0.08);
  border-radius: 12px;
  transition: transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease, background 120ms ease;
}
.item:hover {
  transform: translateY(-1px);
  border-color: #2563EB44;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}
.item.active {
  border-color: #2563EB88;
  box-shadow: 0 8px 24px rgba(37,99,235,0.18);
  background: linear-gradient(180deg, #2563EB0C, transparent);
}
.item-btn {
  display: grid;
  gap: 2px;
  text-align: left;
  padding: 10px 12px;
  background: transparent;
  border: 0;
  cursor: pointer;
  border-radius: 12px 0 0 12px;
}
.item-title {
  font-weight: 600;
  color: #111827;
}
.item-meta {
  font-size: 12px;
  color: #6b7280;
}
.delete-btn {
  background: transparent;
  border: 0;
  color: #EF4444;
  font-weight: 700;
  opacity: 0.8;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 0 12px 12px 0;
}
.delete-btn:hover {
  opacity: 1;
  background: #EF444422;
}

.empty {
  display: grid;
  place-items: center;
  padding: 16px;
}
.empty-card {
  text-align: center;
  color: #6b7280;
}
.empty .emoji { font-size: 32px; margin-bottom: 8px; }
.empty .headline { color: #111827; font-weight: 700; }
.empty .desc { color: #6b7280; }

.sr-only {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
@media (prefers-color-scheme: dark) {
  .list-panel {
    border-color: var(--line, rgba(255,255,255,0.08));
  }
  .search-input {
    background: var(--theme-bg-elev-2, #1f2937);
    color: var(--theme-text-primary, #e5e7eb);
    border-color: var(--line, rgba(255,255,255,0.08));
  }
  .item-title { color: var(--theme-text-primary, #e5e7eb); }
  .item-meta { color: var(--theme-text-secondary, #94a3b8); }
}
</style>
