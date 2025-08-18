<h1>KanbanFront</h1>

<p>Frontend para la aplicación Kanban, desarrollado en <strong>Angular 17</strong> con <strong>Angular Material</strong>.</p>

<h2>Tecnologías usadas</h2>
<ul>
  <li>Angular 17.3.0</li>
  <li>TypeScript 5.4.2</li>
  <li>Angular Material 17.3.10</li>
  <li>RxJS 7.8.0</li>
  <li>HTML / CSS / JavaScript</li>
</ul>

<h2>Instalación de dependencias</h2>
<p>Antes de ejecutar el proyecto, instalar las dependencias mediante <code>npm</code>:</p>
<pre><code>npm install</code></pre>
<p>Esto instalará todas las librerías listadas en <code>package.json</code>, incluyendo Angular Material, RxJS y las herramientas de desarrollo.</p>

<h2>Requisitos</h2>
<ul>
  <li><a href="https://nodejs.org/">Node.js (16+)</a></li>
  <li><a href="https://angular.io/cli">Angular CLI 17+</a></li>
  <li>Visual Studio Code o tu editor preferido</li>
  <li>Backend KanbanBack disponible para conectarse</li>
</ul>

<h2>Configuración del backend</h2>
<p>En <code>src/environments/environment.ts</code> definir la URL de tu backend:</p>
<pre><code>export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};</code></pre>
<p>Reemplazar <code>http://localhost:5000/api</code> con la URL donde se esté ejecutando tu backend.</p>

<h2>Ejecución</h2>
<ol>
  <li>Levantar el proyecto en modo desarrollo:
    <pre><code>npm start
# o alternativamente
ng serve</code></pre>
  </li>
  <li>El frontend se ejecutará por defecto en:
    <pre><code>http://localhost:4200</code></pre>
  </li>
</ol>

<h2>Angular Material</h2>
<p>Se utiliza el tema predefinido <code>indigo-pink</code>, que se importa automáticamente en <code>angular.json</code>.</p>

<h2>Testing</h2>
<p>Para ejecutar tests unitarios:</p>
<pre><code>ng test</code></pre>

<h2>Notas</h2>
<ul>
  <li>Si querés conectarlo con el backend, asegurate de que la API esté corriendo y la URL esté bien configurada en los archivos de entorno.</li>
  <li>Se puede cambiar el puerto de Angular modificando <code>angular.json → serve → options → port</code> si 4200 ya está en uso.</li>
</ul>

