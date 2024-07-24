import Entry from "../models/Entry";
import Events from "../models/Events";
import User from "../models/User";

class EntriesSerivce {
    async getPair(nearId: string) {

        const events = await Events.findOne();
        const user = await User.findOne({nearId});

        if (!events?.activeEvent) {
            throw "The event hasn't started yet. Come back tomorrow!";
        }

        if (!user) throw 'Unknown error.';

        const filteredEntries = events.activeEvent.entries.filter(entry => entry.nearId !== nearId);

        // Sort the remaining entries by votes in ascending order
        filteredEntries.sort((a, b) => a.votes - b.votes);

        // Return the top two entries with the least votes
        return {
            firstEntry: filteredEntries[0],
            secondEntry: filteredEntries[1],
            userVoted: user.votedToday
        };
    };

    async userSubmited(nearId: string): Promise<boolean> {
        const user = await User.findOne({ nearId });

        if (!user) return false;

        return user?.sumbitedToday;
    }

    async add(nearId: string, path: string, current: boolean = false) {

        const user = await User.findOne({ nearId });

        if (!user || user.sumbitedToday) throw "You've already submited your meme!";

        user.sumbitedToday = true;
        const entry = new Entry({ nearId, image: path });
        const events = await Events.findOne();

        if (!events) throw "Unknown error!";

        if (!current) events.nextEvent.entries.push(entry);

        else {
            if (!events.activeEvent) throw "There is no active event right now.";
            events.activeEvent.entries.push(entry);
        }

        await events.save();
        await user.save();
    }

    async vote(nearId : string, winner : string, loser : string) {
        
        const user = await User.findOne({nearId});
        const events = await Events.findOne();
        
        if (!user || !events) throw "Unknown error.";

        if (user.votedToday >= events.activeEvent.voteLimit) throw "You used the maximum number of votes!";

        const winnerEntry = events.activeEvent.entries.find((item) => item.nearId === winner);
        const loserEntry =  events.activeEvent.entries.find((item) => item.nearId === loser);

        if (!winnerEntry || !loserEntry) throw "Failed to vote.";

        winnerEntry.score++;
        winnerEntry.votes++;

        loserEntry.score--;
        loserEntry.votes++;

        user.votedToday++;

        await events.save();
        await user.save();
    }
}

export default new EntriesSerivce();