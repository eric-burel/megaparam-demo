"use client"
import { useRouter } from "next/navigation"
import { PersonalizationParams } from "./params";

export function ConfigForm({ theme, company }: PersonalizationParams) {
    const router = useRouter()
    return <form
        className="rounded border border-blue-900 p-8 my-4"
        onSubmit={(evt) => {
            evt.preventDefault();
            const theme = (evt.target as HTMLFormElement)["theme"]?.value;
            const company = (evt.target as HTMLFormElement)["company"]?.value;
            (window as any).cookieStore.set("company", company);
            (window as any).cookieStore.set("theme", theme);
            router.refresh();
        }}
    >
        <div className="py-4">
            <label htmlFor="theme">Pick a theme:</label>
            <select id="theme" name="theme" defaultValue={theme}>
                <option value="dark">Switch to dark theme</option>
                <option value="light">Switch to light theme</option>
            </select>
        </div>
        <div className="py-4">
            <label htmlFor="company">Pick a company</label>
            <select id="company" name="company" defaultValue={company}>
                <option value="my_company">my_company</option>
                <option value="my_other_company">my_other_company</option>
            </select>
        </div>
        <div className="py-4">
            <button>Apply change</button>
        </div>
    </form>
}