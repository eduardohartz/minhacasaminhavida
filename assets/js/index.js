document.addEventListener('DOMContentLoaded', function () {

    const telefoneInput = document.querySelector('input[name="telefone"]');

    telefoneInput.addEventListener('input', function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        let formattedInputValue = '+55 ';

        if (!inputValue.startsWith('55')) {
            inputValue = '55' + inputValue;
        }

        inputValue = inputValue.substring(2);

        if (inputValue.length > 0) {
            formattedInputValue += '(' + inputValue.substring(0, 2);
            if (inputValue.length >= 3) {
                formattedInputValue += ') ' + inputValue.substring(2, 7);
                if (inputValue.length >= 8) {
                    formattedInputValue += '-' + inputValue.substring(7, 11);
                }
            }
        }

        e.target.value = formattedInputValue;
    });

    const queryString = window.location.search;
    if (queryString.includes('1')) {
        alert('Simulacao enviada com sucesso!');
    } else if (queryString.includes('0')) {
        alert('Erro ao enviar a simulacao!');
    } else if (queryString.includes('2')) {
        alert('Você precisa preencher todos os campos!');
    }

});

function simulador() {
    modal.style.animation = "slideOutToRight 0.2s forwards";
    modal.style.display = "none";
    document.body.style.overflow = "auto";

    document.getElementById('simulador').scrollIntoView({
        behavior: 'smooth'
    });
}

