<h3 align="center";>

**Proyecto Express Frontend**

</h3>

<br>
<br>
<br>

<h3 align="center";>

**Sayara Yurley Aparicio Arciniegas**

</h3>

<h3 align="center";>

**Santiago Aguilar Vesga**

</h3>

<br>
<br>
<br>
<br>

<h3 align="center";>

**S1**

</h3>

<h3 align="center";>

**Pedro Felipe Gómez Bonilla**

</h3>

<br>
<br>
<br>
<br>

<h3 align="center";>

**CAMPUSLANDS**

</h3>

<h3 align="center";>

**RUTA NODEJS**

</h3>

<h3 align="center";>

**BUCARAMANGA, SANTANDER**

</h3>

<h3 align="center";>

**2025**

</h3>

---

# KarenFlix – Frontend

## Descripción del Proyecto  

**KarenFlix** es una aplicación web desarrollada en **HTML, CSS y JavaScript puro** que consume los servicios del backend (API RESTful en Node.js + Express + MongoDB).  

El frontend permite a los usuarios navegar por el catálogo de películas, series y animes, visualizar detalles, interactuar con reseñas, dar likes/dislikes y acceder a rankings. Incluye un diseño responsive, dinámico y enfocado en la experiencia de usuario.  

---

## Objetivo del Proyecto  

Desarrollar una interfaz de usuario amigable y responsiva que permita interactuar con las funcionalidades del backend de KarenFlix, incluyendo la gestión de usuarios, películas, reseñas y rankings.  

---

## Características Principales  

- Pantalla de inicio con sección destacada y últimos lanzamientos.  
- Secciones dinámicas de **Películas, Series, Top 10 y Tendencias**.  
- Búsqueda y filtrado de títulos por género.  
- Gestión de sesión de usuario (perfil, configuración, cerrar sesión).  
- Integración de botones para crear reseñas y calificar.  
- Interfaz responsive con menú hamburguesa para móviles.  
- Consumo directo de los endpoints del backend.  

---

## Tecnologías Utilizadas  

| Categoría    | Tecnología                | Propósito                              |
| ------------ | ------------------------- | -------------------------------------- |
| Maquetado    | **HTML5**                 | Estructura de la interfaz              |
| Estilos      | **CSS3**, **Bootstrap 5** | Diseño visual y responsive             |
| Iconografía  | **Bootstrap Icons**       | Íconos vectoriales                     |
| Fuentes      | **Google Fonts**          | Tipografías personalizadas             |
| Programación | **JavaScript (ES6)**      | Consumo de API y lógica de la interfaz |
| Recursos     | **/storage**              | Almacenamiento de imágenes e íconos    |

---

## Estructura del Proyecto  

```bash
KarenFlix-Frontend/
├── html/             # Archivos adicionales 
├── scripts/          # Archivos JS para consumo de API y manejo de UI
│   └── home.js
├── storage/          # Recursos gráficos
├── styles/           # Estilos CSS
│   └── home.css
├── index.html        # Página principal
├── home.html         # Catálogo de películas/series
└── README.md         # Documentación
```

---

## Instalación y Configuración  

### 1. Clonar el repositorio  

```bash
git clone <https://github.com/SayaraAparicio/Proyecto_Express_FrontEnd_AparicioSayara_AguilarSantiago.git>
cd Proyecto_Express_FrontEnd_AparicioSayara_AguilarSantiago
```

### 2. Abrir en navegador  

Se puede abrir directamente el archivo `index.html` o `home.html` en cualquier navegador.  

Para una mejor experiencia, se recomienda usar extensiones como **Live Server** en Visual Studio Code o desplegar en un servidor estático (ej. GitHub Pages, Netlify).  

### 3. Conexión con el Backend  

El frontend está diseñado para conectarse con el backend de KarenFlix:  

```
http://localhost:3000/api/v1
```

Asegúrese de que el backend se encuentre en ejecución antes de probar las funcionalidades dinámicas.  

---

## Pantallas Principales  

- **Inicio:** sección hero con contenido destacado y últimos lanzamientos.  
- **Películas y Series:** listados dinámicos obtenidos desde la API.  
- **Top 10 Series:** carrusel con las series más populares.  
- **Tendencias:** sección de títulos más vistos.  
- **Perfil de Usuario:** opciones de perfil, configuración y cierre de sesión.  
- **Búsqueda y Géneros:** filtrado de contenido según categorías.  

---

## Integración con el Backend  

- **Usuarios:** registro, login, autenticación y gestión de sesión.  
- **Películas y Categorías:** listado y filtrado por género.  
- **Reseñas:** creación, edición y eliminación.  
- **Likes/Dislikes:** interacción con reseñas de otros usuarios.  
- **Ranking:** visualización de películas mejor calificadas.  

---


## Figma

**[Ver Figma](https://www.figma.com/design/sq0iGoqZMLV33fnXSMZWHw/EXPRESS_S1_AGUILARSANTIAGO-APARICIOSAYARA?node-id=0-1&t=wYpbZB0ZV2q5WAoM-1)**


---



## **Contribuciones**

### **Sayara Aparicio (FrontEnd Developer)**  
Sayara fue la responsable del **desarrollo del FrontEnd** de KarenFlix, creando una interfaz amigable y **responsive** con **HTML, CSS y JavaScript puro**.  
Diseñó y programó las pantallas principales: **Inicio, Registro/Login, Listado de películas, Detalle de película y Panel de administrador**, asegurando que consumieran de manera correcta los **endpoints del backend**.  
También se encargó de la **validación visual de datos**, mostrando mensajes claros de error y éxito provenientes de las respuestas del servidor.  
Su trabajo garantizó una experiencia de usuario clara, fluida y adaptable a distintos dispositivos.  

### **Santiago Aguilar (Backend Developer)**  
Santiago fue el encargado de la **implementación del Backend** en **Node.js con Express**, estructurando la arquitectura modular del proyecto (**models, controllers, routes, middlewares, services, config, utils**).  
Implementó la **gestión de usuarios**, la **gestión de películas/series**, el **sistema de reseñas con ratings y likes/dislikes**, y el cálculo del **ranking ponderado**.  
Aseguró una **autenticación robusta con JWT**, la correcta aplicación de **validaciones con express-validator** y la **seguridad** mediante bcrypt, express-rate-limit y passport-jwt.  
Además, gestionó la **persistencia de datos en MongoDB** con transacciones para operaciones críticas y documentó los endpoints con **Swagger**.  

### **En conclusión...**  
Ambas partes colaboraron enorme y activamente en la realización del proyecto.  
Hubo profesionalismo por ambos lados para poder crear este proyecto **totalmente funcional**.

---

##  Sustentación del Proyecto

[![Google Drive](https://img.shields.io/badge/SUSTENTACIÓN-GOOGLE%20DRIVE-green?style=for-the-badge&logo=googledrive)](https://drive.google.com/drive/folders/1jiOGGWNO4sI5h1MfRMJGW91qCjOzU5D7?usp=sharing)
[![GitHub](https://img.shields.io/badge/REPOSITORIO-GITHUB-black?style=for-the-badge&logo=github)](https://github.com/SayaraAparicio/Proyecto_Express_BackEnd_AparicioSayara_AguilarSantiago)

Aquí se encuentra la sustentación del proyecto **KarenFlix**, desarrollado con **Node.js + Express** para el backend y **HTML, CSS y JavaScript puro** para el frontend.  
En esta sustentación se explican los **requerimientos**, los **patrones y principios aplicados**, así como la **implementación** y las **funcionalidades clave**: gestión de usuarios, películas/series, reseñas, categorías y rankings.

---

# Desarrollado por

- Santiago Aguilar - [Linkedin](https://www.linkedin.com/in/santiago-aguilar-208b38348/) - [GitHub](https://github.com/Santiagoaghhh) 

- Sayara Aparicio - [LinkedIn](https://www.linkedin.com/in/sayara-aparicio-38827b373/) - [GitHub](https://github.com/SayaraAparicio/)


---

