
import { create } from 'zustand';
import { Vote } from '../types/vote.interface';


type VoteActions = {
    addVote: (newVote: Vote) => void;
    resetStore: () => void;
}

type VoteProps = {
    votes: Vote[];
};


export const useVoteStore = create<VoteActions & VoteProps>((set) => ({
    votes: [],
    addVote: (newVote: Vote) => {
        console.log(newVote);
        set((state) => ({
            votes: [...state.votes.filter(x => x.User.id !== newVote.User.id), newVote],
        }));
    },
    resetStore: () => {
        set(() => ({
            votes: [],
        }));
    },
}));

export function getVoteStoreMethods() {
    const { votes, addVote, resetStore } =
        useVoteStore.getState();
    return { votes, addVote, resetStore };
}
