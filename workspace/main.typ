#import "@preview/fletcher:0.5.5" as fletcher: diagram, node, edge
#set page(paper: "a4")
#set text(font: "New Computer Modern", size: 11pt)

// Sections and equations are numbered by default:
#set heading(numbering: "1.")
#set math.equation(numbering: "(1)")

#import "@preview/cetz:0.3.2"
#import "@preview/physica:0.9.3": *

= Typst with Physics and CeTZ!

This is a local, offline editor for *Typst*. It comes pre-configured with packages!

#figure(
  diagram(
    spacing: 2cm,
    node((0, 0), $e^-$),
    node((0, 2), $e^+$),
    node((1, 1), $$, name: <v1>),
    node((2, 1), $$, name: <v2>),
    node((3, 1), $mu^-$),
    node((3, -1), $mu^+$),
    edge((0, 0), <v1>, "-|>"),
    edge((0, 2), <v1>, "<|-"),
    edge(<v1>, <v2>, $gamma$, "wave"),
    edge(<v2>, (3, 1), "-|>"),
    edge(<v2>, (3, -1), "<|-"),
  ),
  caption: [$e^- e^+ -> mu^- mu^+$ scattering],
)

