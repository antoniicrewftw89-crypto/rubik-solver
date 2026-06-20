# Estado — Rubik Solver

> **Capa "en qué voy".** Lo volátil del ecosistema: el trabajo en curso y el
> siguiente paso — no qué es el repo (eso está en `README.md`) ni el porqué/narrativa
> (eso va a la bóveda Janus). **Una verdad por capa.**
> Convención: al **cerrar** trabajo aquí, actualiza este archivo; al **arrancar**,
> léelo primero. El launcher y las rutinas Janus leen este estado. No dupliques
> git (rama y último commit los lee el launcher en vivo).

**Actualizado:** 2026-06-19

## En qué voy
- En `main`. App web que resuelve y **anima** un cubo 3×3 en 3D (React 19 + Vite +
  three.js). **Desplegada en vivo:** rubik-solver-rho.vercel.app. Entrada manual o por
  cámara. Último commit: tests de detección de color de la cámara (`colorDetection.js`).

## Próximo paso
- Por definir. (Proyecto en buen estado, desplegado y funcionando.)

## Decisiones recientes
- Adopta el **Workspace Design System** (`C:\Workspace\design-system`) como **puente
  de contrato**: expone los nombres del contrato como alias sobre su identidad
  glass/violeta (look intacto; sin redefinir `--muted`/`--accent` por colisión).
- Detección de color por **matiz HSL** (resistente a la iluminación).
- Estado del cubo serializado en orden **F R U D L B** (lo que espera el solver Fridrich).

## Notas / bloqueos
- `.vscode/` sin trackear (tareas locales, inofensivo).
- Sin `AGENTS.md`/`CLAUDE.md` → este `ESTADO.md` aún **no se carga solo** en contexto
  (recall automático pendiente de Fase 3 del plan de ecosistema).
