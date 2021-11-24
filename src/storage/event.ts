import {FastEvent} from '../helpers';
import {MMRRootSignedEvent} from '../types';

export async function storeMMRRootSignedEvent(event: FastEvent) {
  logger.info(`EVENT DATA: ${JSON.stringify(event.raw.event.data)}`);

  const _event = new MMRRootSignedEvent(event.id);
  _event.block_number = event.blockNumber;
  _event.blockId = event.blockHash;
  _event.timestamp = event.timestamp;
  _event.mmr_root = 'x';
  _event.signatures = 'x';
  await _event.save();
}
