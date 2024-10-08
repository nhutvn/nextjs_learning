import { AccountResType } from '@/schemaValidations/account.schema';
import http from '@/utils/http';

const accountApiRequest = {
	me: (sessionToken?: string) => {
		http.get<AccountResType>('/account/me', {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	meClient: () => http.get<AccountResType>('/account/me'),
};

export default accountApiRequest;
