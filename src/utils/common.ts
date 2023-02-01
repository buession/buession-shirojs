export const hasAny = (data: string[] | null | undefined, value: any): boolean => {
	if (data === null || data === undefined) {
		return false;
	}

	return data.indexOf(value) >= 0;
}

export const hasAll = (data: string[] | null | undefined, values: any[] | null | undefined): boolean => {
	if ((data === null || data === undefined) || (values === null || values === undefined || values.length === 0)) {
		return false;
	}

	for (let i = 0; i < values.length; i++) {
		if (data.indexOf(values[i]) < 0) {
			return false;
		}
	}

	return true;
}