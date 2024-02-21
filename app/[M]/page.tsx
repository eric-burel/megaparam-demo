import { ConfigForm } from "./config-form";
import { decode, encode } from "./params";
/**
 * Run the server and open
 * http://localhost:3000/vn/examples/megaparam-demo
 */
export default function MegaparamDemo({
    params,
}: { params: { M: string } }) {
    console.log("Statically rendering Megaparam demo, you should see this log only during build-time and server-side")
    const { theme, company } = decode(params)
    return (
        <div
            style={{
                maxWidth: "960px",
                margin: "auto",
                padding: "64px 32px",
                color: theme === "dark" ? "#ebefeb" : "#363333",
                background: theme === "dark" ? "#363333" : "#ebefeb",
            }}
        >
            <h1>Welcome back, user of company &quo;{company}!&quo;</h1>
            <p>
                This page demonstrate Megaparam, a pattern to statically render a
                complex combination of parameters.
            </p>
            <p>
                This example uses 2 parameters: theme, and company. Both are stored in
                the cookies.
            </p>
            <p>
                Some theme/company combinations are pre-rendered statically, some will
                be rendered on-the-fly.
            </p>
            <p>
                See our article for more insights:{" "}
                <a href="https://blog.vulcanjs.org/render-anything-statically-with-next-js-and-the-megaparam-4039e66ffde">
                    M the Megaparameter
                </a>
            </p>
            <ConfigForm theme={theme} company={company} />
        </div>
    );
};


export function generateStaticParams() {
    const params = [
        { theme: "light", company: "my_company" },
        // clients of "my_company" are known for using a dark theme
        // => we render it at build time
        { theme: "dark", company: "my_company" },
        { theme: "light", company: "my_other_company" },
    ];
    const encodedParams = params.map((p) => ({ params: { M: encode(p) } }))
    return encodedParams
};

// less common combinations will be dynamically server-rendered
export const dynamic = true