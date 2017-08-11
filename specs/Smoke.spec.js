// Smoke.spec.js
// Paulo Gonçalves

var QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
var Login = require('../page_objects/Login.po.js');
var Mensagens = require('../page_objects/Mensagens.po.js');

describe('(Smoke) Teste de Fumaça - Conexão do "Banco de Talentos"', function()
{
	var queroMeCadastrar = new QueroMeCadastrar();
	var login = new Login();
	var mensagens = new Mensagens();
	
	beforeEach(function()
	{
		// arrange
		queroMeCadastrar.Visita();
	});
	
	it('Validar que surge mensagem de alerta ao realizar login sem preencher "Usuário" e "Senha"', function() {
		// act		
		login.ClickEntrarButton();
		
		// assert
		expect(mensagens.MensagemNaoCadastrado.isDisplayed()).toBe(true);
	});
	
	it('Validar que a lista de nacionalidade é "carregada"', function() {
		// act
		queroMeCadastrar.ClicarCampoNacionalidade();
		
		// assert
		expect(queroMeCadastrar.ElementoListaNacionalidade('Brasileira').isDisplayed()).toBe(true);
	});
	
});
