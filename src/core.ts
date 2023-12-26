import * as vscode from "vscode";

let supportedLangs = [
  "javascript",
  "typescript",
  "javascriptreact", // jsx
  "typescriptreact", // tsx
  "vue",
];

export const insertConsoleLog = () => {
  
  // 获取当前编辑器的选区
  const editor = vscode.window.activeTextEditor;
  if (editor && supportedLangs.includes(editor.document.languageId)) {
    // 获取选中文本
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    // 获取当前选区的行数和列数
    const line = selection.active.line;
    //   const column = selection.active.character;
    // 获取当前行的缩进，用于在插入console.log语句时保留原有缩进
    const indentMatch = editor.document.lineAt(line).text.match(/^\s*/);
    const indent = indentMatch ? indentMatch[0] : "";
    // 获取当前行的文本，用于判断当前行是否有变量定义
    const lineText = editor.document.lineAt(line).text;
    // 通过正则表达式匹配当前行的变量定义
    const variable = lineText.match(
      /\b(let|var|const)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/
    );
    // 根据变量定义和缩进的信息，插入console.log语句
    editor.edit((editBuilder) => {
      // 优先选中文本
      if (text) {
      console.log('text:', text)
        editBuilder.insert(
          new vscode.Position(line + 1, 0),
          `${indent}console.log('${text}:', ${text})\n`
        );
      } else {
        if (variable) {
          editBuilder.insert(
            new vscode.Position(line + 1, 0),
            `${indent}console.log('${variable[2]}:', ${variable[2]})\n`
          );
        }
      }
    });
  }
};

// export const deleteAllConsoleLog = () => {
//   console.log('delete all console.log');
  
//   const editor = vscode.window.activeTextEditor;
//   if (editor) {
//     const document = editor.document;
//     const deleteEdits: vscode.TextEdit[] = [];

//     for (let i = 0; i < document.lineCount; i++) {
//       const line = document.lineAt(i);
//       if (line.text.includes('console.log')) {
//         const start = new vscode.Position(i, line.text.indexOf('console.log'));
//         const end = new vscode.Position(i, line.range.end.character);
//         const range = new vscode.Range(start, end);
//         const deleteEdit = vscode.TextEdit.delete(range);
//         deleteEdits.push(deleteEdit);
//       }
//     }

//     editor.edit(builder => {
//       for (const deleteEdit of deleteEdits) {
//         builder.replace(deleteEdit.range, deleteEdit.newText);
//       }
//     });
//   }
// };


export const deleteAllConsoleLog = () => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    // 获取当前文档
    const document = editor.document; 
    // 创建空数组，用于存储删除操作
    const deleteEdits: vscode.TextEdit[] = [];
    // 遍历文档的每一行
    for (let i = 0; i < document.lineCount; i++) {
      // 获取当前行的 line 对象
      const line = document.lineAt(i); 
      // 检查当前行的内容是否包含 'console.log'
      if (line.text.includes('console.log')) { 
        // 获取当前行的范围，包括整行和换行符
        const range = line.rangeIncludingLineBreak;
        // 创建删除操作
        const deleteEdit = vscode.TextEdit.delete(range);
         // 将删除操作添加到 deleteEdits 数组中
        deleteEdits.push(deleteEdit);
      }
    }

    editor.edit(builder => { // 在编辑器中进行编辑操作
      deleteEdits.forEach(deleteEdit => { // 遍历 deleteEdits 数组
      console.log('deleteEdit:', deleteEdit)
        builder.replace(deleteEdit.range, deleteEdit.newText); // 执行删除操作
      });
    });
  }
};