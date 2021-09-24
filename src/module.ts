import { TemplatePreloader } from "./module/helper/TemplatePreloader";
import PF1Combat from './module/classes/PF1Combat';
import PF1CombatTracker from './module/classes/PF1CombatTracker';

Hooks.once("init", async () => {
    console.log("=============================HMR11============================")

    CONFIG.Combat.entityClass = PF1Combat;
    CONFIG.ui.combat = PF1CombatTracker;
});

Hooks.once("setup", () => {
    // Reverse initiative sorting, with ties won by higher DEX score
    // libWrapper.register(moduleName, "Combat.prototype._sortCombatants", reverseInit, "OVERRIDE");

    // Replace roll initiative button with opening Select Actions dialog
    // libWrapper.register(moduleName, "Combat.prototype.rollInitiative", ravenInitiative, "OVERRIDE");

    // Replace RollAll with rolling Default Initiative Action for NPCs
    // libWrapper.register(moduleName, "Combat.prototype.rollAll", ravenRollNPC, "OVERRIDE");

    // Roll NPCs combat control button now opens DM Initiative Info Panel
    // libWrapper.register(moduleName, "Combat.prototype.rollNPC", ravenInfoPanel, "OVERRIDE");

    // Reset All button also resets current action and delay
    // libWrapper.register(moduleName, "Combat.prototype.resetAll", ravenReset, "WRAPPER");

    // Replace dnd5e actor sheet initiative roll with opening Select Actions dialog
    // libWrapper.register(moduleName, "CONFIG.Actor.documentClass.prototype.rollInitiative", ravenInitiativeActor, "WRAPPER");
});

Hooks.once("ready", async () => {
    
});


if (process.env.NODE_ENV === "development") {
    if (module.hot) {
        module.hot.accept();

        if (module.hot.status() === "apply") {
            for (const template in _templateCache) {
                if (Object.prototype.hasOwnProperty.call(_templateCache, template)) {
                    delete _templateCache[template];
                }
            }

            TemplatePreloader.preloadHandlebarsTemplates().then(() => {
                for (const application in ui.windows) {
                    if (Object.prototype.hasOwnProperty.call(ui.windows, application)) {
                        ui.windows[application].render(true);
                    }
                }
            });
        }
    }
}