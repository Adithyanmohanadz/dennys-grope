export function updateWebsiteMeta({ title, logo }) {
  // Update title
  if (title) {
    document.title = title;
  }

  // Update favicon
  if (logo) {
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = logo;
  }
}
