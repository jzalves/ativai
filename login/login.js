document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o comportamento padrão de atualização da página
  
    // Captura os valores dos campos de entrada
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      // Faz uma requisição POST para o endpoint de login da sua API
      const response = await fetch("https://suaapi.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      // Processa a resposta
      if (response.ok) {
        const data = await response.json();
        alert("Login realizado com sucesso!");
  
        // Armazena o token de autenticação, se necessário
        localStorage.setItem("token", data.token);
  
        // Redireciona o usuário para a página principal
        window.location.href = "/dashboard.html";
      } else {
        alert("Usuário ou senha incorretos. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
    }
  });
  