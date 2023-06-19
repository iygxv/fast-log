"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertConsoleLog = void 0;
const vscode = require("vscode");
let supportedLangs = [
    'javascript',
    'typescript',
    'javascriptreact',
    'typescriptreact',
    'vue'
];
const insertConsoleLog = () => {
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
        const indent = indentMatch ? indentMatch[0] : '';
        // 获取当前行的文本，用于判断当前行是否有变量定义
        const lineText = editor.document.lineAt(line).text;
        // 通过正则表达式匹配当前行的变量定义
        const variable = lineText.match(/\b(let|var|const)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/);
        // 根据变量定义和缩进的信息，插入console.log语句
        editor.edit((editBuilder) => {
            if (variable) {
                editBuilder.insert(new vscode.Position(line + 1, 0), `${indent}console.log('${variable[2]}:', ${variable[2]})\n`);
            }
            else {
                ;
                text && editBuilder.insert(new vscode.Position(line + 1, 0), `${indent}console.log('${text}:', ${text})\n`);
            }
        });
    }
};
exports.insertConsoleLog = insertConsoleLog;
//# sourceMappingURL=core.js.map