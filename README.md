> [!NOTE]
> <strong>Web Instituto</strong>
><p> Proyecto institucional de comunicaciones de profesores, donde realizan las acciones de cursadas y finales. Lo que se pudo apreciar de este proyecto es como los datos pueden manipularse, mostrando la visualización y modificaciones de ellos, a traves de, distintas funciones que lleva a cabo el organismo.</p>
# Formato MOBILE
[![mobile.png](https://i.postimg.cc/0Q82Bzvs/mobile.png)](https://postimg.cc/HJhgJsjZ)
[![mobile2.png](https://i.postimg.cc/J4dDH5LB/mobile2.png)](https://postimg.cc/VdnL3M5Y)

# Formato Tablet
[![tablet.png](https://i.postimg.cc/SNwQpT4V/tablet.png)](https://postimg.cc/CzspG4zf)
[![tablet2.png](https://i.postimg.cc/DybF5rGG/tablet2.png)](https://postimg.cc/vcMpZ638)

> [!TIP]
> <strong>Como iniciarlo</strong>
> <p> Debemos tener descargado NODE en nuestro ordenador para poder correr el servicio. La versión que es utilizada en este proyecto, es la v18.18 y luego iniciarlo desde la consola con el comando "npm start".<p>
<ul>
    <li>
        Tener el cuenta que la DB que se utiliza es MICROSOFT ACCESS 2000, en donde es personal en cada PC, para ello, debemos cambiar los datos de nuestra variable de entorno, en                nuestro DB ↓ . Cada uno deberá dirigirse al archivo .env para cambiar el valor de la ruta, con el de su PC, ejemplo : "C:\Users\Downloads" en el punto SOURCE.
    </li>
    <li>
        Una vez, hechos los pasos anteriores ya puedes utilizar este proyecto. Recordar que la Base de datos que se agregue es personal por lo que deberá revisar el Back-End para que le funcione a su gusto.
    </li>
</ul>

<h2> Servicio continuo por errores </h2>
<ul>
    <li>
        pm2 start tu_archivo_de_inicio.js
    </li>
    <li>
        pm2 startup //para generar un script de inicio
    </li>
    <li>
        pm2 save //Para guardar la configuración actual
    </li>
    <li>
        pm2 stop tu_archivo_de_inicio.js //frenar la ejecución
    </li>
</ul>

<h2> Herramientas que se utilizan en el proyecto</h2>
<li>HTML</li>
<li>CSS</li>
<li>Javascript</li>
<li>Node JS</li>
    <ul>
        <li>Express</li>
        <li>Morgan</li>
        <li>Nodemon</li>
        <li>DotEnv</li>
        <li>pm2 -g</li>
    </ul>
<li>Microsoft Access (DB)</li>
