// ElementFinder.js
// Paulo Gonçalves

'use strict'

/*
Apenas requeira nos arquivos aonde deseja utilizar
require('../ElementFinder.js');
*/

var ElementFinder = $('').constructor;

ElementFinder.prototype.Clicar = function() {
	browser.executeScript('arguments[0].scrollIntoView(true);', this); 
	return this.click();
};

ElementFinder.prototype.EnviarTexto = function(text) {
	browser.executeScript('arguments[0].scrollIntoView(true);', this); 
	return this.sendKeys(text);
};

ElementFinder.prototype.Limpar = function() {
	browser.executeScript('arguments[0].scrollIntoView(true);', this); 
	return this.clear();
};


module.exports = ElementFinder;