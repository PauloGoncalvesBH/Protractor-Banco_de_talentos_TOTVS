// Questionarios.po.js
// Paulo Gonçalves

'use strict'

const Helper = require('../helper.js');

const helper = new Helper();

require('../ElementFinder.js');

class Questionarios {
	
	constructor () {
		this.TodosOsQuestionarios = element.all(by.css('[ng-repeat="quest in controller.listaQuestionarios"]'));
		this.BotaoSalvar = element(by.css('[ng-click="controller.gravarRespostas()"]'));
		this.StatusNaoPreenchido = element.all(by.cssContainingText('div','Não preenchido')).get(0);
		this.StatusPreenchido = element.all(by.cssContainingText('div','Preenchido')).get(0);
		this.StatusParcialmente = element.all(by.cssContainingText('div','Parcialmente')).get(0);
		this.QuestaoUmTextoLivre = element(by.css('[ng-if="quest.Tipo == 1"][name="quest_model"]'));
		this.QuestaoTresEscolhaSimples = element.all(by.css('[ng-options="option.CodOpcaoResposta as option.TextoReposta for option in quest.OpcoesResposta"]')).get(0);
		this.BotaoLimparValor = element(by.css('[data-ng-click="cleanValue()"]'));
		this.ColunaVaga = element.all(by.cssContainingText('div','Vaga')).get(0);
	}

	Visita() {
		browser.get('#/RM/Rhu-BancoTalentos/questionarios_geral/lista');
	}

	// Utilizado no expect para verificar a existência do questionário.
	ElementoQuestionario(questionario) {
		helper.AguardarElemento(this.ColunaVaga);
		return element.all(by.cssContainingText('[ng-click="controller.exibirDetalhesQuestionario(quest)"]', questionario)).get(0);
	}

	AbrirQuestionario(questionario) {
		const quest = element(by.cssContainingText('[ng-click="controller.exibirDetalhesQuestionario(quest)"]', questionario));
		quest.Clicar();
	}

	PreencherQuestaoUm(texto) {
		this.QuestaoUmTextoLivre.Limpar().EnviarTexto(texto);
	}

	PreencherQuestaoDois(opcao) {
		const elemento = element(by.css('[name="option_model"][label="' + opcao + '"]'));
		elemento.Clicar();
	}

	// Parâmetro é o número do item na lista, para selecionar o primeiro item passe '1'.
	PreencherQuestaoTres(opcao) {
		this.QuestaoTresEscolhaSimples.Clicar();
		browser.sleep(100);
		// Para que a opção escolhida pela pessoa corresponda ao value. O value 0 é a opção 1.
		opcao --;
		element(by.css('[value="' + opcao + '"]')).click();
		browser.sleep(100);
	}

	ElementoCheckboxMarcadoQuestaoDois(QuestaoDois) {
		return element.all(by.css('[label="' + QuestaoDois + '"]')).get(1);
	}

	// AJUSTAR O CSS
	ElementoEscolhaSimplesQuestaoTres(QuestaoTres) {
		// Diminui em 1 o valor de 'QuestaoTres' pois a primeira opcao tem value 0.
		// O único value que aparece é o que está selecionado na questão de 'Escolha Simples'.
		QuestaoTres--;
		return element(by.css('[value="' + QuestaoTres + '"]'));
	}

	Questao(questao) {
		return element.all(by.css('[ng-if="quest.Tipo == ' + questao + '"]')).get(0);
	}

}


module.exports = Questionarios;