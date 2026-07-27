export function setupLinksGroupFilter(root) {
  window.flyLinksGroupFilterController?.abort();

  const filter = root.querySelector("[data-fly-links-filter]");
  const groups = root.querySelectorAll("[data-fly-links-group]");
  if (!filter || !groups.length) return;

  const controller = new AbortController();
  window.flyLinksGroupFilterController = controller;
  const controls = filter.querySelectorAll("[data-fly-links-group-filter]");
  let selectedGroup =
    new URL(window.location.href).searchParams.get("group") || "";

  function render() {
    controls.forEach((link) => {
      const isActive = link.dataset.flyLinksGroupFilter === selectedGroup;
      link.classList.toggle("fly-is-active", isActive);

      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    groups.forEach((group) => {
      group.hidden = Boolean(
        selectedGroup && group.dataset.flyLinksGroup !== selectedGroup,
      );
    });
  }

  controls.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        selectedGroup = link.dataset.flyLinksGroupFilter || "";
        const url = new URL(window.location.href);

        if (selectedGroup) url.searchParams.set("group", selectedGroup);
        else url.searchParams.delete("group");

        history.pushState(null, "", url);
        render();
      },
      { signal: controller.signal },
    );
  });

  window.addEventListener(
    "popstate",
    () => {
      selectedGroup =
        new URL(window.location.href).searchParams.get("group") || "";
      render();
    },
    { signal: controller.signal },
  );

  render();
}
