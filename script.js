document.addEventListener('DOMContentLoaded', function() {
    const gptTools = [
        { id: 1, name: 'Cat-GPT', category: 'communication', description: 'Have a chat with a cat!', link: 'https://chat.openai.com/g/g-Feqdu33Ug-cat-gpt' },
        { id: 2, name: 'GPT Tool B', category: 'dalle-3', description: 'Description for Tool B', link: '#' },
        { id: 3, name: 'GPT Tool C', category: 'code', description: 'Description for Tool C', link: '#' },
        // ... other tools
    ];

    const container = document.getElementById('container');
    const categoryList = document.getElementById('categoryList');
    const categoryItems = document.querySelectorAll('.category-item');
    const menuIcon = document.querySelector('.menu-icon');
    const menuContainer = document.querySelector('.menu-container');
    const searchInput = document.getElementById('searchInput');
    let currentFilter = 'all';

    const renderList = (filterValue, searchTerm = '') => {
        container.innerHTML = '';
        gptTools
            .filter(tool => filterValue === 'all' || tool.category === filterValue)
            .filter(tool => tool.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .forEach(tool => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'gpt-item';
                itemDiv.innerHTML = `
                    <h3>${tool.name}</h3>
                    <p>${tool.description}</p>
                    <a href="${tool.link}" target="_blank" rel="noopener noreferrer">Open GPT</a>
                `;
                container.appendChild(itemDiv);
            });
    };

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            currentFilter = item.getAttribute('data-category');
            renderList(currentFilter, searchInput.value);
            if (window.innerWidth <= 768) {
                menuContainer.style.width = '0';
            }
        });
    });

    menuIcon.addEventListener('click', function() {
        if (menuContainer.style.width === '250px') {
            menuContainer.style.width = '0';
        } else {
            menuContainer.style.width = '250px';
        }
    });

    searchInput.addEventListener('input', (e) => {
        renderList(currentFilter, e.target.value);
    });

    renderList('all'); // Render all items initially
});
