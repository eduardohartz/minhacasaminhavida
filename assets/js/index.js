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

    const cpfInput = document.querySelector('input[name="cpf"]');

    cpfInput.addEventListener('input', function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        let formattedInputValue = '';

        if (inputValue.length > 0) {
            formattedInputValue += inputValue.substring(0, 3);
            if (inputValue.length >= 4) {
                formattedInputValue += '.' + inputValue.substring(3, 6);
                if (inputValue.length >= 7) {
                    formattedInputValue += '.' + inputValue.substring(6, 9);
                    if (inputValue.length >= 10) {
                        formattedInputValue += '-' + inputValue.substring(9, 11);
                    }
                }
            }
        }

        e.target.value = formattedInputValue;
    });

    const urlParams = new URLSearchParams(window.location.search);
    const sucesso = urlParams.get('sucesso');

    if (sucesso) {
        if (sucesso.includes('1')) {
            alert('Obrigado! Em breve um de nossos consultores entrará em contato com o resultado da sua simulação!');
        } else if (sucesso.includes('0')) {
            alert('Erro ao enviar a simulação! Mande um email para contato@minhacasaminhavidars.com.br [0]');
        } else if (sucesso.includes('2')) {
            alert('Você precisa preencher todos os campos!');
        } else if (sucesso.includes('3')) {
            alert('Erro ao enviar a simulaçao! Mande um email para contato@minhacasaminhavidars.com.br [3]');
        }
    }

});

function onSubmit(token) {
    document.getElementById("submit").setAttribute('disabled', 'true');
    document.getElementById("form").submit();
    setTimeout(() => {
        document.getElementById("submit").removeAttribute('disabled');
    }, 2000);
}

