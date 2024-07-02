export interface SyncOrder {
  execute(file: Buffer): void;
}

export const SyncOrderServiceKey = Symbol('SyncOrder');
