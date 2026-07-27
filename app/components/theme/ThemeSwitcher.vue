<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import {
  applyThemePreference,
  nextThemePreference,
  observeSystemTheme,
  readThemePreference,
  type ThemePreference,
} from "./theme-preference";
import { runThemeTransition } from "./theme-transition";

const THEME_LABELS: Record<ThemePreference, string> = {
  light: "主题：浅色",
  system: "主题：跟随系统",
  dark: "主题：深色",
};

const isOpen = ref(false);
const preference = ref<ThemePreference>("system");
const rootElement = ref<HTMLElement | null>(null);
const triggerElement = ref<HTMLButtonElement | null>(null);

let stopObservingSystemTheme: (() => void) | undefined;
let themeTransitionPending = false;

const currentLabel = computed(() => THEME_LABELS[preference.value]);
const nextPreference = computed(() => nextThemePreference(preference.value));
const themeActionLabel = computed(
  () =>
    `当前${currentLabel.value}，点击切换为${THEME_LABELS[nextPreference.value]}`,
);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

async function closeMenu(returnFocus = false) {
  if (!isOpen.value) {
    return;
  }

  isOpen.value = false;
  if (returnFocus) {
    await nextTick();
    triggerElement.value?.focus();
  }
}

function cycleTheme(event: MouseEvent) {
  if (themeTransitionPending) {
    return;
  }

  const nextPreference = nextThemePreference(preference.value);
  const button = event.currentTarget;
  const origin =
    button instanceof HTMLElement
      ? button.querySelector<HTMLElement>(".fly-theme-current-icons")
      : null;

  themeTransitionPending = true;
  void runThemeTransition({
    origin,
    update: async () => {
      applyThemePreference(nextPreference);
      preference.value = nextPreference;
      await nextTick();
    },
  }).finally(() => {
    themeTransitionPending = false;
  });
}

function handleDocumentPointerDown(event: PointerEvent) {
  const target = event.target;
  if (
    isOpen.value &&
    target instanceof Node &&
    !rootElement.value?.contains(target)
  ) {
    void closeMenu();
  }
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && isOpen.value) {
    event.preventDefault();
    void closeMenu(true);
  }
}

onMounted(() => {
  preference.value = readThemePreference();
  applyThemePreference(preference.value, false);
  stopObservingSystemTheme = observeSystemTheme();
  document.addEventListener("pointerdown", handleDocumentPointerDown);
  document.addEventListener("keydown", handleDocumentKeydown);
});

onBeforeUnmount(() => {
  stopObservingSystemTheme?.();
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
  document.removeEventListener("keydown", handleDocumentKeydown);
});
</script>

<template>
  <nav ref="rootElement" class="fly-navbar-user-nav" aria-label="主题设置">
    <button
      ref="triggerElement"
      class="fly-navbar-user-trigger"
      :class="{ 'is-open': isOpen }"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? '关闭主题设置' : '打开主题设置'"
      @click="toggleMenu"
    >
      <span class="fly-iconify fly-iconify--mode" aria-hidden="true" />
    </button>

    <div
      class="fly-navbar-user-menu"
      :class="{ 'is-open': isOpen }"
      role="menu"
      :aria-hidden="!isOpen"
    >
      <ul>
        <li>
          <button
            class="fly-navbar-user-menu-item fly-theme-preference-button"
            type="button"
            role="menuitem"
            :aria-label="themeActionLabel"
            @click="cycleTheme"
          >
            <span class="fly-iconify fly-iconify--moon" aria-hidden="true" />
            <span>{{ currentLabel }}</span>
            <span
              class="fly-theme-current-icons"
              :data-theme-preference="preference"
              aria-hidden="true"
            >
              <span
                class="fly-iconify fly-iconify--sun fly-theme-state-icon fly-theme-state-icon--light"
              />
              <span
                class="fly-iconify fly-iconify--mode fly-theme-state-icon fly-theme-state-icon--system"
              />
              <span
                class="fly-iconify fly-iconify--moon fly-theme-state-icon fly-theme-state-icon--dark"
              />
            </span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
