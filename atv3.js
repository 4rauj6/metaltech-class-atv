function showTable() {
    const isTableVisible = document.querySelector('.tabela-container');

    if (isTableVisible.style.display === 'none') {
        isTableVisible.style.display = 'block';
    } else {
        isTableVisible.style.display = 'none';
    }
}

class Ferramentas {
    constructor(nome, tipo, setor, quantidade, codigo, fabricante) {
        this.nome = nome;
        this.tipo = tipo;
        this.setor = setor;
        this.quantidade = quantidade;
        this.codigo = codigo;
        this.fabricante = fabricante;
    }
}

class Table {
    constructor(tabelaId) {
        this.tabela = document.getElementById(tabelaId);
        this.setItensOnList = [];
        this.totalElement = document.getElementById('totalFerramentas'); // Captura o contador do HTML
    }

    addItenToList(item) {
        this.setItensOnList.push(item);
    }

    renderList() {
        this.tabela.innerHTML = "";

        this.setItensOnList.forEach((item) => {
            const tableRow = document.createElement("tr");

            tableRow.innerHTML = `
                <td>${item.codigo}</td>
                <td>${item.nome}</td>
                <td>${item.tipo}</td>
                <td>${item.fabricante}</td>
                <td>${item.quantidade}</td>
                <td>${item.setor}</td>
            `;

            this.tabela.appendChild(tableRow);
        });

        if (this.totalElement) {
            this.totalElement.textContent = this.setItensOnList.length;
        }
    }
}

const tableMaster = new Table('tabelaFerramentas');
const alertMessage = document.getElementById('alertMessage');

const signInTools = document.getElementById('formFerramenta');

signInTools.addEventListener('submit', (event) => {
    event.preventDefault();

    const toolsName = document.getElementById('nome').value.trim();
    const toolsType = document.getElementById('tipo').value;
    const quantifyTools = Number(document.getElementById('quantidade').value);
    const sector = document.getElementById('setor').value;
    const toolsSerialNumber = document.getElementById('codigo').value.trim();
    const toolsManufactor = document.getElementById('fabricante').value.trim();

    if (toolsName.length < 5 || toolsName.length > 15) {
        exibirMensagem("O nome deve ter entre 5 e 15 caracteres.", "red");
        return;
    }

    if (!toolsType || !sector) {
        exibirMensagem("Selecione o Tipo e o Setor.", "red");
        return;
    }

    if (quantifyTools <= 0 || isNaN(quantifyTools)) {
        exibirMensagem("A quantidade deve ser maior que zero.", "red");
        return;
    }

    if (toolsSerialNumber.length !== 5) {
        exibirMensagem("O código deve ter exatamente 5 caracteres.", "red");
        return;
    }

    if (!toolsManufactor) {
        exibirMensagem("O fabricante é obrigatório.", "red");
        return;
    }

    try {
        exibirMensagem("Ferramenta cadastrada com sucesso!", "green");
    } catch (erro) {
        exibirMensagem("Ocorreu um erro: " + erro.message, "red");
    }

    const ferramenta = new Ferramentas(
        toolsName,
        toolsType,
        sector,
        quantifyTools,
        toolsSerialNumber,
        toolsManufactor
    );

    tableMaster.addItenToList(ferramenta);
    tableMaster.renderList();
    signInTools.reset();
});

function exibirMensagem(texto, cor) {
    if (alertMessage) {
        alertMessage.textContent = texto;
        alertMessage.style.color = cor;
    }
}