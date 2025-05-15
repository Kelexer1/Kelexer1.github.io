window.addEventListener('scroll', updateProgressBar);
window.addEventListener('load', updateProgressBar);
document.addEventListener('DOMContentLoaded', fillTags);

function fillTags() {
    tagElement = document.getElementById('post-tags');
    for (let i = 0; i < tags.length; i++) {
        tagElement.textContent += '#' + tags[i];
        if (i < tags.length - 1) {
            tagElement.textContent += ' ';
        }
    }
}

function updateProgressBar() {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const progressBar = document.getElementById('progressBar');
    const progressBarContainer = document.getElementById('progressContainer');

    if (documentHeight <= windowHeight) {
        progressBarContainer.style.display = 'none';
    } else {
        progressBarContainer.style.display = 'block';
        var progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
        progressBar.style.height = progress + '%';
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth'});
}