# Guía de Estudio — Ingeniería de Software
**Universidad de Cartagena · Primer Semestre 2026**
**Antonio · Programa a Distancia**

---

## CALENDARIO COMPLETO

### SEMANA 1 — Examen sábado 13 de junio
Materias: Cálculo Diferencial · Algoritmos y Programación Básica · Cátedra Institucional

| Día | Bloque | Tema | Horas |
|---|---|---|---|
| Jueves 11 | 1 | Cálculo: Límites (tipos, propiedades, indeterminaciones) | 2 h |
| Jueves 11 | 2 | Algoritmos: Variables, condicionales, trazas | 2 h |
| Jueves 11 | 3 | Cátedra: Repaso Q&A conceptual | 1 h |
| Viernes 12 | 1 | Cálculo: Derivadas + regla de la cadena | 2.5 h |
| Viernes 12 | 2 | Algoritmos: Ciclos, funciones, arreglos + trazas | 2 h |
| Viernes 12 | 3 | Repaso puntos débiles | 0.5 h |
| Sábado 13 mañana | — | Solo hoja de fórmulas · No abrir temas nuevos | 30 min |

---

### SEMANA 2 — Examen sábado 20 de junio
Materias: Fundamentos de Matemáticas · Introducción a IS · MEAD

| Día | Bloque | Tema | Horas |
|---|---|---|---|
| Domingo 14 | 1 | Fund. Mat: Lógica proposicional + conjuntos | 2.5 h |
| Domingo 14 | 2 | Fund. Mat: Álgebra + productos notables + factorización | 2 h |
| Lunes 15 | 1 | Fund. Mat: Funciones + dominio + composición | 2 h |
| Lunes 15 | 2 | Fund. Mat: Ecuaciones lineales + cuadráticas | 2 h |
| Martes 16 | 1 | Fund. Mat: Sistemas 2×2 (todos los métodos) | 2 h |
| Martes 16 | 2 | Fund. Mat: Trigonometría + cónicas | 2.5 h |
| Miércoles 17 | 1 | Intro IS: Computación + Internet + SO | 2.5 h |
| Miércoles 17 | 2 | Intro IS: Archivos + SQL/NoSQL + redes neuronales | 2 h |
| Jueves 18 | 1 | MEAD: Historia + características + 3 momentos | 2 h |
| Jueves 18 | 2 | MEAD: Aprendizaje autorregulado + pedagogía + sociedad del conocimiento | 2 h |
| Viernes 19 | 1 | Repaso Fund. Mat: ejercicios de repaso | 2 h |
| Viernes 19 | 2 | Repaso Intro IS + MEAD: Q&A completo | 2 h |
| Sábado 20 mañana | — | Hoja de fórmulas · Nada nuevo | 30 min |

---

## PARTE 1 — CÁLCULO DIFERENCIAL

### Hoja de fórmulas rápida

```
LÍMITES
lim sin(x)/x = 1     (x→0)
lim (1+1/x)^x = e    (x→∞)
Indeterminación 0/0  → factoriza y cancela
Indeterminación ∞/∞  → divide entre la potencia mayor

DERIVADAS
d/dx[c]      = 0
d/dx[xⁿ]    = n·xⁿ⁻¹
d/dx[sin x]  = cos x
d/dx[cos x]  = -sin x
d/dx[tan x]  = sec²x
d/dx[eˣ]    = eˣ
d/dx[ln x]   = 1/x
Producto:    (fg)' = f'g + fg'
Cociente:    (f/g)' = (f'g - fg') / g²
Cadena:      [f(g(x))]' = f'(g(x)) · g'(x)

MÁXIMOS Y MÍNIMOS
1. f'(x) = 0  →  puntos críticos
2. f''(c) < 0  →  máximo
3. f''(c) > 0  →  mínimo
```

---

### Ejercicios — LÍMITES (con solución)

**Ejercicio 1**
```
lim (x² - 9) / (x - 3)
x→3

Paso 1: sustituyes x=3 → (9-9)/(3-3) = 0/0 → indeterminación
Paso 2: factorizas numerador: x²-9 = (x-3)(x+3)
Paso 3: cancelas (x-3): queda x+3
Paso 4: sustituyes: 3+3 = 6

Respuesta: 6
```

**Ejercicio 2**
```
lim (2x³ - 16) / (x - 2)
x→2

Sustituyes: 0/0 → indeterminación
Factorizas: 2(x³-8) = 2(x-2)(x²+2x+4)
Cancelas (x-2): 2(x²+2x+4)
Sustituyes x=2: 2(4+4+4) = 2(12) = 24

Respuesta: 24
```

**Ejercicio 3**
```
lim sin(6x) / (2x)
x→0

Reescribes: = lim 3 · sin(6x)/(6x)  [multiplicas y divides por 3]
                x→0
= 3 · 1 = 3

Respuesta: 3
```

**Ejercicio 4**
```
lim (4x³ - 2x + 1) / (2x³ + x² - 3)
x→∞

Divides numerador y denominador entre x³:
= lim (4 - 2/x² + 1/x³) / (2 + 1/x - 3/x³)
  x→∞
Cuando x→∞, los términos con x en denominador → 0:
= 4/2 = 2

Respuesta: 2
```

**Ejercicio 5 — Límites laterales**
```
        { x + 1  si x < 2
f(x) =  { 3      si x = 2
        { x² - 1 si x > 2

lim⁻ f(x) = lim (x+1) = 3   (x→2 por la izquierda)
x→2

lim⁺ f(x) = lim (x²-1) = 3   (x→2 por la derecha)
x→2

Como lim⁻ = lim⁺ = 3, el límite existe y es 3.
Pero f(2) = 3 también → la función es continua en x=2.
```

**Ejercicio 6**
```
lim (√(x+4) - 2) / x
x→0

Sustituyes: (√4-2)/0 = 0/0 → indeterminación
Racionalizas (multiplicas por conjugada):

= lim [(√(x+4)-2)(√(x+4)+2)] / [x(√(x+4)+2)]
  x→0

= lim (x+4-4) / [x(√(x+4)+2)]
  x→0

= lim x / [x(√(x+4)+2)]
  x→0

= lim 1 / (√(x+4)+2)
  x→0

= 1/(√4+2) = 1/4

Respuesta: 1/4
```

---

### Ejercicios — CONTINUIDAD

**Ejercicio 7**
```
        { x² + 2x    si x ≤ 1
f(x) =  {
        { 4x - 1     si x > 1

¿Es continua en x=1?

1. f(1) = 1² + 2(1) = 3               ✓ existe

2. lim⁻ f(x) = lim (x²+2x) = 1+2 = 3
   x→1⁻

   lim⁺ f(x) = lim (4x-1) = 4-1 = 3
   x→1⁺
   Los dos son iguales → el límite existe y es 3  ✓

3. lim f(x) = 3 = f(1)                ✓

Las 3 condiciones se cumplen → CONTINUA en x=1
```

**Ejercicio 8**
```
f(x) = (x² - 4) / (x - 2)

En x=2: f(2) no existe (0/0) → pero el límite existe (es 4)
→ Discontinuidad EVITABLE en x=2
   Se puede "arreglar" definiendo f(2) = 4.

En cualquier otro punto la función es continua.
```

---

### Ejercicios — DERIVADAS

**Ejercicio 9 — Reglas básicas**
```
f(x) = 5x⁴ - 3x³ + 7x² - 2x + 9

f'(x) = 5·4x³ - 3·3x² + 7·2x - 2·1 + 0
f'(x) = 20x³ - 9x² + 14x - 2
```

**Ejercicio 10 — Regla del producto**
```
f(x) = (x² + 1)(x³ - 2x)

u = x² + 1       u' = 2x
v = x³ - 2x      v' = 3x² - 2

f'(x) = u'v + uv'
f'(x) = 2x(x³-2x) + (x²+1)(3x²-2)
f'(x) = 2x⁴ - 4x² + 3x⁴ - 2x² + 3x² - 2
f'(x) = 5x⁴ - 3x² - 2
```

**Ejercicio 11 — Regla del cociente**
```
f(x) = (3x - 1) / (x² + 2)

u = 3x-1    u' = 3
v = x²+2    v' = 2x

f'(x) = (3(x²+2) - (3x-1)(2x)) / (x²+2)²
f'(x) = (3x²+6 - 6x²+2x) / (x²+2)²
f'(x) = (-3x² + 2x + 6) / (x²+2)²
```

**Ejercicio 12 — Regla de la cadena**
```
f(x) = (x² + 3)⁷

Afuera: ( )⁷ → 7( )⁶
Adentro: x²+3 → 2x

f'(x) = 7(x²+3)⁶ · 2x = 14x(x²+3)⁶
```

**Ejercicio 13 — Cadena con trig**
```
f(x) = sin(4x³ - 1)

Afuera: sin( ) → cos( )
Adentro: 4x³-1 → 12x²

f'(x) = cos(4x³-1) · 12x² = 12x²cos(4x³-1)
```

**Ejercicio 14 — Cadena con exponencial**
```
f(x) = e^(x² - 5x)

Afuera: e^( ) → e^( )
Adentro: x²-5x → 2x-5

f'(x) = e^(x²-5x) · (2x-5)
```

**Ejercicio 15 — Cadena con logaritmo**
```
f(x) = ln(3x² + 1)

Afuera: ln( ) → 1/( )
Adentro: 3x²+1 → 6x

f'(x) = 1/(3x²+1) · 6x = 6x/(3x²+1)
```

**Ejercicio 16 — Derivada implícita**
```
x³ + y³ = 6xy

Derivamos todo con respecto a x:
3x² + 3y²·(dy/dx) = 6y + 6x·(dy/dx)

Agrupamos dy/dx:
3y²·(dy/dx) - 6x·(dy/dx) = 6y - 3x²
(dy/dx)(3y² - 6x) = 6y - 3x²

dy/dx = (6y - 3x²) / (3y² - 6x) = (2y - x²) / (y² - 2x)
```

---

### Ejercicios — APLICACIONES (Máximos y mínimos)

**Ejercicio 17**
```
f(x) = x³ - 6x² + 9x + 1

Paso 1: f'(x) = 3x² - 12x + 9 = 3(x² - 4x + 3) = 3(x-1)(x-3)

Paso 2: f'(x) = 0 → x = 1  y  x = 3

Paso 3: f''(x) = 6x - 12

Paso 4:
f''(1) = 6-12 = -6 < 0  →  MÁXIMO en x=1
f''(3) = 18-12 = 6 > 0  →  MÍNIMO en x=3

Paso 5:
f(1) = 1-6+9+1 = 5       →  máximo local: (1, 5)
f(3) = 27-54+27+1 = 1    →  mínimo local: (3, 1)
```

**Ejercicio 18**
```
f(x) = -2x² + 8x - 3

f'(x) = -4x + 8 = 0  →  x = 2

f''(x) = -4 < 0  →  MÁXIMO en x=2

f(2) = -8 + 16 - 3 = 5

Máximo en (2, 5).
```

---

## PARTE 2 — ALGORITMOS Y PROGRAMACIÓN BÁSICA (Java)

### Hoja de referencia rápida

```java
// TIPOS DE DATOS
int     x = 5;          // entero
double  y = 3.14;       // decimal
char    c = 'A';        // carácter
String  s = "hola";     // texto
boolean b = true;       // verdadero/falso

// OPERADORES CLAVE
%  → módulo (residuo): 10%3=1
== → comparación igualdad (no =)
!= → diferente
&& → AND lógico
|| → OR lógico

// DIVISIÓN ENTERA (¡ojo!)
7 / 2 = 3    // ambos int → resultado int, trunca
7.0 / 2 = 3.5  // al menos uno double → decimal

// IF-ELSE
if (condicion) { } else if (...) { } else { }

// FOR
for (int i = 0; i < n; i++) { }

// WHILE
while (condicion) { }

// DO-WHILE (ejecuta al menos 1 vez)
do { } while (condicion);

// ARREGLOS
int[] arr = {3,1,4,1,5};
arr.length  // longitud
arr[0]      // primer elemento
arr[arr.length-1]  // último
```

---

### Ejercicios — TRAZAS (¿qué imprime?)

**Ejercicio 1**
```java
int suma = 0;
for (int i = 1; i <= 5; i++) {
    suma += i * 2;
}
System.out.println(suma);

// Traza:
// i=1: suma = 0+2 = 2
// i=2: suma = 2+4 = 6
// i=3: suma = 6+6 = 12
// i=4: suma = 12+8 = 20
// i=5: suma = 20+10 = 30
// Imprime: 30
```

**Ejercicio 2**
```java
int n = 32;
int cont = 0;
while (n > 1) {
    n = n / 2;
    cont++;
}
System.out.println(cont);

// Traza:
// n=32→16, cont=1
// n=16→8,  cont=2
// n=8→4,   cont=3
// n=4→2,   cont=4
// n=2→1,   cont=5 (ahora n=1, sale del while)
// Imprime: 5
```

**Ejercicio 3**
```java
for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}

// Imprime:
// *
// * *
// * * *
// * * * *
```

**Ejercicio 4**
```java
int[] nums = {5, 2, 8, 1, 9, 3};
int mayor = nums[0];
int pos = 0;
for (int i = 1; i < nums.length; i++) {
    if (nums[i] > mayor) {
        mayor = nums[i];
        pos = i;
    }
}
System.out.println("Mayor: " + mayor + " en posición " + pos);

// Traza:
// i=1: 2>5? No
// i=2: 8>5? Sí → mayor=8, pos=2
// i=3: 1>8? No
// i=4: 9>8? Sí → mayor=9, pos=4
// i=5: 3>9? No
// Imprime: Mayor: 9 en posición 4
```

**Ejercicio 5**
```java
int x = 5;
do {
    System.out.print(x + " ");
    x -= 2;
} while (x > 0);

// Traza:
// x=5: imprime "5 ", x=3
// x=3: imprime "3 ", x=1
// x=1: imprime "1 ", x=-1
// x=-1: -1>0 es false, sale
// Imprime: 5 3 1
```

---

### Ejercicios — ESCRIBE EL CÓDIGO

**Ejercicio 6 — Número primo**
```java
public static boolean esPrimo(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// Uso: esPrimo(7) → true, esPrimo(8) → false
```

**Ejercicio 7 — Factorial recursivo**
```java
public static long factorial(int n) {
    if (n == 0 || n == 1) return 1;   // caso base
    return n * factorial(n - 1);      // caso recursivo
}

// factorial(5) = 5*4*3*2*1 = 120
```

**Ejercicio 8 — Suma de dígitos**
```java
public static int sumaDigitos(int n) {
    int suma = 0;
    while (n > 0) {
        suma += n % 10;   // extrae el último dígito
        n = n / 10;       // elimina el último dígito
    }
    return suma;
}

// sumaDigitos(1234) = 1+2+3+4 = 10
```

**Ejercicio 9 — Invertir arreglo**
```java
public static void invertir(int[] arr) {
    int izq = 0;
    int der = arr.length - 1;
    while (izq < der) {
        int temp = arr[izq];
        arr[izq] = arr[der];
        arr[der] = temp;
        izq++;
        der--;
    }
}
// {1,2,3,4,5} → {5,4,3,2,1}
```

**Ejercicio 10 — Suma de matriz**
```java
public static int sumaMatriz(int[][] m) {
    int suma = 0;
    for (int i = 0; i < m.length; i++) {
        for (int j = 0; j < m[i].length; j++) {
            suma += m[i][j];
        }
    }
    return suma;
}
```

---

## PARTE 3 — CÁTEDRA INSTITUCIONAL

### Q&A — 30 preguntas y respuestas

**P1: ¿Qué es la autoestima?**
R: La valoración que una persona tiene de sí misma. Influye en cómo se enfrenta a retos, críticas y relaciones.

**P2: ¿Cuál es la diferencia entre alta y baja autoestima?**
R: Alta: confianza, resiliencia, límites sanos. Baja: inseguridad, dependencia de aprobación ajena, miedo al fracaso.

**P3: Menciona 3 pasos para fortalecer la autoestima.**
R: (1) Reconocer fortalezas propias. (2) Aceptar errores como aprendizaje. (3) Cuidar el diálogo interno.

**P4: ¿Qué es la motivación?**
R: Fuerza interna que impulsa a una persona a actuar para alcanzar una meta.

**P5: ¿Cuál es la diferencia entre motivación intrínseca y extrínseca?**
R: Intrínseca: nace de adentro (pasión, curiosidad). Extrínseca: nace de afuera (nota, dinero, reconocimiento).

**P6: ¿Qué son los incentivos?**
R: Estímulos externos que buscan activar la motivación de una persona.

**P7: Menciona los elementos de la comunicación.**
R: Emisor → Mensaje → Canal → Receptor → Retroalimentación.

**P8: ¿Cuáles son los tipos de barreras en la comunicación?**
R: Físicas (ruido, distancia), semánticas (diferente significado de palabras), psicológicas (prejuicios, emociones).

**P9: ¿Qué es la escucha activa?**
R: Prestar atención plena al interlocutor, sin interrumpir, mostrando interés genuino.

**P10: ¿Qué es el trabajo en equipo?**
R: Colaboración de varias personas con roles definidos hacia un objetivo común, con comunicación abierta y respeto mutuo.

**P11: ¿Qué es un proyecto de vida?**
R: Plan estructurado donde una persona define sus metas personales y profesionales y cómo alcanzarlas.

**P12: ¿Qué tres preguntas responde el proyecto de vida?**
R: ¿Quién soy? ¿Qué quiero? ¿Cómo lo logro?

**P13: ¿Por qué es importante el proyecto de vida?**
R: Da dirección, ayuda a priorizar decisiones, motiva en momentos difíciles y conecta el presente con el futuro deseado.

**P14: ¿En qué año fue fundada la Universidad de Cartagena?**
R: 1827.

**P15: ¿Qué tipo de institución es la Universidad de Cartagena?**
R: Universidad pública del departamento de Bolívar, oficial y autónoma.

**P16: Menciona 3 valores clave en la educación a distancia.**
R: Autonomía, disciplina, responsabilidad (también: honestidad académica, proactividad).

**P17: ¿Qué es el crecimiento personal?**
R: Proceso continuo de desarrollo de capacidades, valores y habilidades a lo largo de la vida.

**P18: ¿Cuáles son las conductas que determinan el nivel de autoestima?**
R: Cómo reaccionas ante la crítica, cómo manejas el fracaso, cómo te comunicas y si tienes límites saludables.

**P19: ¿Qué es la identidad institucional?**
R: Sentido de pertenencia a la universidad: conocer su historia, misión, visión, valores y reglamentos.

**P20: ¿Qué es el RAP en el contexto de los cursos?**
R: Resultado de Aprendizaje del Programa — el objetivo de competencia que el curso contribuye a desarrollar.

---

## PARTE 4 — FUNDAMENTOS DE MATEMÁTICAS

### Hoja de referencia rápida

```
LÓGICA
¬(p ∧ q) ≡ ¬p ∨ ¬q   (De Morgan)
¬(p ∨ q) ≡ ¬p ∧ ¬q   (De Morgan)
p → q es falso SOLO cuando p=V y q=F
¬(∀x P(x)) ≡ ∃x ¬P(x)

CONJUNTOS
|P(A)| = 2^n     (subconjuntos de A con n elementos)
|A × B| = |A| × |B|

PRODUCTOS NOTABLES
(a+b)²  = a² + 2ab + b²
(a-b)²  = a² - 2ab + b²
(a+b)(a-b) = a² - b²
(a+b)³  = a³ + 3a²b + 3ab² + b³

FÓRMULA CUADRÁTICA
x = (-b ± √(b²-4ac)) / (2a)
Δ>0: 2 soluciones  Δ=0: 1 solución  Δ<0: sin solución real

ÁNGULOS ESPECIALES
sin30°=1/2    cos30°=√3/2   tan30°=1/√3
sin45°=√2/2   cos45°=√2/2   tan45°=1
sin60°=√3/2   cos60°=1/2    tan60°=√3

IDENTIDAD PITAGÓRICA
sin²θ + cos²θ = 1

CÓNICAS
Circunferencia: (x-h)² + (y-k)² = r²     centro(h,k) radio r
Parábola:       y = a(x-h)² + k           vértice(h,k)
Elipse:         (x-h)²/a² + (y-k)²/b² = 1
```

---

### Ejercicios — LÓGICA PROPOSICIONAL

**Ejercicio 1 — Tabla de verdad**
```
Construye la tabla de p → (q ∨ ¬p)

p | q | ¬p | q∨¬p | p→(q∨¬p)
V | V |  F |   V  |     V
V | F |  F |   F  |     F
F | V |  V |   V  |     V
F | F |  V |   V  |     V
```

**Ejercicio 2 — Ley de De Morgan**
```
Niega: ¬(p ∧ ¬q)

Aplicando De Morgan: ¬p ∨ ¬(¬q)
Doble negación:      ¬p ∨ q

Respuesta: ¬p ∨ q
```

**Ejercicio 3 — Cuantificadores**
```
Niega: ∀x (x² ≥ 0)
→ ∃x ¬(x² ≥ 0) ≡ ∃x (x² < 0)

(Nota: la negación es formalmente "existe un x donde el cuadrado es negativo"
aunque en los reales eso sea falso — la negación lógica no cambia la verdad del enunciado original)
```

---

### Ejercicios — CONJUNTOS

**Ejercicio 4**
```
A = {1, 2, 3, 4, 5, 6}    B = {4, 5, 6, 7, 8}

A ∪ B = {1,2,3,4,5,6,7,8}
A ∩ B = {4,5,6}
A - B = {1,2,3}
B - A = {7,8}
(A∩B)' = U - {4,5,6}  (depende del universo)

|P(A∩B)| = |P({4,5,6})| = 2³ = 8 subconjuntos
```

**Ejercicio 5**
```
Si |A| = 5, ¿cuántos subconjuntos tiene A?
|P(A)| = 2⁵ = 32 subconjuntos
```

---

### Ejercicios — ÁLGEBRA Y FACTORIZACIÓN

**Ejercicio 6 — Producto notable**
```
(3x - 4)² = (3x)² - 2(3x)(4) + 4²
           = 9x² - 24x + 16
```

**Ejercicio 7 — Diferencia de cuadrados**
```
25x² - 16 = (5x)² - (4)² = (5x+4)(5x-4)
```

**Ejercicio 8 — Factorización de trinomio**
```
x² - 7x + 12

Busca dos números que: sumen -7 y multipliquen 12
→ -3 y -4  ((-3)+(-4)=-7, (-3)×(-4)=12)

x² - 7x + 12 = (x - 3)(x - 4)
```

**Ejercicio 9 — Factor común + diferencia de cuadrados**
```
2x³ - 8x = 2x(x² - 4) = 2x(x+2)(x-2)
```

---

### Ejercicios — FUNCIONES

**Ejercicio 10 — Composición**
```
f(x) = x + 3      g(x) = x²

(f∘g)(x) = f(g(x)) = f(x²) = x² + 3
(g∘f)(x) = g(f(x)) = g(x+3) = (x+3)² = x² + 6x + 9
```

**Ejercicio 11 — Dominio**
```
f(x) = √(3x - 6)
Condición: 3x - 6 ≥ 0  →  x ≥ 2
Dominio: [2, +∞)

g(x) = 1/(x² - 9)
Condición: x² - 9 ≠ 0  →  x ≠ ±3
Dominio: ℝ - {-3, 3}
```

---

### Ejercicios — ECUACIONES

**Ejercicio 12 — Cuadrática con fórmula general**
```
2x² - 5x - 3 = 0     a=2, b=-5, c=-3

Δ = (-5)² - 4(2)(-3) = 25 + 24 = 49

x = (5 ± √49) / 4 = (5 ± 7) / 4

x₁ = (5+7)/4 = 12/4 = 3
x₂ = (5-7)/4 = -2/4 = -1/2
```

**Ejercicio 13 — Cuadrática por factorización**
```
x² + x - 6 = 0

Busca: suma=1, producto=-6 → son 3 y -2
(x+3)(x-2) = 0
x = -3  o  x = 2
```

---

### Ejercicios — SISTEMAS 2×2

**Ejercicio 14 — Sistema con los 4 métodos**
```
Sistema:
3x + 2y = 12    ... (1)
x - y = 1       ... (2)

MÉTODO SUSTITUCIÓN:
De (2): x = 1 + y
Sustituyes en (1): 3(1+y) + 2y = 12 → 3+3y+2y=12 → 5y=9 → y=9/5
x = 1 + 9/5 = 14/5
Solución: (14/5, 9/5)

MÉTODO SUMA/RESTA:
Multiplica (2)×2: 2x - 2y = 2
Suma con (1):     3x+2y=12
                  2x-2y=2
                  --------
                  5x = 14  →  x = 14/5
De (2): 14/5 - y = 1 → y = 9/5

MÉTODO IGUALACIÓN:
De (1): y = (12-3x)/2
De (2): y = x-1
Iguala: (12-3x)/2 = x-1 → 12-3x = 2x-2 → 14=5x → x=14/5

MÉTODO DE CRAMER:
D = |3  2| = (3)(-1) - (2)(1) = -3-2 = -5
    |1 -1|

Dx = |12  2| = (12)(-1) - (2)(1) = -12-2 = -14
     |1  -1|

Dy = |3  12| = (3)(1) - (12)(1) = 3-12 = -9
     |1   1|

x = Dx/D = -14/-5 = 14/5
y = Dy/D = -9/-5 = 9/5
```

---

### Ejercicios — TRIGONOMETRÍA

**Ejercicio 15 — Valores exactos**
```
Dado un triángulo rectángulo con ángulo θ=30°,
cateto opuesto=1, cateto adyacente=√3, hipotenusa=2:

sin(30°) = 1/2
cos(30°) = √3/2
tan(30°) = 1/√3 = √3/3
```

**Ejercicio 16 — Identidad pitagórica**
```
Si sin(θ) = 3/5 y θ está en el primer cuadrante, halla cos(θ) y tan(θ).

sin²θ + cos²θ = 1
(3/5)² + cos²θ = 1
9/25 + cos²θ = 1
cos²θ = 16/25
cosθ = 4/5   (positivo porque Q1)

tanθ = sinθ/cosθ = (3/5)/(4/5) = 3/4
```

---

### Ejercicios — CÓNICAS

**Ejercicio 17 — Circunferencia: forma estándar → completar el cuadrado**
```
x² + y² - 4x + 6y - 3 = 0

Agrupas por variable:
(x²-4x) + (y²+6y) = 3

Completas el cuadrado:
(x²-4x+4) + (y²+6y+9) = 3+4+9

(x-2)² + (y+3)² = 16

Centro: (2, -3)    Radio: √16 = 4
```

**Ejercicio 18 — Parábola**
```
y = 2(x-1)² + 3

Vértice: (1, 3)
a = 2 > 0  →  abre hacia arriba
Eje de simetría: x = 1
```

---

## PARTE 5 — INTRODUCCIÓN A LA INGENIERÍA DE SOFTWARE

### Q&A — 40 preguntas y respuestas

**P1: ¿Qué es la Ingeniería de Software?**
R: Disciplina que aplica principios de ingeniería para desarrollar software de manera sistemática, disciplinada y cuantificable.

**P2: ¿Cuáles son las etapas del ciclo de vida del software?**
R: Requisitos → Diseño → Implementación → Pruebas → Despliegue → Mantenimiento.

**P3: ¿Cuál es la diferencia entre programación e Ingeniería de Software?**
R: Programar es escribir código; IS gestiona todo el proceso incluyendo análisis, diseño, calidad, tiempos y mantenimiento.

**P4: ¿Qué es la Arquitectura Von Neumann?**
R: Modelo de computadora con CPU (ALU + CU), memoria, y dispositivos de E/S conectados por un bus.

**P5: ¿Qué es la CPU y cuáles son sus componentes principales?**
R: Unidad Central de Proceso. Componentes: ALU (cálculos), CU (control y coordinación), registros (memoria ultrarrápida).

**P6: ¿Cuál es la diferencia entre RAM y ROM?**
R: RAM es volátil (se borra al apagar), rápida, para datos en uso. ROM es permanente, guarda firmware/BIOS.

**P7: ¿Qué mide la velocidad de un procesador?**
R: Se mide en GHz (gigahercios) — ciclos de operación por segundo.

**P8: ¿Qué es un procesador multinúcleo?**
R: Procesador con varios núcleos independientes que pueden ejecutar tareas en paralelo.

**P9: ¿Qué es una dirección IP?**
R: Identificador único de un dispositivo en una red. IPv4: 4 números (192.168.1.1). IPv6: 8 grupos hexadecimales.

**P10: ¿Qué es el DNS?**
R: Domain Name System. Traduce nombres de dominio (www.google.com) a direcciones IP numéricas.

**P11: Describe los pasos de una petición HTTP.**
R: (1) DNS resuelve el dominio a IP. (2) Se abre conexión TCP. (3) Navegador envía GET. (4) Servidor responde con HTML. (5) Navegador renderiza.

**P12: ¿Qué significan los códigos HTTP 200, 404 y 500?**
R: 200=éxito, 404=recurso no encontrado, 500=error interno del servidor.

**P13: ¿Cuál es la diferencia entre HTTP y HTTPS?**
R: HTTPS usa cifrado SSL/TLS sobre HTTP. Protege los datos en tránsito.

**P14: ¿Qué es un sistema operativo?**
R: Software que administra el hardware y proporciona servicios a las aplicaciones. Gestiona procesos, memoria, archivos y E/S.

**P15: ¿Cuáles son los principales sistemas operativos de escritorio?**
R: Windows (Microsoft), macOS (Apple), Linux (código abierto).

**P16: ¿Cuáles son los principales sistemas operativos móviles?**
R: Android (Google, basado en Linux) e iOS (Apple).

**P17: ¿Qué es el usuario root en Linux?**
R: Superusuario con acceso total al sistema. Puede modificar cualquier archivo y configuración.

**P18: ¿Qué significan r, w, x en permisos de Linux?**
R: r=read (leer), w=write (escribir), x=execute (ejecutar). Se aplican a propietario, grupo y otros.

**P19: ¿Qué es un proceso en sistemas operativos?**
R: Un programa en ejecución. Tiene PID (identificador), estado (ejecutando/esperando), prioridad y espacio de memoria asignado.

**P20: ¿Qué es el IoT (Internet de las Cosas)?**
R: Red de dispositivos físicos conectados a Internet que recopilan y comparten datos. Usan SO embebidos y procesadores de bajo consumo.

**P21: ¿Qué son los metadatos?**
R: Datos que describen a otros datos. Ejemplo: una foto tiene metadatos de fecha, modelo de cámara, resolución y ubicación GPS.

**P22: ¿Qué determina el tipo de un archivo?**
R: Su extensión (.jpg, .pdf, .exe) y su cabecera (primeros bytes que identifican el formato real).

**P23: ¿Qué es SQL?**
R: Lenguaje para gestionar bases de datos relacionales. Los datos se organizan en tablas con filas y columnas.

**P24: ¿Qué es NoSQL?**
R: Bases de datos no relacionales. Almacenan datos en documentos, grafos o clave-valor. Son más flexibles y escalan mejor horizontalmente.

**P25: Menciona 2 ejemplos de SQL y 2 de NoSQL.**
R: SQL: MySQL, PostgreSQL. NoSQL: MongoDB, Redis.

**P26: ¿Cuándo conviene SQL vs NoSQL?**
R: SQL: datos estructurados, relaciones complejas, transacciones (banco). NoSQL: grandes volúmenes, datos cambiantes, tiempo real (redes sociales).

**P27: ¿Qué es una red neuronal artificial?**
R: Sistema inspirado en el cerebro, con neuronas artificiales en capas que aprenden ajustando pesos mediante ejemplos de entrenamiento.

**P28: ¿Cómo aprende una red neuronal?**
R: Se alimenta con datos de entrenamiento, calcula respuestas, compara con las correctas, y ajusta los pesos de las conexiones iterativamente.

**P29: ¿Qué es el frontend y el backend?**
R: Frontend: lo que ve el usuario (HTML, CSS, JS). Backend: lógica del servidor, procesa peticiones y accede a la base de datos.

**P30: ¿Qué es el protocolo TCP/IP?**
R: Conjunto de reglas para la comunicación en Internet. TCP garantiza entrega de datos. IP gestiona el enrutamiento entre dispositivos.

---

## PARTE 6 — MEAD

### Q&A — 35 preguntas y respuestas

**P1: ¿Qué es la educación a distancia?**
R: Modalidad educativa donde estudiante y docente están separados físicamente, usando tecnología para comunicarse de forma sincrónica y asincrónica.

**P2: ¿Cuáles son las 3 generaciones de la educación a distancia?**
R: (1) Por correspondencia (correo postal). (2) Radio y televisión. (3) E-learning e Internet.

**P3: ¿Cuáles son las características principales de la modalidad a distancia?**
R: Separación física, uso de tecnología, aprendizaje autónomo, flexibilidad de tiempo y espacio, comunicación bidireccional.

**P4: ¿Qué es el campus SIMA?**
R: Plataforma virtual de la Universidad de Cartagena para los programas a distancia. Contiene los contenidos, evaluaciones, foros y actividades del curso.

**P5: ¿Cuáles son los 3 momentos del aprendizaje en MEAD?**
R: (1) Presaber – diagnóstico inicial. (2) Construcción del conocimiento – lectura y protocolo. (3) Apropiación/Evaluación – tutoría y evaluación.

**P6: ¿Qué es el presaber?**
R: Evaluación diagnóstica inicial que mide los conocimientos previos del estudiante sobre los temas del curso, antes de comenzar a estudiarlos.

**P7: ¿Qué es un protocolo individual?**
R: Documento escrito que evidencia la lectura realizada por el estudiante, con conceptos clave, reflexiones y conclusiones propias.

**P8: ¿Qué es un protocolo colaborativo?**
R: Documento elaborado por el CIPA (grupo) que consolida el protocolo individual con los aportes de la discusión grupal.

**P9: ¿Qué es un CIPA?**
R: Círculo de Interaprendizaje y Participación Activa — el grupo de trabajo colaborativo en la modalidad a distancia.

**P10: ¿Qué es el aprendizaje autorregulado?**
R: Capacidad de planificar, monitorear y controlar el propio proceso de aprendizaje sin depender de supervisión externa.

**P11: ¿Cuáles son los 3 componentes del aprendizaje autorregulado?**
R: (1) Planificación (metas, organización del tiempo). (2) Monitoreo (verificar el propio aprendizaje). (3) Control (ajustar estrategias).

**P12: Menciona 3 estrategias de aprendizaje efectivas.**
R: Mapas conceptuales, autoevaluación, estudio espaciado (sesiones distribuidas en el tiempo).

**P13: ¿Qué dice el conductismo sobre el aprendizaje?**
R: Aprendizaje por refuerzo y repetición. El comportamiento se moldea con estímulos y respuestas.

**P14: ¿Qué es el aprendizaje significativo (Ausubel)?**
R: Conectar el nuevo conocimiento con lo que ya sabe el estudiante, dándole sentido y durabilidad al aprendizaje.

**P15: ¿Qué es la Zona de Desarrollo Próximo (Vygotsky)?**
R: Lo que el estudiante puede aprender con ayuda (de un tutor o compañero) que aún no puede hacer solo.

**P16: ¿Qué dice el conectivismo (Siemens)?**
R: El conocimiento está distribuido en redes y el aprendizaje consiste en saber conectarse a las fuentes correctas. Es la teoría diseñada para la era digital.

**P17: ¿Qué es la sociedad del conocimiento?**
R: Sociedad donde la generación y uso del conocimiento son los motores del desarrollo económico y social.

**P18: ¿Cuál es la diferencia entre sociedad industrial y sociedad del conocimiento?**
R: Industrial: producción de bienes, capital físico, trabajo manual. Conocimiento: información, capital intelectual, trabajo cognitivo.

**P19: ¿Qué implica la sociedad del conocimiento para la educación?**
R: Aprender a aprender es más importante que memorizar. La educación es continua (lifelong learning). Las TIC son herramientas esenciales.

**P20: ¿Qué es el autoaprendizaje?**
R: Proceso por el cual el estudiante aprende de forma independiente, sin necesidad de un docente que supervise cada paso.

**P21: ¿Cuáles son las ventajas de la educación a distancia?**
R: Flexibilidad de horarios, acceso sin importar ubicación geográfica, posibilidad de trabajar y estudiar simultáneamente.

**P22: ¿Cuáles son los desafíos de la educación a distancia?**
R: Requiere alta autodisciplina, menor interacción social presencial, depende de conectividad tecnológica.

**P23: ¿Qué es la flexibilidad cognitiva?**
R: Capacidad de adaptar el pensamiento y las estrategias de aprendizaje según las demandas de diferentes tareas y contextos.

**P24: ¿Qué es el aprendizaje colaborativo?**
R: Proceso donde el conocimiento se construye en grupo, con intercambio de ideas y responsabilidad compartida.

**P25: ¿Cómo se evalúa en la educación a distancia según MEAD?**
R: A través de protocolos individuales y colaborativos, participación en foros, evaluaciones de unidades y evaluación final.

---

## RESUMEN EJECUTIVO — LO QUE ENTRA EN CADA EXAMEN

### SÁBADO 13 DE JUNIO

| Materia | Temas más probables | Tipo de pregunta |
|---|---|---|
| Cálculo Diferencial | Límites (indeterminaciones), derivadas con regla de la cadena, máximos y mínimos | Ejercicios con cálculo |
| Algoritmos | Trazas de ciclos, escribir funciones en Java, arreglos | Código + trazas |
| Cátedra Institucional | Autoestima, motivación, proyecto de vida, historia Unicartagena | Conceptual/ensayo |

### SÁBADO 20 DE JUNIO

| Materia | Temas más probables | Tipo de pregunta |
|---|---|---|
| Fund. de Matemáticas | Sistemas 2×2 (todos los métodos), cuadráticas, funciones, trigonometría | Ejercicios con cálculo |
| Intro a IS | HTTP, DNS, SO, SQL vs NoSQL, arquitectura del computador | Conceptual + definiciones |
| MEAD | 3 momentos del aprendizaje, aprendizaje autorregulado, teorías pedagógicas | Conceptual/ensayo |

---

*Generado el 11 de junio de 2026 · Universidad de Cartagena · Ingeniería de Software a Distancia*
*Basado en los proyectos docentes oficiales de las 6 materias*
