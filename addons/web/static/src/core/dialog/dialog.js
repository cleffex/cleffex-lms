/** @odoo-module **/

import { useHotkey } from "@web/core/hotkeys/hotkey_hook";
import { useActiveElement } from "../ui/ui_service";
import { LegacyComponent } from "@web/legacy/legacy_component";

const { useRef, useChildSubEnv, xml } = owl;

export class Dialog extends LegacyComponent {
    setup() {
        if (this.constructor === Dialog) {
            throw new Error(
                "Dialog should not be used by itself. Please use the dialog service with a Dialog subclass."
            );
        }
        this.modalRef = useRef("modal");
        useActiveElement("modal");
        useHotkey("escape", () => {
            this.close();
        });
        useChildSubEnv({ inDialog: true });
        this.close = this.close.bind(this);
        this.contentClass = this.constructor.contentClass;
        this.fullscreen = this.constructor.fullscreen;
        this.renderFooter = this.constructor.renderFooter;
        this.renderHeader = this.constructor.renderHeader;
        this.size = this.constructor.size;
        this.technical = this.constructor.technical;
        this.title = this.constructor.title;
    }

    /**
     * Send an event signaling that the dialog should be closed.
     * @private
     */
    close() {
        this.props.close();
    }
}

Dialog.template = "web.Dialog";
Dialog.contentClass = null;
Dialog.fullscreen = false;
Dialog.renderFooter = true;
Dialog.renderHeader = true;
Dialog.size = "modal-lg";
Dialog.technical = true;
Dialog.title = "Odoo";
Dialog.bodyTemplate = xml`<div/>`;
Dialog.footerTemplate = "web.DialogFooterDefault";
Dialog.props = {
    close: Function,
    isActive: { optional: true },
    "*": true,
};
