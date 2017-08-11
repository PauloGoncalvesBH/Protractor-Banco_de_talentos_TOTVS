// TodasAsVagas.spec.js
// Paulo Gonçalves

var QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
var Login = require('../page_objects/Login.po.js');
var Mensagens = require('../page_objects/Mensagens.po.js');
var Perfil = require('../page_objects/Perfil.po.js');
var TodasAsVagas = require('../page_objects/TodasAsVagas.po.js');
var Helper = require('../helper.js');

describe('(TodasAsVagas) Teste de candidatura à uma vaga.', function()
{
	// ----------
	// Parâmetro "Número máximo de vagas ativas a que um candidato pode se candidatar" em
	// parametrizador >> 'Configurações >> RM Portal >> Banco de Talentos (Currículo)' deve estar preenchido com 1.
	// ----------
	var queroMeCadastrar = new QueroMeCadastrar();
	var login = new Login();
	var mensagens = new Mensagens();
	var perfil = new Perfil();
	var todasAsVagas = new TodasAsVagas();
	var helper = new Helper();
	
	beforeEach(function()
	{
		// @Arrange
		queroMeCadastrar.Visita();
	});

	afterEach(function()
	{
		login.DeslogarBancoDeTalentos();
	});
	
	it('Validar que o parâmetro "Número máximo de vagas ativas a que um candidato pode se candidatar" está funcionando corretamente.', function() {
		// @Arrange
		queroMeCadastrar.CadastroPadraoApenasUsuario('NumeroMaximo');

			// Necessário para que os alertas de 'cadastro' e 'login' sumam.
		helper.RecarregarPagina();
			
		helper.AcessarPerfil();
			
			// Aba 'Formas de Contato'.
		perfil.EditarAbaFormasSetPaisESalvar('Japão');
			
			// Aba 'Perfil Profissional'.
		perfil.EditarAbaPerfilSetFormaDeContratacaoESalvar('Trainee (recém-formado)');
			
			// Acessa 'Painel de Vagas' >> 'Todas As Vagas'
		helper.AcessarTodasAsVagas();
			
			// Filtra pela vaga do teste.
			// Abre a vaga.
			// Candidata à vaga.
		todasAsVagas.FiltrarPorVagaAbrirECandidatar('Vaga RHU01-765');
			
			// Valida que a candidatura foi feita com sucesso na primeira vaga.
		expect(mensagens.MensagemCandidaturaComSucesso.isDisplayed()).toBe(true);
		
		// @Act	
			// Ações para realizar a SEGUNDA candidatura.
		helper.AcessarTodasAsVagas();
		todasAsVagas.FiltrarPorVagaAbrirECandidatar('Questionário Obrigatório');
		
		// @Assert
		expect(mensagens.MaximoDeUmaVagaCandidatadaAtingida.isDisplayed()).toBe(true);
	});
	
});
