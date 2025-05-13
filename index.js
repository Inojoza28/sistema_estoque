// sistema_estoque.js - Sistema de Controle de Estoque
const readline = require('readline');

// Configuração da interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Armazenamento de dados do estoque
let estoque = [];
// Contador para gerar IDs sequenciais
let contadorId = 1;

// Função para limpar a tela
function limparTela() {
  console.clear();
}

// Função para mostrar o menu principal
function mostrarMenu() {
  limparTela();
  console.log("===SISTEMA DE ESTOQUE===");
  console.log("1. Adicionar Item");
  console.log("2. Listar todos os itens");
  console.log("3. Buscar Itens");
  console.log("4. Atualizar quantidade");
  console.log("5. Remover item");
  console.log("6. Sair");
  console.log("========================");
  
  rl.question("Escolha uma opção: ", (opcao) => {
    processarOpcao(opcao);
  });
}

// Função para processar a opção escolhida
function processarOpcao(opcao) {
  switch (opcao) {
    case '1':
      adicionarItem();
      break;
    case '2':
      listarItens();
      break;
    case '3':
      buscarItens();
      break;
    case '4':
      atualizarQuantidade();
      break;
    case '5':
      removerItem();
      break;
    case '6':
      console.log("Encerrando sistema...");
      rl.close();
      break;
    default:
      console.log("\nOpção inválida! Pressione ENTER para continuar...");
      rl.question("", () => {
        mostrarMenu();
      });
      break;
  }
}

// Função para adicionar um item ao estoque
function adicionarItem() {
  limparTela();
  console.log("===ADICIONAR ITEM===\n");
  
  rl.question("Nome do produto: ", (nome) => {
    if (!nome.trim()) {
      console.log("\nNome do produto não pode ser vazio! Pressione ENTER para continuar...");
      rl.question("", () => {
        adicionarItem();
      });
      return;
    }
    
    rl.question("Quantidade: ", (quantidadeInput) => {
      const quantidade = parseInt(quantidadeInput);
      
      if (isNaN(quantidade) || quantidade <= 0) {
        console.log("\nQuantidade inválida! Deve ser um número maior que zero. Pressione ENTER para continuar...");
        rl.question("", () => {
          adicionarItem();
        });
        return;
      }
      
      rl.question("Preço unitário: ", (precoInput) => {
        const preco = parseFloat(precoInput);
        
        if (isNaN(preco) || preco <= 0) {
          console.log("\nPreço inválido! Deve ser um número maior que zero. Pressione ENTER para continuar...");
          rl.question("", () => {
            adicionarItem();
          });
          return;
        }
        
        // Gerar ID sequencial para o item
        const id = contadorId.toString();
        contadorId++;
        
        // Criar e adicionar o novo item ao estoque
        const novoItem = {
          id,
          nome,
          quantidade,
          preco
        };
        
        estoque.push(novoItem);
        
        console.log(`\nItem "${nome}" adicionado com sucesso! Pressione ENTER para continuar...`);
        rl.question("", () => {
          mostrarMenu();
        });
      });
    });
  });
}

// Função para listar todos os itens do estoque
function listarItens() {
  limparTela();
  console.log("===LISTAR ITENS===\n");
  
  if (estoque.length === 0) {
    console.log("Estoque vazio!");
  } else {
    console.log("ID | Nome | Quantidade | Preço Unitário | Valor Total");
    console.log("---------------------------------------------------");
    
    estoque.forEach(item => {
      const valorTotal = (item.quantidade * item.preco).toFixed(2);
      console.log(`${item.id} | ${item.nome} | ${item.quantidade} | R$ ${item.preco.toFixed(2)} | R$ ${valorTotal}`);
    });
  }
  
  console.log("\nPressione ENTER para voltar ao menu principal...");
  rl.question("", () => {
    mostrarMenu();
  });
}

// Função para buscar itens no estoque
function buscarItens() {
  limparTela();
  console.log("===BUSCAR ITENS===\n");
  
  rl.question("Digite o termo de busca (nome do produto): ", (termo) => {
    const resultados = estoque.filter(item => 
      item.nome.toLowerCase().includes(termo.toLowerCase())
    );
    
    console.log("\nResultados da busca:");
    
    if (resultados.length === 0) {
      console.log("Nenhum item encontrado!");
    } else {
      console.log("ID | Nome | Quantidade | Preço Unitário | Valor Total");
      console.log("---------------------------------------------------");
      
      resultados.forEach(item => {
        const valorTotal = (item.quantidade * item.preco).toFixed(2);
        console.log(`${item.id} | ${item.nome} | ${item.quantidade} | R$ ${item.preco.toFixed(2)} | R$ ${valorTotal}`);
      });
    }
    
    console.log("\nPressione ENTER para voltar ao menu principal...");
    rl.question("", () => {
      mostrarMenu();
    });
  });
}

// Função para atualizar a quantidade de um item
function atualizarQuantidade() {
  limparTela();
  console.log("===ATUALIZAR QUANTIDADE===\n");
  
  if (estoque.length === 0) {
    console.log("Estoque vazio! Não há itens para atualizar.");
    console.log("\nPressione ENTER para voltar ao menu principal...");
    rl.question("", () => {
      mostrarMenu();
    });
    return;
  }
  
  // Mostrar lista de itens para facilitar a escolha
  console.log("Itens disponíveis:");
  console.log("ID | Nome | Quantidade Atual");
  console.log("----------------------------");
  
  estoque.forEach(item => {
    console.log(`${item.id} | ${item.nome} | ${item.quantidade}`);
  });
  
  rl.question("\nDigite o ID do item que deseja atualizar: ", (id) => {
    const itemIndex = estoque.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      console.log("\nItem não encontrado! Pressione ENTER para continuar...");
      rl.question("", () => {
        atualizarQuantidade();
      });
      return;
    }
    
    const item = estoque[itemIndex];
    
    rl.question(`Nova quantidade para "${item.nome}" (atual: ${item.quantidade}): `, (quantidadeInput) => {
      const novaQuantidade = parseInt(quantidadeInput);
      
      if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        console.log("\nQuantidade inválida! Deve ser um número maior ou igual a zero. Pressione ENTER para continuar...");
        rl.question("", () => {
          atualizarQuantidade();
        });
        return;
      }
      
      // Atualizar a quantidade
      estoque[itemIndex].quantidade = novaQuantidade;
      
      console.log(`\nQuantidade do item "${item.nome}" atualizada para ${novaQuantidade}! Pressione ENTER para continuar...`);
      rl.question("", () => {
        mostrarMenu();
      });
    });
  });
}

// Função para remover um item do estoque
function removerItem() {
  limparTela();
  console.log("===REMOVER ITEM===\n");
  
  if (estoque.length === 0) {
    console.log("Estoque vazio! Não há itens para remover.");
    console.log("\nPressione ENTER para voltar ao menu principal...");
    rl.question("", () => {
      mostrarMenu();
    });
    return;
  }
  
  // Mostrar lista de itens para facilitar a escolha
  console.log("Itens disponíveis:");
  console.log("ID | Nome | Quantidade");
  console.log("---------------------");
  
  estoque.forEach(item => {
    console.log(`${item.id} | ${item.nome} | ${item.quantidade}`);
  });
  
  rl.question("\nDigite o ID do item que deseja remover: ", (id) => {
    const itemIndex = estoque.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      console.log("\nItem não encontrado! Pressione ENTER para continuar...");
      rl.question("", () => {
        removerItem();
      });
      return;
    }
    
    const itemRemovido = estoque[itemIndex];
    
    rl.question(`Tem certeza que deseja remover "${itemRemovido.nome}"? (S/N): `, (confirmacao) => {
      if (confirmacao.toLowerCase() === 's') {
        // Remover o item do estoque
        estoque.splice(itemIndex, 1);
        console.log(`\nItem "${itemRemovido.nome}" removido com sucesso! Pressione ENTER para continuar...`);
      } else {
        console.log("\nOperação cancelada! Pressione ENTER para continuar...");
      }
      
      rl.question("", () => {
        mostrarMenu();
      });
    });
  });
}

// Iniciar o sistema
console.log("Iniciando Sistema de Controle de Estoque...");
mostrarMenu();