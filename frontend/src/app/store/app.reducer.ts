import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  setProposalList,
  setProposal,
  updateStateProposalList,
  addProposal,
  setSelectedProposalId,
  updateProposal,
  removeDeletedProposal,
  setProposalViewMode,
  setSelectedProposalReviews,
  resetSelectedProposalReviews,
  registerSaving,
  unregisterSaving,
  setIsAutosaveActive,
} from './app.actions/proposal.actions';
import {
  resetDraftComment,
  setDraftCommentThread,
  setDraftCommentMessage,
  setSelectedProposalCommentThreads,
  setSelectedCommentThread,
  resetSelectedCommentThread,
  setSelectedCommentThreadMessages,
  removeDeletedCommentThreadAndMessages,
  removeDeletedCommentMessage,
  addNewThreadWithMessage,
} from './app.actions/message.actions';
import { User as FireAuthUser } from 'firebase/auth';
import { User } from '../generated/types/account/user/user.pb';
import { Team } from '../generated/types/account/team/team.pb';
import { Client } from '../generated/types/account/client/client.pb';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProposalViewMode, ProposalInfo } from './app.model';

import { WriteCommentThreadRequest } from '../generated/types/trail/comment/thread-api.pb';
import { WriteCommentMessageRequest } from '../generated/types/trail/comment/message-api.pb';
import {
  CommentThread,
  CommentThread_Type,
} from '../generated/types/trail/comment/thread.pb';
import { user } from '@angular/fire/auth';
import { CommentMessage } from '../generated/types/trail/comment/message.pb';
import { PermissionOp } from '../generated/types/permission.pb';
import { registerLoading, unregisterLoading } from './app.actions/app.actions';
import {
  setDtOrg,
  setDtTeam,
  setDtUser,
  setFireAuthUserData,
} from './app.actions/account.actions';
import { ProposalReview } from '../generated/types/trail/proposal/review.pb';
import * as fromRouter from '@ngrx/router-store';
import { IsCreatePage, QueryParamKey } from '../shared/route/query-params';

export const APP_STORE = 'APP_STORE';
export const COMPOSE_PATH = '/compose';
export const COMMENT_THREAD_DEFAULT_TYPE = CommentThread_Type.QUESTION;
type id = string;

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export interface AppStore extends EntityState<ProposalInfo> {
  registeredLoading: number;
  registeredSaving: number;
  fireAuthUserData: Partial<FireAuthUser> | null;
  dtUser: User | null;
  dtUserRegistry: Record<string, User>;
  dtTeam: Team;
  dtOrg: Client;
  selectedProposalId: string;
  proposalViewMode: ProposalViewMode;
  draftCommentThread: WriteCommentThreadRequest;
  draftCommentMessage: WriteCommentMessageRequest;
  selectedProposalReviews: readonly ProposalReview[];
  selectedProposalCommentThreads: readonly CommentThread[];
  selectedCommentThread: CommentThread;
  commentThreadMessages: Record<id, readonly CommentMessage[]>;
  isAutosaveActive: boolean;
  avatarColor: string;
}

export const adapter: EntityAdapter<ProposalInfo> =
  createEntityAdapter<ProposalInfo>({
    selectId: (proposalInfo: ProposalInfo) => proposalInfo.proposal.id!,
    sortComparer: (pInfo1: ProposalInfo, pInfo2: ProposalInfo) => {
      return (
        new Date(pInfo2.proposal.createdAt as Date).getTime() -
        new Date(pInfo1.proposal.createdAt as Date).getTime()
      );
    },
  });
export const initialState: Partial<AppStore> = adapter.getInitialState({
  draftCommentThread: WriteCommentThreadRequest.fromPartial({
    type: COMMENT_THREAD_DEFAULT_TYPE,
  }),
  dtUserRegistry: {},
  commentThreadMessages: {},
  avatarColor: '#ff914d',
});

export const appStoreReducer = createReducer(
  initialState,
  on(registerLoading, (state) => ({
    ...state,
    registeredLoading: (state.registeredLoading ?? 0) + 1,
  })),
  on(unregisterLoading, (state) => ({
    ...state,
    registeredLoading: (state.registeredLoading ?? 1) - 1,
  })),
  on(registerSaving, (state) => ({
    ...state,
    registeredSaving: (state.registeredLoading ?? 0) + 1,
  })),
  on(unregisterSaving, (state) => ({
    ...state,
    registeredSaving: (state.registeredLoading ?? 1) - 1,
  })),
  on(setFireAuthUserData, (state, action) => ({
    ...state,
    fireAuthUserData: action.fireAuthUserData,
  })),
  on(setDtUser, (state, action) => {
    const update = {
      ...state,
      dtUser: action.dtUser,
      dtUserRegistry: addUsersToRecord(state.dtUserRegistry, [action.dtUser]),
      avatarColor: getAvatarColor(),
    };
    if (!action.dtUser)
      return {
        ...initialState,
        fireAuthUserData: state.fireAuthUserData,
        dtUser: action.dtUser,
        avatarColor: getAvatarColor(),
      };
    else return update;
  }),
  on(setDtTeam, (state, action) => ({
    ...state,
    dtTeam: action.dtTeam,
  })),
  on(setDtOrg, (state, action) => ({
    ...state,
    dtOrg: action.dtOrg,
  })),
  on(setIsAutosaveActive, (state, action) => ({
    ...state,
    isAutosaveActive: action.isActive,
  })),
  on(setProposalViewMode, (state, action) => {
    return {
      ...state,
      proposalViewMode: action.mode,
    };
  }),
  on(setDraftCommentThread, (state, action) => ({
    ...state,
    draftCommentThread: action.thread,
  })),
  on(setDraftCommentMessage, (state, action) => ({
    ...state,
    draftCommentMessage: action.message,
  })),
  on(resetDraftComment, (state) => ({
    ...state,
    draftCommentMessage: undefined,
    draftCommentThread: WriteCommentThreadRequest.fromPartial({
      type: COMMENT_THREAD_DEFAULT_TYPE,
    }),
  })),
  on(setSelectedProposalCommentThreads, (state, action) => {
    const selectedProposalCommentThreads = action.threads;
    const selectedCommentThread = selectedProposalCommentThreads[0];
    const dtUserRegistry = addUsersToRecord(
      state.dtUserRegistry,
      action.creators
    );
    const commentThreadMessages = { ...state.commentThreadMessages };
    for (const thread of selectedProposalCommentThreads) {
      const messages = action.messages.filter(
        (message) => message.commentThreadId === thread.id
      );
      commentThreadMessages[thread.id!] = messages;
    }
    return {
      ...state,
      selectedProposalCommentThreads,
      selectedCommentThread,
      dtUserRegistry,
      commentThreadMessages,
    };
  }),
  on(setSelectedCommentThread, (state, action) => ({
    ...state,
    selectedCommentThread: action.thread,
  })),
  on(resetSelectedCommentThread, (state) => ({
    ...state,
    selectedCommentThread: undefined,
  })),
  on(addNewThreadWithMessage, (state, action) => {
    const selectedProposalCommentThreads = [
      action.thread,
      ...(state.selectedProposalCommentThreads || []),
    ];
    const selectedCommentThread = action.thread;
    const commentThreadMessages = { ...state.commentThreadMessages };
    commentThreadMessages[action.thread.id!] = [action.message];
    return {
      ...state,
      selectedProposalCommentThreads,
      selectedCommentThread,
      commentThreadMessages,
    };
  }),
  on(setSelectedCommentThreadMessages, (state, action) => {
    if (!state.selectedCommentThread?.id) return state;
    const dtUserRegistry = addUsersToRecord(
      state.dtUserRegistry,
      action.creators
    );
    const commentThreadMessages = { ...state.commentThreadMessages };
    commentThreadMessages[state.selectedCommentThread.id] = action.messages;
    return { ...state, commentThreadMessages, dtUserRegistry };
  }),
  on(setSelectedProposalReviews, (state, action) => ({
    ...state,
    selectedProposalReviews: action.reviews,
    dtUserRegistry: addUsersToRecord(state.dtUserRegistry, action.users),
  })),
  on(resetSelectedProposalReviews, (state) => ({
    ...state,
    selectedProposalReviews: undefined,
  })),
  on(setProposalList, (state, action) => {
    const proposalInfos: ProposalInfo[] = action.proposals.map((proposal) => ({
      proposal,
      permissions: action.userPermissions.filter(
        (proposalPermission) => proposalPermission.proposalId === proposal.id
      ),
    }));
    return {
      ...adapter.setMany(proposalInfos, state as EntityState<ProposalInfo>),
      dtUserRegistry: addUsersToRecord(
        state.dtUserRegistry,
        action.userPermissions.map((permission) => permission.user!)
      ),
    };
  }),
  on(updateStateProposalList, (state, action) => {
    const proposalInfos: ProposalInfo[] = action.proposals.map((proposal) => ({
      proposal,
      permissions: action.userPermissions,
    }));
    return adapter.updateMany(
      proposalInfos.map((proposalInfo) => ({
        id: proposalInfo.proposal.id!,
        changes: proposalInfo,
      })),
      state as EntityState<ProposalInfo>
    );
  }),
  on(setProposal, (state, action) => {
    const proposalInfo: ProposalInfo = {
      proposal: action.proposal,
      permissions: action.allPermissions,
    };
    return adapter.setOne(proposalInfo, state as EntityState<ProposalInfo>);
  }),
  on(updateProposal, (state, action) => {
    const proposalInfo: ProposalInfo = {
      proposal: action.proposal,
      permissions: action.allPermissions,
    };
    return adapter.updateOne(
      { id: proposalInfo.proposal.id!, changes: proposalInfo },
      state as EntityState<ProposalInfo>
    );
  }),
  on(addProposal, (state, action) => {
    const proposalInfo: ProposalInfo = {
      proposal: action.proposal,
      permissions: action.allPermissions,
    };
    return adapter.addOne(proposalInfo, state as EntityState<ProposalInfo>);
  }),
  on(removeDeletedProposal, (state, action) => {
    return adapter.removeOne(
      action.proposalId,
      state as EntityState<ProposalInfo>
    );
  }),
  on(removeDeletedCommentThreadAndMessages, (state, action) => {
    const index = state.selectedProposalCommentThreads!.findIndex(
      (thread) => thread.id === action.threadId
    );
    let threads: CommentThread[] = [...state.selectedProposalCommentThreads!];
    if (index >= 0) {
      threads.splice(index, 1);
    }
    return {
      ...state,
      selectedProposalCommentThreads: threads as ReadonlyArray<CommentThread>,
    };
  }),
  on(removeDeletedCommentMessage, (state, action) => {
    const threadOfDeletedMessage = [
      ...state.commentThreadMessages![action.threadId],
    ];
    const index = threadOfDeletedMessage!.findIndex(
      (message) => message.id === action.messageId
    );
    if (index >= 0) {
      threadOfDeletedMessage.splice(index, 1);
    }
    const record = { ...state.commentThreadMessages };
    record[action.threadId] = threadOfDeletedMessage;
    return {
      ...state,
      commentThreadMessages: record,
    };
  }),
  on(setSelectedProposalId, (state, action) => ({
    ...state,
    selectedProposalId: action.proposalId,
  }))
);

const selectState = createFeatureSelector<AppStore>(APP_STORE);
export const selectRouter =
  createFeatureSelector<fromRouter.RouterReducerState<any>>('router');

const { selectAll, selectTotal } = adapter.getSelectors();

const {
  selectQueryParam, // factory function to select a query param
  selectUrl,
} = fromRouter.getSelectors(selectRouter);

export const selectIsCreatePage = createSelector(
  selectQueryParam(QueryParamKey.IS_CREATE_PAGE),
  (isCreatePage) => {
    return isCreatePage === String(IsCreatePage.TRUE);
  }
);

export const selectCurrentUrl = createSelector(selectUrl, (url) => {
  return url;
});

export const selectIsLoading = createSelector(
  selectState,
  (state) => state.registeredLoading > 0
);

export const selectIsSaving = createSelector(
  selectState,
  (state) => state.registeredSaving > 0
);

export const selectFireAuthUserData = createSelector(
  selectState,
  (state) => state.fireAuthUserData
);
export const selectDtUser = createSelector(
  selectState,
  (state) => state.dtUser
);
export const selectAvatarColor = createSelector(
  selectState,
  (state) => state.avatarColor
);
export const selectDtTeam = createSelector(
  selectState,
  (state) => state.dtTeam
);
export const selectDtOrg = createSelector(selectState, (state) => state.dtOrg);

export const selectIsProposalReviewMode = createSelector(
  selectState,
  (state) => {
    if (state.proposalViewMode === undefined) return undefined;
    return state.proposalViewMode === ProposalViewMode.REVIEW;
  }
);

export const selectIsAutosaveActive = createSelector(
  selectState,
  (state) => state.isAutosaveActive
);

export const selectProposalViewMode = createSelector(
  selectState,
  (state) => state.proposalViewMode
);

export const selectProposalInfos = createSelector(selectState, selectAll);
export const selectProposalTotal = createSelector(selectState, selectTotal);
export const selectSelectedProposalInfo = createSelector(
  selectState,
  selectProposalInfos,
  (state, proposalInfos) => {
    if (!proposalInfos || !state.selectedProposalId) return undefined;
    return proposalInfos.find(
      (proposalInfo) => proposalInfo.proposal.id === state.selectedProposalId
    );
  }
);

export const selecteSelectedProposalPermissions = createSelector(
  selectSelectedProposalInfo,
  (selectedProposalInfo) =>
    selectedProposalInfo?.permissions.filter(
      (permission) => permission.permission?.operation !== PermissionOp.NONE
    )
);

export const selectSelectedProposalOwners = createSelector(
  selectSelectedProposalInfo,
  (selectedProposalInfo) => {
    if (!selectedProposalInfo) return undefined;
    return selectedProposalInfo?.permissions
      .filter((proposalPermission) =>
        [PermissionOp.ALL, PermissionOp.WRITE].includes(
          proposalPermission.permission?.operation!
        )
      )
      .map((proposalPermission) => proposalPermission.user!);
  }
);

export const selectSelectedProposalReviewers = createSelector(
  selectSelectedProposalInfo,
  (selectedProposalInfo) => {
    if (!selectedProposalInfo) return undefined;
    return selectedProposalInfo?.permissions
      .filter(
        (proposalPermission) =>
          proposalPermission.permission?.operation === PermissionOp.REVIEW
      )
      .map((proposalPermission) => proposalPermission.user!);
  }
);

export const selectDraftCommentThread = createSelector(
  selectState,
  (state) => state.draftCommentThread
);

export const selectDraftCommentMessage = createSelector(
  selectState,
  (state) => state.draftCommentMessage
);

export const selectSelectedProposalCommentThreads = createSelector(
  selectState,
  (state) => state.selectedProposalCommentThreads
);

export const selectSelectedCommentThread = createSelector(
  selectState,
  (state) => state.selectedCommentThread
);

export const selectSelectedCommentThreadMessages = createSelector(
  selectState,
  selectSelectedCommentThread,
  (state, commenThread) => {
    if (!commenThread?.id) return [];
    return state.commentThreadMessages[commenThread.id];
  }
);

export const selectUsersRegistry = createSelector(
  selectState,
  (state) => state.dtUserRegistry
);

export const selectIsUserOnwerOfSelectedProposal = createSelector(
  selectSelectedProposalOwners,
  selectDtUser,
  (owners, user) => {
    if (owners === undefined || !user) return undefined;
    return owners!.map((owner) => owner!.id).includes(user!.id);
  }
);
export const selectIsUserReviewerOfSelectedProposal = createSelector(
  selectSelectedProposalReviewers,
  selectDtUser,
  (reviewers, user) => {
    if (reviewers === undefined || !user) return undefined;
    return reviewers!.map((reviewer) => reviewer!.id).includes(user!.id);
  }
);

export const selectSelectedPoposalReviews = createSelector(
  selectState,
  (state) => state.selectedProposalReviews
);

function addUsersToRecord(
  record?: Record<string, User>,
  users?: Array<User | null> | readonly User[]
): Record<string, User> {
  if (!users || !users.length) return record ?? {};
  const newRegistry = { ...record! };
  for (const user of users) {
    if (user) {
      newRegistry[user.id] = user;
    }
  }
  return newRegistry;
}

function getAvatarColor() {
  const colors: string[] = [
    '#ff914d', // Orange.
    '#FF6F61', // Living Coral
    '#6B5B95', // Ultra Violet
    '#88B04B', // Greenery
    '#955251', // Marsala
    '#B565A7', // Radiand Orchid
    '#009B77', // Emerald
    '#DD4124', // Tangerine Tango
    '#D65076', // Honeysucle
    '#45B8AC', // Turquoise
    '#EFC050', // Mimosa
    '#5B5EA6', // Blue Izis
    '#C3447A', // Fuchsia Rose
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
