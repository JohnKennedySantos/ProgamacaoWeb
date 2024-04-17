class Gasto {

    constructor(categoria, produto, quantidade, valorUnitario) {

        this.categoria = categoria;
        this.produto = produto;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
    }

    calcularValorTotal() {
        return this.quantidade * this.valorUnitario;
    }

 
    exibirDetalhes() {

        return `Categoria: ${this.categoria} - Produto: ${this.produto} - Quantidade: ${this.quantidade} - Valor Unitário: ${formatarMoeda(this.valorUnitario)} - Valor Total: ${formatarMoeda(this.calcularValorTotal())}`;
    }
}

class GastoAlimentacao extends Gasto {
    constructor(produto, quantidade, valorUnitario) {

        super('Alimentação', produto, quantidade, valorUnitario);
    }
}

class GastoTransporte extends Gasto {
    constructor(produto, quantidade, valorUnitario) {

        super('Transporte', produto, quantidade, valorUnitario);
    }
}


class GastoLivros extends Gasto {
    constructor(produto, quantidade, valorUnitario) {

        super('livro', produto, quantidade, valorUnitario);
    }
}


let gastos = [];

function adicionarGasto() {

    const categoria = document.getElementById('categoria').value;
    const produto = document.getElementById('produto').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);

   
    if (categoria && produto && !isNaN(quantidade) && !isNaN(valorUnitario)) {
      
        switch (categoria.toLowerCase()) {
            case 'alimentação':
                gastos.push(new GastoAlimentacao(produto, quantidade, valorUnitario));
                break;
            case 'transporte':
                gastos.push(new GastoTransporte(produto, quantidade, valorUnitario));
                break;
            case 'livro':
                    gastos.push(new GastoLivros(produto, quantidade, valorUnitario));
                    break;
            default:
                gastos.push(new Gasto(categoria, produto, quantidade, valorUnitario));
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
    const novoProduto = prompt("Digite o novo produto:", gastos[index].produto);
    const novaQuantidade = parseFloat(prompt("Digite a nova quantidade:", gastos[index].quantidade));
    const novoValorUnitario = parseFloat(prompt("Digite o novo valor unitário:", gastos[index].valorUnitario));

    if (novoProduto !== null && !isNaN(novaQuantidade) && !isNaN(novoValorUnitario)) {
        gastos[index].produto = novoProduto;
        gastos[index].quantidade = novaQuantidade;
        gastos[index].valorUnitario = novoValorUnitario;
        listarGastos();
    }
}

function buscarGastos() {
    const termoBusca = document.getElementById('buscar').value.toLowerCase();
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria.toLowerCase().includes(termoBusca) || gasto.produto.toLowerCase().includes(termoBusca));
    listarGastos(gastosFiltrados);
}

function listarGastos(lista = gastos) {
    const gastosList = document.getElementById('gastos-list');
    gastosList.innerHTML = '';
    lista.forEach((gasto, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${gasto.exibirDetalhes()} <!-- Aqui está a exibição dos detalhes do gasto -->
            <button onclick="editarGasto(${index})">Editar</button>
            <button onclick="apagarGasto(${index})">Apagar</button>
        `;
        gastosList.appendChild(listItem);
    });
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
