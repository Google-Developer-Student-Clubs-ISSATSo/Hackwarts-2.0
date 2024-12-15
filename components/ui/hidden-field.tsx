type HiddenFieldProps = {
	name?: string;
	value?: string | number | readonly string[] | undefined;
};

export function HiddenField({ name, value = '' }: HiddenFieldProps) {
	return <input type="hidden" name={name} value={value} />;
}
