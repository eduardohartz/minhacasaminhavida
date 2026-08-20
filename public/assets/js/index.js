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

    const FAIXAS = [
        {
            ate: 3200,
            nome: 'Faixa 1',
            teto: 'R$ 275 mil',
            juros: '4,00% a 5,25%',
            subsidio: 'Até R$ 55 mil',
            nota: 'Você está na faixa com as menores taxas do mercado e com o maior subsídio do programa, que abate direto o valor da entrada.'
        },
        {
            ate: 5000,
            nome: 'Faixa 2',
            teto: 'R$ 275 mil',
            juros: '4,75% a 7,00%',
            subsidio: 'Via Fator Social',
            nota: 'Sua faixa tem juros bem abaixo do crédito imobiliário tradicional e ainda pode receber subsídio, dependendo do perfil da família.'
        },
        {
            ate: 9600,
            nome: 'Faixa 3',
            teto: 'R$ 400 mil',
            juros: '7,66% a 8,16%',
            subsidio: 'Não se aplica',
            nota: 'Com o teto em R$ 400 mil você consegue escolher unidades com mais metragem ou em melhor localização.'
        },
        {
            ate: 13000,
            nome: 'Faixa 4 — Classe Média',
            teto: 'R$ 600 mil',
            juros: '10,00%',
            subsidio: 'Não se aplica',
            nota: 'A Faixa 4 foi criada justamente para a classe média, com imóveis de até R$ 600 mil dentro do programa.'
        },
        {
            ate: Infinity,
            nome: 'SBPE',
            teto: 'Sem teto do programa',
            juros: 'Conforme o banco',
            subsidio: 'Não se aplica',
            nota: 'Sua renda passa do teto do Minha Casa Minha Vida, mas também trabalhamos com financiamento SBPE. Faça a análise e um consultor apresenta as condições.'
        }
    ];

    const calcRenda = document.getElementById('calcrenda');
    const calcResult = document.getElementById('calcresult');

    if (calcRenda && calcResult) {
        const calcFaixa = document.getElementById('calcfaixa');
        const calcTeto = document.getElementById('calcteto');
        const calcJuros = document.getElementById('calcjuros');
        const calcSubsidio = document.getElementById('calcsubsidio');
        const calcNote = document.getElementById('calcnote');

        function formatCurrency(digits) {
            const cents = parseInt(digits, 10);
            if (!digits || isNaN(cents)) {
                return '';
            }
            return 'R$ ' + (cents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        calcRenda.addEventListener('input', function (e) {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
            e.target.value = formatCurrency(digits);

            const renda = digits ? parseInt(digits, 10) / 100 : 0;

            if (renda <= 0) {
                calcResult.hidden = true;
                return;
            }

            const faixa = FAIXAS.find(function (f) { return renda <= f.ate; });

            calcFaixa.textContent = faixa.nome;
            calcTeto.textContent = faixa.teto;
            calcJuros.textContent = faixa.juros;
            calcSubsidio.textContent = faixa.subsidio;
            calcNote.textContent = faixa.nota;
            calcResult.hidden = false;
        });
    }

    const destaquesSection = document.getElementById('destaques');
    const destaqueGrid = document.getElementById('destaquegrid');

    function formatValor(valor) {
        if (!valor || valor <= 0) {
            return 'Consulte';
        }
        return 'R$ ' + Number(valor).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    }

    function destaqueCard(imovel) {
        const card = document.createElement('a');
        card.className = 'destaquecard';
        card.href = '/empreendimentos';

        if (imovel.imagem_principal) {
            const img = document.createElement('img');
            img.src = imovel.imagem_principal;
            img.alt = imovel.nome || 'Empreendimento';
            img.loading = 'lazy';
            card.appendChild(img);
        }

        const body = document.createElement('div');
        body.className = 'destaquebody';

        const nome = document.createElement('span');
        nome.className = 'destaquenome';
        nome.textContent = imovel.nome || 'Empreendimento';
        body.appendChild(nome);

        const local = [imovel.bairro, imovel.cidade].filter(Boolean).join(', ');
        if (local) {
            const localSpan = document.createElement('span');
            localSpan.className = 'destaquelocal';
            localSpan.textContent = local;
            body.appendChild(localSpan);
        }

        const specs = [];
        if (imovel.dormitorios) specs.push(imovel.dormitorios + ' dorm');
        if (imovel.banheiros) specs.push(imovel.banheiros + ' banh');
        if (imovel.vagas) specs.push(imovel.vagas + ' vaga' + (imovel.vagas > 1 ? 's' : ''));
        if (imovel.area) specs.push(Number(imovel.area).toLocaleString('pt-BR') + ' m²');
        if (specs.length) {
            const specSpan = document.createElement('span');
            specSpan.className = 'destaquespecs';
            specSpan.textContent = specs.join(' · ');
            body.appendChild(specSpan);
        }

        const valor = document.createElement('span');
        valor.className = 'destaquevalor';
        valor.textContent = formatValor(imovel.valor);
        body.appendChild(valor);

        card.appendChild(body);
        return card;
    }

    if (destaquesSection && destaqueGrid) {
        fetch('/api/imoveis?destaque=1&limit=3')
            .then(function (response) {
                if (!response.ok) throw new Error('failed');
                return response.json();
            })
            .then(function (payload) {
                const imoveis = (payload && payload.data) || [];
                if (!imoveis.length) {
                    return;
                }
                imoveis.forEach(function (imovel) {
                    destaqueGrid.appendChild(destaqueCard(imovel));
                });
                destaquesSection.hidden = false;
            })
            .catch(function () {
            });
    }

    const form = document.getElementById('form');
    const submitButton = document.getElementById('formsubmit');
    const formStatus = document.getElementById('formstatus');

    function setStatus(message, isError) {
        formStatus.textContent = message;
        formStatus.classList.toggle('error', !!isError);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        if (document.getElementById('renda').value === 'Só tenho bolsa familia') {
            setStatus('Se a renda familiar for somente do Bolsa Família, não conseguimos dar seguimento à simulação. Fale conosco pelo WhatsApp.', true);
            return;
        }

        const data = Object.fromEntries(new FormData(form).entries());

        const payload = {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            cpf: data.cpf,
            renda: data.renda,
            estado_civil: data.estadocivil,
            fgts: data.fgts,
            dependentes: data.dependentes,
            emprego: data.emprego,
            midia: data.midia
        };

        submitButton.disabled = true;
        setStatus('Enviando...', false);

        fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(function (response) {
                if (!response.ok) throw new Error('failed');
                window.location.href = '/documentos';
            })
            .catch(function () {
                submitButton.disabled = false;
                setStatus('Não foi possível enviar a sua simulação. Tente novamente ou fale conosco pelo WhatsApp.', true);
            });
    });

});
