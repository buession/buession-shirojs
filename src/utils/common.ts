import { T_STRING, T_STRING_ARRAY } from '../core/types'

export const hasAny = (data: T_STRING_ARRAY, value: any, all:T_STRING = null): boolean => {
	return typeof data !== 'undefined' && data != null ? data.indexOf(value) >= 0 : false;
}

export const hasAll = (data: T_STRING_ARRAY, values: any[], all:T_STRING = null): boolean => {
	if (typeof data !== 'undefined' && data != null) {
		for (let value of values) {
			if (data.indexOf(value) < 0) {
				return false;
			}
		}

		return true;
	}

	return false;
}