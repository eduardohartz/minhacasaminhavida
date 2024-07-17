document.addEventListener('DOMContentLoaded', () => {

    const select = document.getElementById("cidade");

    select.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        const items = document.querySelectorAll('.item');
        const noItemsMessage = document.getElementById("noitems");
        let visibleItemCount = 0;

        items.forEach(item => {
            if (selectedValue === 'todas') {
                item.style.display = '';
                visibleItemCount++;
            } else {
                if (item.classList.contains(selectedValue)) {
                    item.style.display = '';
                    visibleItemCount++;
                } else {
                    item.style.display = 'none';
                }
            }
        });

        if (visibleItemCount === 0) {
            noItemsMessage.style.display = '';
        } else {
            noItemsMessage.style.display = 'none';
        }
    });

    // Image Galleries

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
        document.querySelectorAll('.item').forEach(gallery => {
            const totalUniqueImages = parseInt(gallery.querySelector('.itemimggallery').getAttribute('count'), 10) || 0;
            const totalImages = totalUniqueImages + 24;
            const currentImageIndex = parseInt(gallery.getAttribute('current')) || 0;
            updatePreviews(gallery, currentImageIndex, totalUniqueImages, totalImages);
        });
    }

    function getPreviewImgSrc(name, index, totalUniqueImages) {
        if (index < totalUniqueImages) {
            return `/assets/img/empreendimentos/${name}/${index + 1}p.webp`;
        } else {
            return `/assets/img/empreendimentos/common/${index - totalUniqueImages + 1}p.webp`;
        }
    }

    function getMainImgSrc(name, index, totalUniqueImages) {
        if (index < totalUniqueImages) {
            return `/assets/img/empreendimentos/${name}/${index + 1}.webp`;
        } else {
            return `/assets/img/empreendimentos/common/${index - totalUniqueImages + 1}.webp`;
        }
    }

    const updatePreviews = (gallery, currentImageIndex, totalUniqueImages, totalImages) => {
        const galleryPreviews = gallery.querySelector('.itemimggallery');
        galleryPreviews.innerHTML = '';

        let start = currentImageIndex - Math.floor(previewsToShow / 2);
        if (start < 0) start = 0;
        if (start + previewsToShow > totalImages) start = totalImages - previewsToShow;

        for (let i = start; i < start + previewsToShow; i++) {
            const img = document.createElement('img');
            const name = gallery.querySelector('.itemimggallery').getAttribute('name');
            img.src = getPreviewImgSrc(name, i, totalUniqueImages);
            img.classList.add('itemimgpreview');
            if (i === currentImageIndex) {
                img.classList.add('selected');
            }
            img.onclick = () => {
                updateMainImage(gallery, i, totalUniqueImages, totalImages);
            }
            galleryPreviews.appendChild(img);
        }
    };

    const updateMainImage = (gallery, index, totalUniqueImages, totalImages) => {
        const mainImage = gallery.querySelector('.itemimg');
        const name = gallery.querySelector('.itemimggallery').getAttribute('name');
        mainImage.src = getMainImgSrc(name, index, totalUniqueImages);
        gallery.setAttribute('current', index.toString());
        updatePreviews(gallery, index, totalUniqueImages, totalImages);
    };

    const galleries = document.querySelectorAll('.item');

    galleries.forEach(gallery => {
        const totalUniqueImages = parseInt(gallery.querySelector('.itemimggallery').getAttribute('count'), 10) || 0;
        const totalImages = totalUniqueImages + 24;
        gallery.setAttribute('current', '0');

        const cycleImages = () => {
            let currentImageIndex = parseInt(gallery.getAttribute('current'), 10);
            if (currentImageIndex < totalImages - 1) {
                updateMainImage(gallery, currentImageIndex + 1, totalUniqueImages, totalImages);
            } else {
                updateMainImage(gallery, 0, totalUniqueImages, totalImages);
            }
        };

        gallery.querySelector('.itemarrowleft').addEventListener('click', () => {
            clearInterval(cycleInterval);
            let currentImageIndex = parseInt(gallery.getAttribute('current'), 10);
            if (currentImageIndex > 0) {
                updateMainImage(gallery, currentImageIndex - 1, totalUniqueImages, totalImages);
            } else {
                updateMainImage(gallery, totalImages - 1, totalUniqueImages, totalImages);
            }
        });

        gallery.querySelector('.itemarrowright').addEventListener('click', () => {
            clearInterval(cycleInterval);
            let currentImageIndex = parseInt(gallery.getAttribute('current'), 10);
            if (currentImageIndex < totalImages - 1) {
                updateMainImage(gallery, currentImageIndex + 1, totalUniqueImages, totalImages);
            } else {
                updateMainImage(gallery, 0, totalUniqueImages, totalImages);
            }
        });

        updateMainImage(gallery, 0, totalUniqueImages, totalImages);
        let cycleInterval = setInterval(cycleImages, 3000);
    });

    window.addEventListener('resize', windowAdjust);
    windowAdjust();
});