// QueroMeCadastrar.spec.js
// Paulo Gonçalves

'use strict'

const QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
const Login = require('../page_objects/Login.po.js');
const Helper = require('../helper.js');
const Mensagens = require('../page_objects/Mensagens.po.js');

require('../ElementFinder.js');

describe('(QueroMeCadastrar) Teste total da página "Quero me cadastrar"', ()=>
{
	// const ElementFinder = new a();
	const queroMeCadastrar = new QueroMeCadastrar();
	const login = new Login();
	const helper = new Helper();
	const mensagens = new Mensagens();

	beforeEach(()=>
	{
		// @Arrange
		queroMeCadastrar.Visita();
	});
	
	it('Realizar cadastro com todos os campos válidos.', ()=> {
		// act
		queroMeCadastrar.CadastroPadrao();
		
		// assert
		expect(mensagens.MensagemLoginSucesso.isDisplayed()).toBe(true);
		
		login.DeslogarBancoDeTalentos();
	});
	
	it('Preencher o campo "Email" pertencente a outro candidato e validar mensagem de alerta.', ()=> {
		// act
		const email = helper.GerarEmail();
		
		queroMeCadastrar.CadastroPrimeiraParte();
		queroMeCadastrar.Email.clear();
		queroMeCadastrar.ConfirmarEmail.clear();
		queroMeCadastrar.SetEmailEConfirmarEmail(email);
		queroMeCadastrar.CadastroDadosPessoais();

		queroMeCadastrar.BotaoCadastrar.Clicar();
		helper.AguardarElemento(queroMeCadastrar.BotaoFecharMensagemBoasVindas);
		
		login.DeslogarBancoDeTalentos();
		queroMeCadastrar.Visita();

		queroMeCadastrar.SetEmail(email);
		queroMeCadastrar.ConfirmarEmail.EnviarTexto('');

		// assert
		expect(mensagens.MensagemEmailExistente.isDisplayed()).toBe(true);
	});

	it('Preencher o campo "Usuário" pertencente a outro candidato e validar mensagem de alerta.', ()=> {
		// act
		const usuario = (helper.GerarUsuario());

		queroMeCadastrar.Usuario.EnviarTexto(usuario);
		queroMeCadastrar.SetEmailEConfirmarEmail(helper.GerarEmail());
		queroMeCadastrar.SetSenhaEConfirmarSenha(browser.params.Login.SenhaPadrao);

		queroMeCadastrar.CadastroDadosPessoais();

		queroMeCadastrar.BotaoCadastrar.Clicar();
		helper.AguardarElemento(queroMeCadastrar.BotaoFecharMensagemBoasVindas);
		
		login.DeslogarBancoDeTalentos();
		queroMeCadastrar.Visita();
		
		queroMeCadastrar.Usuario.EnviarTexto(usuario);
		queroMeCadastrar.SetEmail('');
		
		// assert
		expect(mensagens.MensagemUsuarioExistente.isDisplayed()).toBe(true);
	});
	
	it('Preencher o campo "Confirmar e-mail" diferente do e-mail inicial e validar mensagem de alerta impedindo cadastro.', ()=> {
		// act
		queroMeCadastrar.CadastroPrimeiraParte();
		queroMeCadastrar.ConfirmarEmail.Limpar().EnviarTexto(helper.GerarEmail());
		queroMeCadastrar.CadastroDadosPessoais();

		queroMeCadastrar.BotaoCadastrar.Clicar();
		
		// assert
		expect(mensagens.MensagemEmailNaoConfere.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Senha" menor que 6 dígitos e validar mensagem de alerta.', ()=> {
		// act
		queroMeCadastrar.CadastroPadraoPassandoSenha('sen12','sen12');
		
		// assert
		expect(mensagens.MensagemSenhaInvalida.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Senha" com apenas número e validar mensagem de alerta.', ()=> {
		// act
		queroMeCadastrar.CadastroPadraoPassandoSenha('123123','123123');
		
		// assert
		expect(mensagens.MensagemSenhaInvalida.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Senha" com apenas letras e validar mensagem de alerta.', ()=> {
		// act
		queroMeCadastrar.CadastroPadraoPassandoSenha('abcdef','abcdef');
		
		// assert
		expect(mensagens.MensagemSenhaInvalida.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Confirmar Senha" diferente da "Senha" inicial e validar mensagem de alerta.', ()=> {
		// act
		queroMeCadastrar.CadastroPadraoPassandoSenha('senha123','senha456');
		
		// assert
		expect(mensagens.MensagemSenhaNaoConfere.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com CPF inválido e valores diferentes e validar mensagem de alerta.', ()=> {	
		// act
		queroMeCadastrar.CadastroPrimeiraParte();
		queroMeCadastrar.CadastroDadosPessoaisPassandoCPF('12222222226');
		queroMeCadastrar.BotaoCadastrar.Clicar();
		
		// assert
		expect(mensagens.MensagemCPFInvalido.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com CPF inválido e valores iguais e validar mensagem de alerta.', ()=> {	
		// act
		queroMeCadastrar.CadastroPrimeiraParte();
		queroMeCadastrar.CadastroDadosPessoaisPassandoCPF('22222222222');
		queroMeCadastrar.BotaoCadastrar.Clicar();
		
		// assert
		expect(mensagens.MensagemCPFInvalido.isDisplayed()).toBe(true);
	});
	
	it('Preencher "Nacionalidade" diferente de "Brasileira" e validar que "CPF" é desabilitado.', ()=> {
		// act
		queroMeCadastrar.SetNacionalidade('Britânica');
		
		// assert
		// Validar que CPF não é obrigatório nesse caso (disabled).
		expect(queroMeCadastrar.CPFNacionalidadeNaoBrasileira.isDisplayed()).toBe(true);
	});
	
	it('Preencher "Nacionalidade" igual a "Brasileira" e validar que "CPF" continua habilitado.', ()=> {
		// act
		queroMeCadastrar.SetNacionalidade('Brasileira');
		
		// assert
		// Validar que CPF está obrigatório (required).
		expect(queroMeCadastrar.CPFNacionalidadeBrasileira.isDisplayed()).toBe(true);
	});
	
	it('Não selecionar "Estado" e validar que o campo "Cidade" fica desabilitado',()=> {
		// Scroll até o campo 'Estado'.
		helper.AguardarElementoEScrollAteElemento(queroMeCadastrar.Estado);
		// @assert
		expect(queroMeCadastrar.CidadeDesabilitada.isDisplayed()).toBe(true);
	});
	
	it('Preencher "Estado" e validar que o campo "Cidade" fica habilitado',()=> {
		// @act
		queroMeCadastrar.SetNacionalidade('Brasileira');
		queroMeCadastrar.SetEstado('Minas Gerais');
		
		// @assert
		expect(queroMeCadastrar.CidadeHabilitada.isDisplayed()).toBe(true);
	});
	
	it('(RHU01-1140) Tentar realizar cadastro com "Data de Nascimento" maior que a data atual', ()=> {
		// @Act
		// Cadastro da primeira parte.
		queroMeCadastrar.CadastroPrimeiraParte();
		queroMeCadastrar.CadastroDadosPessoais();
		
		queroMeCadastrar.DataNascimento.Limpar().EnviarTexto('30/08/2025');
		
		queroMeCadastrar.BotaoCadastrar.Clicar();

		// @Assert
		// Valida que o cadastro não foi realizado.
		expect(mensagens.MensagemLoginSucesso.isPresent()).toBe(false);
		expect(mensagens.MensagemDataNaoPodeSerMaiorQueDataAtual.isDisplayed()).toBe(true);
	});

	it ('Validar se o calendário está sendo exibido corretamente', ()=> {

		queroMeCadastrar.DataNascimento.Clicar();

		expect(queroMeCadastrar.Calendario.isDisplayed()).toBe(true);

	});
	
});




