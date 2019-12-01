'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: "mynote" }, new FooDocumentSymbolProvider()));
}
exports.activate = activate;
class FooDocumentSymbolProvider {
    provideDocumentSymbols(document, token) {
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
                    });
                }
            }
            resolve(symbols);
        });
    }
}
//# sourceMappingURL=extension.js.map