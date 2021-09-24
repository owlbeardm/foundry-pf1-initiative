export default class PF1CombatTracker extends CombatTracker {

    _onCombatantMouseDown(event: JQuery.ClickEvent){
        console.log("combat event", event);
        // if(combat)
        return super._onCombatantMouseDown(event);
    }



}