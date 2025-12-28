// src/router.js
// Improved hash router with error detection

(function () {
  let currentPage = null;

  async function loadPage() {
    const page = window.location.hash.slice(1) || "home";
    const container = document.getElementById("mainContent");

    if (!container) {
      console.error("Router error: #mainContent not found");
      return;
    }

    container.innerHTML = "";

    // Update nav active state
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${page}`
      );
    });

    try {
      // Dynamically import page (ES module safe)
      const module = await import(`./pages/${page}.js`);

      // Accept common patterns:
      // export default function(container)
      // export function init(container)
      // export function render(container)
      const handler =
        module.default ||
        module.init ||
        module.render;

      if (typeof handler !== "function") {
        throw new Error(
          `No valid render function found in ${page}.js`
        );
      }

      currentPage = page;
      handler(container);

    } catch (err) {
      console.error("Router load error:", err);

      if (err.message.includes("Failed to fetch")) {
        container.innerHTML = `
          <h1 class="page-title">404</h1>
          <p>Page "<strong>${page}</strong>" not found.</p>
        `;
      } else {
        container.innerHTML = `
          <h1 class="page-title">Page Error</h1>
          <p>${err.message}</p>
        `;
      }
    }
  }

  window.addEventListener("hashchange", loadPage);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPage);
  } else {
    loadPage();
  }
})();
