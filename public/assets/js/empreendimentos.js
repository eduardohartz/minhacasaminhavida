document.addEventListener('DOMContentLoaded', () => {

    const AMENIDADES_IMOVEL = [
        { key: 'dormitorio_com_armario', label: 'Dormitório com armário' },
        { key: 'armario_embutido', label: 'Armário embutido' },
        { key: 'suite_master', label: 'Suíte master' },
        { key: 'closet', label: 'Closet' },
        { key: 'banheiro_social', label: 'Banheiro social' },
        { key: 'banheiro_auxiliar', label: 'Banheiro auxiliar' },
        { key: 'lavabo', label: 'Lavabo' },
        { key: 'sala', label: 'Sala' },
        { key: 'sala_de_estar', label: 'Sala de estar' },
        { key: 'sala_de_jantar', label: 'Sala de jantar' },
        { key: 'sala_de_tv', label: 'Sala de TV' },
        { key: 'estar_intimo', label: 'Estar íntimo' },
        { key: 'cozinha', label: 'Cozinha' },
        { key: 'cozinha_americana', label: 'Cozinha americana' },
        { key: 'copa_cozinha', label: 'Copa e cozinha' },
        { key: 'copa', label: 'Copa' },
        { key: 'despensa', label: 'Despensa' },
        { key: 'area_de_servico', label: 'Área de serviço' },
        { key: 'lavanderia', label: 'Lavanderia' },
        { key: 'deposito', label: 'Depósito' },
        { key: 'sacada', label: 'Sacada' },
        { key: 'sacada_com_churrasqueira', label: 'Sacada com churrasqueira' },
        { key: 'churrasqueira', label: 'Churrasqueira' },
        { key: 'espaco_gourmet', label: 'Espaço gourmet' },
        { key: 'terraco', label: 'Terraço' },
        { key: 'deck', label: 'Deck' },
        { key: 'escritorio', label: 'Escritório' },
        { key: 'home_theather', label: 'Home theater' },
        { key: 'lareira', label: 'Lareira' },
        { key: 'hidromassagem', label: 'Hidromassagem' },
        { key: 'hidro_suite', label: 'Hidro na suíte' },
        { key: 'adega', label: 'Adega' },
        { key: 'bar', label: 'Bar' },
        { key: 'mezanino', label: 'Mezanino' },
        { key: 'sotao', label: 'Sótão' },
        { key: 'porao', label: 'Porão' },
        { key: 'pe_direito_alto', label: 'Pé-direito alto' },
        { key: 'vista_panoramica', label: 'Vista panorâmica' },
        { key: 'mobiliado', label: 'Mobiliado' },
        { key: 'semi_mobiliado', label: 'Semimobiliado' },
        { key: 'reformado', label: 'Reformado' },
        { key: 'ar_condicionado', label: 'Ar-condicionado' },
        { key: 'ar_central', label: 'Ar central' },
        { key: 'aquecimento_central', label: 'Aquecimento central' },
        { key: 'aquecimento_eletrico', label: 'Aquecimento elétrico' },
        { key: 'agua_quente', label: 'Água quente' },
        { key: 'calefacao', label: 'Calefação' },
        { key: 'gas_central', label: 'Gás central' },
        { key: 'entrada_de_servico_independente', label: 'Entrada de serviço independente' },
    ];

    const AMENIDADES_LAZER = [
        { key: 'condominio_fechado', label: 'Condomínio fechado' },
        { key: 'vigilancia24hrs', label: 'Segurança 24h' },
        { key: 'portaria', label: 'Portaria' },
        { key: 'porteiro_eletronico', label: 'Porteiro eletrônico' },
        { key: 'guarita', label: 'Guarita' },
        { key: 'interfone', label: 'Interfone' },
        { key: 'zelador', label: 'Zelador' },
        { key: 'elevador', label: 'Elevador' },
        { key: 'elevador_de_servico', label: 'Elevador de serviço' },
        { key: 'piscina', label: 'Piscina' },
        { key: 'piscina_aquecida', label: 'Piscina aquecida' },
        { key: 'academia', label: 'Academia' },
        { key: 'sauna', label: 'Sauna' },
        { key: 'spa', label: 'Spa' },
        { key: 'quadra_de_esportes', label: 'Quadra poliesportiva' },
        { key: 'quadra_de_tenis', label: 'Quadra de tênis' },
        { key: 'churrasqueira_no_condominio', label: 'Churrasqueiras' },
        { key: 'salao_des_festas', label: 'Salão de festas' },
        { key: 'salao_de_jogos', label: 'Salão de jogos' },
        { key: 'brinquedoteca', label: 'Brinquedoteca' },
        { key: 'playground', label: 'Playground' },
        { key: 'terraco_coletivo', label: 'Terraço coletivo' },
        { key: 'jardim', label: 'Jardim' },
        { key: 'patio', label: 'Pátio' },
        { key: 'bicicletario', label: 'Bicicletário' },
        { key: 'canil', label: 'Espaço pet' },
        { key: 'garagem', label: 'Garagem' },
        { key: 'garagem_coberta', label: 'Garagem coberta' },
        { key: 'estacionamento', label: 'Estacionamento' },
        { key: 'estacionamento_para_visitantes', label: 'Estacionamento para visitantes' },
        { key: 'gerador_de_energia', label: 'Gerador de energia' },
        { key: 'onibus_proximo', label: 'Ônibus próximo' },
    ];

    const cardGrid = document.getElementById('cardgrid');
    const loading = document.getElementById('loading');
    const noItems = document.getElementById('noitems');
    const loadError = document.getElementById('loaderror');
    const buscaInput = document.getElementById('busca');
    const cidadeSelect = document.getElementById('cidade');
    const bairroSelect = document.getElementById('bairro');
    const dormSelect = document.getElementById('dormitorios');
    const valorSelect = document.getElementById('valormax');
    const filtroCount = document.getElementById('filtrocount');
    const filtroLimpar = document.getElementById('filtrolimpar');
    const shuffle = document.getElementById('landingshuffle');

    const detalhe = document.getElementById('detalhe');
    const detalheConteudo = document.getElementById('detalheconteudo');
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightboxmedia');
    const lightboxContador = document.getElementById('lightboxcontador');

    let imoveis = [];

    const VIDEO_RE = /\.(?:mp4|webm|mov|m4v|ogg|ogv|avi)(?:\?.*)?$/i;

    function ehVideo(src) {
        return VIDEO_RE.test(src || '');
    }

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function amenidades(imovel, lista) {
        return lista.filter(item => imovel[item.key] === 1 || imovel[item.key] === true)
            .map(item => item.label);
    }

    function formatValor(valor) {
        if (!valor || valor <= 0) return 'Consulte';
        return 'R$ ' + Number(valor).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    }

    function imagensDe(imovel) {
        const out = [];
        if (imovel.imagem_principal) out.push(imovel.imagem_principal);
        (imovel.imagens || []).forEach(url => {
            if (out.indexOf(url) === -1) out.push(url);
        });
        return out;
    }

    function specsDe(imovel) {
        const specs = [];
        if (imovel.dormitorios) specs.push(imovel.dormitorios + ' dorm');
        if (imovel.banheiros) specs.push(imovel.banheiros + ' banh');
        if (imovel.vagas) specs.push(imovel.vagas + ' vaga' + (imovel.vagas > 1 ? 's' : ''));
        if (imovel.area) specs.push(Number(imovel.area).toLocaleString('pt-BR') + ' m²');
        return specs;
    }

    function iniciarShuffle(destaques) {
        const fotos = destaques.map(i => i.imagem_principal).filter(src => src && !ehVideo(src));
        if (!fotos.length || !shuffle) return;

        const camadas = fotos.map((src, index) => {
            const img = el('img', 'landingslide' + (index === 0 ? ' visible' : ''));
            img.alt = '';
            img.decoding = 'async';
            if (index === 0) {
                img.src = src;
                img.fetchPriority = 'high';
            }
            shuffle.appendChild(img);
            return img;
        });

        shuffle.classList.add('active');
        if (camadas.length < 2) return;

        function carregar(index) {
            const img = camadas[index];
            if (!img.src) img.src = fotos[index];
        }

        let atual = 0;
        setInterval(() => {
            const proximo = (atual + 1) % camadas.length;
            carregar(proximo);
            camadas[atual].classList.remove('visible');
            atual = proximo;
            camadas[atual].classList.add('visible');
            carregar((atual + 1) % camadas.length);
        }, 5000);
    }

    function buildCard(imovel) {
        const card = el('button', 'empcard');
        card.type = 'button';
        card.imovel = imovel;

        const capa = ehVideo(imovel.imagem_principal) ? null : imovel.imagem_principal;
        if (capa) {
            const img = el('img');
            img.src = capa;
            img.alt = imovel.nome || 'Empreendimento';
            img.loading = 'lazy';
            img.decoding = 'async';
            card.appendChild(img);
        }

        const body = el('div', 'empcardbody');
        body.appendChild(el('span', 'empcardnome', imovel.nome || 'Empreendimento'));

        const local = [imovel.bairro, imovel.cidade].filter(Boolean).join(', ');
        if (local) body.appendChild(el('span', 'empcardlocal', local));

        const specs = specsDe(imovel);
        if (specs.length) body.appendChild(el('span', 'empcardspecs', specs.join(' · ')));

        body.appendChild(el('span', 'empcardvalor', formatValor(imovel.valor)));
        body.appendChild(el('span', 'empcardver', 'Ver detalhes'));

        card.appendChild(body);
        card.addEventListener('click', () => abrirDetalhe(imovel));
        return card;
    }

    let galeriaImagens = [];
    let galeriaIndex = 0;
    let galeriaTimer = null;
    let previewsToShow = 7;

    function previewCount() {
        const w = window.innerWidth;
        if (w < 350) return 2;
        if (w < 600) return 3;
        if (w < 850) return 5;
        return 7;
    }

    function renderPreviews() {
        const strip = detalhe.querySelector('.itemimggallery');
        if (!strip) return;
        strip.innerHTML = '';

        let start = galeriaIndex - Math.floor(previewsToShow / 2);
        if (start + previewsToShow > galeriaImagens.length) start = galeriaImagens.length - previewsToShow;
        if (start < 0) start = 0;

        for (let i = start; i < Math.min(start + previewsToShow, galeriaImagens.length); i++) {
            const src = galeriaImagens[i];
            const index = i;
            const selecionado = i === galeriaIndex ? ' selected' : '';
            let thumb;

            if (ehVideo(src)) {
                thumb = el('span', 'itemimgpreview itemimgpreviewvideo' + selecionado);
                const video = el('video');
                video.src = src;
                video.muted = true;
                video.playsInline = true;
                video.preload = 'metadata';
                thumb.appendChild(video);
                thumb.appendChild(el('span', 'itemimgplay'));
            }
            else {
                thumb = el('img', 'itemimgpreview' + selecionado);
                thumb.src = src;
                thumb.alt = 'Foto do empreendimento';
                thumb.loading = 'lazy';
                thumb.decoding = 'async';
            }

            thumb.addEventListener('click', () => {
                pararCiclo();
                mostrarImagem(index);
            });
            strip.appendChild(thumb);
        }
    }

    function mostrarImagem(index) {
        galeriaIndex = index;
        const atual = detalhe.querySelector('.itemimg');
        if (atual) atual.replaceWith(criarMidiaPrincipal(index));
        renderPreviews();
    }

    function criarMidiaPrincipal(index) {
        const src = galeriaImagens[index];
        if (ehVideo(src)) {
            const video = el('video', 'itemimg');
            video.src = src;
            video.controls = true;
            video.muted = true;
            video.playsInline = true;
            video.preload = 'metadata';
            return video;
        }
        const img = el('img', 'itemimg');
        img.src = src;
        img.alt = 'Foto do empreendimento';
        img.decoding = 'async';
        img.addEventListener('click', abrirLightbox);
        return img;
    }

    function passar(delta) {
        const total = galeriaImagens.length;
        mostrarImagem((galeriaIndex + delta + total) % total);
    }

    function pararCiclo() {
        if (galeriaTimer) clearInterval(galeriaTimer);
        galeriaTimer = null;
    }

    function abrirLightbox() {
        if (!galeriaImagens.length) return;
        atualizarLightbox();
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function atualizarLightbox() {
        const src = galeriaImagens[galeriaIndex];
        lightboxMedia.innerHTML = '';
        if (ehVideo(src)) {
            const video = el('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            lightboxMedia.appendChild(video);
        }
        else {
            const img = el('img');
            img.src = src;
            img.alt = 'Foto do empreendimento ampliada';
            lightboxMedia.appendChild(img);
        }
        lightboxContador.textContent = galeriaImagens.length > 1
            ? (galeriaIndex + 1) + ' / ' + galeriaImagens.length
            : '';
        const multiplas = galeriaImagens.length > 1;
        document.getElementById('lightboxanterior').hidden = !multiplas;
        document.getElementById('lightboxproxima').hidden = !multiplas;
    }

    function fecharLightbox() {
        lightbox.hidden = true;
        lightboxMedia.innerHTML = '';
        if (detalhe.hidden) document.body.style.overflow = '';
    }

    document.getElementById('lightboxfechar').addEventListener('click', fecharLightbox);
    document.getElementById('lightboxanterior').addEventListener('click', () => {
        passar(-1);
        atualizarLightbox();
    });
    document.getElementById('lightboxproxima').addEventListener('click', () => {
        passar(1);
        atualizarLightbox();
    });
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) fecharLightbox();
    });

    let toqueX = 0;
    let toqueY = 0;
    lightbox.addEventListener('touchstart', (e) => {
        toqueX = e.touches[0].clientX;
        toqueY = e.touches[0].clientY;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        if (galeriaImagens.length < 2) return;
        const dx = e.changedTouches[0].clientX - toqueX;
        const dy = e.changedTouches[0].clientY - toqueY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            passar(dx > 0 ? -1 : 1);
            atualizarLightbox();
        }
    }, { passive: true });

    function listaColunas(labels) {
        if (!labels.length) return null;
        const wrapper = el('div', 'itemlist');
        const meio = Math.ceil(labels.length / 2);
        [labels.slice(0, meio), labels.slice(meio)].forEach(coluna => {
            if (!coluna.length) return;
            const ul = document.createElement('ul');
            coluna.forEach(label => ul.appendChild(el('li', null, label)));
            wrapper.appendChild(ul);
        });
        return wrapper;
    }

    function infoBasica(imovel) {
        const linhas = [];
        if (imovel.area) linhas.push('Apartamentos de ' + Number(imovel.area).toLocaleString('pt-BR') + ' m²');
        if (imovel.dormitorios) linhas.push(imovel.dormitorios + (imovel.dormitorios > 1 ? ' quartos' : ' quarto'));
        if (imovel.banheiros) linhas.push(imovel.banheiros + (imovel.banheiros > 1 ? ' banheiros' : ' banheiro'));
        if (imovel.vagas) linhas.push(imovel.vagas + (imovel.vagas > 1 ? ' vagas de estacionamento' : ' vaga de estacionamento'));
        const endereco = [imovel.endereco, imovel.numero].filter(Boolean).join(', ');
        const local = [endereco, imovel.bairro].filter(Boolean).join(' - ');
        if (local) linhas.push(local);
        return linhas.concat(amenidades(imovel, AMENIDADES_IMOVEL));
    }

    function abrirDetalhe(imovel) {
        pararCiclo();
        detalheConteudo.innerHTML = '';

        const item = el('div', 'item');
        const local = [imovel.bairro, imovel.cidade].filter(Boolean).join(', ');
        item.appendChild(el('span', 'itemtitle', local ? imovel.nome + ' - ' + local : imovel.nome));

        galeriaImagens = imagensDe(imovel);
        galeriaIndex = 0;

        if (galeriaImagens.length) {
            const container = el('div', 'itemimgcontainer');

            const esquerda = el('img', 'itemarrowleft');
            esquerda.src = '/assets/img/utils/arrowleft.webp';
            esquerda.alt = 'Foto anterior';
            esquerda.addEventListener('click', () => {
                pararCiclo();
                passar(-1);
            });

            const direita = el('img', 'itemarrowright');
            direita.src = '/assets/img/utils/arrowright.webp';
            direita.alt = 'Próxima foto';
            direita.addEventListener('click', () => {
                pararCiclo();
                passar(1);
            });

            const main = criarMidiaPrincipal(0);

            const ampliar = el('button', 'itemampliar', 'Ampliar');
            ampliar.type = 'button';
            ampliar.addEventListener('click', abrirLightbox);

            if (galeriaImagens.length < 2) {
                esquerda.hidden = true;
                direita.hidden = true;
            }

            container.appendChild(esquerda);
            container.appendChild(direita);
            container.appendChild(main);
            container.appendChild(ampliar);
            item.appendChild(container);
            item.appendChild(el('div', 'itemimggallery'));
        }

        item.appendChild(el('span', 'itemvalor', formatValor(imovel.valor)));

        if (imovel.descricao) item.appendChild(el('span', 'itemdesc', imovel.descricao));

        item.appendChild(el('span', 'analise', 'Faça a sua simulação gratuita e descubra o valor da sua parcela.*'));
        item.appendChild(el('span', 'small', '*Sujeito a análise de crédito'));

        const listaInfo = listaColunas(infoBasica(imovel));
        if (listaInfo) {
            item.appendChild(el('span', 'title', 'Informações do imóvel:'));
            item.appendChild(listaInfo);
        }

        const listaLazer = listaColunas(amenidades(imovel, AMENIDADES_LAZER));
        if (listaLazer) {
            item.appendChild(el('span', 'title', 'Itens de lazer:'));
            item.appendChild(listaLazer);
        }

        const cta = el('a', 'itemcta');
        cta.href = '/#simulador';
        cta.appendChild(el('button', 'itemctabtn', 'Quero fazer minha simulação'));
        item.appendChild(cta);

        detalheConteudo.appendChild(item);

        detalhe.hidden = false;
        document.body.style.overflow = 'hidden';
        detalhe.scrollTop = 0;

        if (galeriaImagens.length) {
            previewsToShow = previewCount();
            mostrarImagem(0);
            if (galeriaImagens.length > 1) {
                galeriaTimer = setInterval(() => passar(1), 4000);
            }
        }
    }

    function fecharDetalhe() {
        pararCiclo();
        detalhe.hidden = true;
        lightbox.hidden = true;
        document.body.style.overflow = '';
        detalheConteudo.innerHTML = '';
        galeriaImagens = [];
    }

    document.getElementById('detalhefechar').addEventListener('click', fecharDetalhe);
    document.getElementById('detalhevoltar').addEventListener('click', fecharDetalhe);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (!lightbox.hidden) fecharLightbox();
            else if (!detalhe.hidden) fecharDetalhe();
            return;
        }
        if (!lightbox.hidden && galeriaImagens.length > 1) {
            if (event.key === 'ArrowLeft') {
                passar(-1);
                atualizarLightbox();
            }
            else if (event.key === 'ArrowRight') {
                passar(1);
                atualizarLightbox();
            }
        }
    });

    window.addEventListener('resize', () => {
        const next = previewCount();
        if (next === previewsToShow) return;
        previewsToShow = next;
        if (!detalhe.hidden) renderPreviews();
    });

    function normalizar(value) {
        return (value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function combina(imovel) {
        const termo = normalizar(buscaInput.value.trim());
        if (termo) {
            const alvo = normalizar([imovel.nome, imovel.bairro, imovel.cidade, imovel.id].filter(Boolean).join(' '));
            if (alvo.indexOf(termo) === -1) return false;
        }
        if (cidadeSelect.value && imovel.cidade !== cidadeSelect.value) return false;
        if (bairroSelect.value && imovel.bairro !== bairroSelect.value) return false;
        if (dormSelect.value && Number(imovel.dormitorios || 0) < Number(dormSelect.value)) return false;
        if (valorSelect.value && Number(imovel.valor || 0) > Number(valorSelect.value)) return false;
        return true;
    }

    function popularBairros() {
        const cidade = cidadeSelect.value;
        const atual = bairroSelect.value;
        const bairros = [];
        imoveis.forEach(imovel => {
            if (cidade && imovel.cidade !== cidade) return;
            if (imovel.bairro && bairros.indexOf(imovel.bairro) === -1) bairros.push(imovel.bairro);
        });
        bairros.sort((a, b) => a.localeCompare(b, 'pt-BR'));

        bairroSelect.innerHTML = '';
        const todos = document.createElement('option');
        todos.value = '';
        todos.textContent = 'Todos';
        bairroSelect.appendChild(todos);
        bairros.forEach(bairro => {
            const option = document.createElement('option');
            option.value = bairro;
            option.textContent = bairro;
            bairroSelect.appendChild(option);
        });
        bairroSelect.value = bairros.indexOf(atual) === -1 ? '' : atual;
    }

    function applyFilter() {
        let visible = 0;
        cardGrid.querySelectorAll('.empcard').forEach(card => {
            const match = combina(card.imovel);
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });

        noItems.style.display = visible === 0 ? '' : 'none';

        const ativo = !!(buscaInput.value.trim() || cidadeSelect.value || bairroSelect.value
            || dormSelect.value || valorSelect.value);
        filtroLimpar.hidden = !ativo;
        filtroCount.textContent = imoveis.length
            ? `${visible} de ${imoveis.length} ${imoveis.length === 1 ? 'empreendimento' : 'empreendimentos'}`
            : '';
    }

    cidadeSelect.addEventListener('change', () => {
        popularBairros();
        applyFilter();
    });
    [bairroSelect, dormSelect, valorSelect].forEach(campo => campo.addEventListener('change', applyFilter));
    buscaInput.addEventListener('input', applyFilter);

    filtroLimpar.addEventListener('click', () => {
        buscaInput.value = '';
        cidadeSelect.value = '';
        dormSelect.value = '';
        valorSelect.value = '';
        popularBairros();
        applyFilter();
    });

    previewsToShow = previewCount();

    fetch('/api/imoveis')
        .then(response => {
            if (!response.ok) throw new Error('failed');
            return response.json();
        })
        .then(payload => {
            imoveis = (payload && payload.data) || [];
            loading.style.display = 'none';

            if (!imoveis.length) {
                noItems.style.display = '';
                return;
            }

            const cidades = [];
            imoveis.forEach(imovel => {
                cardGrid.appendChild(buildCard(imovel));
                if (imovel.cidade && cidades.indexOf(imovel.cidade) === -1) cidades.push(imovel.cidade);
            });

            cidades.sort((a, b) => a.localeCompare(b, 'pt-BR')).forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade;
                option.textContent = cidade;
                cidadeSelect.appendChild(option);
            });

            popularBairros();
            applyFilter();

            iniciarShuffle(imoveis.filter(i => i.destaque === 1 || i.destaque === true).slice(0, 6));
        })
        .catch(() => {
            loading.style.display = 'none';
            loadError.style.display = '';
        });

});
