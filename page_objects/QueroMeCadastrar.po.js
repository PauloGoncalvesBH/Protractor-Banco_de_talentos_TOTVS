// QueroMeCadastrar.po.js
// Paulo Gonçalves

var Helper = require('../helper.js');

var helper = new Helper();


var QueroMeCadastrar = function()
{
	// Meu Cadastro	
	this.Usuario = element(by.name('controller_model.usuario'));
	this.Email = element(by.name('controller_model.email'));
	this.ConfirmarEmail = element(by.name('controller_model.email2'));
	this.Senha = element(by.name('controller_model.senha'));
	this.ConfirmarSenha = element(by.name('controller_model.senha2'));
	
	// Dados pessoais
	this.Nacionalidade = element(by.name('controller_model.nacionalidade'));
	this.CPF = element(by.name('controller_model.cpf'));
	this.NomeCompleto = element(by.name('controller_model.nomecompleto'));
	this.DataNascimento = element(by.css("input[maxlength='10']"));
	this.Estado = element(by.name('controller_model.uf'));
	this.Cidade = element(by.name('controller_model.municipio'));
	
	this.BotaoCadastrar = element(by.css('[ng-click="controller.save();"]'));
	this.BotaoFecharMensagemBoasVindas  = element(by.buttonText('Fechar'));
	
	// Para testes de nacionalidade:
		// Teste de nacionalidade diferente de brasileira:
	this.CPFNacionalidadeNaoBrasileira = element(by.css('input[name="controller_model.cpf"][disabled="disabled"]'));
		// Teste de nacionalidade brasileira:
	this.CPFNacionalidadeBrasileira = element(by.css('input[name="controller_model.cpf"][required="required"]'));
		// Estado fica como 'Outro' quando a nacionalidade é diferente de brasileira.
	this.EstadoComoOutroNacionalidadeNaoBrasileira = element(by.cssContainingText('button','Outro'));
	
	 // Para testes de estado:
		// Verificar se campo está desabilitado ou não dependendo do preenchimento do estado.
	this.CidadeDesabilitada = element(by.css('[name="controller_model.municipio"][disabled="disabled"]'));
	this.CidadeHabilitada = element(by.css('[name="controller_model.municipio"][required="required"]')); 
	
};

QueroMeCadastrar.prototype.Visita = function() {
	browser.get('#/RM/Rhu-BancoTalentos/usuario_public');
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
};
	
// Primeira metade do cadastro.
QueroMeCadastrar.prototype.CadastroPrimeiraParte = function() {
	var CPF = helper.GerarCPF();
	var Usuario = 'usuariopadrao';
	var Email = Usuario + CPF + '@totvs';
	var Senha = browser.params.Login.SenhaPadrao;
	
	this.SetUsuario(Usuario + CPF);
	this.SetEmail(Email);
	this.SetConfirmarEmail(Email);
	this.SetSenha(Senha);
	this.SetConfirmarSenha(Senha);
};

// Segunda e última metade do cadastro.
QueroMeCadastrar.prototype.CadastroDadosPessoais = function() {	
	var Nome = 'Usuario Padrao' + helper.GerarCPF();
	
	this.SetNacionalidade('Brasileira');
	this.SetCPFAleatorio();
	this.SetNomeCompleto(Nome);
	this.SetDataNascimento('01/01/1990');
	this.SetEstado('Minas Gerais')
	this.SetCidade('Belo Horizonte');
};

QueroMeCadastrar.prototype.SetUsuario = function(usuario) {
	browser.sleep(500);
	helper.ScrollAteElemento(this.Usuario);
	this.Usuario.sendKeys(usuario);
}

QueroMeCadastrar.prototype.SetEmail = function(email) {
	helper.ScrollAteElemento(this.Email);
	this.Email.sendKeys(email);
}

QueroMeCadastrar.prototype.SetConfirmarEmail = function(email) {
	helper.ScrollAteElemento(this.ConfirmarEmail);
	this.ConfirmarEmail.sendKeys(email);
}

QueroMeCadastrar.prototype.SetSenha = function(senha) {
	helper.ScrollAteElemento(this.Senha);
	this.Senha.sendKeys(senha);
}

QueroMeCadastrar.prototype.SetConfirmarSenha = function(senha) {
	helper.ScrollAteElemento(this.ConfirmarSenha);
	this.ConfirmarSenha.sendKeys(senha);
}

//#region funções do campo 'Nacionalidade'.

// Função clicar no campo nacionalidade e selecionar país na lista.
QueroMeCadastrar.prototype.SetNacionalidade = function(País) {
	this.ClicarCampoNacionalidade();
	this.ElementoListaNacionalidade(País).click();
	browser.sleep(500);
};

// Função que clica no campo 'Nacionalidade.  - Implementação necessário para o Smoke Test.
QueroMeCadastrar.prototype.ClicarCampoNacionalidade = function() {
	// Scroll até o campo 'Nacionalidade'.
	helper.ScrollAteElemento(this.Nacionalidade);
	
	// Clica no campo 'Nacionalidade'.
	this.Nacionalidade.click();
};

// Função que retorna o elemento da lista de 'Nacionalidade' - Implementação necessário para o Smoke Test.
QueroMeCadastrar.prototype.ElementoListaNacionalidade = function(País) {
	// Abre a lista de 'Nacionalidade'.
	return element.all(by.cssContainingText('span',País)).get(0);
};

//#endregion

QueroMeCadastrar.prototype.SetCPF = function(cpf) {
	helper.ScrollAteElemento(this.CPF);
	browser.sleep(100);
	this.CPF.sendKeys(cpf);
	// No 'Internet Explorer' ele preenche rápido o suficiente, deixando de preencher o último número, consequentemente
	// o CPF é zerado ao trocar de campo.
	browser.sleep(100);
}

QueroMeCadastrar.prototype.SetCPFAleatorio = function() {
	this.SetCPF(helper.GerarCPF());
}

QueroMeCadastrar.prototype.SetNomeCompleto = function(nome) {
	helper.ScrollAteElemento(this.NomeCompleto);
	this.NomeCompleto.sendKeys(nome);
}

QueroMeCadastrar.prototype.SetDataNascimento = function(dtnascto) {
	helper.ScrollAteElemento(this.DataNascimento);
	this.DataNascimento.sendKeys(dtnascto);
}

QueroMeCadastrar.prototype.SetEstado = function(UF) {
	// Scroll até o campo 'Estado'.
	helper.ScrollAteElemento(this.Estado);
	
	this.Estado.click();
	// Seleciona o estado na lista.
	element(by.cssContainingText('span', UF)).click();
	browser.sleep(300);
};

QueroMeCadastrar.prototype.SetCidade = function(cidade) {
	helper.ScrollAteElemento(this.Cidade);
	this.Cidade.sendKeys(cidade);
}

QueroMeCadastrar.prototype.ClickBotaoCadastrar = function() {
	helper.ScrollAteElemento(this.BotaoCadastrar);
	this.BotaoCadastrar.click();
	// Sleep necessário pois há certa demora para carregar a página após o cadastro.
	browser.sleep(400);
}

// Função para os testes de senha.
QueroMeCadastrar.prototype.TesteSenha = function(senha, confirmarsenha) {
	// Cadastro da primeira parte.
	this.CadastroPrimeiraParte();
	
	// Inserção dos campos 'Senha' e 'Confirmar Senha'.
	this.Senha.clear().sendKeys(senha);
	this.ConfirmarSenha.clear().sendKeys(confirmarsenha);
	
	// Cadastro da parte de 'Dados Pessoais'.
	this.CadastroDadosPessoais();
	
	this.BotaoCadastrar.click();
}

// Função para os testes do campo 'CPF'.
QueroMeCadastrar.prototype.TesteCPF = function(cpf) {
	// Cadastro da primeira parte.
	this.CadastroPrimeiraParte();
	
	// Cadastro da parte de 'Dados Pessoais'.
	this.SetNacionalidade('Brasileira');
	this.SetCPF(cpf);
	this.SetNomeCompleto('Usuario Padrao');
	this.SetDataNascimento('01/01/1990');
	this.SetEstado('Minas Gerais')
	this.SetCidade('Belo Horizonte');
	
	this.ClickBotaoCadastrar();
};

QueroMeCadastrar.prototype.FecharMensagemBoasVindas = function() {
	this.BotaoFecharMensagemBoasVindas.click();
	// Sleep necessário pois a mensagem de 'Boas Vindas' demora para ser fechada. NÃO RECOMENDADO
	browser.sleep(browser.params.TempoSleepFecharMensagemBoasVindas);
};

//CadastroPadraoApenasUsuario
// Faz o cadastro apenas informando o usuário, não retorna nada.
QueroMeCadastrar.prototype.CadastroPadraoApenasUsuario = function(Usuario) {
	var CPF = helper.GerarCPF();
	var Email = Usuario + CPF + '@totvs';
	var Senha = browser.params.Login.SenhaPadrao;
	var Nome = Usuario + ' ' + CPF;
	
	this.SetUsuario(CPF + Usuario);
	this.SetEmail(Email);
	this.SetConfirmarEmail(Email);
	this.SetSenha(Senha);
	this.SetConfirmarSenha(Senha);
	this.SetNacionalidade('Brasileira');
	this.SetCPFAleatorio();
	this.SetNomeCompleto(Nome);
	this.SetDataNascimento('01/01/1990');
	this.SetEstado('Minas Gerais')
	this.SetCidade('Ipatinga');
	
	this.ClickBotaoCadastrar();
};

//CadastroPadraoApenasUsuarioRef
// Utilizado para quando há a necessidade de possuir o login do usuário cadastrado.
// Faz o cadastro e altera o usuário por referência.
// Exemplo de implementação no caso de teste:
// var UserObj = {Usuario: 'exemplo'};
// Passe apenas o objeto para fazer o teste, exemplo:
// CadastroPadraoApenasUsuarioUtilizandoReferencia(UserObj);
// Para reutilizar o login, utilize o seguinte no teste. Exemplo:
// login.LogarBancoDeTalentosComSenhaPadrao(UserObj.Usuario);
QueroMeCadastrar.prototype.CadastroPadraoApenasUsuarioUtilizandoReferencia = function(obj) {
	var CPF = helper.GerarCPF();
	var UsuarioAuxiliar = obj.Usuario + CPF;
	var Nome = obj.Usuario + ' ' + CPF;
	var Email = UsuarioAuxiliar + '@totvs';
	var Senha = browser.params.Login.SenhaPadrao;
	
	this.SetUsuario(UsuarioAuxiliar);
	
	// Atribui um novo valor ao usuário de acordo com o preenchido no campo 'Usuário'.
	// Get necessário pois o 'usuário + CPF' inseridos no campo pode ser maior que o permitido.
	// Caso não realize o get e utilizar o 'UsuarioAuxiliar' para alterar o objeto, pode ocorrer erro ao logar nos testes posteriores caso o texto seja cortado.
	obj.Usuario = this.Usuario.getAttribute('value');
	
	this.SetEmail(Email);

	// Utilizado apenas para o teste de email repetido em 'Quero Me Cadastrar'. Caso o objeto não possua o '.Email' não
	// ocorrerá erro.
	obj.Email = this.Email.getAttribute('value');

	this.SetConfirmarEmail(Email);
	this.SetSenha(Senha);
	this.SetConfirmarSenha(Senha);
	this.SetNacionalidade('Brasileira');
	this.SetCPFAleatorio();
	this.SetNomeCompleto(UsuarioAuxiliar);
	this.SetDataNascimento('01/01/1990');
	this.SetEstado('Minas Gerais')
	this.SetCidade('Ipatinga');
	
	this.ClickBotaoCadastrar();
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
};

module.exports = QueroMeCadastrar;