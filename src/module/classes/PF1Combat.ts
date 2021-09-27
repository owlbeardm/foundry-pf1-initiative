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

    async GetSElect() {
        // const template = "templates/selectAction.hbs";
        return new Promise(resolve => {
            const content = `<form>  <div class="form-group">    <label>      <input type="radio" name="action" value="sw" />      Swift Action (1d4)    </label>  </div>  <div class="form-group">    <label>      <input type="radio" name="action" value="m" />      Move Action (1d6)    </label>  </div>  <div class="form-group">    <label>      <input type="radio" name="action" value="s" />      Standard Action (1d8)    </label>  </div>  <div class="form-group">    <label>      <input type="radio" name="action" value="sp" />      Casting Spell Action (1d10)    </label>  </div>  <div class="form-group">    <label>      <input type="radio" name="action" value="f" />      Full-round Action (1d8+1d6)    </label>  </div></form>`;
            console.log(content);
            const d = new Dialog({
                title: "Test Dialog",
                content: content,
                buttons: {
                    roll: {
                        label: "Roll",
                        callback: (html) => this.myCallback(html, false, resolve)
                    },
                    improved: {
                        label: "Improved Inititative",
                        callback: (html) => this.myCallback(html, true, resolve)
                    }
                },
                default: "roll",
                // render: () => console.log("Register interactivity in the rendered dialog"),
                close: () => resolve("")
            });
            d.render(true);
        });
    }

    myCallback(html, improved, resolve) {
        const selectedAction = html.find('input[name="action"]:checked').val();
        console.log("selected action", selectedAction)
        let diceToRoll = "";
        switch (selectedAction) {
            case "sw":
                diceToRoll += "1d4" + (improved ? "kh" : "");
                break;
            case "m":
                diceToRoll += "1d6" + (improved ? "kh" : "");
                break;
            case "s":
                diceToRoll += "1d8" + (improved ? "kh" : "");
                break;
            case "sp":
                diceToRoll += "1d10" + (improved ? "kh" : "");
                break;
            case "f":
                diceToRoll += improved ? "min(1d8+1d6,1d8+1d6)" : "1d8+1d6";
                break;
            default:
                break;
        }
        console.log("value", diceToRoll);
        resolve(diceToRoll);
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
            options.formula = await this.GetSElect();
            options.formula = options.formula + "+" + this.getCombatant(ids[0]).initiative;
        }
        console.log("ids.length", ids.length)
        return super.rollInitiative(ids, options);
    }

    async nextRound() {
        await this.resetAll();
    }

}