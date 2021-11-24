import {BlockHandler} from './block';
import {FastEvent} from '../helpers';
import * as storage from '../storage';

export class EventHandler {
  private readonly event: FastEvent;

  constructor(event: FastEvent) {
    this.event = event;
  }

  public async save() {
    await BlockHandler.ensureBlock(this.event.blockHash);

    const eventId = this.event.id;
    const eventSection = this.event.section;
    const eventMethod = this.event.method;
    const blockNumber = this.event.blockNumber;
    logger.info(`[event] Received event: [${eventSection}:${eventMethod}] [${eventId}] in block ${blockNumber}`);
    switch (eventMethod) {
      case 'MMRRootSigned': {
        await storage.storeMMRRootSignedEvent(this.event);
        return;
      }
      default: {
        // logger.info(`[event] Discard event: ${eventMethod} in block ${blockNumber}`);
      }
    }

  }
}
