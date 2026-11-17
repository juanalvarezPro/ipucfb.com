# ipucfb.com

Página web de la congregación IPUC — *Un Señor, una fe, un bautismo* (Efesios 4:5).

## Stack

- **Next.js 16** (App Router, Turbopack, `cacheComponents`) + React 19
- **Tailwind CSS 4** con el design system IPUC (`src/app/globals.css`, vista en `/design-system`)
- **Prisma 6 + Neon** (driver serverless `@prisma/adapter-neon`)
- **Wasapi** (`@wasapi/js-sdk`) para llevar oraciones/visitas/mensajes a WhatsApp

## Arranque

```bash
pnpm install
cp .env.example .env   # llena DATABASE_URL, DIRECT_URL y WASAPI_*
pnpm db:migrate        # crea las tablas en Neon
pnpm dev
```

La página funciona sin base de datos ni Wasapi (los horarios salen de `src/config/church.ts`),
pero el formulario solo guarda/avisa cuando esas variables están configuradas.

## Dónde cambiar las cosas

| Qué | Dónde |
|---|---|
| Nombre, dirección, pastores, WhatsApp, redes | `src/config/church.ts` (busca «POR CONFIRMAR») |
| Horarios de cultos | tabla `Service` en Neon, o `defaultServices` en `src/config/church.ts` |
| Colores, tipografía, sombras | `src/app/globals.css` (`@theme`) |
| Secciones de la home | `src/components/sections/` |
| Lógica de WhatsApp | `src/lib/wasapi.ts` |

## Design system

- Azul institucional `navy-700` `#00338d`, celeste `sky-500` `#009fda`, dorado `gold-400` `#f0ab00` (tomados de ipuc.org.co)
- Tipografía: Source Sans 3 (texto, pariente libre de Myriad Pro) + Oswald (títulos)
- Logos en `public/brand/` (IPUC azul y blanco, SonarPiano solo sobre fondo oscuro)

---

Desarrollado por amor, por ser siervo por amor, por [@thisalvarez](https://www.instagram.com/thisalvarez) · Financiado por [SonarPiano](https://sonarpiano.com)
