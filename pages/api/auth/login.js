import cookie from "cookie";

export default async (req, res) => {

    const API_URL  =  process.env.baseURL
    if (req.method === "POST") {
        const { email, password } = req.body;



        const body = JSON.stringify({
            email,
            password,
        });
        try {
            const apiRes = await fetch(`${API_URL}/api/login/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: body,
            });

            const data = await apiRes.json();

            if (apiRes.status === 200) {
                res.setHeader("Set-Cookie", [
                    cookie.serialize("GustyAccess", data.token.access, {
                        httpOnly: true,
                        secure: false,
                        maxAge: 60 * 30,
                        sameSite: "strict",
                        path: "/",
                    }),
                    cookie.serialize("GustyRefresh", data.token.refresh, {
                        httpOnly: true,
                        secure: false,
                        maxAge: 60 * 60 * 24*30,
                        sameSite: "strict",
                        path: "/",
                    }),
                ]);
                return res.status(200).json(data); //success: data.success
            } else {
                return res.status(401).json(data);
            }
        } catch (err) {
            return res.status(500).json({
                error: "Something went wrong during the authentication.",
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};