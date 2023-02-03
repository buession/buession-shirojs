import { Un } from "@/core/types";

export const hasAny = (data: string[] | Un, value: any): boolean => {
	return Array.isArray(data) && data.indexOf(value) >= 0;
}

export const hasAll = (data: string[] | Un, values: any[] | Un): boolean => {
	if (Array.isArray(data) && (Array.isArray(values) && values.length > 0)) {
		for (let i = 0; i < values.length; i++) {
			if (data.indexOf(values[i]) >= 0) {
				return true;
			}
		}
	}

	return false;
}
