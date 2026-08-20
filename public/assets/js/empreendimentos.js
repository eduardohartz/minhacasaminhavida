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

    const itensContainer = document.getElementById('itens');
    const loading = document.getElementById('loading');
    const noItems = document.getElementById('noitems');
    const loadError = document.getElementById('loaderror');
    const select = document.getElementById('cidade');

    function slugify(value) {
        return (value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    }

    function amenidades(imovel, lista) {
        return lista.filter(item => imovel[item.key] === 1 || imovel[item.key] === true)
            .map(item => item.label);
    }

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function listaColunas(labels) {
        if (!labels.length) {
            return null;
        }
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

    let previewsToShow = 7;

    function previewCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 350) return 2;
        if (screenWidth < 600) return 3;
        if (screenWidth < 850) return 5;
        return 7;
    }

    function updatePreviews(gallery) {
        const previews = gallery.querySelector('.itemimggallery');
        const imagens = gallery._imagens;
        const current = gallery._current;
        previews.innerHTML = '';

        let start = current - Math.floor(previewsToShow / 2);
        if (start + previewsToShow > imagens.length) start = imagens.length - previewsToShow;
        if (start < 0) start = 0;

        for (let i = start; i < Math.min(start + previewsToShow, imagens.length); i++) {
            const img = document.createElement('img');
            img.src = imagens[i];
            img.alt = 'Foto do empreendimento';
            img.loading = 'lazy';
            img.classList.add('itemimgpreview');
            if (i === current) img.classList.add('selected');
            const index = i;
            img.onclick = () => {
                clearInterval(gallery._cycle);
                setMainImage(gallery, index);
            };
            previews.appendChild(img);
        }
    }

    function setMainImage(gallery, index) {
        gallery._current = index;
        gallery.querySelector('.itemimg').src = gallery._imagens[index];
        updatePreviews(gallery);
    }

    function step(gallery, delta) {
        const total = gallery._imagens.length;
        setMainImage(gallery, (gallery._current + delta + total) % total);
    }

    function buildGallery(gallery, imagens) {
        gallery._imagens = imagens;
        gallery._current = 0;

        gallery.querySelector('.itemarrowleft').addEventListener('click', () => {
            clearInterval(gallery._cycle);
            step(gallery, -1);
        });
        gallery.querySelector('.itemarrowright').addEventListener('click', () => {
            clearInterval(gallery._cycle);
            step(gallery, 1);
        });

        setMainImage(gallery, 0);

        if (imagens.length > 1) {
            gallery._cycle = setInterval(() => step(gallery, 1), 3000);
        }
    }

    function buildItem(imovel) {
        const item = el('div', 'item');
        const cidadeSlug = slugify(imovel.cidade);
        if (cidadeSlug) item.classList.add(cidadeSlug);

        const local = [imovel.bairro, imovel.cidade].filter(Boolean).join(', ');
        item.appendChild(el('span', 'itemtitle', local ? imovel.nome + ' - ' + local : imovel.nome));

        const imagens = [];
        if (imovel.imagem_principal) imagens.push(imovel.imagem_principal);
        (imovel.imagens || []).forEach(url => {
            if (imagens.indexOf(url) === -1) imagens.push(url);
        });

        if (imagens.length) {
            const container = el('div', 'itemimgcontainer');
            const left = el('img', 'itemarrowleft');
            left.src = '/assets/img/utils/arrowleft.webp';
            left.alt = 'Foto anterior';
            const right = el('img', 'itemarrowright');
            right.src = '/assets/img/utils/arrowright.webp';
            right.alt = 'Próxima foto';
            const main = el('img', 'itemimg');
            main.alt = imovel.nome || 'Empreendimento';
            container.appendChild(left);
            container.appendChild(right);
            container.appendChild(main);
            item.appendChild(container);
            item.appendChild(el('div', 'itemimggallery'));
        }

        if (imovel.descricao) {
            item.appendChild(el('span', 'itemdesc', imovel.descricao));
        }

        item.appendChild(el('span', 'analise', 'Faça a sua análise gratuita e descubra o valor da sua parcela.*'));
        item.appendChild(el('span', 'small', '*Sujeito a análise de crédito'));

        const info = infoBasica(imovel);
        const listaInfo = listaColunas(info);
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
        cta.appendChild(el('button', 'itemctabtn', 'Quero fazer minha análise'));
        item.appendChild(cta);

        if (imagens.length) {
            buildGallery(item, imagens);
        }

        return item;
    }

    function applyFilter() {
        const selected = select.value;
        let visible = 0;

        itensContainer.querySelectorAll('.item').forEach(item => {
            const match = selected === 'todas' || item.classList.contains(selected);
            item.style.display = match ? '' : 'none';
            if (match) visible++;
        });

        noItems.style.display = visible === 0 ? '' : 'none';
    }

    select.addEventListener('change', applyFilter);

    window.addEventListener('resize', () => {
        const next = previewCount();
        if (next === previewsToShow) return;
        previewsToShow = next;
        itensContainer.querySelectorAll('.item').forEach(item => {
            if (item._imagens) updatePreviews(item);
        });
    });

    previewsToShow = previewCount();

    fetch('/api/imoveis')
        .then(response => {
            if (!response.ok) throw new Error('failed');
            return response.json();
        })
        .then(payload => {
            const imoveis = (payload && payload.data) || [];
            loading.style.display = 'none';

            if (!imoveis.length) {
                noItems.style.display = '';
                return;
            }

            const cidades = [];
            imoveis.forEach(imovel => {
                itensContainer.appendChild(buildItem(imovel));
                if (imovel.cidade && cidades.indexOf(imovel.cidade) === -1) {
                    cidades.push(imovel.cidade);
                }
            });

            cidades.sort((a, b) => a.localeCompare(b, 'pt-BR')).forEach(cidade => {
                const option = document.createElement('option');
                option.value = slugify(cidade);
                option.textContent = cidade;
                select.appendChild(option);
            });
        })
        .catch(() => {
            loading.style.display = 'none';
            loadError.style.display = '';
        });

});
