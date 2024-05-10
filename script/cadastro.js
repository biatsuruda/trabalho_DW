const url = 'https://go-wash-api.onrender.com/api/auth/address';    

async function validarbirthday(){
    var data = document.getElementById("birthday").value; 
     data = data.replace(/\//g, "-"); 
    var data_array = data.split("-"); 


    if(data_array[0].length != 4){
  data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; 
}


var hoje = new Date();
var nasc  = new Date(data);
var idade = hoje.getFullYear() - nasc.getFullYear();
var m = hoje.getMonth() - nasc.getMonth();
    
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

    if(idade < 18){
        alert("Pessoas menores de 18 não podem se cadastrar.");
            return
    }
}
 

async function cadastroUsuario(){
    let name = document.getElementById('name');
    let email = document.getElementById('email')   
    let cpf_cnpj = document.getElementById('cpf_cnpj')
    let password = document.getElementById('password')
    let birthday = document.getElementById('birthday')

    if(name.value==''){
        alert("preencha o seu nome")
        return
        }
    
    if(cpf_cnpj.value==''){
        alert("preencha o seu CPF")
        return
        }

    if(email.value==''){
        alert("preencha o seu Email")
        return
        }

    if(birthday.value==''){
        alert("preencha o seu Aniversário")
        return
        }
    if(password.value==''){
        alert("preencha o sua Senha")
        return
        }

    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "name":name.value,
                "email":email.value,
                "user_type_id":1,
                "password":password.value,
                "cpf_cnpj":cpf_cnpj.value.replace(/[^0-9]/g,''), 
                "terms": 1,
                "birthday":birthday.value   
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }        
    });

    let data = await resposta.json();

    if(data.data?.statusCode && data.data.statusCode == 422){
        if(data.data.errors.cpf_cnpj){
            alert('Erro: '+data.data.errors.cpf_cnpj[0]);
            return
        }
        if(data.data.errors){
            alert('Email INVALIDO');
            return
        }
        
    }

    alert("Login feito com sucesso");
    window.location.href = "login.html";
}