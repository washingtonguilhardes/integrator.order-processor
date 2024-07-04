export abstract class SyncOrder {
  abstract execute(file: Buffer): void;
}

export const SyncOrderServiceKey = Symbol('SyncOrder');
