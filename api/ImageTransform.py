import pytesseract
import numpy as np
import cv2
from pytesseract import Output
from PIL import ImageFont, ImageDraw, Image
from skimage import io
import os

def trataImagem(url):
    img = io.imread(url)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    config_tesseract = '--tessdata-dir tessdata --psm 6'
    resultado = pytesseract.image_to_data(rgb, lang='por', config=config_tesseract, output_type=Output.DICT)
    min_conf = 60
    font = './fonts/calibri.ttf'

    img_copia = rgb.copy()

    for i in range(0, len(resultado['text'])):
        confianca = int(float(resultado['conf'][i]))

        if confianca > min_conf:
            texto = resultado['text'][i]
            if not texto.isspace() and len(texto) > 1:
                x, y, img = caixa_texto(i, resultado, img_copia)
                img_copia = escreve_texto(resultado, min_conf, texto, x, y, img_copia, font, 12)
    
    img_copia = Image.fromarray(img_copia.astype('uint8'))
  
    if not os.path.exists("images"):
        os.makedirs("images")
        
    img_copia.save("images/image.jpg", 'JPEG')
   
    
    return img_copia


# Auxiliares
def caixa_texto(i, resultado, img, cor = (255,100,0)):
    x = resultado['left'][i]
    y = resultado['top'][i]
    w = resultado['width'][i]
    h = resultado['height'][i]

    cv2.rectangle(img, (x,y), (x+w, y+h), cor, 2)

    return x,y, img

def cria_documento(file_name, texto):
    if not os.path.exists("textos"):
        os.makedirs("textos")
    arquivo = open(f"textos/{file_name}.txt", 'a')
    arquivo.write(texto + '\n')
    arquivo.close()

def escreve_texto(resultado, min_conf, texto, x, y, img, font, tamanho_texto=32):
    font = ImageFont.truetype(font, tamanho_texto)
    img_pil = Image.fromarray(img)
    draw = ImageDraw.Draw(img_pil)
    draw.text((x,y - tamanho_texto), texto, font= font)
    img = np.array(img_pil)
    
    name_file = "texto"
    if int(resultado['conf'][0]) > min_conf:
        name_file = resultado['conf'][0]
    cria_documento(name_file, texto)
    return img


