export interface SyncOrder {
  execute(file: Buffer): void;
}

export const SyncOrder = Symbol('SyncOrder');
