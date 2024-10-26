const treinos = [];

document.getElementById("form-treino").addEventListener("submit", (event) => {
  event.preventDefault();
  const nomeTreino = document.getElementById("nome-treino").value;
  if (nomeTreino) {
    const treino = {
      nome: nomeTreino,
      exercicios: []
    };
    treinos.push(treino);

    const treinoItem = document.createElement("li");
    treinoItem.textContent = nomeTreino;
    document.getElementById("lista-treinos").appendChild(treinoItem);
    
    const treinoOption = document.createElement("option");
    treinoOption.value = nomeTreino;
    treinoOption.textContent = nomeTreino;
    document.getElementById("treino-selecao").appendChild(treinoOption);

    document.getElementById("nome-treino").value = "";
  }
});

function adicionarExercicio() {
  const nomeTreinoSelecionado = document.getElementById("treino-selecao").value;
  const nomeExercicio = document.getElementById("nome-exercicio").value;
  const repeticoes = document.getElementById("repeticoes").value;

  if (nomeTreinoSelecionado && nomeExercicio && repeticoes) {
    const treino = treinos.find(t => t.nome === nomeTreinoSelecionado);
    if (treino) {
      treino.exercicios.push({ nome: nomeExercicio, repeticoes });

      const treinoItem = Array.from(document.querySelectorAll("#lista-treinos li")).find(
        item => item.textContent === treino.nome
      );
      treinoItem.innerHTML += `<br> - ${nomeExercicio} (${repeticoes} reps)`;

      document.getElementById("nome-exercicio").value = "";
      document.getElementById("repeticoes").value = "";
    }
  }
}
