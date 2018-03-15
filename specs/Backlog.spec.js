// Backlog.spec.js
// Paulo Gonçalves

'use strict'

const Login = require('../page_objects/Login.po.js');
const Mensagens = require('../page_objects/Mensagens.po.js');
const QueroMeCadastrar = require('../page_objects/QueroMeCadastrar.po.js');
const Helper = require('../helper.js');
const TodasAsVagas = require('../page_objects/TodasAsVagas.po.js');
const DadosDaVaga = require('../page_objects/DadosDaVaga.po.js');
const Perfil = require('../page_objects/Perfil.po.js');
const Questionarios = require('../page_objects/Questionarios.po.js');

require('../ElementFinder.js');

describe('(Backlog) Agrupador de testes de tarefas do backlog', ()=> {
	const login = new Login();
	const mensagens = new Mensagens();
	const queroMeCadastrar = new QueroMeCadastrar();
	const helper = new Helper();
	const todasAsVagas = new TodasAsVagas();
	const dadosDaVaga = new DadosDaVaga();
	const perfil = new Perfil();
	const questionarios = new Questionarios();
	
	describe(' - (1) (RHU01-803) - Ao atualizar corretamente a aba "Formas de Contato" informa que os campos obrigatórios não estão preenchidos', ()=> {
		// ----------
		// http://jiraproducao.totvs.com.br/browse/RHU01-143
		// Aba 'Formas de Contato' - Ativa com campo obrigatório (País)
		// ----------
		
		afterEach(()=> {
			// Deslogar - Preparação para o proximo teste
			login.DeslogarBancoDeTalentos();
		});
		
		it('(1.0) Verificar que ao preencher os campos obrigatórios da aba "Formas de Contato" e salvar, estão sendo atualizados corretamente',()=> {
			// @arrange

			queroMeCadastrar.Visita();
			
			queroMeCadastrar.CadastroPadrao();
			
			// Necessário para que os alertas de 'cadastro' e 'login' sumam, pois pela velocidade do teste ele impede
			// de fechar o alerta de 'erro de negocio' ao tentar se candidatar a uma vaga com algum campo obrigatório não preenchido.
			helper.RecarregarPagina();
			
			// @act
			helper.AcessarPerfil();
			
			perfil.EditarAbaPerfilSetFormaDeContratacaoESalvar('FreeLancer (PF)');
			
			// @assert
			expect(mensagens.PerfilProfissionalAtualizada.isDisplayed()).toBe(true);
		});
		
	});
	
	describe(' - (2) (RHU01-765) e (RHU01-1138) - Parâmetro "Consistir preenchimento mínimo do Currículo"', ()=> {
		// ----------
		// http://jiraproducao.totvs.com.br/browse/RHU01-765
		// Parâmetro 'Consistir preenchimento mínimo do Currículo' marcado em [Configuraçoes >> RM Portal >> Banco de Talentos (Currículo)]
		// Aba 'Dados Pessoais' - Com 'Painel ativo' desmarcado e com campo obrigatório (Sexo)														x
		// Aba 'Formas de Contato' - Ativa com campo obrigatório (País)																							- Visível para o candidato.
		// Aba 'Perfil Profissional' - Ativa com campo obrigatório (forma de Contratação)																	- Visível para o candidato.
		// Aba 'Infs. Adicionais' - Com restrição a 'Candidatos' marcada e com campo obrigatório (RECURSOACESSIBILIDADE)			x
		// Aba 'Exp. Profissional' - Com 'Painel ativo' desmarcado e com campo obrigatório (Ativ. Desenvolvidas)									x
		// Aba 'Form. Acadêmica' - Ativa com campo obrigatório (Campos obrigatórios por default)														- Visível para o candidato.
		// Aba 'Form. Adicional' - Com restrição a 'Candidatos' marcada e com campo obrigatório (Campos obrigatórios por default)		x
		//
		// Após os testes (2.3) e (2.4) deve deletar a candidatura do candidato na vaga antes de tentar excluir o currículo externo do mesmo.
		// ----------
		
		const Vaga = 'Vaga RHU01-765';
		
		beforeEach(()=>
		{
			// @arrange
			queroMeCadastrar.Visita();
		});
		
		afterEach(()=>
		{
			// Deslogar - Preparação para o proximo teste
			login.DeslogarBancoDeTalentos();
		});
		
		it('(2.1) Verificar que candidatura é impedida quando aba "Formas de Contato" não está preenchida.', ()=> {
			// @Arrange
			
			queroMeCadastrar.CadastroPadrao();
			
				// Necessário para que os alertas de 'cadastro' e 'login' sumam, pois pela velocidade do teste ele impede
				// de fechar o alerta de 'erro de negocio' ao tentar se candidatar a uma vaga com algum campo obrigatório não 	preenchido.
			helper.RecarregarPagina();
	
			// @Act
				// Acessa 'Painel de Vagas' >> 'Todas As Vagas'			
				// Filtra pela vaga do teste 'Analista de Automação de Testes'.
				// Abre a vaga.
				// Candidata à vaga.
			todasAsVagas.FiltrarPorVagaAbrirECandidatar(Vaga);
			
			// @Assert
				// Valida que a mensagem de impedimento da aba de 'Formas de Contato' está presente.
			expect(mensagens.MensagemImpedimentoAbaFormasDeContato.isDisplayed()).toBe(true);
			
			dadosDaVaga.BotaoFecharImpedimento.Clicar();
			
				// Valida que o botão 'Candidatar' ainda está presente.
			expect(dadosDaVaga.BotaoCandidatar.isDisplayed()).toBe(true);
		});
		
		it('(2.2) Verificar que candidatura é impedida quando a aba "Formas de Contato" está preenchida e a aba "Perfil Profissional" não está preenchida.', ()=> {
			// @arrange
			
			queroMeCadastrar.CadastroPadrao();
			
			// Necessário para que os alertas de 'cadastro' e 'login' sumam, pois pela velocidade do teste ele impede
			// de fechar o alerta de 'erro de negocio' ao tentar se candidatar a uma vaga com algum campo obrigatório não preenchido.
			helper.RecarregarPagina();
			
			helper.AcessarPerfil();
			
			// @act
			
			// Aba 'Formas de Contato'.
			// Edita 'Formas de Contato'.
			// Seta o país.
			// Salvar 'Formas de Contato'.
			perfil.EditarAbaFormasSetPaisESalvar('Japão');
			
			expect(mensagens.FormasDeContatoAtualizada.isDisplayed()).toBe(true);
			
			// Acessa 'Painel de Vagas' >> 'Todas As Vagas'			
			// Filtra pela vaga do teste 'Analista de Automação de Testes'.
			// Abre a vaga.
			// Candidata à vaga.
			todasAsVagas.FiltrarPorVagaAbrirECandidatar(Vaga);
			
			// @assert
			// Valida que a mensagem de impedimento da aba de 'Dados Pessoais' está presente.
			expect(mensagens.MensagemImpedimentoAbaPerfilProfissional.isDisplayed()).toBe(true);
			
			dadosDaVaga.BotaoFecharImpedimento.Clicar();
			
			// Valida que o botão 'Candidatar' ainda está presente.
			expect(dadosDaVaga.BotaoCandidatar.isDisplayed()).toBe(true);
		});
		
		it('(2.3) Verificar que alerta de empregabilidade é emitido na candidatura quando somente a aba "Form. Acadêmica" não está preenchida.', ()=> {
			// @arrange
			
			queroMeCadastrar.CadastroPadrao();
			
			// Necessário para que os alertas de 'cadastro' e 'login' sumam, pois pela velocidade do teste ele impede
			// de fechar o alerta de 'erro de negocio' ao tentar se candidatar a uma vaga com algum campo obrigatório não preenchido.
			helper.RecarregarPagina();
			
			// @act
			// #region Perfil
			helper.AcessarPerfil();
			
			// Aba 'Formas de Contato'.
			
			perfil.EditarAbaFormasSetPaisESalvar('Japão');
			
			// Aba 'Perfil Profissional'.
			
			perfil.EditarAbaPerfilSetFormaDeContratacaoESalvar('Trainee (recém-formado)');
			// #endregion
			
			// Acessa 'Painel de Vagas' >> 'Todas As Vagas'
			// Filtra pela vaga do teste 'Analista de Automação de Testes'.
			// Abre a vaga.
			// Candidata à vaga.
			todasAsVagas.FiltrarPorVagaAbrirECandidatar(Vaga);
			
			// @assert
			// Valida que a mensagem de alerta da aba de 'Form. Acadêmica' está presente.
			expect(mensagens.MensagemAlertaAbaFormAcademica.isDisplayed()).toBe(true);
					
			// Valida que o botão 'Candidatar' não está mais presente.
			expect(dadosDaVaga.BotaoCandidatar.isDisplayed()).toBe(false);
		});
		
		// AGUARDAR CORREÇÃO DA ISSUE
		it('(2.4) (RHU01-1138) Verificar que nenhum alerta e/ou impedimento é emitido na candidatura quando todas as abas são preenchidas', ()=> {
			// @Arrange
			
			queroMeCadastrar.CadastroPadrao();
			
				// Necessário para que os alertas de 'cadastro' e 'login' sumam, pois pela velocidade do teste ele impede
				// de fechar o alerta de 'erro de negocio' ao tentar se candidatar a uma vaga com algum campo obrigatório não preenchido.
			helper.RecarregarPagina();
			
			// @Act
				// #region Perfil
			helper.AcessarPerfil();
			
				// Aba 'Formas de Contato'.
			
			perfil.EditarAbaFormasSetPaisESalvar('Japão');
			
				// Aba 'Perfil Profissional'.
			
			perfil.EditarAbaPerfilSetFormaDeContratacaoESalvar('Trainee (recém-formado)');
			
				// Aba 'Formação Acadêmica'.
			
			perfil.BotaoAdicionarFormacaoAcademica.Clicar();
			perfil.OutroCurso.EnviarTexto('Sistemas de Informações');
			perfil.OutraEntidadeEscola.EnviarTexto('Faculdade');
			perfil.SetGrauDeInstrucao('Graduação');
			perfil.BotaoSalvarFormacaoAcademica.Clicar();
				// #endregion
			
				// Acessa 'Painel de Vagas' >> 'Todas As Vagas'
				// Filtra pela vaga do teste 'Analista de Automação de Testes'.
				// Abre a vaga.
				// Candidata à vaga.
			todasAsVagas.FiltrarPorVagaAbrirECandidatar(Vaga);
			
			// @Assert
				// Valida que nenhum impedimento ou mensagem de alerta aparece.
			expect(mensagens.MensagemAlertaAbaFormAcademica.isPresent()).toBe(false);
			expect(mensagens.MensagemImpedimentoAbaFormasDeContato.isPresent()).toBe(false);
			expect(mensagens.MensagemImpedimentoAbaPerfilProfissional.isPresent()).toBe(false);
			
				// Valida que o botão 'Candidatar' não está mais presente.
			expect(dadosDaVaga.BotaoCandidatar.isDisplayed()).toBe(false);
		});
		
	});
	
	describe(' - (3) (RHU01-1052) - Parâmetro "Transformar letras dos campos alfanuméricos para maiúsculas"', ()=> {
		// ----------
		// http://jiraproducao.totvs.com.br/browse/RHU01-1052
		// Parâmetro "Transformar letras dos campos alfanuméricos para maiúsculas" em
		// parametrizador >> 'Configurações >> RM Portal >> Banco de Talentos (Currículo)' deve estar marcado.
		// ----------
		
		beforeEach(()=> {
			// @arrange
			queroMeCadastrar.Visita();
		});
		
		it('(3.0) Verificar que ao preencher o nome na página "Quero me Cadastrar" o mesmo está sendo alterado para caixa alta.',()=> {
			// @Act
			
				// Informa o valor que será preenchido no campo 'Usuário'.
			const TextoMinusculo = 'lówer UPPÊR midDLE';

				// Preenche o campo 'Usuario' e seleciona o campo 'EMail'.
			queroMeCadastrar.Usuario.EnviarTexto(TextoMinusculo);
			queroMeCadastrar.SetEmail('');

				// Move a página até o campo 'Usuario'.
			helper.ScrollAteElemento(queroMeCadastrar.Usuario);
			
				// Converte o texto preenchido no campo 'Usuário' para caixa alta para ser usado na validação.
				const TextoMaiusculo = TextoMinusculo.toUpperCase();

			// @Assert
				// Verifica que o texto do campo está todo em maísculo.
			expect(queroMeCadastrar.Usuario.getAttribute('value')).toEqual(TextoMaiusculo);
		});
	});
	

});
