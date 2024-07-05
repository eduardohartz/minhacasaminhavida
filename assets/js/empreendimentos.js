document.addEventListener('DOMContentLoaded', () => {
    let currentImageIndex = 0;
    const totalImages = 25;
    let previewsToShow = 7;

    function windowAdjust() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 350) {
            previewsToShow = 2;
        } else if (screenWidth >= 350 && screenWidth < 600) {
            previewsToShow = 3;
        } else if (screenWidth >= 600 && screenWidth < 850) {
            previewsToShow = 5;
        } else {
            previewsToShow = 7;
        }
        updatePreviews();
    }

    const updateMainImage = (index) => {
        const mainImage = document.querySelector('.itemimg');
        mainImage.src = `/cdn-cgi/image/width=850/assets/img/empreendimentos/saltlake/${index + 1}.webp`;
        currentImageIndex = index;
        updatePreviews();
    };

    const updatePreviews = () => {
        const gallery = document.querySelector('.itemimggallery');
        gallery.innerHTML = '';

        let start = currentImageIndex - Math.floor(previewsToShow / 2);
        if (start < 0) start = 0;
        if (start + previewsToShow > totalImages) start = totalImages - previewsToShow;

        for (let i = start; i < start + previewsToShow; i++) {
            const img = document.createElement('img');
            img.src = `/cdn-cgi/image/width=850/assets/img/empreendimentos/saltlake/${i + 1}.webp`;
            img.classList.add('itemimgpreview');
            if (i === currentImageIndex) {
                img.classList.add('selected');
            }
            img.onclick = () => updateMainImage(i);
            gallery.appendChild(img);
        }
    };

    const initArrows = () => {
        document.querySelector('.itemarrowleft').addEventListener('click', () => {
            if (currentImageIndex > 0) {
                updateMainImage(currentImageIndex - 1);
            }
        });

        document.querySelector('.itemarrowright').addEventListener('click', () => {
            if (currentImageIndex < totalImages - 1) {
                updateMainImage(currentImageIndex + 1);
            }
        });
    };

    updateMainImage(0);
    initArrows();
    windowAdjust();
    window.addEventListener('resize', windowAdjust);
});