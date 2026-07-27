export function openSearchWidget() {
  const dialog = document.querySelector("[data-fly-search-dialog]");
  if (!(dialog instanceof HTMLDialogElement)) return false;
  if (!dialog.open) dialog.showModal();
  dialog.querySelector("[data-fly-search-input]")?.focus();
  return true;
}

export function setupSearchWidget(root) {
  if (window.flySearchWidgetController) {
    window.flySearchWidgetController.abort();
  }

  const controller = new AbortController();
  window.flySearchWidgetController = controller;

  root.querySelectorAll("[data-fly-search-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", openSearchWidget, {
      signal: controller.signal,
    });
  });

  const dialog = document.querySelector("[data-fly-search-dialog]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const input = dialog.querySelector("[data-fly-search-input]");
  const status = dialog.querySelector("[data-fly-search-status]");
  const items = [...dialog.querySelectorAll("[data-fly-search-item]")];
  const close = () => dialog.close();

  dialog
    .querySelector("[data-fly-search-close]")
    ?.addEventListener("click", close, {
      signal: controller.signal,
    });
  dialog.addEventListener(
    "click",
    (event) => {
      if (event.target === dialog) close();
    },
    { signal: controller.signal },
  );
  input?.addEventListener(
    "input",
    () => {
      const query = input.value.trim().toLocaleLowerCase("zh-CN");
      const visible = items.filter((item) => {
        const matches =
          !query ||
          item.dataset.flySearchText
            ?.toLocaleLowerCase("zh-CN")
            .includes(query);
        item.hidden = !matches;
        return matches;
      }).length;
      if (status) status.textContent = query ? `找到 ${visible} 篇文章` : "";
    },
    { signal: controller.signal },
  );
}
