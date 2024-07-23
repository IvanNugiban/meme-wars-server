import Events from "../models/Events";
import User from "../models/User";
import Event from "../models/Event";
import { entryPrice, minimumEntries, winnersPercent } from "../utils/constants";

class EventsService {
    async getActive() {
        const events = await Events.findOne();

        if (!events) throw "Unknown error!";
        if (!events.activeEvent) throw "There is no active event right now. Come back later!"

        return events.activeEvent;
    }

    async getPrevious() {
        const events = await Events.findOne();

        if (!events) throw "Unknown error!";
        if (events.pastEvents.length === 0) throw "There is no previous events!"

        return events.pastEvents[events.pastEvents.length - 1];
    }

    async resetEvent() {

        for await (const user of User.find()) {
            user.sumbitedToday = false;
            await user.save();
        }

        const events = await Events.findOne();

        if (!events) return;

        if (events.nextEvent.entries.length < minimumEntries) throw "Too little entries for next event!";

        // Summarize the results
        await this.updateLeaderboard();

        const now = new Date();

        if (events.activeEvent) events.pastEvents.push(events.activeEvent);
        events.activeEvent = events.nextEvent;
        events.activeEvent.startDate = now;
        events.activeEvent.endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0));
        events.nextEvent = new Event();
        await events.save();
        await this.updateLeaderboard();
    }

    async updateLeaderboard() {

        const events = await Events.findOne();

        if (!events || !events.activeEvent) return;

        let leaderboard = events.activeEvent.entries;

        leaderboard = events.activeEvent.entries.slice();

        leaderboard = events.activeEvent.entries;

        leaderboard.sort((a, b) => b.score - a.score);

        // Calculate the top 20%
        let top20PercentIndex = Math.ceil(leaderboard.length * winnersPercent / 100);

        // Reward pool
        let rewardPool = leaderboard.length * entryPrice;
        // Calculate the number of top 20% entries
        let totalScore = leaderboard.slice(0, top20PercentIndex).reduce((sum, player) => sum + player.score, 0);

        leaderboard.forEach((player, index) => {
            if (index < top20PercentIndex) {
                // Check if totalScore is zero to avoid division by zero
                if (totalScore > 0) {
                    // Calculate reward based on the player's score relative to the top 20%
                    const reward = (player.score / totalScore) * rewardPool;
                    player.reward = reward;
                } else {
                    // If totalScore is zero, distribute rewards equally
                    const reward = rewardPool / top20PercentIndex;
                    player.reward = reward;
                }
            } else {
                player.reward = 0;
            }
        });

        events.markModified('activeEvent');
        await events.save();
    }
}

export default new EventsService();