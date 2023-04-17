// 导入VS Code的命名空间
import * as vscode from 'vscode';
import { insertConsoleLog } from './core'
// 定义插件的激活函数
export function activate(context: vscode.ExtensionContext) {
  // 注册一个命令，该命令会在用户执行特定操作时被调用
  let disposable = vscode.commands.registerCommand('insertConsoleLog', insertConsoleLog);
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

