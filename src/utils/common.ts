import { Oun } from '@/core/types';

export const isNull = (obj: any): boolean => {
	return obj === null;
}

export const isUndefined = (obj: any): boolean => {
	return obj === undefined;
}

export const isUndefinedOrNull = (obj: any): boolean => {
	return isUndefined(obj) || isNull(obj);
}

export const hasAny = (data: Oun<string[]>, value: any): boolean => {
	return Array.isArray(data) && data.indexOf(value) >= 0;
}

export const hasAll = (data: Oun<string[]>, values: Oun<any[]>): boolean => {
	if (Array.isArray(data) && (Array.isArray(values) && values.length > 0)) {
		for (let i = 0; i < values.length; i++) {
			if (data.indexOf(values[i]) >= 0) {
				return true;
			}
		}
	}

	return false;
}
