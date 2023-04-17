import { ProposalPermission } from '../generated/types/trail/proposal/proposal.api.pb';
import { Proposal } from '../generated/types/trail/proposal/proposal.pb';

/** Packages the information related to a proposal. */
export interface ProposalInfo {
  proposal: Proposal;
  permissions: readonly ProposalPermission[];
}

/** Allowed proposal view modes. */
export enum ProposalViewMode {
  EDIT = 1,
  REVIEW = 2,
}

/** Represents a crop of an svg image. */
export interface SvgData {
  element: string;
  cropPoint1: { x: number; y: number };
  cropPoint2: { x: number; y: number };
  canvasWidth: number;
  canvasHeight: number;
}
