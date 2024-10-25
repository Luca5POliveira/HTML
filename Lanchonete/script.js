// Arrays para armazenar os funcionários e pedidos
let funcionarios = [];
let pedidos = [];

// Função para renderizar a lista de funcionários no select de pedidos
function atualizarSelectFuncionarios() {
    const select = document.getElementById("responsavelPedido");
    select.innerHTML = "<option value=''>Selecione um responsável</option>";
    funcionarios.forEach(funcionario => {
        const option = document.createElement("option");
        option.value = funcionario.nome;
        option.textContent = funcionario.nome;
        select.appendChild(option);
    });
}

// Função para cadastrar funcionários
document.getElementById("formFuncionario").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nomeFuncionario").value;
    const cpf = document.getElementById("cpfFuncionario").value;

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        alert("O CPF deve ter 11 dígitos!");
        return;
    }

    // Adiciona o funcionário na lista
    funcionarios.push({ nome, cpf });
    atualizarSelectFuncionarios();
    alert("Funcionário cadastrado com sucesso!");
    this.reset();
});

// Função para cadastrar pedidos
document.getElementById("formPedido").addEventListener("submit", function(event) {
    event.preventDefault();
    const nomePedido = document.getElementById("nomePedido").value;
    const descricaoPedido = document.getElementById("descricaoPedido").value;
    const responsavel = document.getElementById("responsavelPedido").value;
    const status = document.getElementById("statusPedido").value;

    if (!responsavel) {
        alert("Selecione um responsável para o pedido!");
        return;
    }

    // Adiciona o pedido na lista
    pedidos.push({ nomePedido, descricaoPedido, responsavel, status });
    atualizarListaPedidos();
    alert("Pedido cadastrado com sucesso!");
    this.reset();
});


// Função para renderizar a lista de pedidos com opção de alterar o status
function atualizarListaPedidos() {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";  // Limpa a lista antes de renderizar novamente

    pedidos.forEach((pedido, index) => {
        const pedidoDiv = document.createElement("div");

        // Exibe informações do pedido
        pedidoDiv.innerHTML = `
            <strong>Pedido:</strong> ${pedido.nomePedido}, 
            <strong>Descrição:</strong> ${pedido.descricaoPedido || 'Nenhuma'}, 
            <strong>Responsável:</strong> ${pedido.responsavel}, 
            <strong>Status:</strong>
        `;

        // Cria um select para alterar o status do pedido
        const selectStatus = document.createElement("select");
        const statusOptions = ["A Fazer", "Fazendo", "Pronto para entrega"];
        statusOptions.forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if (pedido.status === status) {
                option.selected = true;
            }
            selectStatus.appendChild(option);
        });

        // Quando o status for alterado, atualiza o pedido
        selectStatus.addEventListener("change", function() {
            pedidos[index].status = this.value;
            alert(`Status do pedido "${pedido.nomePedido}" atualizado para "${this.value}"!`);
            atualizarListaPedidos();  // Atualiza a lista de pedidos para refletir a mudança
        });

        pedidoDiv.appendChild(selectStatus);
        lista.appendChild(pedidoDiv);
    });
}