"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// 导入VS Code的命名空间
const vscode = require("vscode");
const core_1 = require("./core");
// 定义插件的激活函数
function activate(context) {
    // 注册一个命令，该命令会在用户执行特定操作时被调用
    let disposable = vscode.commands.registerCommand('insertConsoleLog', core_1.insertConsoleLog);
    // 将注册的命令添加到插件的订阅列表中，以便在插件被禁用时自动注销该命令
    context.subscriptions.push(disposable);
    // Register keybindings
    let insertCommand = 'insertConsoleLog';
    if (process.platform === 'darwin') {
        insertCommand += 'Mac';
    }
    else {
        insertCommand += 'Windows';
    }
    context.subscriptions.push(vscode.commands.registerCommand(insertCommand, () => {
        vscode.commands.executeCommand('insertConsoleLog');
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map