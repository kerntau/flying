export function setupPhotoGroupFilter(root) {
  const filter = root.querySelector("[data-fly-photo-filter]");
  const feed = root.querySelector("[data-fly-photo-feed]");
  if (!filter || !feed) return;

  let selectedGroup =
    new URL(window.location.href).searchParams.get("group") || "";

  const controls = Array.from(
    filter.querySelectorAll("[data-fly-photo-group]"),
  );
  const cards = Array.from(feed.querySelectorAll("[data-fly-photo-card]"));

  function render() {
    controls.forEach((link) => {
      const isActive = link.dataset.flyPhotoGroup === selectedGroup;
      link.classList.toggle("fly-is-active", isActive);

      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    cards.forEach((card) => {
      card.hidden = Boolean(
        selectedGroup && card.dataset.flyPhotoGroup !== selectedGroup,
      );
    });
  }

  controls.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      selectedGroup = link.dataset.flyPhotoGroup || "";
      const url = new URL(window.location.href);
      if (selectedGroup) url.searchParams.set("group", selectedGroup);
      else url.searchParams.delete("group");
      history.pushState(null, "", url);
      render();
    });
  });

  render();
}
