// Login.spec.js
// Paulo Gonçalves

var Login = require('../page_objects/Login.po.js');
var Mensagens = require('../page_objects/Mensagens.po.js');
var QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');

describe('(Login) Teste total de Login', function()
{
	var login = new Login();
	var mensagens = new Mensagens();
	var queroMeCadastrar = new QueroMeCadastrar();
	
	beforeEach(function()
	{
		// @Arrange
		login.Visita();
	});
	
	it('Realizar login com usuário e senha válidos.', function() {
		// @Arrange
		var LoginRepetidoObj = {Usuario: "LoginOk"};

		queroMeCadastrar.Visita();
		
		queroMeCadastrar.CadastroPadraoApenasUsuarioUtilizandoReferencia(LoginRepetidoObj);

		login.DeslogarBancoDeTalentos();

		// @Act
		login.LogarBancoDeTalentosComSenhaPadrao(LoginRepetidoObj.Usuario);
		
		// @Assert
		expect(mensagens.MensagemLoginSucesso.isDisplayed()).toBe(true);
		
		// Deslogar - Preparação para o proximo teste
		login.DeslogarBancoDeTalentos();
	});
	
	it('Tentar logar com usuário e senha inválidos', function() {
		// @Act
		login.LogarBancoDeTalentos('123adasd', 'asdasd');
		
		// @Assert
		expect(mensagens.MensagemNaoCadastrado.isDisplayed()).toBe(true);
	});
	
	it('Tentar logar com usuário e senha sem preenchimento', function() {
		// @Act		
		login.ClickEntrarButton();
		 
		// @Assert
		expect(mensagens.MensagemNaoCadastrado.isDisplayed()).toBe(true);
	});
	
});
