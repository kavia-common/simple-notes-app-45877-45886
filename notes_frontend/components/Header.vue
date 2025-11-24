<script setup lang="ts">
// Simple header displaying the application title and optional actions
defineProps<{
  title?: string
}>();
</script>

<template>
  <header class="app-header" role="banner">
    <div class="brand">
      <div class="logo" aria-hidden="true">📝</div>
      <h1 class="title">{{ title || 'Notes' }}</h1>
    </div>
    <div class="actions">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, rgba(37,99,235,0.10), rgba(249,250,251,0));
  border: 1px solid rgba(17,24,39,0.06);
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #2563EB22;
  border: 1px solid #2563EB55;
}

.title {
  margin: 0;
  font-size: 18px;
  color: #111827;
}

.actions :deep(button) {
  margin-left: 8px;
}

@media (prefers-color-scheme: dark) {
  .app-header {
    background: linear-gradient(180deg, rgba(37,99,235,0.08), rgba(16,18,22,0));
    border-color: rgba(255,255,255,0.06);
  }
  .title {
    color: var(--theme-text-primary, #E5E7EB);
  }
}
</style>
