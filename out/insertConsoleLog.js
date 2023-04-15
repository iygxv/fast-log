"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.insertConsoleLog', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        if (!text) {
            return;
        }
        const line = editor.document.lineAt(selection.start.line);
        const column = line.firstNonWhitespaceCharacterIndex;
        let insertPosition;
        let insertText;
        if (line.isEmptyOrWhitespace) {
            insertPosition = new vscode.Position(selection.start.line, column);
            insertText = `console.log(${text});\n`;
        }
        else {
            insertPosition = new vscode.Position(selection.start.line + 1, column);
            insertText = `\nconsole.log(${text});`;
        }
        editor.edit((editBuilder) => {
            editBuilder.insert(insertPosition, insertText);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=insertConsoleLog.js.map