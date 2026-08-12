(() => {
  const protectVideo = (video) => {
    video.setAttribute("controlslist", "nodownload noremoteplayback");
    video.setAttribute("disablepictureinpicture", "");
    video.setAttribute("disableremoteplayback", "");
    video.addEventListener("contextmenu", (event) => event.preventDefault());
  };

  const protectAllVideos = (root = document) => {
    root.querySelectorAll?.("video").forEach(protectVideo);
  };

  protectAllVideos();

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches("video")) protectVideo(node);
        protectAllVideos(node);
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
