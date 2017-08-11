// Login.po.js
// Paulo Gonçalves

var Helper = require('../helper.js');

var helper = new Helper();


var Login = function() {
	// Elementos para logar
	this.Usuario = element(by.model('controller.login'));
	this.Senha = element(by.model('controller.senha'));
	this.EntrarButton = element(by.css('[ng-click="controller.EfetuarLogin();"]'));
	
	// Elementos para deslogar
	this.OlaNome = element(by.id('dropdownMenu1'));
	this.SairButton = element(by.css('[ng-click="controller.EfetuarLogout();"]'));
	
	this.MensagemBoasVindas = element(by.cssContainingText('button', 'Fechar'));
};

Login.prototype.Visita = function() {
	browser.get('#/RM/Rhu-BancoTalentos/home');
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
};

Login.prototype.LogarBancoDeTalentos = function(usuario, senha) {
	this.SetUsuario(usuario);
	this.SetSenha(senha);
	this.ClickEntrarButton();
	// Tempo necessário para garantir que o login seja realizado.
	browser.sleep(500);
};

Login.prototype.LogarBancoDeTalentosComSenhaPadrao = function(usuario) {
	this.LogarBancoDeTalentos(usuario, browser.params.Login.SenhaPadrao);
};

Login.prototype.DeslogarBancoDeTalentos = function() {
	helper.RecarregarPagina();
	
	this.ClickOlaNome();
	this.ClickSairButton();
};

Login.prototype.SetUsuario = function(usuario) {
	helper.ScrollAteElemento(this.Usuario);
	this.Usuario.sendKeys(usuario);
}

Login.prototype.SetSenha = function(senha) {
	helper.ScrollAteElemento(this.Senha);
	this.Senha.sendKeys(senha);
}

Login.prototype.ClickEntrarButton = function() {
	helper.ScrollAteElemento(this.EntrarButton);
	this.EntrarButton.click();
}

Login.prototype.ClickOlaNome = function() {
	helper.ScrollAteElemento(this.OlaNome);
	this.OlaNome.click();
}

Login.prototype.ClickSairButton = function() {
	helper.ScrollAteElemento(this.SairButton);
	this.SairButton.click();
}

module.exports = Login;