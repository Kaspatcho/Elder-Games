var id = {
  login: document.getElementById('l'),
  senha: document.getElementById('s'),
  senha2: document.getElementById('s2'),
  iframe: document.getElementById('if')
}
muda = {
  login: function(){
    id.iframe.src = "ilogin.html";
  },
  cadastro: function(){
    id.iframe.src = "icadastro.html";
  }
};

function conf(){
  var senha = id.senha.value;
  var senha2 = id.senha2.value;
  if(senha != senha2){
    document.getElementById('verify').innerHTML = "ERRO! Digite senhas iguais!";
    document.getElementById('verify').style.color = "red";
  } else if(senha.length < 8){
    document.getElementById('verify').innerHTML = "Senha fraca, digite mais caracteres";
    document.getElementById('verify').style.color = "red";
  } else{
    window.localStorage.setItem("senha", id.senha.value);
    window.localStorage.setItem("login", id.login.value);
    id.login.value = "";
    id.senha.value = "";
    id.senha2.value = "";
    document.getElementById('verify').innerHTML = "Conta cadastrada com sucesso";
    document.getElementById('verify').style.color = "lime";
  }
}

function confirma(){
  if(id.senha.value == window.localStorage.getItem("senha") && id.login.value == window.localStorage.getItem("login")){
    alert("Bem vindo à sua area pessoal!");
    id.login.value = "";
    id.senha.value = "";
    id.senha2.value = "";
    document.getElementById('verify').innerHTML = " ";
  } else {
    document.getElementById('verify').innerHTML = "Erro! Login ou senha incorretos";
    document.getElementById('verify').style.color = "red";
  }
}
