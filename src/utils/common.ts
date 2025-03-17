import { Oun } from '@/core/types';

export const isNull = (obj: any): boolean => {
	return obj === null;
}

export const isUndefined = (obj: any): boolean => {
	return obj === undefined;
}

export const isUndefinedOrNull = (obj: any): boolean => {
	return isUndefined(obj) === true || isNull(obj) === true;
}

export const has = (data: Oun<string[]>, value: any): boolean => {
	return Array.isArray(data) && data.includes(value);
}

export const hasAny = (data: Oun<string[]>, values: Oun<any[]>): boolean => {
	if (Array.isArray(data) && (Array.isArray(values) && values.length > 0)) {
		for (let i = 0; i < values.length; i++) {
			if (data.includes(values[i])) {
				return true;
			}
		}
	}

	return false;
}

export const hasAll = (data: Oun<string[]>, values: Oun<any[]>): boolean => {
	if (Array.isArray(data) && (Array.isArray(values) && values.length > 0)) {
		for (let i = 0; i < values.length; i++) {
			if (data.includes(values[i]) === false) {
				return false;
			}
		}

		return true;
	}

	return false;
}
