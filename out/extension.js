"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const core_1 = require("./core");
function activate(context) {
    const commands = [
        { command: 'insertConsoleLog', callback: core_1.insertConsoleLog },
        { command: 'deleteAllConsoleLog', callback: core_1.deleteAllConsoleLog },
    ];
    for (const cmd of commands) {
        const disposable = vscode.commands.registerCommand(cmd.command, cmd.callback);
        context.subscriptions.push(disposable);
        if (cmd.keybinding) {
            const insertCommand = cmd.keybinding + (process.platform === 'darwin' ? 'Mac' : 'Windows');
            context.subscriptions.push(vscode.commands.registerCommand(insertCommand, cmd.callback));
        }
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map