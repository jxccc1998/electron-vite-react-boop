class BrowserRuntimeVM {
  private iframe: HTMLIFrameElement | null = null;

  constructor() {
    this.iframe = document.createElement("iframe");
    this.iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
    this.iframe.style.display = "none";
    document.documentElement.appendChild(this.iframe);
  }

  public execute(code: string, globalScope: any) {
    try {
      return this.executeCode(code, globalScope);
    } catch (err) {
      return {
          content: err, type: 'ERROR',
      };
    }
  }

  // scope注入全局环境变量，参数等
  private executeCode(code: string, scope: any) {
    const sandbox: any = this.iframe?.contentWindow;
    sandbox.__INJECT_VARS__ = scope

      const wrapCode = `
        ${code}
        return main();
      `

      return sandbox.eval(`
          (() => {
              with(window.__INJECT_VARS__) {
                ${wrapCode}
              }
          })()
        `);
  }
}

export const browserRuntimeVM = window ? new BrowserRuntimeVM() : null;
