document.addEventListener('DOMContentLoaded', function () {

    function maskTelefone(value) {
        let digits = value.replace(/\D/g, '');
        if (!digits.startsWith('55')) digits = '55' + digits;
        digits = digits.substring(2, 13);
        let out = '+55 ';
        if (digits.length > 0) {
            out += '(' + digits.substring(0, 2);
            if (digits.length >= 3) {
                out += ') ' + digits.substring(2, 7);
                if (digits.length >= 8) out += '-' + digits.substring(7, 11);
            }
        }
        return out;
    }

    function maskCpf(value) {
        const d = value.replace(/\D/g, '').slice(0, 11);
        let out = d.substring(0, 3);
        if (d.length >= 4) out += '.' + d.substring(3, 6);
        if (d.length >= 7) out += '.' + d.substring(6, 9);
        if (d.length >= 10) out += '-' + d.substring(9, 11);
        return out;
    }

    function maskData(value) {
        const d = value.replace(/\D/g, '').slice(0, 8);
        let out = d.substring(0, 2);
        if (d.length >= 3) out += '/' + d.substring(2, 4);
        if (d.length >= 5) out += '/' + d.substring(4, 8);
        return out;
    }

    function maskMoeda(value) {
        const d = value.replace(/\D/g, '').slice(0, 9);
        if (!d) return '';
        return 'R$ ' + (parseInt(d, 10) / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function bindMask(id, mask) {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', function (e) {
            e.target.value = mask(e.target.value);
        });
    }

    bindMask('telefone', maskTelefone);
    bindMask('cpf', maskCpf);
    bindMask('nascimento', maskData);
    bindMask('renda', maskMoeda);

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
            nota: 'Sua renda passa do teto do Minha Casa Minha Vida, mas também trabalhamos com financiamento SBPE. Faça a simulação e um consultor apresenta as condições.'
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
            img.decoding = 'async';
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
        fetch('/api/imoveis?destaque=1&limit=6')
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
    if (!form) return;

    const panels = Array.from(form.querySelectorAll('.simpanel'));
    const stepTabs = Array.from(document.querySelectorAll('.simstep'));
    const submitButton = document.getElementById('formsubmit');
    const formStatus = document.getElementById('formstatus');

    function setStatus(message, isError) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.classList.toggle('error', !!isError);
    }

    function showStep(step) {
        panels.forEach(function (panel) {
            const isCurrent = panel.dataset.step === String(step);
            panel.hidden = !isCurrent;
            panel.classList.toggle('current', isCurrent);
        });
        stepTabs.forEach(function (tab) {
            tab.classList.toggle('current', Number(tab.dataset.step) <= step);
        });
        const anchor = document.getElementById('simulador');
        if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function digitsOf(value) {
        return (value || '').replace(/\D/g, '');
    }

    function isValidDate(value) {
        const parts = digitsOf(value);
        if (parts.length !== 8) return false;
        const day = Number(parts.slice(0, 2));
        const month = Number(parts.slice(2, 4));
        const year = Number(parts.slice(4, 8));
        const date = new Date(year, month - 1, day);
        if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) return false;
        const age = (Date.now() - date.getTime()) / 31557600000;
        return age >= 18 && age <= 100;
    }

    const VALIDATORS = {
        cpf: function (v) { return digitsOf(v).length === 11; },
        telefone: function (v) { return digitsOf(v).length >= 12; },
        data_nascimento: isValidDate,
        renda: function (v) { return digitsOf(v).length > 0 && parseInt(digitsOf(v), 10) > 0; },
        email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
        nome: function (v) { return v.trim().split(/\s+/).length >= 2; }
    };

    const MESSAGES = {
        cpf: 'Informe um CPF completo (11 dígitos).',
        telefone: 'Informe um telefone com DDD.',
        data_nascimento: 'Informe uma data de nascimento válida (você precisa ter 18 anos ou mais).',
        renda: 'Informe a renda bruta mensal.',
        email: 'Informe um e-mail válido.',
        nome: 'Informe o seu nome completo.'
    };

    function validatePanel(panel) {
        let firstError = null;

        panel.querySelectorAll('.simfield').forEach(function (field) {
            const input = field.querySelector('.input');
            if (!input) return;
            const name = input.getAttribute('name');
            const value = input.value || '';
            const validator = VALIDATORS[name];
            const ok = value.trim() !== '' && (!validator || validator(value));
            field.classList.toggle('invalid', !ok);
            if (!ok && !firstError) firstError = { el: input, msg: MESSAGES[name] || 'Preencha este campo.' };
        });

        panel.querySelectorAll('.simquestion').forEach(function (question) {
            const radios = question.querySelectorAll('input[type="radio"]');
            if (!radios.length) return;
            const answered = Array.prototype.some.call(radios, function (r) { return r.checked; });
            question.classList.toggle('invalid', !answered);
            if (!answered && !firstError) firstError = { el: radios[0], msg: 'Escolha uma opção.' };
        });

        if (firstError) {
            setStatus(firstError.msg, true);
            firstError.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (firstError.el.focus) firstError.el.focus({ preventScroll: true });
            return false;
        }
        setStatus('', false);
        return true;
    }

    form.addEventListener('click', function (event) {
        const next = event.target.closest('.simnext');
        if (next) {
            const panel = next.closest('.simpanel');
            if (validatePanel(panel)) showStep(Number(next.dataset.goto));
            return;
        }
        const back = event.target.closest('.simback');
        if (back) {
            setStatus('', false);
            showStep(Number(back.dataset.goto));
        }
    });

    form.addEventListener('input', function (event) {
        const field = event.target.closest('.simfield');
        if (field) field.classList.remove('invalid');
    });
    form.addEventListener('change', function (event) {
        const question = event.target.closest('.simquestion');
        if (question) question.classList.remove('invalid');
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        for (let i = 0; i < panels.length; i++) {
            if (!validatePanel(panels[i])) {
                showStep(Number(panels[i].dataset.step));
                return;
            }
        }

        const data = Object.fromEntries(new FormData(form).entries());
        const rendaDigits = digitsOf(data.renda);

        const payload = {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            cpf: data.cpf,
            data_nascimento: data.data_nascimento,
            renda: rendaDigits ? String(parseInt(rendaDigits, 10) / 100) : '',
            fgts: data.fgts,
            dependentes: data.dependentes,
            tipo_imovel: data.tipo_imovel,
            objetivo: data.objetivo,
            estado: data.estado,
            cidade: data.cidade,
            outro_imovel: data.outro_imovel,
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
