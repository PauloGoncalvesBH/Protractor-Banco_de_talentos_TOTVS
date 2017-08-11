//	helper.js


var Helper = function() {
	
	// Menus de acesso às paginas
	this.Home = element(by.css('[href="#/RM/Rhu-BancoTalentos/home"]'));
	this.Perfil = element(by.css('[href="#/RM/Rhu-BancoTalentos/perfil"]'));
	//this.PainelDeVagas = element(by.cssContainingText('a', 'Painel de Vagas'));
	this.PainelDeVagas = element(by.css("[data-toggle='dropdown'][role='button']"));
	this.TodasAsVagas = element(by.css('[href="#/RM/Rhu-BancoTalentos/painelVagas/lista"]'));
	this.VagasQueEstouConcorrendo = element(by.css('[href="#/RM/Rhu-BancoTalentos/home"]'));
	this.Questionarios = element(by.css('[href="#/RM/Rhu-BancoTalentos/questionarios_geral/lista"]'));
	
};

Helper.prototype.ScrollAteElemento = function(Elemento) {
	browser.executeScript('arguments[0].scrollIntoView(true);', Elemento); 
}

// Função que seleciona um item em uma lista que é aberta após clicar no campo.
Helper.prototype.SelecionarItemNaLista = function(Item) {
	element.all(by.cssContainingText('a',Item)).get(0).click();
	browser.sleep(100);
}

// #region Menu de acesso as paginas
Helper.prototype.AcessarHome = function() {
	this.ScrollAteElemento(this.Home);
	this.Home.click();
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
}

Helper.prototype.AcessarPerfil = function() {
	this.ScrollAteElemento(this.Perfil);
	this.Perfil.click();
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
}

Helper.prototype.AcessarTodasAsVagas = function() {
	this.ScrollAteElemento(this.PainelDeVagas);
	this.PainelDeVagas.click();
	this.TodasAsVagas.click();
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
}

Helper.prototype.AcessarVagasQueEstouConcorrendo = function() {
	this.ScrollAteElemento(this.PainelDeVagas);
	this.PainelDeVagas.click();
	this.VagasQueEstouConcorrendo.click();
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
}

Helper.prototype.AcessarQuestionarios = function() {
	this.ScrollAteElemento(this.Questionarios);
	this.Questionarios.click();
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
}
// #endregion

Helper.prototype.RecarregarPagina = function() {
	browser.refresh();
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
};

Helper.prototype.GerarCPF = function() {
	
	function randomiza(n) {
		var ranNum = Math.round(Math.random()*n);
		return ranNum;
	}
	
	function mod(dividendo,divisor) {
		return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
	}
	
	// False = Sem pontuação. True = Com pontuação.
	comPontos = false;
	
	var n = 9;
	var n1 = randomiza(n);
	var n2 = randomiza(n);
	var n3 = randomiza(n);
	var n4 = randomiza(n);
	var n5 = randomiza(n);
	var n6 = randomiza(n);
	var n7 = randomiza(n);
	var n8 = randomiza(n);
	var n9 = randomiza(n);
	var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
	d1 = 11 - ( mod(d1,11) );
	if (d1>=10)
		d1 = 0;
	var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
	d2 = 11 - ( mod(d2,11) );
	if (d2>=10)
		d2 = 0;
	retorno = '';
	
	if (comPontos)
		cpf = ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
	else
		cpf = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
			
	return cpf;
};

module.exports = Helper;

