$(document).ready(function() {
    // Дані для 10 головних новин (дата - червень 2026)
    const newsData = [
        { id: 1, title: "Національна бібліотека отримала грант на цифровізацію фондів", date: "2026-06-01", desc: "Бібліотека ім. Вернадського отримала міжнародний грант для оцифрування 100 000 рідкісних книг.", img: "images/news1.jpg" },
        { id: 2, title: "Харківська бібліотека відновила роботу після ремонту", date: "2026-06-03", desc: "Після масштабної реконструкції бібліотека ім. Короленка знову приймає відвідувачів.", img: "images/news2.jpg" },
        { id: 3, title: "У Львові пройшов форум бібліотекарів", date: "2026-06-05", desc: "Понад 200 спеціалістів обговорили сучасні тенденції бібліотечної справи.", img: "images/news3.jpg" },
        { id: 4, title: "Одеська національна бібліотека святкує 200-річчя", date: "2026-06-07", desc: "Ювілейні заходи триватимуть протягом місяця.", img: "images/news4.jpg" },
        { id: 5, title: "Відкрито доступ до електронних каталогів 5 найбільших бібліотек", date: "2026-06-09", desc: "Тепер усі бажаючі можуть шукати книги онлайн.", img: "images/news5.jpg" },
        { id: 6, title: "Бібліотека Вернадського поповнилась унікальними рукописами", date: "2026-06-10", desc: "Колекція стародруків збільшилась на 500 екземплярів.", img: "images/news6.jpg" },
        { id: 7, title: "Стартував проєкт «Бібліотеки без кордонів»", date: "2026-06-11", desc: "Міжбібліотечний абонемент запрацював у тестовому режимі.", img: "images/news7.jpg" },
        { id: 8, title: "Дні науки у бібліотеках Києва", date: "2026-06-12", desc: "Тиждень науково-популярних лекцій для молоді.", img: "images/news8.jpg" },
        { id: 9, title: "Віртуальні тури бібліотеками України", date: "2026-06-13", desc: "Тепер можна відвідати найбільші книгозбірні онлайн.", img: "images/news9.jpg" },
        { id: 10, title: "Акція «Подаруй бібліотеці книгу»", date: "2026-06-14", desc: "За місяць зібрано понад 5000 книг.", img: "images/news10.jpg" }
    ];

    // Дані для галереї З ІСТОРИЧНИМИ ДОВІДКАМИ
    const galleryItems = [
        { 
            name: "Національна бібліотека ім. Вернадського", 
            img: "images/gallery1.jpg",
            history: "Заснована у 1918 році як Національна бібліотека Української Держави. Сучасної назви набула у 1988 році на честь видатного вченого Володимира Вернадського. Сьогодні це головна наукова бібліотека України, одна з найбільших у світі. Фонд налічує понад 15 мільйонів одиниць зберігання."
        },
        { 
            name: "Харківська бібліотека ім. Короленка", 
            img: "images/gallery2.jpg",
            history: "Заснована у 1886 році як Харківська громадська бібліотека. 1901 року отримала ім'я письменника Володимира Короленка. Це одна з найстаріших бібліотек України, фонд якої налічує понад 7 мільйонів видань."
        },
        { 
            name: "Львівська бібліотека ім. Стефаника", 
            img: "images/gallery3.jpg",
            history: "Заснована у 1940 році на основі бібліотечних фондів НТШ. У 1971 році отримала ім'я академіка Володимира Стефаника. Фонд бібліотеки становить понад 6 мільйонів одиниць, включаючи унікальну колекцію стародруків."
        },
        { 
            name: "Одеська національна бібліотека", 
            img: "images/gallery4.jpg",
            history: "Заснована у 1829 році як Одеська публічна бібліотека. Це одна з найстаріших бібліотек України. Фонд налічує понад 5 мільйонів одиниць зберігання, включаючи рідкісні видання XVI-XVIII століть."
        },
        { 
            name: "Бібліотека Києво-Могилянської академії", 
            img: "images/gallery5.jpg",
            history: "Бібліотека при найстарішому вищому навчальному закладі України, заснованому у 1615 році. Фонд бібліотеки налічує понад 1 мільйон одиниць, включаючи унікальні рукописи та стародруки."
        },
        { 
            name: "Чернівецька обласна бібліотека", 
            img: "images/gallery6.jpg",
            history: "Заснована у 1882 році. Розташована в одній з найкрасивіших будівель міста. Фонд бібліотеки налічує понад 800 тисяч одиниць зберігання, включаючи унікальні буковинські видання."
        },
        { 
            name: "Дніпровська центральна бібліотека", 
            img: "images/gallery7.jpg",
            history: "Заснована у 1900 році. Сьогодні це сучасний інформаційний центр, фонд якого налічує понад 500 тисяч одиниць зберігання. Бібліотека активно впроваджує цифрові технології."
        },
        { 
            name: "Запорізька обласна бібліотека", 
            img: "images/gallery8.jpg",
            history: "Заснована у 1904 році. Фонд бібліотеки налічує понад 600 тисяч одиниць зберігання. Бібліотека є важливим культурним центром Запорізької області."
        }
    ];

    function setActiveMenuItem(pageId) {
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-page="${pageId}"]`).addClass('active');
    }

    function showHome() {
        let html = '<div class="fade-in"><h2 class="text-center mb-4">Головні новини бібліотек України</h2><div class="news-grid">';
        newsData.forEach(news => {
            html += `
                <div class="news-card">
                    <img src="${news.img}" alt="${news.title}" style="width:100%; height:200px; object-fit:cover; border-radius:12px 12px 0 0;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22%3E%3Crect width=%22400%22 height=%22200%22 fill=%22%23ddd%22/%3E%3Ctext x=%22200%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23999%22%3E📷 ${news.img.split('/').pop()}%3C/text%3E%3C/svg%3E'">
                    <div class="content">
                        <h3>${news.title}</h3>
                        <div class="date"><i class="far fa-calendar-alt"></i> ${news.date}</div>
                        <p>${news.desc}</p>
                    </div>
                </div>
            `;
        });
        html += '</div></div>';
        $('#pageContent').html(html);
        setActiveMenuItem('home');
    }

    function showAbout() {
        const html = `
            <div class="fade-in">
                <h2>Про сайт</h2>
                <div class="row mt-4">
                    <div class="col-md-8">
                        <p>Інформаційний портал <strong>«Найбільші бібліотеки України»</strong> створено з метою висвітлення діяльності найбільших книгозбірень нашої країни.</p>
                        <p>На сайті ви знайдете:</p>
                        <ul>
                            <li>Актуальні новини з життя бібліотек</li>
                            <li>Галерею світлин інтер'єрів та фондів</li>
                            <li>Контактну інформацію та розташування на карті</li>
                            <li>Історичні довідки про кожну бібліотеку</li>
                        </ul>
                        <p>Наша мета — популяризувати читання та зробити інформацію про книгозбірні доступною для всіх охочих.</p>
                    </div>
                    <div class="col-md-4">
                        <img src="images/about.jpg" alt="Бібліотека" style="width:100%; height:250px; object-fit:cover; border-radius:12px;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22%3E%3Crect width=%22400%22 height=%22250%22 fill=%22%23ddd%22/%3E%3Ctext x=%22200%22 y=%22120%22 text-anchor=%22middle%22 fill=%22%23999%22%3E📷 about.jpg%3C/text%3E%3C/svg%3E'">
                    </div>
                </div>
            </div>
        `;
        $('#pageContent').html(html);
        setActiveMenuItem('about');
    }

    function showGallery() {
        let html = '<div class="fade-in"><h2 class="mb-4">Галерея бібліотек України</h2><div class="gallery-grid">';
        galleryItems.forEach((item, index) => {
            html += `
                <div class="gallery-item" data-id="${index}">
                    <img src="${item.img}" alt="${item.name}" style="width:100%; height:180px; object-fit:cover; border-radius:12px;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 180%22%3E%3Crect width=%22400%22 height=%22180%22 fill=%22%23ddd%22/%3E%3Ctext x=%22200%22 y=%2290%22 text-anchor=%22middle%22 fill=%22%23999%22%3E📷 ${item.img.split('/').pop()}%3C/text%3E%3C/svg%3E'">
                    <p class="mt-2"><strong>${item.name}</strong></p>
                </div>
            `;
        });
        html += '</div></div>';
        $('#pageContent').html(html);
        
        $('.gallery-item').on('click', function() {
            const index = $(this).data('id');
            const item = galleryItems[index];
            
            $('<div>').html(`
                <div style="text-align:center;">
                    <img src="${item.img}" alt="${item.name}" style="width:100%; border-radius:12px; max-height:300px; object-fit:cover;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23667eea%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22white%22%3E📖 ${item.name}%3C/text%3E%3C/svg%3E'">
                    <div style="margin-top:15px; text-align:left; padding:10px; background:#f9f9f9; border-radius:10px;">
                        <h4 style="color:#5d3a1a; margin-bottom:10px;">📜 Історична довідка</h4>
                        <p style="line-height:1.5; color:#333;">${item.history}</p>
                        <p style="margin-top:10px; font-size:0.85rem; color:#8B6914;"><i class="fas fa-info-circle"></i> Дані з офіційних джерел</p>
                    </div>
                </div>
            `).dialog({
                title: item.name,
                modal: true,
                width: 550,
                open: function(event, ui) {
                    $(this).parent().find('.ui-dialog-titlebar-close').hide();
                },
                buttons: { 
                    "Закрити": function() { 
                        $(this).dialog("close"); 
                    } 
                }
            });
        });
        setActiveMenuItem('gallery');
    }

    function showNews() {
        let html = '<div class="fade-in"><h2 class="mb-4">Архів новин</h2><div class="news-grid">';
        newsData.slice(0, 6).forEach(news => {
            html += `
                <div class="news-card">
                    <img src="${news.img}" alt="${news.title}" style="width:100%; height:200px; object-fit:cover; border-radius:12px 12px 0 0;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22%3E%3Crect width=%22400%22 height=%22200%22 fill=%22%23ddd%22/%3E%3Ctext x=%22200%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23999%22%3E📷 ${news.img.split('/').pop()}%3C/text%3E%3C/svg%3E'">
                    <div class="content">
                        <h3>${news.title}</h3>
                        <div class="date"><i class="far fa-calendar-alt"></i> ${news.date}</div>
                        <p>${news.desc}</p>
                    </div>
                </div>
            `;
        });
        html += '</div></div>';
        $('#pageContent').html(html);
        setActiveMenuItem('news');
    }

    function showContacts() {
        const html = `
            <div class="fade-in">
                <h2>Контакти</h2>
                <div class="row mt-4">
                    <div class="col-md-5">
                        <h4>Національна бібліотека України ім. Вернадського</h4>
                        <p><i class="fas fa-map-marker-alt"></i> <strong>Адреса:</strong> просп. Голосіївський, 3, Київ, 03039</p>
                        <p><i class="fas fa-phone"></i> <strong>Телефон:</strong> +38 (044) 525-81-04</p>
                        <p><i class="fas fa-envelope"></i> <strong>Email:</strong> info@library-portal.ua</p>
                        <hr>
                        <h4>Режим роботи</h4>
                        <ul class="list-unstyled">
                            <li><strong>Понеділок – п'ятниця:</strong> 9:30 – 17:30</li>
                            <li><strong>Субота:</strong> 9:30 – 15:30</li>
                            <li><strong>Неділя:</strong> вихідний</li>
                        </ul>
                        <p class="text-danger mt-2"><i class="fas fa-exclamation-triangle"></i> <strong>Важливо:</strong> Останній робочий день місяця — санітарний</p>
                    </div>
                    <div class="col-md-7">
                        <div class="map-container">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.345678901234!2d30.5159114!3d50.4043319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf3670088fd9%3A0x49b05be4301c9d63!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QsCDQsdGW0LHQu9GW0L7RgtC10LrQsCDQo9C60YDQsNGX0L3QuCDRltC80LXQvdGWINCSLiDQhi4g0JLQtdGA0L3QsNC00YHRjNC60L7Qs9C-!5e0!3m2!1suk!2sua!4v1234567890123!5m2!1suk!2sua" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#pageContent').html(html);
        setActiveMenuItem('contacts');
    }

    function loadPage(page) {
        switch(page) {
            case 'home': showHome(); break;
            case 'about': showAbout(); break;
            case 'gallery': showGallery(); break;
            case 'news': showNews(); break;
            case 'contacts': showContacts(); break;
            default: showHome();
        }
    }

    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        loadPage($(this).data('page'));
    });

    loadPage('home');
});