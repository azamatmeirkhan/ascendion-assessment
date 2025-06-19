export type SecureWordSession = {
    secureWord: string;
    issuedAt: number;
};
  
declare global {
    var secureWordStore: Map<string, SecureWordSession> | undefined;
    var rateLimitMap: Map<string, number> | undefined;
    var mfaAttempts: Map<string, number> | undefined;
}
  
if (!global.secureWordStore) {
    global.secureWordStore = new Map();
    global.rateLimitMap = new Map();
    global.mfaAttempts = new Map();
}

export const secureWordStore = global.secureWordStore!;
export const rateLimitMap = global.rateLimitMap!;
export const mfaAttempts = global.mfaAttempts!;