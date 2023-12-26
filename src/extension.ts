import * as vscode from 'vscode';
import { insertConsoleLog, deleteAllConsoleLog } from './core';


export function activate(context: vscode.ExtensionContext) {

  const commands: Array<{
    command: string;
    callback: (...args: any[]) => any;
    keybinding?: string;
  }> = [
    { command: 'insertConsoleLog', callback: insertConsoleLog },
    { command: 'deleteAllConsoleLog', callback: deleteAllConsoleLog },
  ];


  for (const cmd of commands) {
    const disposable = vscode.commands.registerCommand(
      cmd.command,
      cmd.callback
    );
    context.subscriptions.push(disposable);

    const insertCommand = cmd.command + (process.platform === 'darwin' ? 'Mac' : 'Windows');

    context.subscriptions.push(
      vscode.commands.registerCommand(insertCommand, cmd.callback)
    );
    }
}
