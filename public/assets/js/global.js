document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("modal");
    var open = document.getElementById("navmenubtn");
    var close = document.getElementsByClassName("close")[0];

    open.onclick = function () {
        modal.style.animation = "slideInFromRight 0.2s";
        modal.style.display = "block";
        document.body.style.overflow = "hidden"
    }

    close.onclick = function () {
        modal.style.animation = "slideOutToRight 0.2s forwards";

        modal.addEventListener('animationend', function () {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }, { once: true });
    }

});
