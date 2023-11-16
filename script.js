document.addEventListener('DOMContentLoaded', function() {
    const gptTools = [
        { id: 1, name: 'GPT Tool A', category: 'communication', description: 'Description for Tool A', link: '#' },
        { id: 2, name: 'GPT Tool B', category: 'dalle-3', description: 'Description for Tool B', link: '#' },
        { id: 3, name: 'GPT Tool C', category: 'code', description: 'Description for Tool C', link: '#' },
        // ... other tools, add more to test pagination ...
    ];

    const container = document.getElementById('container');
    const categoryList = document.getElementById('categoryList');
    const categoryItems = document.querySelectorAll('.category-item');
    const menuIcon = document.querySelector('.menu-icon');
    const menuContainer = document.querySelector('.menu-container');
    const searchInput = document.getElementById('searchInput');
    const paginationContainer = document.getElementById('pagination');
    let currentFilter = 'all';
    const itemsPerPage = 24;

    const renderList = (filterValue, searchTerm = '', page = 1) => {
        container.innerHTML = '';
        const filteredTools = gptTools
            .filter(tool => filterValue === 'all' || tool.category === filterValue)
            .filter(tool => tool.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = filteredTools.slice(start, end);

        paginatedItems.forEach(tool => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'gpt-item';
            itemDiv.innerHTML = `
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <a href="${tool.link}" target="_blank" rel="noopener noreferrer">Learn More</a>
            `;
            container.appendChild(itemDiv);
        });

        renderPagination(filteredTools.length, page);
    };

    const renderPagination = (totalItems, currentPage) => {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.innerText = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                renderList(currentFilter, searchInput.value, i);
            });

            if (currentPage === i) {
                pageLink.classList.add('active');
            }

            paginationContainer.appendChild(pageLink);
        }
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
