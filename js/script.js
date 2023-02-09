document.addEventListener('DOMContentLoaded', () => {
    function send(event, php){
        console.log("Отправка запроса");
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var req = new XMLHttpRequest();
        req.open('POST', php, true);
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
                json = JSON.parse(this.response); // Ебанный internet explorer 11
                console.log(json);

                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == "success") {
                    // Если сообщение отправлено
                    alert("Сообщение отправлено");
                } else {
                    // Если произошла ошибка
                    alert(`Ошибка. Сообщение не отправлено ${req.status}`);
                }
                // Если не удалось связаться с php файлом
            } else {alert("Ошибка сервера. Номер: "+req.status);}};

// Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function() {alert("Ошибка отправки запроса");};
        req.send(new FormData(event.target));
    }

    const showMore = () => {
        const btnShowMore = document.querySelector('.show-more__btn');
        const blocks = document.querySelectorAll('.reviews .row');

        for(let i = 7; i < blocks.length; i++) {
            blocks[i].style.display = "none";
        }

        let count = 7;

        btnShowMore.addEventListener('click', e => {
            count += 7;
            if(count <= blocks.length) {
                for(let i = 0; i < count; i++) {
                    blocks[i].style.display = 'flex';
                }
            } else if(count >= blocks.length) {
                btnShowMore.style.display = "none";
            }
        })
    }

    showMore();
});