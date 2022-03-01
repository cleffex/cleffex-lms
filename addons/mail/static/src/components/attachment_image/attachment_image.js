/** @odoo-module **/

import { registerMessagingComponent } from '@mail/utils/messaging_component';
import { useComponentToModel } from '@mail/component_hooks/use_component_to_model/use_component_to_model';
import { LegacyComponent } from "@web/legacy/legacy_component";

export class AttachmentImage extends LegacyComponent {

    /**
     * @override
     */
    setup() {
        super.setup();
        useComponentToModel({ fieldName: 'component', modelName: 'AttachmentImage' });
    }

    /**
     * @returns {AttachmentImage}
     */
    get attachmentImage() {
        return this.messaging && this.messaging.models['AttachmentImage'].get(this.props.localId);
    }

}

Object.assign(AttachmentImage, {
    props: { localId: String },
    template: 'mail.AttachmentImage',
});

registerMessagingComponent(AttachmentImage);
