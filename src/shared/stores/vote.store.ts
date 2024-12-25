import { create } from 'zustand';
import { UserVote } from '../types/user-vote.interface';

type VoteActions = {
  addVote: (newVote: UserVote) => void;
  resetStore: () => void;
};

type VoteProps = {
  votes: UserVote[];
};

export const useVoteStore = create<VoteActions & VoteProps>((set) => ({
  votes: [],
  addVote: (newVote: UserVote) => {
    console.log(newVote);
    set((state) => ({
      votes: [
        ...state.votes.filter((x) => x.user.id !== newVote.user.id),
        newVote
      ]
    }));
  },
  resetStore: () => {
    set(() => ({
      votes: []
    }));
  }
}));

export function getVoteStoreMethods() {
  const { votes, addVote, resetStore } = useVoteStore.getState();
  return { votes, addVote, resetStore };
}
