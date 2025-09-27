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
