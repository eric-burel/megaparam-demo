export interface PersonalizationParams {
    theme: string;
    company: string;
}
// dark-my_company => { theme: "dark", company: "my_company"}
export const decode = (params: { M?: string }): PersonalizationParams => {
    const megaparam = params.M;
    if (!megaparam) throw new Error(`Undefined megaparam`);
    if (Array.isArray(megaparam)) throw new Error("Megaparam cannot be an array");
    const split = megaparam.split("-");
    if (split.length !== 2)
        throw new Error(`Megaparam must respect the format "theme-company_name"`);

    const [theme, company] = split;
    if (!["dark", "light"].includes(theme))
        throw new Error(`Theme ${theme} does not exist.`);
    return {
        theme: theme,
        company,
    };
};

// { theme: "dark", company: "my_company"} => "dark-my_company"
export const encode = (params: PersonalizationParams): string => {
    return `${params.theme}-${params.company}`;
};