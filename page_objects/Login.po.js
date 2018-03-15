// Login.po.js
// Paulo Gonçalves

'use strict'

const Helper = require('../helper.js');

const helper = new Helper();
require('../ElementFinder.js');

class Login {

	constructor() {
		// Elementos para logar
		this.Usuario = element(by.model('controller.login'));
		this.Senha = element(by.model('controller.senha'));
		this.EntrarButton = element(by.css('[ng-click="controller.EfetuarLogin();"]'));
		
		// Elementos para deslogar
		this.OlaNome = element(by.id('dropdownMenu1'));
		this.SairButton = element(by.css('[ng-click="controller.EfetuarLogout();"]'));
		
		this.MensagemBoasVindas = element(by.cssContainingText('button', 'Fechar'));
	}

	Visita() {
		browser.get('#/RM/Rhu-BancoTalentos/home');
	}

	LogarBancoDeTalentos(usuario, senha) {
		this.Usuario.EnviarTexto(usuario);
		this.Senha.EnviarTexto(senha);
		this.EntrarButton.Clicar();
	}

	LogarBancoDeTalentosComSenhaPadrao(usuario) {
		this.LogarBancoDeTalentos(usuario, browser.params.Login.SenhaPadrao);
	}

	DeslogarBancoDeTalentos() {
		helper.RecarregarPagina();
		
		this.OlaNome.Clicar();
		this.SairButton.Clicar();
		helper.AguardarElemento(this.Usuario)
	}
	
}

module.exports = Login;