import { T_STRING, T_STRING_ARRAY } from '../core/types';

export const hasAny = (data: T_STRING_ARRAY, value: any): boolean => {
	if (data === null || data === undefined) {
		return false;
	}

	return data.indexOf(value) >= 0;
}

export const hasAll = (data: T_STRING_ARRAY, values: any[]): boolean => {
	if (data === null || data === undefined) {
		return false;
	}
	
	if (values === null || values === undefined) {
		return false;
	}

	if (values.length > 0) {
		for (let i = 0; i < values.length; i++) {
			if (data.indexOf(values[i]) < 0) {
				return false;
			}
		}

		return true;
	}

	return false;
}