// Questionario.spec.js
// Paulo Gonçalves

'use strict'

const Login = require('../page_objects/Login.po.js');
const QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
const Helper = require('../helper.js');
const TodasAsVagas = require('../page_objects/TodasAsVagas.po.js');
const Perfil = require('../page_objects/Perfil.po.js');
const Questionarios = require('../page_objects/Questionarios.po.js');
const Mensagens = require('../page_objects/Mensagens.po.js');

describe('(Questionario) Teste total da página "Questionários"', ()=> {
	const login = new Login();
	const queroMeCadastrar = new QueroMeCadastrar();
	const helper = new Helper();
	const todasAsVagas = new TodasAsVagas();
	const perfil = new Perfil();
	const questionarios = new Questionarios();
	const mensagens = new Mensagens();

	// ----------
	// Será abordado também a seguinte issue:
	// http://jiraproducao.totvs.com.br/browse/RHU01-705	
	// Ao preencher questionário, salvar e voltar ao mesmo, os campos não estão preenchidos.
	// Ocorria com perguntas do tipo 'Múltipla Escolha' e 'Escolha Simples'.
	//
	// É preciso que a vaga possua 1 questionário.
	// O questionário NÃO pode ser obrigatório, pois não terá testes para tal asserção. Caso seja, quando houver implementação
	// da obrigatoriedade do questionário, os testes não funcionarão conforme o esperado.
	// ----------
	// Deve ser realizado antes de tentar deletar o currículo externo do mesmo:
	/* Executar as querys abaixo para deletar todas as respostas e em seguida deleter a candidatura do candidato na vaga.
	delete from VRSSELECOESPESSOASVAGASRESP
	delete from VRSSELECOESPESSOASVAGASQUEST
	*/
	//
	// O 'QuestionarioPadraoLookup' deve ser da seguinte forma:
	// Questão 1: Texto Livre, obrigatório.
	// Questão 2: Múltipla Escolha, deve ter 1 resposta com números 7 e 13.
	// Questão 3: Escolha Simples com no mínimo 2 respostas.
	//
	// O 'QuestionarioPadraoOutros' deve ser da seguinte forma:
	// Questão 1: Texto livre, ativo.
	// Questão 2: Múltipla Escolha, 1 resposta com número 7, inativa.
	// Questão 3: Qualquer tipo, obrigatório e inativo.
	
	let objUser = {usuario: ''};

	// Vaga a qual irá candidatar e fazer as verificações do questionário.
	const Vaga = 'Questionário Obrigatório';
	// Questionário que está atrelado à vaga
	const QuestionarioVaga = 'Automacao 01';
	// Vitae >> Configurações >> RM Portal >> Banco de Talentos (Currículo)
	// Questionário padrão que está cadastrado no parametrizador no lookup.
	const QuestionarioPadraoLookup = 'Padrao';
	// Questionário que está no campo 'Código dos outros questionários a serem exibidos(...)'.
	const QuestionarioPadraoOutros = 'Padrão 2';
	
	beforeAll(()=> {
		// Cadastro do usuário a ser utilizado nos testes
		queroMeCadastrar.Visita();
		
		queroMeCadastrar.CadastroPadraoRetornandoUsuarioPorReferencia(objUser);
		
		login.DeslogarBancoDeTalentos();
	});
	
	beforeEach(()=> {
		// @Arrange
		login.LogarBancoDeTalentosComSenhaPadrao(objUser.usuario);
		helper.AguardarElemento(mensagens.MensagemLoginSucesso);
		helper.RecarregarPagina();
	});
	
	afterEach(()=> {
		// Deslogar - Preparação para o proximo teste
		login.DeslogarBancoDeTalentos();
	});
	
	it('Verificar que o Usuário possui apenas os 2 questionários padrões após o cadastro.', ()=> {
		// @Act
		helper.AcessarQuestionarios();

		helper.AguardarElemento(questionarios.ElementoQuestionario(QuestionarioPadraoLookup));
		// @Assert
			// Valida a presença dos 2 questionários.
		expect(questionarios.ElementoQuestionario(QuestionarioPadraoLookup).isDisplayed()).toBe(true);
		expect(questionarios.ElementoQuestionario(QuestionarioPadraoOutros).isDisplayed()).toBe(true);
			// Valida que há apenas 2 questionários.
		expect(questionarios.TodosOsQuestionarios.count()).toEqual(2);
	});
	
	it('Verificar que após a candidatura está presente o questionário da vaga e os 2 questionários padrões.', ()=> {
		// @Act
		
			// Realiza a candidatura
		helper.AcessarPerfil();
		
			// Aba 'Formas de Contato'.
		perfil.EditarAbaFormasSetPaisESalvar('Japão');
		
			// Aba 'Perfil Profissional'.
		perfil.EditarAbaPerfilSetFormaDeContratacaoESalvar('Trainee (recém-formado)');
		
			// Acessa 'Painel de Vagas' >> 'Todas As Vagas'
		todasAsVagas.FiltrarPorVagaAbrirECandidatar(Vaga);
		
		helper.AcessarQuestionarios();
		// @Assert
			// Valida a presença dos 3 questionários, aonde 1 é da vaga e os outros 2 são padrões.
		expect(questionarios.ElementoQuestionario(QuestionarioVaga).isDisplayed()).toBe(true);
		expect(questionarios.ElementoQuestionario(QuestionarioPadraoLookup).isDisplayed()).toBe(true);;
		expect(questionarios.ElementoQuestionario(QuestionarioPadraoOutros).isDisplayed()).toBe(true);
			// Valida que há 3 questionários.
		expect(questionarios.TodosOsQuestionarios.count()).toEqual(3);
	});
	
	// QuestionarioPadraoLookup \/
	it('Verificar que surge alerta de campo obrigatório não preenchido ao abrir e tentar salvar questionário com campo obrigatório.', ()=> {
		// @Act
		helper.AcessarQuestionarios();
		
		questionarios.AbrirQuestionario(QuestionarioPadraoLookup);
		questionarios.BotaoSalvar.Clicar();
		
		// @Assert
			// Valida que surge a mensagem de alerta de que a questão 1 não está preenchida.
		expect(mensagens.AlertaQuestao1NaoPreenchida.isDisplayed()).toBe(true);
	});
	
	it('Verificar que status do questionário é inicialmente "Não preenchido"', ()=> {
		// @Act
		helper.AcessarQuestionarios();
		
		// @Assert
			// Valida que há apenas questionários não preenchidos.
		expect(questionarios.StatusNaoPreenchido.isDisplayed()).toBe(true);
		expect(questionarios.StatusParcialmente.isPresent()).toBe(false);
		expect(questionarios.StatusPreenchido.isPresent()).toBe(false);
	});
	
	it('Verificar que ao preencher parte do questionário o status é alterado para "Parcialmente"', ()=> {
		// @Act
		helper.AcessarQuestionarios();
		
		questionarios.AbrirQuestionario(QuestionarioPadraoLookup);
		questionarios.PreencherQuestaoUm('teste teste teste');
		questionarios.BotaoSalvar.Clicar();
		
		// @Assert
			// Valida que há apenas questionários não preenchidos e preenchidos parcialmente.
		expect(questionarios.StatusNaoPreenchido.isDisplayed()).toBe(true);
		expect(questionarios.StatusParcialmente.isDisplayed()).toBe(true);
		expect(questionarios.StatusPreenchido.isPresent()).toBe(false);
		
			// Valida que o questionário foi salvo com sucesso.
		expect(mensagens.QuestionarioSalvoComSucesso.isDisplayed()).toBe(true);
	});
	
	it('Verificar que ao preencher todo o questionário seu status é alterado para "Preenchido"', ()=> {
		// @Act
		helper.AcessarQuestionarios();
		
		// Valida que não há questionário preenchido
		expect(questionarios.StatusPreenchido.isPresent()).toBe(false);
		
		questionarios.AbrirQuestionario(QuestionarioPadraoLookup);
		questionarios.PreencherQuestaoUm('teste teste teste');
		const OpcaoQuestaoDois = '13';
		questionarios.PreencherQuestaoDois(OpcaoQuestaoDois);
		questionarios.PreencherQuestaoTres('1');
		
		questionarios.BotaoSalvar.Clicar();
		
		// @Assert
			// Valida que o questionário foi salvo com sucesso.
		expect(mensagens.QuestionarioSalvoComSucesso.isDisplayed()).toBe(true);
		
			// Valida que há questionário preenchido.
		expect(questionarios.StatusPreenchido.isDisplayed()).toBe(true);
		
		// Limpa os valores dos campos obrigatórios para testes posteriores.
		questionarios.AbrirQuestionario(QuestionarioPadraoLookup);
		questionarios.PreencherQuestaoDois(OpcaoQuestaoDois);
		questionarios.BotaoLimparValor.Clicar();
		questionarios.BotaoSalvar.Clicar();
	});
	
	it('(RHU01-705) Verificar que ao preencher todo o questionário, salvar e o reabrir, todos os dados preenchidos são recuperados.', ()=> {
		// @Act
		helper.AcessarQuestionarios();
		
		questionarios.AbrirQuestionario(QuestionarioPadraoLookup);
		questionarios.PreencherQuestaoUm('Teste (RHU01-705)');
		const OpcaoQuestaoDois = '8';
		questionarios.PreencherQuestaoDois(OpcaoQuestaoDois);
		const OpcaoQuestaoTres = '2';
		questionarios.PreencherQuestaoTres(OpcaoQuestaoTres);
		
		questionarios.BotaoSalvar.Clicar();
		
		questionarios.AbrirQuestionario(QuestionarioPadraoLookup);
		// @Assert
			// Valida se a questão 2 está marcado corretamente.
		expect(questionarios.ElementoCheckboxMarcadoQuestaoDois(OpcaoQuestaoDois).isSelected()).toBe(true);
			// Valida se a questão 3 está selecionada corretamente.
		expect(questionarios.ElementoEscolhaSimplesQuestaoTres(OpcaoQuestaoTres).isSelected()).toBe(true);
	});
	
	// QuestionarioPadraoOutros \/
	it('(RHU01-1139) Verificar que os campos inativos não aparecem no questionário.', ()=> {
		// @Act
		helper.AcessarQuestionarios();
		
		questionarios.AbrirQuestionario(QuestionarioPadraoOutros);
		
		// @Assert
			// Valida a presença de 1 questão.
		expect(questionarios.Questao('1').isDisplayed()).toBe(true);
		expect(questionarios.Questao('2').isPresent()).toBe(false);
		expect(questionarios.Questao('3').isPresent()).toBe(false);
	});
	
	it('(RHU01-1139) Verificar que ao preencher a única questão ativa, não surge mensagem de questão obrigatória não preenchida. A única questão obrigatória (3) está inativa.', ()=> {
		// @Act
		helper.AcessarQuestionarios();
		
		questionarios.AbrirQuestionario(QuestionarioPadraoOutros);
		questionarios.PreencherQuestaoUm('Teste Questão Ativa');
		questionarios.BotaoSalvar.Clicar();
		
		// @Assert
			// Valida que o questionário foi salvo com sucesso. Questão 1 é a única ativa.
		expect(mensagens.QuestionarioSalvoComSucesso.isDisplayed()).toBe(true);
	});
	
});
