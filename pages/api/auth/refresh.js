import cookie from "cookie";


export default async (req, res) => {
    const API_URL = process.env.baseURL

    if (req.method === "GET") {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const refresh = cookies.GustyRefresh ?? false;

        if (refresh === false) {
            return res.status(401).json({
                error: "User unauthorized to make this request",
                status: 401
            });
        }

        const body = JSON.stringify({
            refresh,
        });

        try {
            const apiRes = await fetch(`${API_URL}/api/refreshtoken/`, {
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
                    cookie.serialize("GustyAccess", data.access, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 30,
                        sameSite: "strict",
                        path: "/",
                    })
                ]);

                return res.status(200).json({
                    success: "Refresh request successful",
                    status: 200
                });
            } else {
                return res.status(apiRes.status).json({
                    error: "Failed to fulfill refresh request",
                    status: apiRes.status
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: "Something went wrong when trying to fulfill refresh request",
                status: 500
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed`, status: 405 });
    }
};