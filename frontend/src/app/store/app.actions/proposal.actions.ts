import { createAction, props } from '@ngrx/store';
import {
  ProposalPermission,
  WriteProposalRequest,
  WriteShareProposalRequest,
} from '../../generated/types/trail/proposal/proposal.api.pb';
import { Proposal } from '../../generated/types/trail/proposal/proposal.pb';
import { ProposalViewMode } from '../app.model';
import { WriteProposalReviewRequest } from 'src/app/generated/types/trail/proposal/review.api.pb';
import { ProposalReview } from 'src/app/generated/types/trail/proposal/review.pb';
import { User } from 'src/app/generated/types/account/user/user.pb';

export const resetAndLoadJGraphDiagram = createAction(
  '[App Store] reset jgraph diagram'
);

export const setProposalViewMode = createAction(
  '[App Store] set proposal view mode',
  props<{
    mode: ProposalViewMode;
  }>()
);

export const updateGraphCursorImage = createAction(
  '[App Store] update graph cursor image'
);

export const uploadProposal = createAction(
  '[App Store] upload  proposal',
  props<{ proposalData: WriteProposalRequest }>()
);

export const uploadShareProposalRequest = createAction(
  '[App Store] upload share proposal request',
  props<{ request: WriteShareProposalRequest }>()
);

export const uploadNewProposalReview = createAction(
  '[App Store] upload new proposal review',
  props<{ reviewRequest: WriteProposalReviewRequest }>()
);

export const uploadUpdatedProposalReview = createAction(
  '[App Store] upload updated proposal review',
  props<{ reviewRequest: WriteProposalReviewRequest; reviewId: string }>()
);

export const fetchProposalList = createAction(
  '[App Store] fetch proposal list'
);

export const setProposalList = createAction(
  '[App Store] set proposal list',
  props<{
    proposals: readonly Proposal[];
    userPermissions: readonly ProposalPermission[];
  }>()
);

export const updateStateProposalList = createAction(
  '[App Store] update state proposal list',
  props<{
    proposals: readonly Proposal[];
    userPermissions: readonly ProposalPermission[];
  }>()
);

export const fetchProposal = createAction(
  '[App Store] fetch a proposal',
  props<{ proposalId: string }>()
);

export const refreshSelectedProposal = createAction(
  '[App Store] refresh a proposal',
  props<{ showAlert?: boolean }>()
);

export const deleteProposal = createAction(
  '[App Store] delete a proposal',
  props<{ proposalId: string }>()
);

export const removeDeletedProposal = createAction(
  '[App Store] remove deleted a proposal',
  props<{ proposalId: string }>()
);

export const setProposal = createAction(
  '[App Store] set a proposal',
  props<{
    refreshCanvas: boolean;
    proposal: Proposal;
    allPermissions: readonly ProposalPermission[];
  }>()
);

export const updateProposal = createAction(
  '[App Store] update a proposal',
  props<{
    proposal: Proposal;
    allPermissions: readonly ProposalPermission[];
  }>()
);

export const addProposal = createAction(
  '[App Store] add a proposal',
  props<{
    proposal: Proposal;
    allPermissions: readonly ProposalPermission[];
  }>()
);

export const setSelectedProposalId = createAction(
  '[App Store] selects a proposal id',
  props<{
    proposalId?: string;
  }>()
);

export const loadProposalDiagram = createAction(
  '[App Store] load proposal diagram',
  props<{
    proposal: Proposal;
  }>()
);

export const setSelectedProposalReviews = createAction(
  '[App Store] set selected proposal reviews',
  props<{
    reviews: readonly ProposalReview[];
    users: readonly User[];
  }>()
);

export const fetchSelectedProposalReviews = createAction(
  '[App Store] fetch selected proposal reviews'
);

export const resetSelectedProposalReviews = createAction(
  '[App Store] reset selected proposal reviews'
);

export const openJGraphRenameProposal = createAction(
  '[App Store] open jgraph rename proposal'
);

export const handleAutosaveRequest = createAction(
  '[App Store] handle autosave request'
);

export const registerSaving = createAction('[App Store] register saving');

export const unregisterSaving = createAction('[App Store] unregister saving');

export const setIsAutosaveActive = createAction(
  '[App Store] set is autosave active',
  props<{
    isActive: boolean;
  }>()
);
