import type { FormPathLeaves, FormPathType, SuperForm } from "sveltekit-superforms";

type FormFieldHtmlAttributes<HtmlAttributes extends object> = Omit<
	HtmlAttributes,
	"value" | "form" | "name" | "checked" | "type"
>;

type FormFieldAttributes = {
	label?: string;
	description?: string;
};

type FormField<T extends Record<string, unknown>, K extends FormPathLeaves<T>> = {
	name: K;
	form: SuperForm<T>;
	value?: FormPathType<T, K>;
};

export type FormFieldProps<
	Form extends Record<string, unknown>,
	Field extends FormPathLeaves<Form>,
	HtmlAttributes extends object = object
> = FormField<Form, Field> & FormFieldHtmlAttributes<HtmlAttributes> & FormFieldAttributes;

export type WithLabel = { label: string };
