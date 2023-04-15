// 导入VS Code的命名空间
import * as vscode from 'vscode';

// 定义插件的激活函数
export function activate(context: vscode.ExtensionContext) {
console.log(666666666);

  // 注册一个命令，该命令会在用户执行特定操作时被调用
  let disposable = vscode.commands.registerCommand('insertConsoleLog', () => {
    // 获取当前编辑器的选区
    const editor = vscode.window.activeTextEditor;
    if (editor) {
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
      const keywordMatch = lineText.match(/\b(let|var|const)\b/);
      const variable = keywordMatch ? lineText.match(/\b\w+\b(?=\s*[=;])/) : null;
      // 根据变量定义和缩进的信息，插入console.log语句
      editor.edit((editBuilder) => {
        if (variable) {
          editBuilder.insert(new vscode.Position(line + 1, 0), `${indent}console.log(${variable[0]})\n`);
        } else {;
          text && editBuilder.insert(new vscode.Position(line + 1, 0), `${indent}console.log(${text})\n`);
        }
      });
    }
  });

    // 将注册的命令添加到插件的订阅列表中，以便在插件被禁用时自动注销该命令
    context.subscriptions.push(disposable);

    // Register keybindings
    let insertCommand = 'insertConsoleLog';
    if (process.platform === 'darwin') {
        insertCommand += 'Mac';
    } else {
        insertCommand += 'Windows';
    }
    context.subscriptions.push(vscode.commands.registerCommand(insertCommand, () => {
        vscode.commands.executeCommand('insertConsoleLog');
    }));

}

