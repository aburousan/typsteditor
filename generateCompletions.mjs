import fs from 'fs';

const apiData = JSON.parse(fs.readFileSync('/Users/kaziaburousan/.gemini/skills/typst/data/api.json', 'utf-8'));

let completions = [];

apiData.forEach((item) => {
  if (item.kind === 'function' || item.kind === 'method') {
    let insertText = item.name;
    let snippet = item.name + '(';
    let params = item.params || [];
    let i = 1;
    let snippetArgs = [];
    
    for (const p of params) {
      if (p.required) {
        snippetArgs.push('${' + i + ':' + p.name + '}');
        i++;
      }
    }
    snippet += snippetArgs.join(', ') + ')';
    
    completions.push({
      label: item.name,
      kind: 'Function',
      insertText: snippet,
      insertTextRules: 'InsertAsSnippet',
      documentation: item.oneliner || '',
      detail: item.category || ''
    });
  } else if (item.kind === 'type' || item.kind === 'constructor') {
    completions.push({
      label: item.name,
      kind: 'Class',
      insertText: item.name,
      documentation: item.oneliner || ''
    });
  }
});

const tsCode = `import * as monaco from 'monaco-editor';

export const typstCompletions = (monacoInstance: typeof monaco) => [
${completions.map(c => `  {
    label: ${JSON.stringify(c.label)},
    kind: monacoInstance.languages.CompletionItemKind.${c.kind},
    insertText: ${JSON.stringify(c.insertText)},
    ${c.insertTextRules ? `insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.${c.insertTextRules},` : ''}
    documentation: ${JSON.stringify(c.documentation)},
    detail: ${JSON.stringify(c.detail || '')}
  }`).join(',\n')}
];
`;

fs.writeFileSync('src/typstCompletions.ts', tsCode);
console.log('Successfully generated typstCompletions.ts with', completions.length, 'items');
