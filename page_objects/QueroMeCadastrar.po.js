// QueroMeCadastrar.po.js
// Paulo Gonçalves

'use strict'

const Helper = require('../helper.js');
const Mensagens = require('./Mensagens.po.js');

const helper = new Helper();
const mensagens = new Mensagens();

require('../ElementFinder.js');

class QueroMeCadastrar {

	constructor() {
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
		this.BotaoFecharMensagemBoasVindas = element(by.buttonText('Fechar'));

		// Para testes de nacionalidade:
		// Teste de nacionalidade diferente de brasileira:
		this.CPFNacionalidadeNaoBrasileira = element(by.css('input[name="controller_model.cpf"][disabled="disabled"]'));
		// Teste de nacionalidade brasileira:
		this.CPFNacionalidadeBrasileira = element(by.css('input[name="controller_model.cpf"][required="required"]'));
		// Estado fica como 'Outro' quando a nacionalidade é diferente de brasileira.
		this.EstadoComoOutroNacionalidadeNaoBrasileira = element(by.cssContainingText('button', 'Outro'));

		// Para testes de estado:
		// Verificar se campo está desabilitado ou não dependendo do preenchimento do estado.
		this.CidadeDesabilitada = element(by.css('[name="controller_model.municipio"][disabled="disabled"]'));
		this.CidadeHabilitada = element(by.css('[name="controller_model.municipio"][required="required"]'));

		this.Calendario = element(by.css('[class="datepicker-days"]'));
	}

	Visita() {
		browser.get('#/RM/Rhu-BancoTalentos/usuario_public');
	}

	// Primeira metade do cadastro.
	CadastroPrimeiraParte() {
		this.Usuario.EnviarTexto(helper.GerarUsuario());
		this.SetEmailEConfirmarEmail(helper.GerarEmail());
		this.SetSenhaEConfirmarSenha(browser.params.Login.SenhaPadrao);
	}

	// Segunda e última metade do cadastro.
	CadastroDadosPessoais() {
		this.CadastroDadosPessoaisPassandoCPF(helper.GerarCPF());
	}

	CadastroDadosPessoaisPassandoCPF(CPF) {
		this.SetNacionalidade('Brasileira');
		this.CPF.EnviarTexto(CPF);
		this.NomeCompleto.EnviarTexto(helper.GerarCaracteres());
		this.DataNascimento.EnviarTexto('01/01/1990');
		this.SetEstado('Minas Gerais')
		this.Cidade.EnviarTexto('Belo Horizonte');
	}

	SetEmail(email) {
		this.Email.Limpar().EnviarTexto(email);
	}

	SetEmailEConfirmarEmail(email) {
		this.SetEmail(email);
		this.ConfirmarEmail.EnviarTexto(email);
	}

	SetSenhaEConfirmarSenha(senha) {
		this.Senha.EnviarTexto(senha);
		this.ConfirmarSenha.EnviarTexto(senha);
	}

	//#region funções do campo 'Nacionalidade'.

	// Função clicar no campo nacionalidade e selecionar país na lista.
	SetNacionalidade(País) {
		this.Nacionalidade.Clicar();
		this.ElementoListaNacionalidade(País).Clicar();
	}

	// Função que retorna o elemento da lista de 'Nacionalidade' - Implementação necessário para o Smoke Test.
	ElementoListaNacionalidade(País) {
		// Abre a lista de 'Nacionalidade'.
		return element.all(by.cssContainingText('span', País)).get(0);
	}

	//#endregion

	SetEstado(UF) {
		this.Estado.Clicar();

		//Não é possível passar ao constructor devido ao parâmetro 'UF';
		element(by.cssContainingText('span', UF)).Clicar();
	}

	CadastroPadraoPassandoSenha(senha, confirmarSenha) {
		// Cadastro da primeira parte.
		this.CadastroPrimeiraParte();

		// Inserção dos campos 'Senha' e 'Confirmar Senha'.
		this.Senha.Limpar().EnviarTexto(senha);
		this.ConfirmarSenha.Limpar().EnviarTexto(confirmarSenha);

		// Cadastro da parte de 'Dados Pessoais'.
		this.CadastroDadosPessoais();

		this.BotaoCadastrar.Clicar();
	}

	// let objUser = {usuario: ''};
	// Passar o 'objUser'.
	CadastroPadraoRetornandoUsuarioPorReferencia(obj) {
		obj.usuario = helper.GerarUsuario();
		this.Usuario.EnviarTexto(obj.usuario);
		this.SetEmailEConfirmarEmail(helper.GerarEmail());
		this.SetSenhaEConfirmarSenha(browser.params.Login.SenhaPadrao);

		this.CadastroDadosPessoais();
		this.BotaoCadastrar.Clicar();
		helper.AguardarElemento(mensagens.MensagemLoginSucesso);
	}

	//Necessário após o uso desse método utilizar o método 'ClickBotaoCadastrar()';
	CadastroPadrao() {
		this.CadastroPrimeiraParte();
		this.CadastroDadosPessoais();
		this.BotaoCadastrar.Clicar();
		helper.AguardarElemento(mensagens.MensagemLoginSucesso);
	}

}

module.exports = QueroMeCadastrar;