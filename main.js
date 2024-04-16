class Gasto {
    constructor(categoria, descricao, valor) {
        this.categoria = categoria;
        this.descricao = descricao;
        this.valor = valor;
    }

    exibirDetalhes() {
        return `Categoria: ${this.categoria} - Descrição: ${this.descricao} - Valor: ${this.valor.toFixed(2)}`;
    }
}

class GastoAlimentacao extends Gasto {
    constructor(descricao, valor) {
        super('Alimentação', descricao, valor);
    }
}

class GastoTransporte extends Gasto {
    constructor(descricao, valor) {
        super('Transporte', descricao, valor);
    }
}

let gastos = [];

function adicionarGasto() {
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (categoria && descricao && !isNaN(valor)) {
        switch (categoria.toLowerCase()) {
            case 'alimentação':
                gastos.push(new GastoAlimentacao(descricao, valor));
                break;
            case 'transporte':
                gastos.push(new GastoTransporte(descricao, valor));
                break;
            default:
                gastos.push(new Gasto(categoria, descricao, valor));
                break;
        }
        listarGastos();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function apagarGasto(index) {
    gastos.splice(index, 1);
    listarGastos();
}

function editarGasto(index) {
    const novoDescricao = prompt("Digite a nova descrição:", gastos[index].descricao);
    const novoValor = parseFloat(prompt("Digite o novo valor:", gastos[index].valor));

    if (novoDescricao !== null && !isNaN(novoValor)) {
        gastos[index].descricao = novoDescricao;
        gastos[index].valor = novoValor;
        listarGastos();
    }
}

function buscarGastos() {
    const termoBusca = document.getElementById('buscar').value.toLowerCase();
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria.toLowerCase().includes(termoBusca));
    listarGastos(gastosFiltrados);
}

function listarGastos(lista = gastos) {
    const gastosList = document.getElementById('gastos-list');
    gastosList.innerHTML = '';
    
    lista.forEach((gasto, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${gasto.exibirDetalhes()} - Valor: ${formatarMoeda(gasto.valor)}
            <button onclick="editarGasto(${index})">Editar</button>
            <button onclick="apagarGasto(${index})">Apagar</button>
        `;
        gastosList.appendChild(listItem);
    });
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
