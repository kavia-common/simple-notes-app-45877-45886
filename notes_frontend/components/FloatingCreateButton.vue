<script setup lang="ts">
const emit = defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <button
    class="fab"
    aria-label="Create a new note"
    title="New note"
    @click="emit('click')"
  >
    +
  </button>
</template>

<style scoped>
.fab {
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  background: #2563EB;
  color: white;
  font-size: 28px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(37,99,235,0.35), 0 2px 6px rgba(0,0,0,0.20);
  transition: transform 140ms ease, box-shadow 140ms ease, background 160ms ease;
}
.fab:hover {
  transform: translateY(-1px);
  background: #1e54c9;
  box-shadow: 0 16px 36px rgba(37,99,235,0.45), 0 4px 10px rgba(0,0,0,0.22);
}
.fab:active {
  transform: translateY(0);
}
</style>
