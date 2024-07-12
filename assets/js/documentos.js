document.addEventListener('DOMContentLoaded', function () {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(window.location.search);
    const sucesso = urlParams.get('sucesso');
    const id = urlParams.get('id');
    const input = this.getElementById('simulacao');
    
    if (id) {
        input.value = id;
    } else if(sucesso == "" || !sucesso) {
        //window.location.href = '/?sucesso=0';
    }

    if (sucesso.includes('1')) {
        alert('Upload realizado! Em breve um de nossos consultores entrar\'a em contato com o resultado da sua simulação');
    } else if (sucesso.includes('0')) {
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

