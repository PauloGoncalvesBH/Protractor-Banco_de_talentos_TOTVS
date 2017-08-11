// Questionarios.po.js
// Paulo Gonçalves

var Helper = require('../helper.js');

var helper = new Helper();


var Questionarios = function() {
	this.TodosOsQuestionarios = element.all(by.css('[ng-repeat="quest in controller.listaQuestionarios"]'));
	this.BotaoSalvar = element(by.css('[ng-click="controller.gravarRespostas()"]'));
	this.StatusNaoPreenchido = element.all(by.cssContainingText('div','Não preenchido')).get(0);
	this.StatusPreenchido = element.all(by.cssContainingText('div','Preenchido')).get(0);
	this.StatusParcialmente = element.all(by.cssContainingText('div','Parcialmente')).get(0);
	this.QuestaoUmTextoLivre = element(by.css('[ng-if="quest.Tipo == 1"][name="quest_model"]'));
	this.QuestaoTresEscolhaSimples = element.all(by.css('[ng-options="option.CodOpcaoResposta as option.TextoReposta for option in quest.OpcoesResposta"]')).get(0);
	this.BotaoLimparValor = element(by.css('[data-ng-click="cleanValue()"]'));
};

Questionarios.prototype.Visita = function() {
	browser.get('#/RM/Rhu-BancoTalentos/questionarios_geral/lista');
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
};

// Utilizado no expect para verificar a existência do questionário.
Questionarios.prototype.ElementoQuestionario = function(questionario) {
	return element.all(by.cssContainingText('[ng-click="controller.exibirDetalhesQuestionario(quest)"]', questionario)).get(0);
};

Questionarios.prototype.AbrirQuestionario = function(questionario) {
	var quest = element(by.cssContainingText('[ng-click="controller.exibirDetalhesQuestionario(quest)"]', questionario));
	helper.ScrollAteElemento(quest);
	quest.click();
	browser.sleep(browser.params.TempoSleepAbrirFecharQuestionario);
};

Questionarios.prototype.Salvar = function() {
	helper.ScrollAteElemento(this.BotaoSalvar);
	this.BotaoSalvar.click();
	browser.sleep(browser.params.TempoSleepAbrirFecharQuestionario);
};

Questionarios.prototype.PreencherQuestaoUm = function(texto) {
	helper.ScrollAteElemento(this.QuestaoUmTextoLivre);
	this.QuestaoUmTextoLivre.clear().sendKeys(texto);
};

Questionarios.prototype.PreencherQuestaoDois = function(opcao) {
	var elemento = element(by.css('[name="option_model"][label="' + opcao + '"]'));
	helper.ScrollAteElemento(elemento);
	elemento.click();
};

// Parâmetro é o número do item na lista, para selecionar o primeiro item passe '1'.
Questionarios.prototype.PreencherQuestaoTres = function(opcao) {
	helper.ScrollAteElemento(this.QuestaoTresEscolhaSimples);
	this.QuestaoTresEscolhaSimples.click();
	browser.sleep(100);
	// Para que a opção escolhida pela pessoa corresponda ao value. O value 0 é a opção 1.
	opcao --;
	element(by.css('[value="' + opcao + '"]')).click();
	browser.sleep(100);
};

Questionarios.prototype.ApagarRespostaQuestaoTres = function() {
	helper.ScrollAteElemento(this.BotaoLimparValor);
	this.BotaoLimparValor.click();
};

Questionarios.prototype.ElementoCheckboxMarcadoQuestaoDois = function(QuestaoDois) {
	return element.all(by.css('[label="' + QuestaoDois + '"]')).get(1);
};

// AJUSTAR O CSS
Questionarios.prototype.ElementoEscolhaSimplesQuestaoTres = function(QuestaoTres) {
	// Diminui em 1 o valor de 'QuestaoTres' pois a primeira opcao tem value 0.
	// O único value que aparece é o que está selecionado na questão de 'Escolha Simples'.
	QuestaoTres--;
	return element(by.css('[value="' + QuestaoTres + '"]'));
};

Questionarios.prototype.Questao = function(questao) {
	return element.all(by.css('[ng-if="quest.Tipo == ' + questao + '"]')).get(0);
};



module.exports = Questionarios;



