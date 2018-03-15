// TodasAsVagas.spec.js
// Paulo Gonçalves

'use strict'

const QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
const Login = require('../page_objects/Login.po.js');
const Mensagens = require('../page_objects/Mensagens.po.js');
const Perfil = require('../page_objects/Perfil.po.js');
const TodasAsVagas = require('../page_objects/TodasAsVagas.po.js');
const DadosDaVaga = require('../page_objects/DadosDaVaga.po.js');
const Helper = require('../helper.js');

describe('(TodasAsVagas) Teste de candidatura à uma vaga.', ()=>
{
	// ----------
	// Parâmetro "Número máximo de vagas ativas a que um candidato pode se candidatar" em
	// parametrizador >> 'Configurações >> RM Portal >> Banco de Talentos (Currículo)' deve estar preenchido com 1.
	// ----------
	const queroMeCadastrar = new QueroMeCadastrar();
	const login = new Login();
	const mensagens = new Mensagens();
	const perfil = new Perfil();
	const todasAsVagas = new TodasAsVagas();
	const dadosDaVaga = new DadosDaVaga();
	const helper = new Helper();
	
	beforeEach(()=>
		{
		// @Arrange
		queroMeCadastrar.Visita();
	});

	afterEach(()=>
	{
		login.DeslogarBancoDeTalentos();
	});
	
	it('Validar que o parâmetro "Número máximo de vagas ativas a que um candidato pode se candidatar" está funcionando corretamente.', ()=> {
		// @Arrange
		queroMeCadastrar.CadastroPadrao();

		helper.RecarregarPagina();
			
		helper.AcessarPerfil();
			
		perfil.EditarAbaFormasSetPaisESalvar('Japão');
			
		perfil.EditarAbaPerfilSetFormaDeContratacaoESalvar('Trainee (recém-formado)');
			
		todasAsVagas.FiltrarPorVagaAbrirECandidatar('Vaga RHU01-765');
		helper.AguardarElemento(mensagens.MensagemCandidaturaComSucesso);

		// @Act	
		todasAsVagas.FiltrarPorVagaAbrirECandidatar('Questionário Obrigatório');
		
		// @Assert
		expect(mensagens.MaximoDeUmaVagaCandidatadaAtingida.isDisplayed()).toBe(true);

	});
	
});
