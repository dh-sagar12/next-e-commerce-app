import cookie from "cookie";


export default async (req, res) => {
    const API_URL = process.env.baseURL

    if (req.method === "GET") {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const access = cookies.GustyAccess ?? false;

        if (access === false) {
            return res.status(401).json({
                error: "User unauthorized to make this request",
            });
        }

        // const body = JSON.stringify({
        //     refresh,
        // });

        try {
            const apiRes = await fetch(`${API_URL}/api/current-user/`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${access}`
                }
            });

            const data = await apiRes.json();

            if (apiRes.status === 200) {

                return res.status(200).json(data);
            } else {
                return res.status(apiRes.status).json({
                    error: "Unauthorized User",
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: "Something went wrong when trying to fulfill refresh request",
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};