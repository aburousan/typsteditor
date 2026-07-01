export const typstCompletions = (monacoInstance: any) => [
  {
    label: "arguments",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "arguments",
    
    documentation: "Captured arguments to a function.",
    detail: ""
  },
  {
    label: "arguments",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "arguments",
    
    documentation: "Construct spreadable arguments in place.",
    detail: ""
  },
  {
    label: "arguments.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "arguments.at(${1:key})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the positional argument at the specified index, or the named argument with the specified name.",
    detail: "Foundations"
  },
  {
    label: "arguments.pos",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "arguments.pos()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the captured positional arguments as an array.",
    detail: "Foundations"
  },
  {
    label: "arguments.named",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "arguments.named()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the captured named arguments as a dictionary.",
    detail: "Foundations"
  },
  {
    label: "array",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "array",
    
    documentation: "A sequence of values.",
    detail: ""
  },
  {
    label: "array",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "array",
    
    documentation: "Converts a value to an array.",
    detail: ""
  },
  {
    label: "array.len",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.len()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The number of values in the array.",
    detail: "Foundations"
  },
  {
    label: "array.first",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.first()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the first item in the array.",
    detail: "Foundations"
  },
  {
    label: "array.last",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.last()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the last item in the array.",
    detail: "Foundations"
  },
  {
    label: "array.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.at(${1:index})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the item at the specified index in the array.",
    detail: "Foundations"
  },
  {
    label: "array.push",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.push(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Adds a value to the end of the array.",
    detail: "Foundations"
  },
  {
    label: "array.pop",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.pop()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Removes the last item from the array and returns it.",
    detail: "Foundations"
  },
  {
    label: "array.insert",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.insert(${1:index}, ${2:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Inserts a value into the array at the specified index, shifting all subsequent elements to the right.",
    detail: "Foundations"
  },
  {
    label: "array.remove",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.remove(${1:index})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Removes the value at the specified index from the array and return it.",
    detail: "Foundations"
  },
  {
    label: "array.slice",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.slice(${1:start})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Extracts a subslice of the array.",
    detail: "Foundations"
  },
  {
    label: "array.contains",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.contains(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Whether the array contains the specified value.",
    detail: "Foundations"
  },
  {
    label: "array.find",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.find(${1:searcher})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Searches for an item for which the given function returns `{true}` and returns the first match or `{none}` if there is no match.",
    detail: "Foundations"
  },
  {
    label: "array.position",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.position(${1:searcher})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Searches for an item for which the given function returns `{true}` and returns the index of the first match or `{none}` if there is no match.",
    detail: "Foundations"
  },
  {
    label: "array.range",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.range(${1:end})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create an array consisting of a sequence of numbers.",
    detail: "Foundations"
  },
  {
    label: "array.filter",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.filter(${1:test})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Produces a new array with only the items from the original one for which the given function returns true.",
    detail: "Foundations"
  },
  {
    label: "array.map",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.map(${1:mapper})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Produces a new array in which all items from the original one were transformed with the given function.",
    detail: "Foundations"
  },
  {
    label: "array.enumerate",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.enumerate()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a new array with the values alongside their indices.",
    detail: "Foundations"
  },
  {
    label: "array.zip",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.zip(${1:others})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Zips the array with other arrays.",
    detail: "Foundations"
  },
  {
    label: "array.fold",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.fold(${1:init}, ${2:folder})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Folds all items into a single value using an accumulator function.",
    detail: "Foundations"
  },
  {
    label: "array.sum",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.sum()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Sums all items (works for all types that can be added).",
    detail: "Foundations"
  },
  {
    label: "array.product",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.product()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the product of all items (works for all types that can be multiplied).",
    detail: "Foundations"
  },
  {
    label: "array.any",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.any(${1:test})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Whether the given function returns `{true}` for any item in the array.",
    detail: "Foundations"
  },
  {
    label: "array.all",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.all(${1:test})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Whether the given function returns `{true}` for all items in the array.",
    detail: "Foundations"
  },
  {
    label: "array.flatten",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.flatten()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Combine all nested arrays into a single flat one.",
    detail: "Foundations"
  },
  {
    label: "array.rev",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.rev()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Return a new array with the same items, but in reverse order.",
    detail: "Foundations"
  },
  {
    label: "array.split",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.split(${1:at})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Split the array at occurrences of the specified value.",
    detail: "Foundations"
  },
  {
    label: "array.join",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.join()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Combine all items in the array into one.",
    detail: "Foundations"
  },
  {
    label: "array.intersperse",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.intersperse(${1:separator})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns an array with a copy of the separator value placed between adjacent elements.",
    detail: "Foundations"
  },
  {
    label: "array.chunks",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.chunks(${1:chunk-size})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Splits an array into non-overlapping chunks, starting at the beginning, ending with a single remainder chunk.",
    detail: "Foundations"
  },
  {
    label: "array.windows",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.windows(${1:window-size})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns sliding windows of `window-size` elements over an array.",
    detail: "Foundations"
  },
  {
    label: "array.sorted",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.sorted()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Return a sorted version of this array, optionally by a given key function.",
    detail: "Foundations"
  },
  {
    label: "array.dedup",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.dedup()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Deduplicates all items in the array.",
    detail: "Foundations"
  },
  {
    label: "array.to-dict",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.to-dict()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts an array of pairs into a dictionary.",
    detail: "Foundations"
  },
  {
    label: "array.reduce",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "array.reduce(${1:reducer})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reduces the elements to a single one, by repeatedly applying a reducing operation.",
    detail: "Foundations"
  },
  {
    label: "assert",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "assert(${1:condition})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Ensures that a condition is fulfilled.",
    detail: "Foundations"
  },
  {
    label: "assert.eq",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "assert.eq(${1:left}, ${2:right})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Ensures that two values are equal.",
    detail: "Foundations"
  },
  {
    label: "assert.ne",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "assert.ne(${1:left}, ${2:right})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Ensures that two values are not equal.",
    detail: "Foundations"
  },
  {
    label: "auto",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "auto",
    
    documentation: "A value that indicates a smart default.",
    detail: ""
  },
  {
    label: "bool",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "bool",
    
    documentation: "A type with two states.",
    detail: ""
  },
  {
    label: "bytes",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "bytes",
    
    documentation: "A sequence of bytes.",
    detail: ""
  },
  {
    label: "bytes",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "bytes",
    
    documentation: "Converts a value to bytes.",
    detail: ""
  },
  {
    label: "bytes.len",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bytes.len()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The length in bytes.",
    detail: "Foundations"
  },
  {
    label: "bytes.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bytes.at(${1:index})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the byte at the specified index.",
    detail: "Foundations"
  },
  {
    label: "bytes.slice",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bytes.slice(${1:start})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Extracts a subslice of the bytes.",
    detail: "Foundations"
  },
  {
    label: "abs",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "abs(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the absolute value of a numeric value.",
    detail: "Foundations"
  },
  {
    label: "pow",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "pow(${1:base}, ${2:exponent})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Raises a value to some exponent.",
    detail: "Foundations"
  },
  {
    label: "exp",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "exp(${1:exponent})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Raises a value to some exponent of e.",
    detail: "Foundations"
  },
  {
    label: "sqrt",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sqrt(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the square root of a number.",
    detail: "Foundations"
  },
  {
    label: "root",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "root(${1:radicand}, ${2:index})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the real nth root of a number.",
    detail: "Foundations"
  },
  {
    label: "sin",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sin(${1:angle})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the sine of an angle.",
    detail: "Foundations"
  },
  {
    label: "cos",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cos(${1:angle})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the cosine of an angle.",
    detail: "Foundations"
  },
  {
    label: "tan",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "tan(${1:angle})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the tangent of an angle.",
    detail: "Foundations"
  },
  {
    label: "asin",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "asin(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the arcsine of a number.",
    detail: "Foundations"
  },
  {
    label: "acos",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "acos(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the arccosine of a number.",
    detail: "Foundations"
  },
  {
    label: "atan",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "atan(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the arctangent of a number.",
    detail: "Foundations"
  },
  {
    label: "atan2",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "atan2(${1:x}, ${2:y})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the four-quadrant arctangent of a coordinate.",
    detail: "Foundations"
  },
  {
    label: "sinh",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sinh(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the hyperbolic sine of a hyperbolic angle.",
    detail: "Foundations"
  },
  {
    label: "cosh",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cosh(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the hyperbolic cosine of a hyperbolic angle.",
    detail: "Foundations"
  },
  {
    label: "tanh",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "tanh(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the hyperbolic tangent of a hyperbolic angle.",
    detail: "Foundations"
  },
  {
    label: "log",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "log(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the logarithm of a number.",
    detail: "Foundations"
  },
  {
    label: "ln",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ln(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the natural logarithm of a number.",
    detail: "Foundations"
  },
  {
    label: "fact",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "fact(${1:number})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the factorial of a number.",
    detail: "Foundations"
  },
  {
    label: "perm",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "perm(${1:base}, ${2:numbers})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates a permutation.",
    detail: "Foundations"
  },
  {
    label: "binom",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "binom(${1:n}, ${2:k})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates a binomial coefficient.",
    detail: "Foundations"
  },
  {
    label: "gcd",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gcd(${1:a}, ${2:b})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the greatest common divisor of two integers.",
    detail: "Foundations"
  },
  {
    label: "lcm",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "lcm(${1:a}, ${2:b})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the least common multiple of two integers.",
    detail: "Foundations"
  },
  {
    label: "floor",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "floor(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Rounds a number down to the nearest integer.",
    detail: "Foundations"
  },
  {
    label: "ceil",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ceil(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Rounds a number up to the nearest integer.",
    detail: "Foundations"
  },
  {
    label: "trunc",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "trunc(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the integer part of a number.",
    detail: "Foundations"
  },
  {
    label: "fract",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "fract(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the fractional part of a number.",
    detail: "Foundations"
  },
  {
    label: "round",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "round(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Rounds a number to the nearest integer.",
    detail: "Foundations"
  },
  {
    label: "clamp",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "clamp(${1:value}, ${2:min}, ${3:max})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Clamps a number between a minimum and maximum value.",
    detail: "Foundations"
  },
  {
    label: "min",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "min(${1:values})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Determines the minimum of a sequence of values.",
    detail: "Foundations"
  },
  {
    label: "max",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "max(${1:values})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Determines the maximum of a sequence of values.",
    detail: "Foundations"
  },
  {
    label: "even",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "even(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Determines whether an integer is even.",
    detail: "Foundations"
  },
  {
    label: "odd",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "odd(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Determines whether an integer is odd.",
    detail: "Foundations"
  },
  {
    label: "rem",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "rem(${1:dividend}, ${2:divisor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the remainder of two numbers.",
    detail: "Foundations"
  },
  {
    label: "div-euclid",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "div-euclid(${1:dividend}, ${2:divisor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Performs euclidean division of two numbers.",
    detail: "Foundations"
  },
  {
    label: "rem-euclid",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "rem-euclid(${1:dividend}, ${2:divisor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "This calculates the least nonnegative remainder of a division.",
    detail: "Foundations"
  },
  {
    label: "quo",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "quo(${1:dividend}, ${2:divisor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the quotient (floored division) of two numbers.",
    detail: "Foundations"
  },
  {
    label: "norm",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "norm(${1:values})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the p-norm of a sequence of values.",
    detail: "Foundations"
  },
  {
    label: "content",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "content",
    
    documentation: "A piece of document content.",
    detail: ""
  },
  {
    label: "content.func",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "content.func()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The content's element function.",
    detail: "Foundations"
  },
  {
    label: "content.has",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "content.has(${1:field})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Whether the content has the specified field.",
    detail: "Foundations"
  },
  {
    label: "content.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "content.at(${1:field})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Access the specified field on the content.",
    detail: "Foundations"
  },
  {
    label: "content.fields",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "content.fields()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the fields of this content.",
    detail: "Foundations"
  },
  {
    label: "content.location",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "content.location()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The location of the content.",
    detail: "Foundations"
  },
  {
    label: "datetime",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "datetime",
    
    documentation: "Represents a date, a time, or a combination of both.",
    detail: ""
  },
  {
    label: "datetime",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "datetime",
    
    documentation: "Creates a new datetime.",
    detail: ""
  },
  {
    label: "datetime.today",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.today()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the current date.",
    detail: "Foundations"
  },
  {
    label: "datetime.display",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.display()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Displays the datetime in a specified format.",
    detail: "Foundations"
  },
  {
    label: "datetime.year",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.year()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The year if it was specified, or `{none}` for times without a date.",
    detail: "Foundations"
  },
  {
    label: "datetime.month",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.month()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The month if it was specified, or `{none}` for times without a date.",
    detail: "Foundations"
  },
  {
    label: "datetime.weekday",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.weekday()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The weekday (counting Monday as 1) or `{none}` for times without a date.",
    detail: "Foundations"
  },
  {
    label: "datetime.day",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.day()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The day if it was specified, or `{none}` for times without a date.",
    detail: "Foundations"
  },
  {
    label: "datetime.hour",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.hour()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The hour if it was specified, or `{none}` for dates without a time.",
    detail: "Foundations"
  },
  {
    label: "datetime.minute",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.minute()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The minute if it was specified, or `{none}` for dates without a time.",
    detail: "Foundations"
  },
  {
    label: "datetime.second",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.second()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The second if it was specified, or `{none}` for dates without a time.",
    detail: "Foundations"
  },
  {
    label: "datetime.ordinal",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datetime.ordinal()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The ordinal (day of the year), or `{none}` for times without a date.",
    detail: "Foundations"
  },
  {
    label: "decimal",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "decimal",
    
    documentation: "A fixed-point decimal number type.",
    detail: ""
  },
  {
    label: "decimal",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "decimal",
    
    documentation: "Converts a value to a `decimal`.",
    detail: ""
  },
  {
    label: "dictionary",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "dictionary",
    
    documentation: "A map from string keys to values.",
    detail: ""
  },
  {
    label: "dictionary",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "dictionary",
    
    documentation: "Converts a value into a dictionary.",
    detail: ""
  },
  {
    label: "dictionary.len",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dictionary.len()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The number of pairs in the dictionary.",
    detail: "Foundations"
  },
  {
    label: "dictionary.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dictionary.at(${1:key})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the value associated with the specified key in the dictionary.",
    detail: "Foundations"
  },
  {
    label: "dictionary.insert",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dictionary.insert(${1:key}, ${2:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Inserts a new pair into the dictionary.",
    detail: "Foundations"
  },
  {
    label: "dictionary.remove",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dictionary.remove(${1:key})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Removes a pair from the dictionary by key and return the value.",
    detail: "Foundations"
  },
  {
    label: "dictionary.keys",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dictionary.keys()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the keys of the dictionary as an array in insertion order.",
    detail: "Foundations"
  },
  {
    label: "dictionary.values",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dictionary.values()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the values of the dictionary as an array in insertion order.",
    detail: "Foundations"
  },
  {
    label: "dictionary.pairs",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dictionary.pairs()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the keys and values of the dictionary as an array of pairs.",
    detail: "Foundations"
  },
  {
    label: "duration",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "duration",
    
    documentation: "Represents a positive or negative span of time.",
    detail: ""
  },
  {
    label: "duration",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "duration",
    
    documentation: "Creates a new duration.",
    detail: ""
  },
  {
    label: "duration.seconds",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "duration.seconds()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The duration expressed in seconds.",
    detail: "Foundations"
  },
  {
    label: "duration.minutes",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "duration.minutes()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The duration expressed in minutes.",
    detail: "Foundations"
  },
  {
    label: "duration.hours",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "duration.hours()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The duration expressed in hours.",
    detail: "Foundations"
  },
  {
    label: "duration.days",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "duration.days()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The duration expressed in days.",
    detail: "Foundations"
  },
  {
    label: "duration.weeks",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "duration.weeks()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The duration expressed in weeks.",
    detail: "Foundations"
  },
  {
    label: "eval",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "eval(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Evaluates a string as Typst code.",
    detail: "Foundations"
  },
  {
    label: "float",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "float",
    
    documentation: "A floating-point number.",
    detail: ""
  },
  {
    label: "float",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "float",
    
    documentation: "Converts a value to a float.",
    detail: ""
  },
  {
    label: "float.is-nan",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "float.is-nan()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Checks if a float is not a number.",
    detail: "Foundations"
  },
  {
    label: "float.is-infinite",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "float.is-infinite()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Checks if a float is infinite.",
    detail: "Foundations"
  },
  {
    label: "float.signum",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "float.signum()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the sign of a floating point number.",
    detail: "Foundations"
  },
  {
    label: "float.from-bytes",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "float.from-bytes(${1:bytes})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Interprets bytes as a float.",
    detail: "Foundations"
  },
  {
    label: "float.to-bytes",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "float.to-bytes()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts a float to bytes.",
    detail: "Foundations"
  },
  {
    label: "function",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "function",
    
    documentation: "A mapping from argument values to a return value.",
    detail: ""
  },
  {
    label: "function.with",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "function.with(${1:arguments})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a new function that has the given arguments pre-applied.",
    detail: "Foundations"
  },
  {
    label: "function.where",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "function.where(${1:fields})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a selector that filters for elements belonging to this function whose fields have the values of the given arguments.",
    detail: "Foundations"
  },
  {
    label: "int",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "int",
    
    documentation: "A whole number.",
    detail: ""
  },
  {
    label: "int",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "int",
    
    documentation: "Converts a value to an integer.",
    detail: ""
  },
  {
    label: "int.signum",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.signum()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the sign of an integer.",
    detail: "Foundations"
  },
  {
    label: "int.bit-not",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.bit-not()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the bitwise NOT of an integer.",
    detail: "Foundations"
  },
  {
    label: "int.bit-and",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.bit-and(${1:rhs})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the bitwise AND between two integers.",
    detail: "Foundations"
  },
  {
    label: "int.bit-or",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.bit-or(${1:rhs})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the bitwise OR between two integers.",
    detail: "Foundations"
  },
  {
    label: "int.bit-xor",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.bit-xor(${1:rhs})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculates the bitwise XOR between two integers.",
    detail: "Foundations"
  },
  {
    label: "int.bit-lshift",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.bit-lshift(${1:shift})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Shifts the operand's bits to the left by the specified amount.",
    detail: "Foundations"
  },
  {
    label: "int.bit-rshift",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.bit-rshift(${1:shift})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Shifts the operand's bits to the right by the specified amount.",
    detail: "Foundations"
  },
  {
    label: "int.from-bytes",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.from-bytes(${1:bytes})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts bytes to an integer.",
    detail: "Foundations"
  },
  {
    label: "int.to-bytes",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "int.to-bytes()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts an integer to bytes.",
    detail: "Foundations"
  },
  {
    label: "label",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "label",
    
    documentation: "A label for an element.",
    detail: ""
  },
  {
    label: "label",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "label",
    
    documentation: "Creates a label from a string.",
    detail: ""
  },
  {
    label: "module",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "module",
    
    documentation: "A collection of variables and functions that are commonly related to a single theme.",
    detail: ""
  },
  {
    label: "none",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "none",
    
    documentation: "A value that indicates the absence of any other value.",
    detail: ""
  },
  {
    label: "panic",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "panic(${1:values})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Fails with an error.",
    detail: "Foundations"
  },
  {
    label: "plugin",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "plugin(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Loads a WebAssembly module.",
    detail: "Foundations"
  },
  {
    label: "plugin.transition",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "plugin.transition(${1:func}, ${2:arguments})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calls a plugin function that has side effects and returns a new module with plugin functions that are guaranteed to have observed the results of the mutable call.",
    detail: "Foundations"
  },
  {
    label: "regex",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "regex",
    
    documentation: "A regular expression.",
    detail: ""
  },
  {
    label: "regex",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "regex",
    
    documentation: "Create a regular expression from a string.",
    detail: ""
  },
  {
    label: "repr",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "repr(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the string representation of a value.",
    detail: "Foundations"
  },
  {
    label: "selector",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "selector",
    
    documentation: "A filter for selecting elements within the document.",
    detail: ""
  },
  {
    label: "selector",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "selector",
    
    documentation: "Turns a value into a selector.",
    detail: ""
  },
  {
    label: "selector.or",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "selector.or(${1:others})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Selects all elements that match this or any of the other selectors.",
    detail: "Foundations"
  },
  {
    label: "selector.and",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "selector.and(${1:others})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Selects all elements that match this and all of the other selectors.",
    detail: "Foundations"
  },
  {
    label: "selector.before",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "selector.before(${1:end})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a modified selector that will only match elements that occur before the first match of `end`.",
    detail: "Foundations"
  },
  {
    label: "selector.after",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "selector.after(${1:start})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a modified selector that will only match elements that occur after the first match of `start`.",
    detail: "Foundations"
  },
  {
    label: "str",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "str",
    
    documentation: "A sequence of Unicode codepoints.",
    detail: ""
  },
  {
    label: "str",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "str",
    
    documentation: "Converts a value to a string.",
    detail: ""
  },
  {
    label: "str.len",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.len()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The length of the string in UTF-8 encoded bytes.",
    detail: "Foundations"
  },
  {
    label: "str.first",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.first()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Extracts the first grapheme cluster of the string.",
    detail: "Foundations"
  },
  {
    label: "str.last",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.last()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Extracts the last grapheme cluster of the string.",
    detail: "Foundations"
  },
  {
    label: "str.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.at(${1:index})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Extracts the first grapheme cluster after the specified index.",
    detail: "Foundations"
  },
  {
    label: "str.slice",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.slice(${1:start})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Extracts a substring of the string.",
    detail: "Foundations"
  },
  {
    label: "str.clusters",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.clusters()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the grapheme clusters of the string as an array of substrings.",
    detail: "Foundations"
  },
  {
    label: "str.codepoints",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.codepoints()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the Unicode codepoints of the string as an array of substrings.",
    detail: "Foundations"
  },
  {
    label: "str.to-unicode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.to-unicode(${1:character})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts a character into its corresponding code point.",
    detail: "Foundations"
  },
  {
    label: "str.from-unicode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.from-unicode(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts a unicode code point into its corresponding string.",
    detail: "Foundations"
  },
  {
    label: "str.normalize",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.normalize()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Normalizes the string to the given Unicode normal form.",
    detail: "Foundations"
  },
  {
    label: "str.contains",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.contains(${1:pattern})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Whether the string contains the specified pattern.",
    detail: "Foundations"
  },
  {
    label: "str.starts-with",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.starts-with(${1:pattern})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Whether the string starts with the specified pattern.",
    detail: "Foundations"
  },
  {
    label: "str.ends-with",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.ends-with(${1:pattern})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Whether the string ends with the specified pattern.",
    detail: "Foundations"
  },
  {
    label: "str.find",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.find(${1:pattern})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Searches for the specified pattern in the string and returns the first match as a string or `{none}` if there is no match.",
    detail: "Foundations"
  },
  {
    label: "str.position",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.position(${1:pattern})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Searches for the specified pattern in the string and returns the index of the first match as an integer or `{none}` if there is no match.",
    detail: "Foundations"
  },
  {
    label: "str.match",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.match(${1:pattern})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Searches for the specified pattern in the string and returns a dictionary with details about the first match or `{none}` if there is no match.",
    detail: "Foundations"
  },
  {
    label: "str.matches",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.matches(${1:pattern})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Searches for the specified pattern in the string and returns an array of dictionaries with details about all matches.",
    detail: "Foundations"
  },
  {
    label: "str.replace",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.replace(${1:pattern}, ${2:replacement})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Replace at most `count` occurrences of the given pattern with a replacement string or function (beginning from the start).",
    detail: "Foundations"
  },
  {
    label: "str.trim",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.trim()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Removes matches of a pattern from one or both sides of the string, once or repeatedly and returns the resulting string.",
    detail: "Foundations"
  },
  {
    label: "str.split",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.split()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Splits a string at matches of a specified pattern and returns an array of the resulting parts.",
    detail: "Foundations"
  },
  {
    label: "str.rev",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "str.rev()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reverse the string.",
    detail: "Foundations"
  },
  {
    label: "symbol",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "symbol",
    
    documentation: "A Unicode symbol.",
    detail: ""
  },
  {
    label: "symbol",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "symbol",
    
    documentation: "Create a custom symbol with modifiers.",
    detail: ""
  },
  {
    label: "target",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "target()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the current export target.",
    detail: "Foundations"
  },
  {
    label: "type",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "type",
    
    documentation: "Describes a kind of value.",
    detail: ""
  },
  {
    label: "type",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "type",
    
    documentation: "Determines a value's type.",
    detail: ""
  },
  {
    label: "version",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "version",
    
    documentation: "A version with an arbitrary number of components.",
    detail: ""
  },
  {
    label: "version",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "version",
    
    documentation: "Creates a new version.",
    detail: ""
  },
  {
    label: "version.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "version.at(${1:index})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Retrieves a component of a version.",
    detail: "Foundations"
  },
  {
    label: "bibliography",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bibliography(${1:sources})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A bibliography / reference listing.",
    detail: "Model"
  },
  {
    label: "list",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "list(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A bullet list.",
    detail: "Model"
  },
  {
    label: "list.item",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "list.item(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A bullet list item.",
    detail: "Model"
  },
  {
    label: "cite",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cite(${1:key})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Cite a work from the bibliography.",
    detail: "Model"
  },
  {
    label: "document",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "document()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The root element of a document and its metadata.",
    detail: "Model"
  },
  {
    label: "emph",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "emph(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Emphasizes content by toggling italics.",
    detail: "Model"
  },
  {
    label: "figure",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "figure(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A figure with an optional caption.",
    detail: "Model"
  },
  {
    label: "figure.caption",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "figure.caption(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The caption of a figure.",
    detail: "Model"
  },
  {
    label: "footnote",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "footnote(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A footnote.",
    detail: "Model"
  },
  {
    label: "footnote.entry",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "footnote.entry(${1:note})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "An entry in a footnote list.",
    detail: "Model"
  },
  {
    label: "heading",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "heading(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A section heading.",
    detail: "Model"
  },
  {
    label: "link",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "link(${1:dest}, ${2:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Links to a URL or a location in the document.",
    detail: "Model"
  },
  {
    label: "enum",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "enum(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A numbered list.",
    detail: "Model"
  },
  {
    label: "enum.item",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "enum.item(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "An enumeration item.",
    detail: "Model"
  },
  {
    label: "numbering",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "numbering(${1:numbering}, ${2:numbers})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Applies a numbering to a sequence of numbers.",
    detail: "Model"
  },
  {
    label: "outline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "outline()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A table of contents, figures, or other elements.",
    detail: "Model"
  },
  {
    label: "outline.entry",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "outline.entry(${1:level}, ${2:element})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Represents an entry line in an outline.",
    detail: "Model"
  },
  {
    label: "par",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "par(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A logical subdivison of textual content.",
    detail: "Model"
  },
  {
    label: "par.line",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "par.line()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A paragraph line.",
    detail: "Model"
  },
  {
    label: "parbreak",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "parbreak()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A paragraph break.",
    detail: "Model"
  },
  {
    label: "quote",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "quote(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Displays a quote alongside an optional attribution.",
    detail: "Model"
  },
  {
    label: "ref",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ref(${1:target})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A reference to a label or bibliography.",
    detail: "Model"
  },
  {
    label: "strong",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "strong(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Strongly emphasizes content by increasing the font weight.",
    detail: "Model"
  },
  {
    label: "table",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A table of items.",
    detail: "Model"
  },
  {
    label: "table.cell",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table.cell(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A cell in the table.",
    detail: "Model"
  },
  {
    label: "table.hline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table.hline()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal line in the table.",
    detail: "Model"
  },
  {
    label: "table.vline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table.vline()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A vertical line in the table.",
    detail: "Model"
  },
  {
    label: "table.header",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table.header(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A repeatable table header.",
    detail: "Model"
  },
  {
    label: "table.footer",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table.footer(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A repeatable table footer.",
    detail: "Model"
  },
  {
    label: "terms",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "terms(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A list of terms and their descriptions.",
    detail: "Model"
  },
  {
    label: "terms.item",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "terms.item(${1:term}, ${2:description})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A term list item.",
    detail: "Model"
  },
  {
    label: "title",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "title()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A document title.",
    detail: "Model"
  },
  {
    label: "highlight",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "highlight(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Highlights text with a background color.",
    detail: "Text"
  },
  {
    label: "linebreak",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "linebreak()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Inserts a line break.",
    detail: "Text"
  },
  {
    label: "lorem",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "lorem(${1:words})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Creates blind text.",
    detail: "Text"
  },
  {
    label: "lower",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "lower(${1:text})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts a string or content to lowercase.",
    detail: "Text"
  },
  {
    label: "overline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "overline(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Adds a line over text.",
    detail: "Text"
  },
  {
    label: "raw",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "raw(${1:text})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Raw text with optional syntax highlighting.",
    detail: "Text"
  },
  {
    label: "raw.line",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "raw.line(${1:number}, ${2:count}, ${3:text}, ${4:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A highlighted line of raw text.",
    detail: "Text"
  },
  {
    label: "smallcaps",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "smallcaps(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Displays text in small capitals.",
    detail: "Text"
  },
  {
    label: "smartquote",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "smartquote()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A language-aware quote that reacts to its context.",
    detail: "Text"
  },
  {
    label: "strike",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "strike(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Strikes through text.",
    detail: "Text"
  },
  {
    label: "sub",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sub(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Renders text in subscript.",
    detail: "Text"
  },
  {
    label: "super",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "super(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Renders text in superscript.",
    detail: "Text"
  },
  {
    label: "text",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "text(${1:text})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Customizes the look and layout of text in a variety of ways.",
    detail: "Text"
  },
  {
    label: "underline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "underline(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Underlines text.",
    detail: "Text"
  },
  {
    label: "upper",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "upper(${1:text})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts a string or content to uppercase.",
    detail: "Text"
  },
  {
    label: "accent",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "accent(${1:base}, ${2:accent})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Attaches an accent to a base.",
    detail: "Math"
  },
  {
    label: "attach",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "attach(${1:base})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A base with optional attachments.",
    detail: "Math"
  },
  {
    label: "scripts",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "scripts(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forces a base to display attachments as scripts.",
    detail: "Math"
  },
  {
    label: "limits",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "limits(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forces a base to display attachments as limits.",
    detail: "Math"
  },
  {
    label: "binom",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "binom(${1:upper}, ${2:lower})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A binomial expression.",
    detail: "Math"
  },
  {
    label: "cancel",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cancel(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Displays a diagonal line over a part of an equation.",
    detail: "Math"
  },
  {
    label: "cases",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cases(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A case distinction.",
    detail: "Math"
  },
  {
    label: "class",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "class(${1:class}, ${2:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forced use of a certain math class.",
    detail: "Math"
  },
  {
    label: "equation",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "equation(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A mathematical equation.",
    detail: "Math"
  },
  {
    label: "frac",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "frac(${1:num}, ${2:denom})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A mathematical fraction.",
    detail: "Math"
  },
  {
    label: "lr",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "lr(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Scales delimiters.",
    detail: "Math"
  },
  {
    label: "mid",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "mid(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Scales delimiters vertically to the nearest surrounding `{lr()}` group.",
    detail: "Math"
  },
  {
    label: "abs",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "abs(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Takes the absolute value of an expression.",
    detail: "Math"
  },
  {
    label: "norm",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "norm(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Takes the norm of an expression.",
    detail: "Math"
  },
  {
    label: "floor",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "floor(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Floors an expression.",
    detail: "Math"
  },
  {
    label: "ceil",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ceil(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Ceils an expression.",
    detail: "Math"
  },
  {
    label: "round",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "round(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Rounds an expression.",
    detail: "Math"
  },
  {
    label: "mat",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "mat(${1:rows})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A matrix.",
    detail: "Math"
  },
  {
    label: "primes",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "primes(${1:count})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Grouped primes.",
    detail: "Math"
  },
  {
    label: "root",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "root(${1:radicand})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A general root.",
    detail: "Math"
  },
  {
    label: "sqrt",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sqrt(${1:radicand})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A square root.",
    detail: "Math"
  },
  {
    label: "display",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "display(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forced display style in math.",
    detail: "Math"
  },
  {
    label: "inline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "inline(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forced inline (text) style in math.",
    detail: "Math"
  },
  {
    label: "script",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "script(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forced script style in math.",
    detail: "Math"
  },
  {
    label: "sscript",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sscript(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forced second script style in math.",
    detail: "Math"
  },
  {
    label: "stretch",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "stretch(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Stretches a glyph.",
    detail: "Math"
  },
  {
    label: "upright",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "upright(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Upright (non-italic) font style in math.",
    detail: "Math"
  },
  {
    label: "italic",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "italic(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Italic font style in math.",
    detail: "Math"
  },
  {
    label: "bold",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bold(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Bold font style in math.",
    detail: "Math"
  },
  {
    label: "op",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "op(${1:text})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A text operator in an equation.",
    detail: "Math"
  },
  {
    label: "underline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "underline(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal line under content.",
    detail: "Math"
  },
  {
    label: "overline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "overline(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal line over content.",
    detail: "Math"
  },
  {
    label: "underbrace",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "underbrace(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal brace under content, with an optional annotation below.",
    detail: "Math"
  },
  {
    label: "overbrace",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "overbrace(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal brace over content, with an optional annotation above.",
    detail: "Math"
  },
  {
    label: "underbracket",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "underbracket(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal bracket under content, with an optional annotation below.",
    detail: "Math"
  },
  {
    label: "overbracket",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "overbracket(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal bracket over content, with an optional annotation above.",
    detail: "Math"
  },
  {
    label: "underparen",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "underparen(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal parenthesis under content, with an optional annotation below.",
    detail: "Math"
  },
  {
    label: "overparen",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "overparen(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal parenthesis over content, with an optional annotation above.",
    detail: "Math"
  },
  {
    label: "undershell",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "undershell(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal tortoise shell bracket under content, with an optional annotation below.",
    detail: "Math"
  },
  {
    label: "overshell",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "overshell(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal tortoise shell bracket over content, with an optional annotation above.",
    detail: "Math"
  },
  {
    label: "serif",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "serif(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Serif (roman) font style in math.",
    detail: "Math"
  },
  {
    label: "sans",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sans(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Sans-serif font style in math.",
    detail: "Math"
  },
  {
    label: "frak",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "frak(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Fraktur font style in math.",
    detail: "Math"
  },
  {
    label: "mono",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "mono(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Monospace font style in math.",
    detail: "Math"
  },
  {
    label: "bb",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bb(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Blackboard bold (double-struck) font style in math.",
    detail: "Math"
  },
  {
    label: "cal",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cal(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calligraphic (chancery) font style in math.",
    detail: "Math"
  },
  {
    label: "scr",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "scr(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Script (roundhand) font style in math.",
    detail: "Math"
  },
  {
    label: "vec",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "vec(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A column vector.",
    detail: "Math"
  },
  {
    label: "align",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "align(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Aligns content horizontally and vertically.",
    detail: "Layout"
  },
  {
    label: "alignment",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "alignment",
    
    documentation: "Where to align something along an axis.",
    detail: ""
  },
  {
    label: "alignment.axis",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "alignment.axis()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The axis this alignment belongs to.",
    detail: "Layout"
  },
  {
    label: "alignment.inv",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "alignment.inv()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The inverse alignment.",
    detail: "Layout"
  },
  {
    label: "angle",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "angle",
    
    documentation: "An angle describing a rotation.",
    detail: ""
  },
  {
    label: "angle.rad",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "angle.rad()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts this angle to radians.",
    detail: "Layout"
  },
  {
    label: "angle.deg",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "angle.deg()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts this angle to degrees.",
    detail: "Layout"
  },
  {
    label: "block",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "block()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A block-level container.",
    detail: "Layout"
  },
  {
    label: "box",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "box()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "An inline-level container that sizes content.",
    detail: "Layout"
  },
  {
    label: "colbreak",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "colbreak()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Forces a column break.",
    detail: "Layout"
  },
  {
    label: "columns",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "columns(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Separates a region into multiple equally sized columns.",
    detail: "Layout"
  },
  {
    label: "direction",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "direction",
    
    documentation: "The four directions into which content can be laid out.",
    detail: ""
  },
  {
    label: "direction.from",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "direction.from(${1:side})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a direction from a starting point.",
    detail: "Layout"
  },
  {
    label: "direction.to",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "direction.to(${1:side})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a direction from an end point.",
    detail: "Layout"
  },
  {
    label: "direction.axis",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "direction.axis()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The axis this direction belongs to, either `{\"horizontal\"}` or `{\"vertical\"}`.",
    detail: "Layout"
  },
  {
    label: "direction.sign",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "direction.sign()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The corresponding sign, for use in calculations.",
    detail: "Layout"
  },
  {
    label: "direction.start",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "direction.start()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The start point of this direction, as an alignment.",
    detail: "Layout"
  },
  {
    label: "direction.end",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "direction.end()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The end point of this direction, as an alignment.",
    detail: "Layout"
  },
  {
    label: "direction.inv",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "direction.inv()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "The inverse direction.",
    detail: "Layout"
  },
  {
    label: "fraction",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "fraction",
    
    documentation: "Defines how the remaining space in a layout is distributed.",
    detail: ""
  },
  {
    label: "grid",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "grid(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Arranges content in a grid.",
    detail: "Layout"
  },
  {
    label: "grid.cell",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "grid.cell(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A cell in the grid.",
    detail: "Layout"
  },
  {
    label: "grid.hline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "grid.hline()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A horizontal line in the grid.",
    detail: "Layout"
  },
  {
    label: "grid.vline",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "grid.vline()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A vertical line in the grid.",
    detail: "Layout"
  },
  {
    label: "grid.header",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "grid.header(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A repeatable grid header.",
    detail: "Layout"
  },
  {
    label: "grid.footer",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "grid.footer(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A repeatable grid footer.",
    detail: "Layout"
  },
  {
    label: "hide",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "hide(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Hides content without affecting layout.",
    detail: "Layout"
  },
  {
    label: "layout",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "layout(${1:func})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Provides access to the current outer container's (or page's, if none) dimensions (width and height).",
    detail: "Layout"
  },
  {
    label: "length",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "length",
    
    documentation: "A size or distance, possibly expressed with contextual units.",
    detail: ""
  },
  {
    label: "length.pt",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "length.pt()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts this length to points.",
    detail: "Layout"
  },
  {
    label: "length.mm",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "length.mm()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts this length to millimeters.",
    detail: "Layout"
  },
  {
    label: "length.cm",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "length.cm()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts this length to centimeters.",
    detail: "Layout"
  },
  {
    label: "length.inches",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "length.inches()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Converts this length to inches.",
    detail: "Layout"
  },
  {
    label: "length.to-absolute",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "length.to-absolute()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Resolve this length to an absolute length.",
    detail: "Layout"
  },
  {
    label: "measure",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "measure(${1:content})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Measures the layouted size of content.",
    detail: "Layout"
  },
  {
    label: "move",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "move(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Moves content without affecting layout.",
    detail: "Layout"
  },
  {
    label: "pad",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "pad(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Adds spacing around content.",
    detail: "Layout"
  },
  {
    label: "page",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "page()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Layouts its child onto one or multiple pages.",
    detail: "Layout"
  },
  {
    label: "pagebreak",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "pagebreak()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A manual page break.",
    detail: "Layout"
  },
  {
    label: "place",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "place(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Places content relatively to its parent container.",
    detail: "Layout"
  },
  {
    label: "place.flush",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "place.flush()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Asks the layout algorithm to place pending floating elements before continuing with the content.",
    detail: "Layout"
  },
  {
    label: "ratio",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "ratio",
    
    documentation: "A ratio of a whole.",
    detail: ""
  },
  {
    label: "relative",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "relative",
    
    documentation: "A length in relation to some known length.",
    detail: ""
  },
  {
    label: "repeat",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "repeat(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Repeats content to the available space.",
    detail: "Layout"
  },
  {
    label: "rotate",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "rotate(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Rotates content without affecting layout.",
    detail: "Layout"
  },
  {
    label: "scale",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "scale(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Scales content without affecting layout.",
    detail: "Layout"
  },
  {
    label: "skew",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "skew(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Skews content.",
    detail: "Layout"
  },
  {
    label: "h",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "h(${1:amount})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Inserts horizontal spacing into a paragraph.",
    detail: "Layout"
  },
  {
    label: "v",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "v(${1:amount})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Inserts vertical spacing into a flow of blocks.",
    detail: "Layout"
  },
  {
    label: "stack",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "stack(${1:children})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Arranges content and spacing horizontally or vertically.",
    detail: "Layout"
  },
  {
    label: "circle",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "circle()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A circle with optional content.",
    detail: "Visualize"
  },
  {
    label: "color",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "color",
    
    documentation: "A color in a specific color space.",
    detail: ""
  },
  {
    label: "color.luma",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.luma(${1:lightness}, ${2:alpha}, ${3:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create a grayscale color.",
    detail: "Visualize"
  },
  {
    label: "color.oklab",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.oklab(${1:lightness}, ${2:a}, ${3:b}, ${4:alpha}, ${5:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create an [Oklab](https://bottosson.github.io/posts/oklab/) color.",
    detail: "Visualize"
  },
  {
    label: "color.oklch",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.oklch(${1:lightness}, ${2:chroma}, ${3:hue}, ${4:alpha}, ${5:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create an [Oklch](https://bottosson.github.io/posts/oklab/) color.",
    detail: "Visualize"
  },
  {
    label: "color.linear-rgb",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.linear-rgb(${1:red}, ${2:green}, ${3:blue}, ${4:alpha}, ${5:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create an RGB(A) color with linear luma.",
    detail: "Visualize"
  },
  {
    label: "color.rgb",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.rgb(${1:red}, ${2:green}, ${3:blue}, ${4:alpha}, ${5:hex}, ${6:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create an RGB(A) color.",
    detail: "Visualize"
  },
  {
    label: "color.cmyk",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.cmyk(${1:cyan}, ${2:magenta}, ${3:yellow}, ${4:key}, ${5:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create a CMYK color.",
    detail: "Visualize"
  },
  {
    label: "color.hsl",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.hsl(${1:hue}, ${2:saturation}, ${3:lightness}, ${4:alpha}, ${5:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create an HSL color.",
    detail: "Visualize"
  },
  {
    label: "color.hsv",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.hsv(${1:hue}, ${2:saturation}, ${3:value}, ${4:alpha}, ${5:color})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create an HSV color.",
    detail: "Visualize"
  },
  {
    label: "color.components",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.components()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Extracts the components of this color.",
    detail: "Visualize"
  },
  {
    label: "color.space",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.space()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the constructor function for this color's space.",
    detail: "Visualize"
  },
  {
    label: "color.to-hex",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.to-hex()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the color's RGB(A) hex representation (such as `#ffaa32` or `#020304fe`).",
    detail: "Visualize"
  },
  {
    label: "color.lighten",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.lighten(${1:factor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Lightens a color by a given factor.",
    detail: "Visualize"
  },
  {
    label: "color.darken",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.darken(${1:factor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Darkens a color by a given factor.",
    detail: "Visualize"
  },
  {
    label: "color.saturate",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.saturate(${1:factor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Increases the saturation of a color by a given factor.",
    detail: "Visualize"
  },
  {
    label: "color.desaturate",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.desaturate(${1:factor})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Decreases the saturation of a color by a given factor.",
    detail: "Visualize"
  },
  {
    label: "color.negate",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.negate()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Produces the complementary color using a provided color space.",
    detail: "Visualize"
  },
  {
    label: "color.rotate",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.rotate(${1:angle})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Rotates the hue of the color by a given angle.",
    detail: "Visualize"
  },
  {
    label: "color.mix",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.mix(${1:colors})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Create a color by mixing two or more colors.",
    detail: "Visualize"
  },
  {
    label: "color.transparentize",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.transparentize(${1:scale})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Makes a color more transparent by a given factor.",
    detail: "Visualize"
  },
  {
    label: "color.opacify",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "color.opacify(${1:scale})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Makes a color more opaque by a given scale.",
    detail: "Visualize"
  },
  {
    label: "curve",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "curve(${1:components})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A curve consisting of movements, lines, and Bézier segments.",
    detail: "Visualize"
  },
  {
    label: "curve.move",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "curve.move(${1:start})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Starts a new curve component.",
    detail: "Visualize"
  },
  {
    label: "curve.line",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "curve.line(${1:end})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Adds a straight line from the current point to a following one.",
    detail: "Visualize"
  },
  {
    label: "curve.quad",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "curve.quad(${1:control}, ${2:end})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Adds a quadratic Bézier curve segment from the last point to `end`, using `control` as the control point.",
    detail: "Visualize"
  },
  {
    label: "curve.cubic",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "curve.cubic(${1:control-start}, ${2:control-end}, ${3:end})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Adds a cubic Bézier curve segment from the last point to `end`, using `control-start` and `control-end` as the control points.",
    detail: "Visualize"
  },
  {
    label: "curve.close",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "curve.close()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Closes the curve by adding a segment from the last point to the start of the curve (or the last preceding `curve.move` point).",
    detail: "Visualize"
  },
  {
    label: "ellipse",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ellipse()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "An ellipse with optional content.",
    detail: "Visualize"
  },
  {
    label: "gradient",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "gradient",
    
    documentation: "A color gradient.",
    detail: ""
  },
  {
    label: "gradient.linear",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.linear(${1:stops}, ${2:angle})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Creates a new linear gradient, in which colors transition along a straight line.",
    detail: "Visualize"
  },
  {
    label: "gradient.radial",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.radial(${1:stops})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Creates a new radial gradient, in which colors radiate away from an origin.",
    detail: "Visualize"
  },
  {
    label: "gradient.conic",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.conic(${1:stops})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Creates a new conic gradient, in which colors change radially around a center point.",
    detail: "Visualize"
  },
  {
    label: "gradient.sharp",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.sharp(${1:steps})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Creates a sharp version of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.repeat",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.repeat(${1:repetitions})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Repeats this gradient a given number of times, optionally mirroring it at every second repetition.",
    detail: "Visualize"
  },
  {
    label: "gradient.kind",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.kind()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the kind of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.stops",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.stops()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the stops of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.space",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.space()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the mixing space of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.relative",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.relative()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the relative placement of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.angle",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.angle()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the angle of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.center",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.center()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the center of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.radius",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.radius()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the radius of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.focal-center",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.focal-center()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the focal-center of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.focal-radius",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.focal-radius()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the focal-radius of this gradient.",
    detail: "Visualize"
  },
  {
    label: "gradient.sample",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.sample(${1:t})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Sample the gradient at a given position.",
    detail: "Visualize"
  },
  {
    label: "gradient.samples",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "gradient.samples(${1:ts})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Samples the gradient at multiple positions at once and returns the results as an array.",
    detail: "Visualize"
  },
  {
    label: "image",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "image(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A raster or vector graphic.",
    detail: "Visualize"
  },
  {
    label: "image.decode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "image.decode(${1:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Decode a raster or vector graphic from bytes or a string.",
    detail: "Visualize"
  },
  {
    label: "line",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "line()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A line from one point to another.",
    detail: "Visualize"
  },
  {
    label: "path",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "path(${1:vertices})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A path through a list of points, connected by Bézier curves.",
    detail: "Visualize"
  },
  {
    label: "polygon",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "polygon(${1:vertices})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A closed polygon.",
    detail: "Visualize"
  },
  {
    label: "polygon.regular",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "polygon.regular()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A regular polygon, defined by its size and number of vertices.",
    detail: "Visualize"
  },
  {
    label: "rect",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "rect()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A rectangle with optional content.",
    detail: "Visualize"
  },
  {
    label: "square",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "square()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A square with optional content.",
    detail: "Visualize"
  },
  {
    label: "stroke",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "stroke",
    
    documentation: "Defines how to draw a line.",
    detail: ""
  },
  {
    label: "stroke",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "stroke",
    
    documentation: "Converts a value to a stroke or constructs a stroke with the given parameters.",
    detail: ""
  },
  {
    label: "tiling",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "tiling",
    
    documentation: "A repeating tiling fill.",
    detail: ""
  },
  {
    label: "tiling",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "tiling",
    
    documentation: "Construct a new tiling.",
    detail: ""
  },
  {
    label: "counter",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "counter",
    
    documentation: "Counts through pages, elements, and more.",
    detail: ""
  },
  {
    label: "counter",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "counter",
    
    documentation: "Create a new counter identified by a key.",
    detail: ""
  },
  {
    label: "counter.get",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "counter.get()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Retrieves the value of the counter at the current location.",
    detail: "Introspection"
  },
  {
    label: "counter.display",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "counter.display()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Displays the current value of the counter with a numbering and returns the formatted output.",
    detail: "Introspection"
  },
  {
    label: "counter.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "counter.at(${1:selector})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Retrieves the value of the counter at the given location.",
    detail: "Introspection"
  },
  {
    label: "counter.final",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "counter.final()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Retrieves the value of the counter at the end of the document.",
    detail: "Introspection"
  },
  {
    label: "counter.step",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "counter.step()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Increases the value of the counter by one.",
    detail: "Introspection"
  },
  {
    label: "counter.update",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "counter.update(${1:update})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Updates the value of the counter.",
    detail: "Introspection"
  },
  {
    label: "here",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "here()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Provides the current location in the document.",
    detail: "Introspection"
  },
  {
    label: "locate",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "locate(${1:selector})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Determines the location of an element in the document.",
    detail: "Introspection"
  },
  {
    label: "location",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "location",
    
    documentation: "Identifies an element in the document.",
    detail: ""
  },
  {
    label: "location.page",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "location.page()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the page number for this location.",
    detail: "Introspection"
  },
  {
    label: "location.position",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "location.position()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns a dictionary with the page number and the x, y position for this location.",
    detail: "Introspection"
  },
  {
    label: "location.page-numbering",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "location.page-numbering()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the page numbering pattern of the page at this location.",
    detail: "Introspection"
  },
  {
    label: "metadata",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "metadata(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Exposes a value to the query system without producing visible content.",
    detail: "Introspection"
  },
  {
    label: "query",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "query(${1:target})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Finds elements in the document.",
    detail: "Introspection"
  },
  {
    label: "state",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "state",
    
    documentation: "Manages stateful parts of your document.",
    detail: ""
  },
  {
    label: "state",
    kind: monacoInstance.languages.CompletionItemKind.Class,
    insertText: "state",
    
    documentation: "Create a new state identified by a key.",
    detail: ""
  },
  {
    label: "state.get",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "state.get()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Retrieves the value of the state at the current location.",
    detail: "Introspection"
  },
  {
    label: "state.at",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "state.at(${1:selector})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Retrieves the value of the state at the given selector's unique match.",
    detail: "Introspection"
  },
  {
    label: "state.final",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "state.final()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Retrieves the value of the state at the end of the document.",
    detail: "Introspection"
  },
  {
    label: "state.update",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "state.update(${1:update})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Updates the value of the state.",
    detail: "Introspection"
  },
  {
    label: "cbor",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cbor(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a CBOR file.",
    detail: "Data Loading"
  },
  {
    label: "cbor.decode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cbor.decode(${1:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from CBOR bytes.",
    detail: "Data Loading"
  },
  {
    label: "cbor.encode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cbor.encode(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Encode structured data into CBOR bytes.",
    detail: "Data Loading"
  },
  {
    label: "csv",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "csv(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a CSV file.",
    detail: "Data Loading"
  },
  {
    label: "csv.decode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "csv.decode(${1:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a CSV string/bytes.",
    detail: "Data Loading"
  },
  {
    label: "json",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "json(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a JSON file.",
    detail: "Data Loading"
  },
  {
    label: "json.decode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "json.decode(${1:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a JSON string/bytes.",
    detail: "Data Loading"
  },
  {
    label: "json.encode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "json.encode(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Encodes structured data into a JSON string.",
    detail: "Data Loading"
  },
  {
    label: "read",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "read(${1:path})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads plain text or data from a file.",
    detail: "Data Loading"
  },
  {
    label: "toml",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "toml(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a TOML file.",
    detail: "Data Loading"
  },
  {
    label: "toml.decode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "toml.decode(${1:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a TOML string/bytes.",
    detail: "Data Loading"
  },
  {
    label: "toml.encode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "toml.encode(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Encodes structured data into a TOML string.",
    detail: "Data Loading"
  },
  {
    label: "xml",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "xml(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from an XML file.",
    detail: "Data Loading"
  },
  {
    label: "xml.decode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "xml.decode(${1:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from an XML string/bytes.",
    detail: "Data Loading"
  },
  {
    label: "yaml",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "yaml(${1:source})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a YAML file.",
    detail: "Data Loading"
  },
  {
    label: "yaml.decode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "yaml.decode(${1:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Reads structured data from a YAML string/bytes.",
    detail: "Data Loading"
  },
  {
    label: "yaml.encode",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "yaml.encode(${1:value})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Encode structured data into a YAML string.",
    detail: "Data Loading"
  },
  {
    label: "artifact",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "artifact(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Marks content as a PDF artifact.",
    detail: "PDF"
  },
  {
    label: "attach",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "attach(${1:path}, ${2:data})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A file that will be attached to the output PDF.",
    detail: "PDF"
  },
  {
    label: "data-cell",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "data-cell(${1:cell})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Explicitly defines this cell as a data cell.",
    detail: "PDF"
  },
  {
    label: "header-cell",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "header-cell(${1:cell})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Explicitly defines a cell as a header cell.",
    detail: "PDF"
  },
  {
    label: "table-summary",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table-summary(${1:table})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A summary of the purpose and structure of a complex table.",
    detail: "PDF"
  },
  {
    label: "elem",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "elem(${1:tag})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "An HTML element that can contain Typst content.",
    detail: "HTML"
  },
  {
    label: "frame",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "frame(${1:body})",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "An element that lays out its content as an inline SVG.",
    detail: "HTML"
  },
  {
    label: "a",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "a()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Hyperlink.",
    detail: "HTML"
  },
  {
    label: "abbr",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "abbr()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Abbreviation.",
    detail: "HTML"
  },
  {
    label: "address",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "address()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Contact information for a page or article element.",
    detail: "HTML"
  },
  {
    label: "area",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "area()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Hyperlink or dead area on an image map.",
    detail: "HTML"
  },
  {
    label: "article",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "article()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Self-contained syndicatable or reusable composition.",
    detail: "HTML"
  },
  {
    label: "aside",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "aside()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Sidebar for tangentially related content.",
    detail: "HTML"
  },
  {
    label: "audio",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "audio()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Audio player.",
    detail: "HTML"
  },
  {
    label: "b",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "b()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Keywords.",
    detail: "HTML"
  },
  {
    label: "base",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "base()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Base URL and default target navigable for hyperlinks and forms.",
    detail: "HTML"
  },
  {
    label: "bdi",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bdi()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Text directionality isolation.",
    detail: "HTML"
  },
  {
    label: "bdo",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "bdo()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Text directionality formatting.",
    detail: "HTML"
  },
  {
    label: "blockquote",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "blockquote()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A section quoted from another source.",
    detail: "HTML"
  },
  {
    label: "body",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "body()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Document body.",
    detail: "HTML"
  },
  {
    label: "br",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "br()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Line break, e.g. in poem or postal address.",
    detail: "HTML"
  },
  {
    label: "button",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "button()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Button control.",
    detail: "HTML"
  },
  {
    label: "canvas",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "canvas()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Scriptable bitmap canvas.",
    detail: "HTML"
  },
  {
    label: "caption",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "caption()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Table caption.",
    detail: "HTML"
  },
  {
    label: "cite",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "cite()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Title of a work.",
    detail: "HTML"
  },
  {
    label: "code",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "code()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Computer code.",
    detail: "HTML"
  },
  {
    label: "col",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "col()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Table column.",
    detail: "HTML"
  },
  {
    label: "colgroup",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "colgroup()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Group of columns in a table.",
    detail: "HTML"
  },
  {
    label: "data",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "data()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Machine-readable equivalent.",
    detail: "HTML"
  },
  {
    label: "datalist",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "datalist()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Container for options for combo box control.",
    detail: "HTML"
  },
  {
    label: "dd",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dd()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Content for corresponding dt element(s).",
    detail: "HTML"
  },
  {
    label: "del",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "del()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "A removal from the document.",
    detail: "HTML"
  },
  {
    label: "details",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "details()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Disclosure control for hiding details.",
    detail: "HTML"
  },
  {
    label: "dfn",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dfn()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Defining instance.",
    detail: "HTML"
  },
  {
    label: "dialog",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dialog()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Dialog box or window.",
    detail: "HTML"
  },
  {
    label: "div",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "div()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Generic flow container, or container for name-value groups in dl elements.",
    detail: "HTML"
  },
  {
    label: "dl",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dl()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Association list consisting of zero or more name-value groups.",
    detail: "HTML"
  },
  {
    label: "dt",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "dt()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Legend for corresponding dd element(s).",
    detail: "HTML"
  },
  {
    label: "em",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "em()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Stress emphasis.",
    detail: "HTML"
  },
  {
    label: "embed",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "embed()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Plugin.",
    detail: "HTML"
  },
  {
    label: "fieldset",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "fieldset()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Group of form controls.",
    detail: "HTML"
  },
  {
    label: "figcaption",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "figcaption()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Caption for figure.",
    detail: "HTML"
  },
  {
    label: "figure",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "figure()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Figure with optional caption.",
    detail: "HTML"
  },
  {
    label: "footer",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "footer()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Footer for a page or section.",
    detail: "HTML"
  },
  {
    label: "form",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "form()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "User-submittable form.",
    detail: "HTML"
  },
  {
    label: "h1",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "h1()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Heading.",
    detail: "HTML"
  },
  {
    label: "h2",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "h2()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Heading.",
    detail: "HTML"
  },
  {
    label: "h3",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "h3()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Heading.",
    detail: "HTML"
  },
  {
    label: "h4",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "h4()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Heading.",
    detail: "HTML"
  },
  {
    label: "h5",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "h5()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Heading.",
    detail: "HTML"
  },
  {
    label: "h6",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "h6()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Heading.",
    detail: "HTML"
  },
  {
    label: "head",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "head()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Container for document metadata.",
    detail: "HTML"
  },
  {
    label: "header",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "header()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Introductory or navigational aids for a page or section.",
    detail: "HTML"
  },
  {
    label: "hgroup",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "hgroup()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Heading container.",
    detail: "HTML"
  },
  {
    label: "hr",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "hr()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Thematic break.",
    detail: "HTML"
  },
  {
    label: "html",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "html()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Root element.",
    detail: "HTML"
  },
  {
    label: "i",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "i()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Alternate voice.",
    detail: "HTML"
  },
  {
    label: "iframe",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "iframe()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Child navigable.",
    detail: "HTML"
  },
  {
    label: "img",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "img()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Image.",
    detail: "HTML"
  },
  {
    label: "input",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "input()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Form control.",
    detail: "HTML"
  },
  {
    label: "ins",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ins()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "An addition to the document.",
    detail: "HTML"
  },
  {
    label: "kbd",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "kbd()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "User input.",
    detail: "HTML"
  },
  {
    label: "label",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "label()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Caption for a form control.",
    detail: "HTML"
  },
  {
    label: "legend",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "legend()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Caption for fieldset.",
    detail: "HTML"
  },
  {
    label: "li",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "li()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "List item.",
    detail: "HTML"
  },
  {
    label: "link",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "link()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Link metadata.",
    detail: "HTML"
  },
  {
    label: "main",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "main()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Container for the dominant contents of the document.",
    detail: "HTML"
  },
  {
    label: "map",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "map()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Image map.",
    detail: "HTML"
  },
  {
    label: "mark",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "mark()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Highlight.",
    detail: "HTML"
  },
  {
    label: "menu",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "menu()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Menu of commands.",
    detail: "HTML"
  },
  {
    label: "meta",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "meta()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Text metadata.",
    detail: "HTML"
  },
  {
    label: "meter",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "meter()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Gauge.",
    detail: "HTML"
  },
  {
    label: "nav",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "nav()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Section with navigational links.",
    detail: "HTML"
  },
  {
    label: "noscript",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "noscript()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Fallback content for script.",
    detail: "HTML"
  },
  {
    label: "object",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "object()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Image, child navigable, or plugin.",
    detail: "HTML"
  },
  {
    label: "ol",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ol()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Ordered list.",
    detail: "HTML"
  },
  {
    label: "optgroup",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "optgroup()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Group of options in a list box.",
    detail: "HTML"
  },
  {
    label: "option",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "option()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Option in a list box or combo box control.",
    detail: "HTML"
  },
  {
    label: "output",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "output()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Calculated output value.",
    detail: "HTML"
  },
  {
    label: "p",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "p()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Paragraph.",
    detail: "HTML"
  },
  {
    label: "picture",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "picture()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Image.",
    detail: "HTML"
  },
  {
    label: "pre",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "pre()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Block of preformatted text.",
    detail: "HTML"
  },
  {
    label: "progress",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "progress()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Progress bar.",
    detail: "HTML"
  },
  {
    label: "q",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "q()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Quotation.",
    detail: "HTML"
  },
  {
    label: "rp",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "rp()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Parenthesis for ruby annotation text.",
    detail: "HTML"
  },
  {
    label: "rt",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "rt()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Ruby annotation text.",
    detail: "HTML"
  },
  {
    label: "ruby",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ruby()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Ruby annotation(s).",
    detail: "HTML"
  },
  {
    label: "s",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "s()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Inaccurate text.",
    detail: "HTML"
  },
  {
    label: "samp",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "samp()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Computer output.",
    detail: "HTML"
  },
  {
    label: "script",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "script()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Embedded script.",
    detail: "HTML"
  },
  {
    label: "search",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "search()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Container for search controls.",
    detail: "HTML"
  },
  {
    label: "section",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "section()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Generic document or application section.",
    detail: "HTML"
  },
  {
    label: "select",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "select()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "List box control.",
    detail: "HTML"
  },
  {
    label: "slot",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "slot()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Shadow tree slot.",
    detail: "HTML"
  },
  {
    label: "small",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "small()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Side comment.",
    detail: "HTML"
  },
  {
    label: "source",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "source()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Image source for img or media source for video or audio.",
    detail: "HTML"
  },
  {
    label: "span",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "span()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Generic phrasing container.",
    detail: "HTML"
  },
  {
    label: "strong",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "strong()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Importance.",
    detail: "HTML"
  },
  {
    label: "style",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "style()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Embedded styling information.",
    detail: "HTML"
  },
  {
    label: "sub",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sub()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Subscript.",
    detail: "HTML"
  },
  {
    label: "summary",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "summary()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Caption for details.",
    detail: "HTML"
  },
  {
    label: "sup",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "sup()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Superscript.",
    detail: "HTML"
  },
  {
    label: "table",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "table()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Table.",
    detail: "HTML"
  },
  {
    label: "tbody",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "tbody()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Group of rows in a table.",
    detail: "HTML"
  },
  {
    label: "td",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "td()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Table cell.",
    detail: "HTML"
  },
  {
    label: "template",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "template()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Template.",
    detail: "HTML"
  },
  {
    label: "textarea",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "textarea()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Multiline text controls.",
    detail: "HTML"
  },
  {
    label: "tfoot",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "tfoot()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Group of footer rows in a table.",
    detail: "HTML"
  },
  {
    label: "th",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "th()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Table header cell.",
    detail: "HTML"
  },
  {
    label: "thead",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "thead()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Group of heading rows in a table.",
    detail: "HTML"
  },
  {
    label: "time",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "time()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Machine-readable equivalent of date- or time-related data.",
    detail: "HTML"
  },
  {
    label: "title",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "title()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Document title.",
    detail: "HTML"
  },
  {
    label: "tr",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "tr()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Table row.",
    detail: "HTML"
  },
  {
    label: "track",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "track()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Timed text track.",
    detail: "HTML"
  },
  {
    label: "u",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "u()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Unarticulated annotation.",
    detail: "HTML"
  },
  {
    label: "ul",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "ul()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "List.",
    detail: "HTML"
  },
  {
    label: "var",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "var()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Variable.",
    detail: "HTML"
  },
  {
    label: "video",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "video()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Video player.",
    detail: "HTML"
  },
  {
    label: "wbr",
    kind: monacoInstance.languages.CompletionItemKind.Function,
    insertText: "wbr()",
    insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Line breaking opportunity.",
    detail: "HTML"
  }
];
