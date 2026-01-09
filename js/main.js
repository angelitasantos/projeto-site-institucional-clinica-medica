fetch('./data/content.json')
    .then(res => res.json())
    .then(data => {
        pagesData = data.pages;
        applyTheme(data.theme);
        loadSite(data);
        loadNews(data.news);
        loadSidebar(data.sidebar);
        loadPages(data.pages);

        showPage('home');
    });

/* =======================
   THEME
======================= */
function applyTheme(theme) {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
}

/* =======================
   SPA CORE
======================= */
function showPage(pageId) {

    // esconde todas as páginas extras
    document.querySelectorAll('.page').forEach(page => {
        page.hidden = true;
    });

    // HOME
    if (pageId === 'home') {
        document.getElementById('home').hidden = false;
        return;
    }

    // OUTRAS PÁGINAS
    document.getElementById('home').hidden = true;

    const page = document.getElementById(pageId);
    if (page) {
        page.hidden = false;
    }
}

/* =======================
   SITE / HEADER / BANNER
======================= */
function loadSite(data) {
    document.title = data.site.title;
    document.querySelector('[data-content="site.name"]').innerText = data.site.name;
    document.getElementById('logo').src = data.site.logo;

    const menu = document.getElementById('menu');
    menu.innerHTML = '';

    data.menu.forEach(item => {

        const label = typeof item === 'string' ? item : item.label;
        const pageId = typeof item === 'string'
            ? item.toLowerCase()
            : item.page;

        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = '#';
        a.innerText = label;
        a.dataset.page = pageId;

        a.addEventListener('click', e => {
            e.preventDefault();
            showPage(pageId);
        });

        li.appendChild(a);
        menu.appendChild(li);
    });

    // banner
    document.querySelector('[data-content="banner.title"]').innerText = data.banner.title;
    document.querySelector('[data-content="banner.subtitle"]').innerText = data.banner.subtitle;

    const bannerOptions = document.getElementById('banner-options');
    bannerOptions.innerHTML = '';

    data.banner.options.forEach((opt, index) => {
        let content = '';

        if (opt.text) {
            content += `<div class="banner-description">${opt.text}</div>`;
        }

        if (opt.hours) {
            content += opt.hours.map(h => `
                <div class="banner-opentime">
                    ${h.day}
                    <div>${h.time}</div>
                </div>
            `).join('');
        }

        if (opt.link) {
            content += `<a href="${opt.link}">Read more</a>`;
        }

        bannerOptions.innerHTML += `
            <div class="banner-box banner${index + 1}">
                <div class="banner-title">${opt.title}</div>
                ${content}
            </div>
        `;
    });

    document.querySelector('[data-content="footer.text"]').innerText = data.footer.text;
}

/* =======================
   NEWS
======================= */
function loadNews(news) {
    const main = document.getElementById('news');

    main.innerHTML = `
        <div class="widget">
            <div class="widget-title">
                <div class="widget-title-text">${news.title}</div>
                <div class="widget-title-bar"></div>
            </div>

            <div class="widget-news">
                ${news.items.map(item => `
                    <article>
                        <a href="#">
                            <div class="news-data">
                                <div class="news-posted-at">${item.date}</div>
                                <div class="news-comments">${item.comments}</div>
                            </div>

                            <div class="news-image">
                                <img src="${item.image}" alt="">
                            </div>

                            <div class="news-title">${item.title}</div>
                            <div class="news-resume">${item.resume}</div>
                        </a>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
}

/* =======================
   SIDEBAR
======================= */
function loadSidebar(sidebar) {
    const aside = document.getElementById('sidebar');

    aside.innerHTML = `
        <div class="widget">
            <div class="widget-title">
                <div class="widget-title-text">${sidebar.departments.title}</div>
                <div class="widget-title-bar"></div>
            </div>

            <div class="widget-body">
                ${sidebar.departments.images.map(img => `
                    <div class="widget-body-box">
                        <img src="${img}" class="img-depto">
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="widget">
            <div class="widget-title">
                <div class="widget-title-text">${sidebar.appointment.title}</div>
                <div class="widget-title-bar"></div>
            </div>

            <div class="widget-description">
                ${sidebar.appointment.description}
            </div>

            <address class="widget-contacts">
                <p><strong>Phone:</strong> ${sidebar.appointment.contacts.phone}</p>
                <p><strong>Email:</strong>
                    <a href="mailto:${sidebar.appointment.contacts.email}">
                        ${sidebar.appointment.contacts.email}
                    </a>
                </p>
                <p>${sidebar.appointment.contacts.pageText}</p>
            </address>
        </div>
    `;
}

/* =======================
   OTHER PAGES
======================= */

function loadPages(pages) {
    if (!pages) return;

    Object.entries(pages).forEach(([pageId, pageData]) => {
        const section = document.getElementById(pageId);
        if (!section) return;

        let html = `<h1>${pageData.title}</h1>`;

        // conteúdo simples
        if (pageData.content) {
            html += pageData.content.map(p => `<p>${p}</p>`).join('');
        }

        // BLOG (com paginação)
        if (pageData.posts) {
            html += `
                <div class="blog-grid"></div>
                <div class="pagination" id="pagination-${pageId}"></div>
            `;
        }

        // GALERIA
        if (pageData.images) {
            html += `
                <div class="gallery">
                    ${pageData.images.map(img => `
                        <img src="${img}" alt="">
                    `).join('')}
                </div>
            `;
        }

        // CONTATO
        if (pageData.email || pageData.phone) {
            html += `
                <address>
                    ${pageData.email ? `<p>Email: ${pageData.email}</p>` : ''}
                    ${pageData.phone ? `<p>Phone: ${pageData.phone}</p>` : ''}
                </address>
            `;
        }

        section.innerHTML = html;

        // 🔥 ATIVA PAGINAÇÃO DO BLOG
        if (pageData.posts) {
            currentPages[pageId] = 1;
            renderBlogPage(pageId, pageData);
        }
    });
}


const modal = document.getElementById('post-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalFooter = document.getElementById('modal-footer');
const closeBtn = modal.querySelector('.modal-close');
const overlay = modal.querySelector('.modal-overlay');

// fechar no X
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// fechar clicando fora
overlay.addEventListener('click', () => {
    modal.classList.add('hidden');
});

document.addEventListener('click', e => {
    const btn = e.target.closest('.blog-card .btn');
    if (!btn) return;

    e.preventDefault();

    const page = btn.dataset.page;
    const index = btn.dataset.index;

    const post = pagesData[page].posts[index];

    modalTitle.innerText = post.modal.head;

    modalBody.innerHTML = post.modal.body
        .map(p => `<p>${p}</p>`)
        .join('');

    modalFooter.innerText = post.modal.footer;

    modal.classList.remove('hidden');
});

let pagesData = {};
const postsPerPage = 3;
const currentPages = {};

function renderBlogPage(pageId, pageData) {
    const page = currentPages[pageId] || 1;
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;

    const posts = pageData.posts.slice(start, end);
    const section = document.getElementById(pageId);

    section.querySelector('.blog-grid').innerHTML = posts
        .map((post, index) => `
            <article class="blog-card">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="btn"
                   data-page="${pageId}"
                   data-index="${start + index}">
                   More information
                </a>
            </article>
        `).join('');

    renderPagination(pageId, pageData.posts.length);
}

function renderPagination(pageId, totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const container = document.getElementById(`pagination-${pageId}`);

    let html = '';

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="page-btn ${i === (currentPages[pageId] || 1) ? 'active' : ''}"
                onclick="goToPage('${pageId}', ${i})">
                ${i}
            </button>
        `;
    }

    container.innerHTML = html;
}

function goToPage(pageId, page) {
    currentPages[pageId] = page;
    renderBlogPage(pageId, pagesData[pageId]);
}
