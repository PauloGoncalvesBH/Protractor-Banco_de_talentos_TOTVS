// Login.spec.js
// Paulo Gonçalves

'use strict'

const Login = require('../page_objects/Login.po.js');
const Mensagens = require('../page_objects/Mensagens.po.js');
const QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
const Helper = require('../helper.js');

describe('(Login) Teste total de Login', ()=>
{
	const login = new Login();
	const mensagens = new Mensagens();
	const queroMeCadastrar = new QueroMeCadastrar();
	const helper = new Helper();
	
	it('Realizar login com usuário e senha válidos.', ()=> {
		// @Arrange
		queroMeCadastrar.Visita();
		
		let objUser = {usuario: ''};

		queroMeCadastrar.CadastroPadraoRetornandoUsuarioPorReferencia(objUser);

		login.DeslogarBancoDeTalentos();

		// @Act
		login.LogarBancoDeTalentosComSenhaPadrao(objUser.usuario);
		
		// @Assert
		expect(mensagens.MensagemLoginSucesso.isDisplayed()).toBe(true);
		
		// Deslogar - Preparação para o proximo teste
		login.DeslogarBancoDeTalentos();
	});
	
	it('Tentar logar com usuário e senha inválidos', ()=> {
		// @Arrange
		queroMeCadastrar.Visita();
		
		// @Act
		login.LogarBancoDeTalentos(helper.GerarCaracteres(), helper.GerarCaracteres());

		// login.EntrarButton.Clicar();
		
		// @Assert
		expect(mensagens.MensagemNaoCadastrado.isDisplayed()).toBe(true);
	});
	
	it('Tentar logar com usuário e senha sem preenchimento', ()=> {
		// @Arrange
		login.Visita();

		// @Act		
		login.EntrarButton.Clicar();
		 
		// @Assert
		expect(mensagens.MensagemNaoCadastrado.isDisplayed()).toBe(true);
	});
	
});
