## React + PLN

aplicação que detecta textos em uma imagem qualquer de internet

![reactpln](https://user-images.githubusercontent.com/51303068/220518067-299647fd-199c-4b2f-a3bd-d524edaf3a36.gif)

O objetivo dessa aplicação é exemplificar o inicio dos meus estudos com vis. 
Qualquer eventual melhoria ou correção pode ser relatado :)

#### Instalação

Executar o comando abaixo irá:
  * instalar o [tesseract]('https://github.com/tesseract-ocr/tesseract') na maquina 
  * instalar o pacote de idiomas pt-br para tesseract 
  * instalar as dependência do react 
  
  ```bash
bash install.sh
```
PS: Os comandos estão para a distribuição manjaro, caso esteja em outra distribuição, altere os scripts.

Após isso é recomendado a utilização de um ambiente virtual, com isso:

```bash
virtualenv reactPln
source reactPln/bin/activate
```
Depois instale as dependências do python:

```bash
pip install -r requirements.txt
```

#### Uso

O comando abaixo vai iniciar simultaneamente a aplicação react e a API python
```javascript
npm run start
```

#### Contribuições

Como dito, esse projeto é uma exemplificação do inicio de estudo da área, é algo relativamente simples e
tende a muitas melhorias, com isso, PR's são bem vindas.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
