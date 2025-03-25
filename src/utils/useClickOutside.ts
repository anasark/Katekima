import { onMounted, onBeforeUnmount } from 'vue';

export function useClickOutside(callback: () => void, ignoreSelectors: string[] = []) {
  const handleClickOutside = (event: MouseEvent) => {
    const button = event.target as HTMLElement;

    const isOutside = ignoreSelectors.every((selector) => {
      const closestElement = button.closest(selector);
      return closestElement === null;
    });

    if (isOutside) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });
}
