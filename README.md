# 🎂 La Dulce Tentación
### Pastelería Online — Proyecto Full Stack

> *"Cada bocado es una experiencia única hecha con amor"*

![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-Pagos-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 🛍️ Descripción

**La Dulce Tentación** es una aplicación de comercio electrónico para una pastelería artesanal. Permite a los usuarios explorar productos, agregarlos al carrito, registrarse, iniciar sesión y realizar pagos reales con tarjeta a través de **Stripe**.

---

## ✨ Funcionalidades

### 🛒 Tienda
- Listado de **32 productos** en **8 categorías**
- Filtrado por categoría
- Buscador en tiempo real
- Vista de detalle de producto
- Carrito de compras con contador

### 🔐 Autenticación
- Registro de usuario
- Login con **JWT (JSON Web Tokens)**
- Sesión persistente
- Navbar dinámico según estado de sesión

### 💳 Pagos
- Integración con **Stripe**
- Pago con tarjeta de crédito/débito
- Modo de prueba con tarjetas falsas
- Confirmación de pago en pantalla

### 📦 Gestión
- **Stock** se actualiza automáticamente tras cada compra
- **Historial de compras** por usuario autenticado
- Panel de administración Django

---

## 🗂️ Estructura del Proyecto

```
pasteleria-dulceencanto/
├── 🐍 backend/
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── tienda/
│   │   ├── models.py        ← Categoria, Producto, Orden
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── fixtures/
│   │       └── datos_iniciales.json
│   ├── .env                 ← variables de entorno (no subir)
│   └── manage.py
│
└── ⚛️ frontend/
    └── src/
        ├── pages/
        │   ├── Home.jsx
        │   ├── DetalleProducto.jsx
        │   ├── Carrito.jsx
        │   ├── Login.jsx
        │   ├── Registro.jsx
        │   └── Historial.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProductoCard.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── CarritoContext.jsx
        └── services/
            └── api.js
```

---

## 🚀 Instalación y uso

### 📋 Requisitos
- Python 3.10+
- Node.js 18+
- Cuenta en [Stripe](https://stripe.com) (modo test)

---

### 🐍 Backend (Django)

```bash
# 1. Entrar a la carpeta backend
cd pasteleria-dulceencanto/backend

# 2. Instalar dependencias
pip install django djangorestframework django-cors-headers django-filter Pillow djangorestframework-simplejwt stripe python-dotenv

# 3. Crear archivo .env con tus claves de Stripe
# backend/.env
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA
STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA

# 4. Aplicar migraciones
python manage.py migrate

# 5. Cargar datos iniciales (8 categorías + 32 productos)
python manage.py loaddata tienda/fixtures/datos_iniciales.json

# 6. Crear superusuario para el admin
python manage.py createsuperuser

# 7. Correr servidor
python manage.py runserver
```

---

### ⚛️ Frontend (React + Vite)

```bash
# 1. Entrar a la carpeta frontend
cd pasteleria-dulceencanto/frontend

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev
```

Abrir en el navegador: `http://localhost:5173`

---

## 🌐 Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias/` | Lista las 8 categorías |
| GET | `/api/productos/` | Lista todos los productos |
| GET | `/api/productos/?categoria=1` | Filtrar por categoría |
| GET | `/api/productos/?search=torta` | Buscar productos |
| GET | `/api/productos/destacados/` | Productos destacados |
| POST | `/api/auth/register/` | Registro de usuario |
| POST | `/api/auth/login/` | Login (retorna JWT) |
| POST | `/api/ordenes/` | Crear orden de compra |
| GET | `/api/ordenes/historial/` | Historial del usuario |
| POST | `/api/pagos/crear-intent/` | Crear PaymentIntent Stripe |

---

## 💳 Tarjeta de prueba Stripe

| Campo | Valor |
|-------|-------|
| Número | `4242 4242 4242 4242` |
| Fecha | `12/26` |
| CVC | `123` |
| ZIP | `12345` |

---

## 🍰 Categorías disponibles

| # | Categoría | Productos |
|---|-----------|-----------|
| 1 | 🎂 Tortas Personalizadas | 4 productos |
| 2 | 🧁 Cupcakes | 4 productos |
| 3 | 🍰 Cheesecakes | 4 productos |
| 4 | 🥐 Panadería Dulce | 4 productos |
| 5 | 🍫 Chocolates | 4 productos |
| 6 | 🍮 Postres Fríos | 4 productos |
| 7 | 🍪 Galletas | 4 productos |
| 8 | 🎁 Cajas Regalo | 4 productos |

---

## 🛠️ Tecnologías utilizadas

### Backend
- **Django 6** — Framework web Python
- **Django REST Framework** — API REST
- **SimpleJWT** — Autenticación con tokens
- **Stripe** — Pasarela de pagos
- **SQLite** — Base de datos
- **django-cors-headers** — Manejo de CORS

### Frontend
- **React 19** — Librería UI
- **Vite** — Bundler ultrarrápido
- **React Router** — Navegación SPA
- **TanStack Query** — Gestión de estado servidor
- **Axios** — Cliente HTTP
- **Stripe.js** — SDK de pagos

---

## 👩‍💻 Autora
Mayela

Estructura y Seguridad de E-commerce


