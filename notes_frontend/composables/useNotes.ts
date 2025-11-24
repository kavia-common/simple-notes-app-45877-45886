import { ref, computed, watch } from 'vue';

export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'notes_app_items_v1';
const SELECTED_KEY = 'notes_app_selected_v1';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    return parsed;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // noop
  }
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Simple notes store with localStorage persistence */
  const notes = ref<Note[]>(loadFromStorage<Note[]>(STORAGE_KEY, []));
  const selectedId = ref<string | null>(loadFromStorage<string | null>(SELECTED_KEY, null));
  const loading = ref(false);
  const search = ref('');

  const filteredNotes = computed(() => {
    if (!search.value.trim()) return notes.value;
    const q = search.value.toLowerCase();
    return notes.value.filter(
      (n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
    );
  });

  const selectedNote = computed<Note | null>(() => {
    if (!selectedId.value) return null;
    return notes.value.find((n) => n.id === selectedId.value) ?? null;
  });

  watch(
    notes,
    (val) => {
      saveToStorage(STORAGE_KEY, val);
    },
    { deep: true },
  );
  watch(selectedId, (val) => saveToStorage(SELECTED_KEY, val));

  function generateId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  // PUBLIC_INTERFACE
  function createNote() {
    const now = Date.now();
    const newNote: Note = {
      id: generateId(),
      title: 'Untitled Note',
      body: '',
      createdAt: now,
      updatedAt: now,
    };
    notes.value = [newNote, ...notes.value];
    selectedId.value = newNote.id;
    return newNote;
  }

  // PUBLIC_INTERFACE
  function selectNote(id: string | null) {
    selectedId.value = id;
  }

  // PUBLIC_INTERFACE
  function updateNote(id: string, patch: Partial<Pick<Note, 'title' | 'body'>>) {
    const idx = notes.value.findIndex((n) => n.id === id);
    if (idx === -1) return;
    const updated = { ...notes.value[idx], ...patch, updatedAt: Date.now() };
    notes.value.splice(idx, 1, updated);
  }

  // PUBLIC_INTERFACE
  function deleteNote(id: string) {
    const idx = notes.value.findIndex((n) => n.id === id);
    if (idx === -1) return;
    notes.value.splice(idx, 1);
    if (selectedId.value === id) {
      selectedId.value = notes.value[0]?.id ?? null;
    }
  }

  // PUBLIC_INTERFACE
  function clearAll() {
    notes.value = [];
    selectedId.value = null;
  }

  return {
    notes,
    filteredNotes,
    selectedId,
    selectedNote,
    loading,
    search,
    createNote,
    selectNote,
    updateNote,
    deleteNote,
    clearAll,
  };
}
