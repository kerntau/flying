export function setupMomentTagFilter(root) {
  const filter = root.querySelector("[data-fly-moments-filter]");
  const feed = root.querySelector("[data-fly-moments-list]");
  if (!filter || !feed) return;

  let selectedTag = new URL(window.location.href).searchParams.get("tag") || "";

  const controls = Array.from(filter.querySelectorAll("[data-fly-moment-tag]"));
  const cards = Array.from(feed.querySelectorAll("[data-fly-moment-card]"));

  function render() {
    controls.forEach((link) => {
      const isActive = link.dataset.flyMomentTag === selectedTag;
      link.classList.toggle("fly-is-active", isActive);

      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    cards.forEach((card) => {
      const tags = (card.dataset.flyMomentTags || "").split("|");
      card.hidden = Boolean(selectedTag && !tags.includes(selectedTag));
    });
  }

  controls.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      selectedTag = link.dataset.flyMomentTag || "";
      const url = new URL(window.location.href);
      if (selectedTag) url.searchParams.set("tag", selectedTag);
      else url.searchParams.delete("tag");
      history.pushState(null, "", url);
      render();
    });
  });

  render();
}
