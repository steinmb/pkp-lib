/**
 * @file js/load.js
 *
 * Copyright (c) 2014-2019 Simon Fraser University
 * Copyright (c) 2000-2019 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @brief Common configuration for building the Javascript package
 */

// Vue lib and custom mixins
import Vue from 'vue';
import GlobalMixins from '@/mixins/global.js';

// Helper for initializing and tracking Vue controllers
import VueRegistry from './classes/VueRegistry.js';

Vue.mixin(GlobalMixins);

// adapt locale from $.pkp.app.currentLocale
let momentLocale = $.pkp.app.currentLocale.toLowerCase();
momentLocale = momentLocale.split('_')[0];
momentLocale = momentLocale == 'en' ? 'en-gb' : momentLocale;
const moment = require('moment');
require('moment/locale/' + momentLocale);

Vue.use(require('vue-moment'), {
	moment,
});

export default {
	Vue: Vue,
	registry: VueRegistry,
	eventBus: new Vue(),
	const: {},
	/**
	 * Helper function to determine if the current user has a role
	 *
	 * @param int|array roles The role ID to look for (pkp.const.ROLE_ID...)
	 * @return bool
	 */
	userHasRole: function (roles) {

		if (!Array.isArray(roles)) {
			roles = [roles];
		}

		var hasRole = false;
		roles.forEach((role) => {
			if ($.pkp.currentUser.accessRoles.indexOf(role) > -1) {
				hasRole = true;
			}
		});

		return hasRole;
	},
};
