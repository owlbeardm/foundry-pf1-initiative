// import {Combat} from '@league-of-foundry-developers';

export default class PF1Combat extends Combat {

    _sortCombatants(a: Combat.Combatant, b: Combat.Combatant): number {
        const initA: number = Number(a.initiative) && a.initiative ? a.initiative : 9999;
        const initB: number = Number(b.initiative) && b.initiative ? b.initiative : 9999;

        const intDiff: number = initA - initB;
        if (intDiff != 0) {
            return intDiff;
        }

        const dexA: number = Number(a.actor?.data.data.abilities.dex.total) && a.actor?.data.data.abilities.dex.total ? a.actor?.data.data.abilities.dex.total : 9999;
        const dexB: number = Number(b.actor?.data.data.abilities.dex.total) && b.actor?.data.data.abilities.dex.total ? b.actor?.data.data.abilities.dex.total : 9999;

        const dexDiff: number = dexB - dexA;
        if (dexDiff != 0) {
            return dexDiff;
        }

        const typeA = a.actor?.data.type;
        const typeB = b.actor?.data.type;


        if (typeA != typeB) {
            if (typeA == "character") {
                return 1;
            }
            if (typeB == "character") {
                return -1;
            }
        }
        return Number(a.tokenId) - Number(b.tokenId);

    }

    async rollAll(options) {
        if (!options) {
            options = {};
        }
        options.formula = "1d8+1d6";
        return super.rollAll(options);
    }

    async rollNPC(options) {
        if (!options) {
            options = {};
        }
        options.formula = "1d8+1d6";
        return super.rollNPC(options);
    }

    async rollInitiative(ids, options) {
        console.log("ids.length", ids.length)
        if (!options) {
            options = {};
        }
        options.formula = "1d8+1d6";
        if (ids.length == 1) {
            options.formula = options.formula + "+" + this.getCombatant(ids[0]).initiative;
        }
        console.log("ids.length", ids.length)
        return super.rollInitiative(ids, options);
    }

    async nextRound() {
        await this.resetAll();
    }

}