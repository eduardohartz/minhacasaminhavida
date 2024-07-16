document.addEventListener('DOMContentLoaded', function () {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(window.location.search);
    const sucesso = urlParams.get('sucesso');
    const id = urlParams.get('id');
    const emprego = urlParams.get('emprego');
    const input = this.getElementById('simulacao');
    const assalariado = this.getElementById('assalariado');
    const autonomo = this.getElementById('autonomo');

    if (id) {
        input.value = id;
    } else if (!sucesso || sucesso == "") {
        window.location.href = '/?sucesso=0';
    }

    if (emprego) {
        if (emprego == 'Assalariado') {
            autonomo.style.visibility = "hidden";
            autonomo.hidden = true;
            assalariado.querySelector("input").setAttribute("required", "");
        } else if (emprego == 'Autonomo') {
            assalariado.style.visibility = "hidden";
            assalariado.hidden = true;
            autonomo.querySelector("input").setAttribute("required", "");
        }
    }

    if(sucesso) {
        if (sucesso.includes('0')) {
            alert('Erro ao enviar os documentos! Mande um email para contato@minhacasaminhavidars.com.br [0]');
        } else if (sucesso.includes('2')) {
            alert('Você precisa preencher todos os campos!');
        } else if (sucesso.includes('3')) {
            alert('Erro ao enviar os documentos! Mande um email para contato@minhacasaminhavidars.com.br [3]');
        }
    }

});

document.getElementById('button').addEventListener('click', function (event) {
    const form = document.getElementById('form');

    if (form.reportValidity()) {
        grecaptcha.ready(function () {
            grecaptcha.execute('6LdNDwYqAAAAALuUlD8MtXV0bl-0jujUuDdQ4bUR', { action: 'submit' }).then(function (token) {
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'g-recaptcha-response');
                input.setAttribute('value', token);
                form.appendChild(input);

                document.getElementById('button').disabled = true;
                console.log("disabled")

                form.submit();
            });
        });
    } else {
        return;
    }
});
