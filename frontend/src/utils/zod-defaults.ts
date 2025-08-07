/* eslint-disable @typescript-eslint/no-explicit-any */

import { z, ZodObject } from "zod";

export const generateDefaultValues = <T extends ZodObject<any>>(
	schema: T
): z.infer<T> => {
	const shape = schema.shape;
	const defaults: any = {};

	for (const key in shape) {
		const field = shape[key];

		// Try ._def.defaultValue
		if (field._def.defaultValue !== undefined) {
			defaults[key] = field._def.defaultValue();
		}
		// Fallback for strings
		else if (field._def.typeName === "ZodString") {
			defaults[key] = "";
		}
		// Fallback for numbers
		else if (field._def.typeName === "ZodNumber") {
			defaults[key] = 0;
		}
		// Fallback for arrays
		else if (field._def.typeName === "ZodArray") {
			defaults[key] = [];
		}
		// Fallback for booleans
		else if (field._def.typeName === "ZodBoolean") {
			defaults[key] = false;
		}
		// Handle nested objects recursively
		else if (field._def.typeName === "ZodObject") {
			defaults[key] = generateDefaultValues(field);
		}
		// You can extend for more types here
		else {
			defaults[key] = undefined;
		}
	}

	return defaults;
};
