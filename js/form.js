var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click",function(event){
    event.preventDefault();
    //console.log("cliquei em add");
    var form = document.querySelector("#form-adiciona");
    //Extraindo informações dos pacientes
 
    var paciente = obtemPacienteForm(form);
    console.log(paciente);

    //Cria a tr e td do paciente
  

    var erros = validaPaciente(paciente);
    console.log(erros);
    
    if(erros.length > 0){
        exibeMensagemErro(erros);
        return;
    }

    //Adicionando paciente na tabela
    adicionaPacienteNaTabela(paciente);
    
    
    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});


function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}


function exibeMensagemErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML="";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);

    });
}        
  
function obtemPacienteForm(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe)
    return td;
}

function validaPaciente(paciente){

var erros = [];

    if(paciente.nome.length == 0){
        erros.push("O nome não pode ficar vazio");
    }

   if(!validaPeso(paciente.peso)){
        erros.push("Peso Invalido");
   }

   if(paciente.peso.length ==0){
       erros.push("Campo peso não pode ser vazio")
   }
        
   if(!validaAltura(paciente.altura)) {
        erros.push("Altura Invalida");
   }

    if(paciente.altura.length ==0){
       erros.push("Campo altura não pode ser vazio")
   }

    if(paciente.gordura.length == 0){
        erros.push("Campo gordura não pode ser vazio");
    }

        return erros;
}