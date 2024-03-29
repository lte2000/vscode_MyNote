'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(
        {language: "mynote"}, new FooDocumentSymbolProvider()
    ));
}

class FooDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    public provideDocumentSymbols(document: vscode.TextDocument,
            token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
        return new Promise((resolve, reject) => {
            var symbols = [];

            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);
                if (line.text.startsWith(">>>>")) {
                    symbols.push({
                        name: line.text.substr(4),
                        kind: vscode.SymbolKind.Field,
						location: new vscode.Location(document.uri, line.range),
						containerName: ""

                    })
                }
            }

            resolve(symbols);
        });
    }
}