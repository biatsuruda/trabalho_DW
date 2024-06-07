async function redirectToLogin() {
  // Verificar se os campos de e-mail e senha estão preenchidos
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  
  if (email !== "" && password !== "") {
    const url = 'https://go-wash-api.onrender.com/api/login';
    
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        user_type_id: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    try {
      let responseApi = await response.json();
      console.log(responseApi);

      if (responseApi.user && responseApi.user.hasOwnProperty('is_active') && responseApi.user.is_active === true) {
        // Redirecionar para a página de login
        localStorage.setItem('user', JSON.stringify(responseApi.user));
        window.location.href = 'login.html';
        alert('Login feito com sucesso');
      } else {
        // Se o usuário não estiver ativo ou os dados do usuário estiverem ausentes, exibir uma mensagem de erro
        alert("Você não está autorizado para acessar esta página ou ainda não ativou seu login.");
      }
    } catch (error) {
      console.error('Erro ao fazer parsing do JSON da resposta:', error);
      alert('Erro ao processar a resposta da API. Por favor, tente novamente mais tarde.');
    }
    
  } else {
    alert("Por favor, preencha os campos de e-mail e senha.");
  }
}

    
    
