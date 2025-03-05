document.addEventListener("DOMContentLoaded", function() {
    const allCardsContainer = document.querySelectorAll('.allCards');
    allCardsContainer.forEach(container => {
        const persistentCardsContainer = container.nextElementSibling;
        const toggleableCardsContainer = persistentCardsContainer.nextElementSibling;

        const cards = Array.from(container.children);
        const cardWidth = cards[0].offsetWidth;
        const containerWidth = persistentCardsContainer.offsetWidth;
        const itemsPerRow = Math.floor(containerWidth / cardWidth) - 1;

        cards.forEach((card, index) => {
            if (index < itemsPerRow) {
                persistentCardsContainer.appendChild(card);
            } else {
                toggleableCardsContainer.appendChild(card);
            }
        });
    });
});

function sectionExpand(section) {
    const toggleableCards = document.querySelector(`.toggleableCards[data-section="${section}"]`);
    if (toggleableCards) {
        toggleableCards.classList.toggle('expanded');
    }
}