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

    if (sucesso.includes('0')) {
        alert('Erro ao enviar os documentos! Mande um email para contato@minhacasaminhavidars.com.br [0]');
    } else if (sucesso.includes('2')) {
        alert('Você precisa preencher todos os campos!');
    } else if (sucesso.includes('3')) {
        alert('Erro ao enviar os documentos! Mande um email para contato@minhacasaminhavidars.com.br [3]');
    }

});

function onSubmit(token) {
    document.getElementById("form").submit();
}

