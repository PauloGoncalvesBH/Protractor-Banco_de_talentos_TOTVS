// Smoke.spec.js
// Paulo Gonçalves

'use strict'

const QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
const Login = require('../page_objects/Login.po.js');
const Mensagens = require('../page_objects/Mensagens.po.js');
require('../ElementFinder.js');

describe('(Smoke) Teste de Fumaça - Conexão do "Banco de Talentos"', ()=>
{
	const queroMeCadastrar = new QueroMeCadastrar();
	const login = new Login();
	const mensagens = new Mensagens();
	
	beforeEach(function()
	{
		// arrange
		queroMeCadastrar.Visita();
	});
	
	it('Validar que surge mensagem de alerta ao realizar login sem preencher "Usuário" e "Senha"', ()=> {
		// act		
		login.EntrarButton.Clicar();
		
		// assert
		expect(mensagens.MensagemNaoCadastrado.isDisplayed()).toBe(true);
	});
	
	it('Validar que a lista de nacionalidade é "carregada"', ()=> {
		// act
		queroMeCadastrar.Nacionalidade.Clicar();
		
		// assert
		expect(queroMeCadastrar.ElementoListaNacionalidade('Brasileira').isDisplayed()).toBe(true);
	});
	
});
