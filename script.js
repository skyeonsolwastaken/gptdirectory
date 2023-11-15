document.addEventListener('DOMContentLoaded', function() {
    const gptTools = [
        { id: 1, name: 'GPT Tool A', category: 'communication', description: 'Description for Tool A', link: '#' },
        { id: 2, name: 'GPT Tool B', category: 'dalle-3', description: 'Description for Tool B', link: '#' },
        { id: 3, name: 'GPT Tool C', category: 'code', description: 'Description for Tool C', link: '#' },
        // ... other tools
    ];

    const container = document.getElementById('container');
    const categoryList = document.getElementById('categoryList');
    const categoryItems = document.querySelectorAll('.category-item');
    const menuIcon = document.querySelector('.menu-icon');
    const menuContainer = document.querySelector('.menu-container');

    const renderList = (filterValue) => {
        container.innerHTML = '';
        gptTools
            .filter(tool => filterValue === 'all' || tool.category === filterValue)
            .forEach(tool => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'gpt-item';
                itemDiv.innerHTML = `
                    <h3>${tool.name}</h3>
                    <p>${tool.description}</p>
                    <a href="${tool.link}" target="_blank" rel="noopener noreferrer">Learn More</a>
                `;
                container.appendChild(itemDiv);
            });
    };

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            renderList(category);
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

    renderList('all'); // Render all items initially
});
