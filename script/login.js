async function Login() {
    let titulo = document.getElementById('Titulo').value;
    let cep = document.getElementById('CEP').value;
    let endereco = document.getElementById('Endereço').value;
    let numero = document.getElementById('Número').value;

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title": titulo,
            "cep": cep,
            "address": endereco,
            "number": numero
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let responseApi = await response.json();

    if (responseApi.success) {
        localStorage.setItem('user', JSON.stringify(responseApi.user));
        console.log("Dados do usuário salvos no localStorage:", responseApi.user); // Log para verificar se os dados estão sendo salvos corretamente

        // Exibição dos endereços salvos
        console.log("Exibindo endereços salvos:");
        const enderecosArmazenados = JSON.parse(localStorage.getItem('user')) || [];
        console.log("Dados do localStorage:", enderecosArmazenados);

        const enderecosContainer = document.getElementById('enderecos');
        enderecosContainer.innerHTML = ''; // Limpa o conteúdo anterior

        if (enderecosArmazenados.length > 0) {
            console.log("Endereços encontrados no localStorage. Exibindo...");

            enderecosArmazenados.forEach((endereco, index) => {
                const enderecoItem = document.createElement('li');
                enderecoItem.textContent = `Endereço ${index + 1}: ${endereco.address}, ${endereco.number}, CEP: ${endereco.cep}`;
                enderecosContainer.appendChild(enderecoItem);
            });
        } else {
            console.log("Nenhum endereço encontrado no localStorage.");
            enderecosContainer.textContent = 'Nenhum endereço cadastrado';
        }

        window.location.href = "endereco.html";
    } else {
        alert("Falha no login. Verifique suas credenciais e tente novamente.");
    }
}



