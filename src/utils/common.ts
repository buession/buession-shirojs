type FindTypes = string[] | null | undefined;

export const hasAny = (data:FindTypes, value:any) => {
	return typeof data !== 'undefined' && data != null ? data.indexOf(value) >= 0 : false;
}

export const hasAll = (data:FindTypes, values:any[]) => {
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