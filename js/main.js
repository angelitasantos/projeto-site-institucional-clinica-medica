fetch('./data/content.json')
    .then(res => res.json())
    .then(data => {
        applyTheme(data.theme);
        loadSite(data);
        loadNews(data.news);
        loadSidebar(data.sidebar);
    });

function applyTheme(theme) {
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
}

function loadSite(data) {
    document.title = data.site.title;
    document.querySelector('[data-content="site.name"]').innerText = data.site.name;
    document.getElementById('logo').src = data.site.logo;

    const menu = document.getElementById('menu');
    data.menu.forEach(item => {
        menu.innerHTML += `<li><a href="#">${item}</a></li>`;
    });

    document.querySelector('[data-content="banner.title"]').innerText = data.banner.title;
    document.querySelector('[data-content="banner.subtitle"]').innerText = data.banner.subtitle;

    const bannerOptions = document.getElementById('banner-options');
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

function loadNews(news) {
    const main = document.getElementById('news');

    let html = `
        <div class="widget">
            <div class="widget-title">
                <div class="widget-title-text">${news.title}</div>
                <div class="widget-title-bar"></div>
            </div>
            <div class="widget-news">
    `;

    news.items.forEach(item => {
        html += `
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
        `;
    });

    html += `</div></div>`;
    main.innerHTML = html;
}

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
