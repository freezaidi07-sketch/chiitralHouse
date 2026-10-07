document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  if (header) {
    header.setAttribute('data-ready', 'true');
  }
});
