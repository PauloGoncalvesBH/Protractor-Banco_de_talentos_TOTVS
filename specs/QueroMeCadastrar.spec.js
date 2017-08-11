// QueroMeCadastrar.spec.js
// Paulo Gonçalves

var QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
var Login = require('../page_objects/Login.po.js');
var Helper = require('../helper.js');
var Mensagens = require('../page_objects/Mensagens.po.js');

describe('(QueroMeCadastrar) Teste total da página "Quero me cadastrar"', function()
{
	var queroMeCadastrar = new QueroMeCadastrar();
	var login = new Login();
	var helper = new Helper();
	var mensagens = new Mensagens();
	
	var UsuarioObj = {Usuario: "usuariorepetido", Email: "repetido"};

	beforeAll(function()
	{
		queroMeCadastrar.Visita();
		
		queroMeCadastrar.CadastroPadraoApenasUsuarioUtilizandoReferencia(UsuarioObj);

		login.DeslogarBancoDeTalentos();
	});

	beforeEach(function()
	{
		// @Arrange
		queroMeCadastrar.Visita();
	});
	
	it('Realizar cadastro com todos os campos válidos.', function() {
		// act
		queroMeCadastrar.CadastroPadraoApenasUsuario('cadastrovalido');
		
		// assert
		expect(mensagens.MensagemLoginSucesso.isDisplayed()).toBe(true);
		
		// Deslogar - Preparação para o proximo teste
		login.DeslogarBancoDeTalentos();		
	});
	
	it('Preencher o campo "Usuário" pertencente a outro candidato e validar mensagem de alerta.', function() {
		// act
		queroMeCadastrar.SetUsuario(UsuarioObj.Usuario);
		queroMeCadastrar.SetEmail('');
		
		// assert
		expect(mensagens.MensagemUsuarioExistente.isDisplayed()).toBe(true);
	});
	
	it('Preencher o campo "Email" pertencente a outro candidato e validar mensagem de alerta.', function() {
		// act
		queroMeCadastrar.SetEmail(UsuarioObj.Email);
		queroMeCadastrar.SetConfirmarEmail('');
		
		// assert
		expect(mensagens.MensagemEmailExistente.isDisplayed()).toBe(true);
	});
	
	it('Preencher o campo "Confirmar e-mail" diferente do e-mail inicial e validar mensagem de alerta impedindo cadastro.', function() {
		// act
		queroMeCadastrar.SetUsuario('usuario');
		queroMeCadastrar.SetEmail('emaildiferente@totvs.com.br');
		queroMeCadastrar.SetConfirmarEmail('email@totvs.com.br');
		queroMeCadastrar.SetSenha('senha123');
		queroMeCadastrar.SetConfirmarSenha('senha123');
		
		// Cadastro da parte de 'Dados Pessoais'.
		queroMeCadastrar.CadastroDadosPessoais();
		
		queroMeCadastrar.BotaoCadastrar.click();
		
		// assert
		expect(mensagens.MensagemEmailNaoConfere.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Senha" menor que 6 dígitos e validar mensagem de alerta.', function() {
		// act
		queroMeCadastrar.TesteSenha('sen12','sen12');
		
		// assert
		expect(mensagens.MensagemSenhaInvalida.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Senha" com apenas número e validar mensagem de alerta.', function() {
		// act
		queroMeCadastrar.TesteSenha('123123','123123');
		
		// assert
		expect(mensagens.MensagemSenhaInvalida.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Senha" com apenas letras e validar mensagem de alerta.', function() {
		// act
		queroMeCadastrar.TesteSenha('abcdef','abcdef');
		
		// assert
		expect(mensagens.MensagemSenhaInvalida.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com "Confirmar Senha" diferente da "Senha" inicial e validar mensagem de alerta.', function() {
		// act
		queroMeCadastrar.TesteSenha('senha123','senha456');
		
		// assert
		expect(mensagens.MensagemSenhaNaoConfere.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com CPF inválido e valores diferentes e validar mensagem de alerta.', function() {	
		// act
		queroMeCadastrar.TesteCPF('12222222226');
		
		// assert
		expect(mensagens.MensagemCPFInvalido.isDisplayed()).toBe(true);
	});
	
	it('Tentar realizar cadastro com CPF inválido e valores iguais e validar mensagem de alerta.', function() {	
		// act
		queroMeCadastrar.TesteCPF('22222222222');
		
		// assert
		expect(mensagens.MensagemCPFInvalido.isDisplayed()).toBe(true);
	});
	
	it('Preencher "Nacionalidade" diferente de "Brasileira" e validar que "CPF" é desabilitado.', function() {
		// act
		queroMeCadastrar.SetNacionalidade('Britânica');
		
		// assert
		// Validar que CPF não é obrigatório nesse caso (disabled).
		expect(queroMeCadastrar.CPFNacionalidadeNaoBrasileira.isDisplayed()).toBe(true);
	});
	
	it('Preencher "Nacionalidade" igual a "Brasileira" e validar que "CPF" continua habilitado.', function() {
		// act
		queroMeCadastrar.SetNacionalidade('Brasileira');
		
		// assert
		// Validar que CPF está obrigatório (required).
		expect(queroMeCadastrar.CPFNacionalidadeBrasileira.isDisplayed()).toBe(true);
	});
	
	it('Não selecionar "Estado" e validar que o campo "Cidade" fica desabilitado',function() {
		// Scroll até o campo 'Estado'.
		helper.ScrollAteElemento(queroMeCadastrar.Estado);
		// @assert
		expect(queroMeCadastrar.CidadeDesabilitada.isDisplayed()).toBe(true);
	});
	
	it('Preencher "Estado" e validar que o campo "Cidade" fica habilitado',function() {
		// @act
		queroMeCadastrar.SetNacionalidade('Brasileira');
		queroMeCadastrar.SetEstado('Minas Gerais');
		
		// @assert
		expect(queroMeCadastrar.CidadeHabilitada.isDisplayed()).toBe(true);
	});
	
	// É preciso aguardar correção da issue para ajustar o expect dessa issue.
	it('(RHU01-1140) Tentar realizar cadastro com "Data de Nascimento" maior que a data atual', function() {
		// @Act
		// Cadastro da primeira parte.
		queroMeCadastrar.CadastroPrimeiraParte();
		
		// Cadastro da parte de 'Dados Pessoais'.
		queroMeCadastrar.CadastroDadosPessoais();
		
		queroMeCadastrar.DataNascimento.clear();
		queroMeCadastrar.SetDataNascimento('30/08/2030');
		
		queroMeCadastrar.ClickBotaoCadastrar();
		
		// @Assert
			// Valida que o cadastro não foi realizado.
		expect(mensagens.MensagemLoginSucesso.isPresent()).toBe(false);
		//expect(mensagens./*IMPLEMENTAR AQUI A MENSAGEM*/.isDisplayed()).toBe(true);

			// Caso o teste falhe, irá ser feito o logout para os próximos testes continuarem independentemente do resultado do atual.
		if (mensagens.MensagemLoginSucesso.isPresent())
			login.DeslogarBancoDeTalentos();

	});
	
});




