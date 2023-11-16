document.addEventListener('DOMContentLoaded', function() {
  const gptTools = [
    { id: 1, name: 'News Bias Analyzer', category: 'analysis', description: 'Targetted Bias Detection with Graphing, Summarization, Categorization, Tagging, and Comprehensive Source Evaluation (Cybrix.AI)', link: 'https://chat.openai.com/g/g-9tbHB4O4r-news-bias-analyzer' },
    { id: 2, name: 'DesignerGPT', category: 'design', description: 'Creates and hosts beautiful websites', link: 'https://chat.openai.com/g/g-2Eo3NxuS7-designergpt' },
    { id: 3, name: 'Midjourney', category: 'images', description: 'AI chatbot for midjourney-style image creation', link: 'https://chat.openai.com/g/g-MD9ZplW7q-midjourney' },
    { id: 4, name: 'Theres An API For That', category: 'coding', description: 'The most advanced API finder, available for over 1000 tasks. Chat with me to find the best API tools for any use case', link: 'https://chat.openai.com/g/g-LrNKhqZfA-there-s-an-api-for-that-the-1-api-finder' },
    { id: 5, name: 'Data Analysis', category: 'analysis', description: 'Drop in any files and I can help analyze and visualize your data', link: 'https://chat.openai.com/g/g-HMNcP6w7d-data-analysis' },
    { id: 6, name: 'GPT Enhancer', category: 'chat', description: 'AI assistant for refining GPT instructions with a focus on user experience and AI learning', link: 'https://chat.openai.com/g/g-fQ6GAANfi-gpt-enhancer' },
    { id: 7, name: 'Conceptmap', category: 'utility', description: 'Create concepts and structure them in a map. Keep ideas and retrieve them whenever you need them.', link: 'https://chat.openai.com/g/g-ce1JVgzLI-conceptmap' },
    { id: 8, name: 'Character Forger', category: 'games', description: 'Character Consistancy Tool', link: 'https://chat.openai.com/g/g-waDWNw2J3-character-forger' },
    { id: 9, name: 'Crow', category: 'assistant', description: 'Send a link, and Ill bring back the key points!', link: 'https://chat.openai.com/g/g-FJbohiuK0-crow' },
    { id: 10, name: 'Remote Job Finder', category: 'business', description: 'I will help you find relevant remote jobs quickly. No need to waste time on filtering through different criteria.', link: 'https://chat.openai.com/g/g-qd7DavBQS-remote-job-finder' },
    { id: 11, name: 'Teach Me GPT', category: 'education', description: 'A GPT to teach you how to GPT (its like so GPT) Can you make it to Level 100?', link: 'https://chat.openai.com/g/g-I6Yyp8eAI-teach-me-gpt' },
    { id: 12, name: 'What should I watch?', category: 'entertainment', description: 'Find movies and tv shows to watch based on your taste and preferences, goodbye decision paralysis!', link: 'https://chat.openai.com/g/g-Gm9cCA5qg-what-should-i-watch' },
    { id: 13, name: '3D GPT', category: 'images', description: 'I turn your creative ideas into stunning 3D digital art!', link: 'https://chat.openai.com/g/g-9tUvwy2fi-3d-gpt' },
    { id: 14, name: 'Vector Art Designer', category: 'design', description: 'A GPT specializing in vector art illustrations with solid backgrounds.', link: 'https://chat.openai.com/g/g-c54HMRMOG-vector-art-designer' },
    { id: 15, name: 'YouTube Summarizer', category: 'utility', description: 'Get summary of a YouTube video', link: 'https://chat.openai.com/g/g-nv7yQCb53-youtube-summarizer' },
    { id: 16, name: 'Startup Website Copy', category: 'business', description: 'I will help you go from 0 to first landing page.', link: 'https://chat.openai.com/g/g-85Y0gYQuO-startup-website-copy' },
    { id: 17, name: 'Charm Coach', category: 'assistant', description: 'A fun and engaging assistant for dating and seduction tips.', link: 'https://chat.openai.com/g/g-aErqmJyws-charm-coach' },
    { id: 18, name: 'MS-PowerPoint', category: 'business', description: 'I assist in creating professional PowerPoint presentations.', link: 'https://chat.openai.com/g/g-vIV2R7wST-ms-powerpoint' },
    { id: 19, name: 'Quill', category: 'writing', description: 'Write blogs like a human', link: 'https://chat.openai.com/g/g-FqN5gHFkP-quill' },
    { id: 20, name: 'Visual Weather Artist GPT', category: 'images', description: 'Hi, Im the visual weather artist, give me your location (or any other) and I will draw the current weather conditions for you, a unique never before seen weather report!', link: 'https://chat.openai.com/g/g-twUGxmpHv-visual-weather-artist-gpt' },
    
  ];

  const container = document.getElementById('container');
  const categoryList = document.getElementById('categoryList');
  const categoryItems = document.querySelectorAll('.category-item');
  const menuIcon = document.querySelector('.menu-icon');
  const menuContainer = document.querySelector('.menu-container');
  const searchInput = document.getElementById('searchInput');
  const paginationContainer = document.getElementById('pagination');
  let currentFilter = 'all';
  const itemsPerPage = 18;

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
                <a href="${tool.link}" target="_blank" rel="noopener noreferrer">Open GPT</a>
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

  renderList('all'); // To render all items when the page loads
});
