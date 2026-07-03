#set page(paper: "a4", margin: 2.2cm, numbering: "1")
#set text(font: "New Computer Modern", size: 11pt)
#set par(justify: true, leading: 0.62em)
#set heading(numbering: "1.")
#set math.equation(numbering: "(1)")

#import "@preview/physica:0.9.8": *
#import "@preview/cetz:0.3.4": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot

// ---- Title block -----------------------------------------------------------
#align(center)[
  #text(19pt, weight: "bold")[A Tour of Typst Editor]

  #v(0.5em)
  Kazi Abu Rousan \
  #text(fill: gray)[Department of Physics]

  #v(0.4em)
  #text(fill: gray, size: 9pt)[Compiled with Typst · math via #raw("physica") · plots via #raw("cetz")]
]

#v(0.5em)
#line(length: 100%, stroke: 0.5pt + gray)

#align(center, box(width: 88%)[
  #set par(justify: true)
  *Abstract.* This document showcases what the editor can produce out of the box:
  automatically numbered sections and equations, physics notation, cross-references,
  matrices, tables and a plot rendered directly in Typst.
])

#v(0.6em)

= Mathematics and physics <sec:math>

Maxwell's equations in differential form read
$
  div va(E) &= rho / epsilon_0, & quad curl va(E) &= - pdv(va(B), t), \
  div va(B) &= 0,               & quad curl va(B) &= mu_0 va(J) + mu_0 epsilon_0 pdv(va(E), t).
$ <eq:maxwell>

From @eq:maxwell one derives the wave equation. A worked derivative and an
inner product illustrate the #raw("physica") helpers:
$ dv(f, x) = 2 x cos(x^2), quad expval(hat(H)) = innerproduct(psi, hat(H) psi). $

Matrices are one keystroke away:
$ bb(I) = mat(1, 0; 0, 1), quad sigma_y = mat(0, -i; i, 0). $

= A plot rendered in Typst <sec:plot>

#figure(
  align(center)[
    #canvas({
      plot.plot(size: (10, 6), x-label: [$x$], y-label: [$f(x)$], {
        plot.add(domain: (-4, 4), x => calc.sin(x))
        plot.add(domain: (-4, 4), x => calc.sin(x) / (x + 0.001))
      })
    })
  ],
  caption: [$sin x$ and the sinc function, drawn with #raw("cetz-plot").],
) <fig:plot>

@fig:plot is produced without leaving the editor.

= Tables and lists

#figure(
  table(
    columns: 3,
    align: (left, center, right),
    table.header([*Quantity*], [*Symbol*], [*Value*]),
    [Speed of light], [$c$], [$2.998 times 10^8 " m/s"$],
    [Planck constant], [$h$], [$6.626 times 10^(-34) " J·s"$],
    [Elementary charge], [$e$], [$1.602 times 10^(-19) " C"$],
  ),
  caption: [A few fundamental constants.],
)

Key capabilities:
+ Numbered sections (see @sec:math and @sec:plot) and equations.
+ Live Python / Julia / Wolfram output, insertable as text, figures or equations.
+ Export to PDF or HTML, and sync via Google Drive, WebDAV or a local folder.
