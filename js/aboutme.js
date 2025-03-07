document.addEventListener("DOMContentLoaded", function() {
    const allCardsContainer = document.querySelectorAll('.allCards');
    allCardsContainer.forEach(container => {
        const persistentCardsContainer = container.nextElementSibling;
        const toggleableCardsContainer = persistentCardsContainer.nextElementSibling;

        const cards = Array.from(container.children);
        const cardStyle = getComputedStyle(cards[0]);
        const cardWidth = cards[0].getBoundingClientRect().width + parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
        const containerWidth = persistentCardsContainer.getBoundingClientRect().width;
        const itemsPerRow = Math.floor(containerWidth / cardWidth);

        cards.forEach((card, index) => {
            if (index < itemsPerRow) {
                persistentCardsContainer.appendChild(card);
            } else {
                toggleableCardsContainer.appendChild(card);
            }
        });

        const parentSection = container.closest('.section')
        if (parentSection) {
            const expanderElement = parentSection.querySelector('.sectionExpand');
            if (expanderElement) {
                console.log(toggleableCardsContainer.childElementCount)
                if (toggleableCardsContainer.childElementCount == 0) {
                    expanderElement.style.display = "none";
                }
            }
        }
    });
});

function sectionExpand(section) {
    const toggleableCards = document.querySelector(`.toggleableCards[data-section="${section}"]`);
    if (toggleableCards) {
        toggleableCards.classList.toggle('expanded');
    }
    const parentSection = toggleableCards.closest('.section');
    if (parentSection) {
        const expanderElement = parentSection.querySelector('.sectionExpand button');
        if (expanderElement) {
            expanderElement.classList.toggle('expanded');
        }
    }
}