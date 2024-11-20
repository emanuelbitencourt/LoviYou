const carouselImages = document.querySelector('.carousel-images');
const dots = document.querySelectorAll('.dot');
const timeCounter = document.getElementById('timeCounter');

let index = 0;
let startX = 0;
let endX = 0;

// Atualiza a posição do carrossel e os indicadores
function updateCarousel() {
    const offset = -index * 100;
    carouselImages.style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Adiciona eventos às bolinhas para mudar de imagem
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        index = parseInt(dot.dataset.index);
        updateCarousel();
    });
});

// Função para calcular o tempo desde o dia 06/07 até o momento atual
function updateTimeCounter() {
    const startDate = new Date('2024-06-06T00:00:00');
    const currentDate = new Date();

    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    const diff = currentDate - startDate;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timeCounter.innerHTML = `${years} anos, ${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

// Inicia a contagem do tempo
setInterval(updateTimeCounter, 1000);

// Funcionalidade de deslizar para mudar as imagens
carouselImages.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].pageX;
});

carouselImages.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].pageX;

    const diffX = startX - endX;
    const diffY = Math.abs(e.changedTouches[0].pageY - startX);

    // Verifica se o gesto foi horizontal
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            index = (index + 1) % dots.length; // Vai para a próxima imagem
        } else {
            index = (index - 1 + dots.length) % dots.length; // Vai para a imagem anterior
        }
        updateCarousel();
    }
});

// Inicializa o carrossel
updateCarousel();
