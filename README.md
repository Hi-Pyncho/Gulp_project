# Сборка проекта на Gulp 4

## Описание проекта: 
Сборка проекта на Gulp. 

## Структура файлов и папок:  
>./app  

>>  /index.html

>> /images

>>	/js  
>>>		/main.js  

>>	/parts
>>>		/header.html 
>>>		/footer.html 

>>	/styles  
>>>		/main.scss

>./.gitignore 
>./gulpfile.js  
>./package.json  
>./index.html  

## Инструкция:  
1. Скачать все файлы в любую директорию   
2. Ввести в терминале/командной строке команду: npm i (должен быть установлен node.js) 
3. Выполнить команду: gulp (запуск таска default, который очистит каталог dist и запустит таск html, scripts, styles, images, а так же watch - отслеживает изменения в файлах html, css, sass, js и в каталоге img) 


