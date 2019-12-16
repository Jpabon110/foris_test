# App para el test en Foris
- nodejs v8.11.3
- react 16.12.0,

### Nota

En la carpeta file_examples, estan dos archivo con la extructura de como debe ser el contenido de los archivos que soporta la app, según los requerimientos de la prueba de foris, ademas de su respectiva extension.

### Razonamiento y toma de deciciones para la aplicación

Naturalmente era necesario cargar el archivo para luego leer su contenido, sin embargo se debia interactuar su contenido siguiendo el formato de ejemplo de la prueba, el cual se tomaron los siguientes apestos:

- Se verificaba si se habia seleccionado un archivo.

- Luego se recorria dicho archivo, y como dice el ejemplo de la prueba se debia asumir que el mismo tendria una estructura con los comandos "Student nombre" o sino "Presence dia hora_inicio hora_final salon", como cada registro del archivo se separa por un saldo de linea, entonces fue mas facil tratarlas, asi que se aplico un split('\n') por cada salto de linea del archivo.

- Una vez que cada registro del archivo fue separado por registro, se procedio a regorrer ese array de registros, pero en cada posicion del array estaba un comando asociado a un nombre, un ejemplo seria (Student Juan, Student miguel), como el comportamiento cambio y ahora era un poco mas especifico decidi aplicar otro split(' ') pero por cada espacio que los dividia pero antes limpiaba los espacios del inicio y del final con Trim().

- Al final y teninado un array con el cual se podia identificar los comandos, bastaba con preguntar si en la primera posición el valor era 'Student' o 'Presence'. Si era 'Student' entonces por medio de una función llamada findElement se buscaba si en un array declarado anteriormente existia el nombre que salia en la segunda posicion del array([0]=>comando,[1]=>nombre), si no existia se pushaba al array pero si ya existia no se agregaba para no repetir los nombres.

- Si en el array que se recorria el comando era 'Presence', se tenia que sumar el dia de asistencia de una persona, donde por medio del mismo array declarado anteriormente, se buscaba la posicion del array segun el nombre de la persona con la función findIndex. Una vez encontrada la posicion de la persona en el array anterior, se le sumaba a su atributo de dias (days) 1, por cada dia que asistio a clases.

- Seguido de los dias, se procedia a calcular cuantos minutos estuvo cada persona en cada clase para sumar su total de todos los dias que asistio a clase. Para hacer eso, se necesitaba asignar en el atributo de minutos (minutes), todas los inicios y fin de cada clase, para luego ser sumados, para convertir cada hora de inicio y fin a minutos se utilizaba una funcion llamada convertTime, la cual tomaba la hora estructurada en HH:MM, y se le aplicaba un split(':'), en donde se tomaba la primera posición que eran las horas y se multiplicaban por 60 (el equivalente a minutos), y se le sumaban la diferencia de minutos que tenia en la segunda posición.

- Una vez convertidas la hora de inicio y fin de cada clases, se restaban la hora de salida (fin) con la de entrada (inicio), y se obtenia el tiempo que estuvo en cada clases en minutos, para luego ser acumulada por nombres en el array.

- Para concluir el mismo array que se habia declarado de primero paso varias faces hasta que se convirtio en un array de objectos con la estructura deseada, luego se asignaba al estado de la aplicacion llamado 'studens', y en el render de la misma se le pasaba a un componente TableInfo en donde se iba a mostrar en una trabla ordenada de forma descendente por minutos.

### Testing en componentes

Para los testing se realizaron al componente tableInfo que era el que reaccionaba según los valores que tuviera el atributo del estado studens, estos test eran muy simples los cuales se definieron en dos los cuales estan ubicados en el archivo App.test.js en la carpeta _test_ adentro de components:

- El primer test comprueba como deberia de entrar la información, el cual es un array de objetos y se debe garantizar que todos los atributos dentro del array de objetos existan correctamente.

-El segundo test recibe dos parametros que son dos objetos los cuales se utilizan para comparar sus minutos y saber cual es mayor y menor de los dos, y dependiendo el resultado puede ser 1 o -1.


### Install FrontEnd dependecies
With NPM:
```sh
$ npm i
```
or Yarn:
```sh
$ yarn
```
### Run FrontEnd App
With NPM:
```sh
$ npm start
```
or Yarn:
```sh
$ yarn start
```

### Run Test App
With NPM:
```sh
$ npm test
```
or Yarn:
```sh
$ yarn test
```