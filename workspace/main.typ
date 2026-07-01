#import "@preview/fletcher:0.5.8" as fletcher: diagram, node, edge

#figure(
  diagram(
    spacing: 1.6cm,
    node((0, 2), $gamma$), node((0, 0), $e^-$),
    node((1.5, 1), $$, name: <a>),
    node((3, 1), $$, name: <b>),
    node((4.5, 2), $gamma$), node((4.5, 0), $e^-$),
    edge((0, 0), <a>, "-|>"),
    edge((0, 2), <a>, "wave"),
    edge(<a>, <b>, $e^-$, "-|>"),
    edge(<b>, (4.5, 0), "-|>"),
    edge(<b>, (4.5, 2), "wave"),
  ),
  caption: [Feynman diagram],
)

#set page(paper:"a4")

Doc.
