
![picture alt](TOTVS-Banco_de_Talentos.png "TOTVS - Banco de Talentos")
![picture alt](protractor-pequeno.png "Protractor - end to end testing for AngularJS")

# Automação do Banco de Talentos TOTVS utilizando o framework Protractor

###### Autor: [Paulo Gonçalves](https://www.linkedin.com/in/paulo-goncalves/)
###### Automação do Banco de Talentos TOTVS através do framework Protractor.

 ## Porque Protractor?
 
 Porque Protractor é um framework open source de testes end-to-end automatizados para aplicações AngularJS (criado pelo próprio time que mantém o framework AngularJS), como é o caso do **Banco de Talentos** da [TOTVS](https://www.totvs.com/).
 
 A grande vantagem que o AngularJS fornece acima de outras ferramentas, como o Selenium, é de que o mesmo reconhece quando a página está sendo carregada ainda, poupando o uso de pausas, melhorando a performance do teste e evitando a existência de testes não determinísticos. 

 ## Importante
 * Deve ser sempre utilizado as boas práticas de automação de testes ao realizar qualquer alteração/implementação.
 * Deve-se criar uma função para passos que se repetem em vários testes ou ações que necessitem de mais de 1 passo; (Ex.: Login precisa de preencher usuário, senha e clicar em acessar.)
 * Caso seja uma função comum a várias telas o mesmo deve ser implementado no '*helper.js*';
 * Cada teste (*it*) e suíte de testes (*describe*) deve ser totalmente independente;
 * Todo teste deve ser criado com o uso do <font color="blue">AAA (Arrange, Act, Assert)</font>.
	* O <font color="blue">arrange</font> é a montagem do ambiente para o teste (act), portanto o mesmo deve estar dentro do 'BeforeEach' preferencialmente.
	* O <font color="blue">act</font> é o teste em si. É importante lembrar que o teste nunca deve utilizar o framework, fazendo buscas de elementos, isso é papel das funções, o act apenas chama as funções.
	* O <font color="blue">assert</font> é a validação do resultado do teste (act) com o uso do expect e é papel do teste, ou seja, nunca deve existir 'expect' em uma função. 
 * Cada page object (*.po.js) deve possuir apenas 1 module.exports;
 * Deve existir apenas 1 arquivo conf (protractor.conf.js);
 * Deve existir apenas 1 helper;
 * Novos specs devem ter o prefixo identificando a página (Ex.: QueroMeCadastrar.spec.js);
 * Novos page_objects devem ter o mesmo prefixo do spec (Ex.: QueroMeCadastrar.po.js);
 * Describes devem ter como prefixo o mesmo prefixo do spec [Ex.: describe('(QueroMeCadastrar) - Teste de blablabla.', function() {]

## Exemplos de testes de ponta a ponta (e2e)
 Os testes do exemplo e2e do projeto são escritos usando o Protractor, o framework de teste oficial para o teste e2e das aplicações AngularJS.
 Este projeto de teste tenta seguir as melhores práticas descritas no site oficial do Protractor.
 A arquitetura deste projeto está descrita abaixo:
 * O arquivo 'protractor.conf.js' armazena toda a configuração necessária para que os testes sejam executados, como o endereço do selenium, o navegador em que os testes serão executados, a URL base de onde os testes começarão, etc.
 * Existe também um arquivo 'helper.js' para funções gerais que podem ser usadas nos testes, como rodar a barra de scroll até encontrar o elemento, etc.
 * O diretório 'page_objects' contém os elementos da Web e as funções para páginas específicas ou partes das páginas. Isso é feito dessa maneira para uma melhor manutenção e para a separação
	de responsabilidades.
 * O diretório **specs** contém os testes, onde cada suíte de testes é um arquivo de spec separado.

## Instalação e Execução do Protractor

### Instalação local

1. Instale o Node.js:
https://nodejs.org/en/download/

2. Abra o CMD e execute o seguinte comando para instalar o Protractor:
```
	> npm install protractor -g
```
3. Execute o seguinte comando para realizar update do webdriver-manager.
```
	> webdriver-manager update
```

### Instalação dos node-modules
 Os node-modules são 'pacotes' que podem ser instalados para melhorar a visualização do resultado.


 Por tal motivo, acesse cada uma das páginas abaixos e realize a instalação na pasta aonde está o arquivo *conf.js*.
 Instalação simples e rápida, aonde apenas é preciso executar uma linha de comando no Prompt de Comando.

 Ambos os pacotes são configuráveis dentro do *conf.js* na parte *on prepare*.

#### protractor-jasmine2-html-reporter
 Esse 'pacote' gera um relatório HTML dos testes após sua execução.
[protractor-jasmine2-html-reporter](https://www.npmjs.com/package/protractor-jasmine2-html-reporter)

#### jasmine-spec-reporter
 Esse 'pacote' apresenta de melhor forma o resultado dos testes no CMD durante a execução do teste.
[jasmine-spec-reporter](https://www.npmjs.com/package/jasmine-spec-reporter)

### Executando o Protractor

 Nessa etapa pressuponho que já tenha realizado a codificação ou pego o projeto disponibilizado no TFS.
 Abra o arquivo \*conf.js e verifique qual o valor do parâmetro *directConnect*.

 Abra o CMD e vá até a pasta aonde está o arquivo *conf.js

##### Caso *directConnect = true*
 Envie o seguinte comando no CMD para iniciar o teste:
```
	> protractor
```
	
##### Caso *directConnect = false* ou ausente
2. Envie o seguinte comando no CMD para iniciar o Webdriver:
	webdriver-manager start
3. Envie o seguinte comando no CMD para iniciar o teste:
```
	> protractor
```

## Dicas
 O Protractor usa a sintaxe Jasmine, então:
 * Se você precisa executar apenas um caso de teste específico, altere o '**it**' para '**fit**';
 * Se quiser ignorar um caso de teste específico, altere o '**it**' para '**xit**';
 * Se você quiser executar apenas um conjunto de teste específico, altere o '**describe**' para '**fdescribe**'.
 * Se você quiser ignorar um conjunto de teste específico, altere o '**describe**' para '**xdescribe**'.
 
## Para mais informações
### Sites
 * [Documentação oficial](http://www.protractortest.org/#/)
 * [Protractor style guide](https://github.com/angular/protractor/blob/master/docs/style-guide.md#page-objects)
	 * Leitura OBRIGATÓRIA, pois há ótimas regras de como deve ser a arquitetura do testes no Protractor.
 * [Fórum Agile Tester](https://agiletesters.com.br)
   * Caso a resposta para a sua dúvida não seja encontrada na internet e procura apoio de pessoas capacitadas, poste a mesma no fórum Agile Tester, seus membros são pessoas receptivas e colaborativas. 
 * [Usos dos 'Before' e 'After'](http://timothymartin.azurewebsites.net/protractor-before-and-afters/)
 * [Talking about Testing](https://talkingabouttesting.com/)
 * [Medium do Walmyr Filho](https://medium.com/@walmyrlimaesilv)
 * [Cursos em Vídeo Aula de Protractor em PT-BR](http://code-squad.com/curso/Curso-Protractor-Automacao-de-testes-end-to-end-para-aplicacoes-Angular-JS/avulso)
 * [Github do conf.js](https://github.com/angular/protractor/blob/5.1.2/lib/config.ts)
 
### Livros

 * [Protractor - Lições sobre testes end-to-end automatizados](https://www.casadocodigo.com.br/products/livro-protractor)

## Informações do projeto
 
 **Início do projeto:**
 21/07/2017

 **Fim do projeto:**
 10/08/2017

 **Autor:**
 [Paulo Henrique Rocha Gonçalves](https://www.linkedin.com/in/paulo-goncalves/)

 **IDE:** [Visual Studio Code](https://code.visualstudio.com/) e [Notepad++](https://notepad-plus-plus.org/download/v7.4.2.html)

### Arquitetura dos arquivos
```
Protractor/
 |
 ├──page_objects/                   * Diretório contendo todos os page objects utilizados nos testes
 |   ├──Mensagens.po.js		    * Page object que agrupa todas as mensagens de alerta da página
 |   ├──QueroMeCadastrar.po.js      * Page object do spec 'QueroMeCadastrar.spec.js'
 |   ├──Login.po.js                 * Page object do spec 'Login.spec.js'
 |   └── *.po.js                    * Outros page objects
 |
 ├──specs/                          * Diretório contendo todos os casos de teste
 |   ├──QueroMeCadastrar.spec.js    * Teste da página 'Quero Me Cadastrar'
 |   ├──Login.spec.js               * Teste da página 'Login'
 |   └── *.spec.js                  * Outros specs
 |
 ├──README.md
 ├──TOTVS-Banco_de_Talentos.png     * Imagem utilizada no README.md
 ├──helper.js                       * Biblioteca de funções utilizadas em todas as páginas
 ├──protractor-pequeno.png          * Imagem utilizada no README.md
 └──protractor.conf.js              * Configuração do projeto
  ```

- - - -
###### Automação do Banco de Talentos teve início independente através da necessidade de uma automação de qualidade.
- - - -
