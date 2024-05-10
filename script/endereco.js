const url = 'https://go-wash-api.onrender.com/api/auth/address';
async function salvarendereco() {  
    let titulo = document.getElementById('Titulo').value;
    let cep = document.getElementById('CEP').value;
    let endereço = document.getElementById('Endereço').value;
    let numero = document.getElementById('Número').value;

    if(titulo === ''){
        alert("Preencha o título");
        return;
    }
    
    if(cep === ''){
        alert("Preencha o seu CEP");
        return;
    }

    if(endereço === ''){
        alert("Preencha o seu endereço");
        return;
    }

    if(numero === ''){
        alert("Preencha o seu número");
        return;
    }

    const resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title": titulo,
            "cep": cep,
            "address": endereço,
            "number": numero
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(resposta.ok) {
        alert("Cadastro feito com sucesso");
        salvarDadosLocal(titulo, cep, endereço, numero); // Salvando os dados localmente
        window.location.href = "login.html"; // Redirecionando para a página de login
    } else {
        alert("Ocorreu um erro ao cadastrar o endereço");
    
    }
}

function salvarDadosLocal(titulo, cep, endereço, numero) {
    // Convertendo os dados para um objeto JSON
    const dados = {
        titulo: titulo,
        cep: cep,
        endereco: endereço,
        numero: numero
    };

    // Convertendo o objeto JSON para uma string antes de armazenar no localStorage
    localStorage.setItem('endereco', JSON.stringify(dados));
}
