import cookie from "cookie";

export default async (req, res) => {

    const API_URL = process.env.baseURL
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.GustyAccess ?? false;

    if (req.method === "GET") {

        if (access === false) {
            return res.status(401).json({
                error: "User unauthorized to make this request",
            });
        }


        const id = req.query.id ?? 0
        console.log(id);

        try {
            const apiRes = await fetch(`${API_URL}/api/stock/all-order/?` + new URLSearchParams({id: id}), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access}`
                },
            });

            const data = await apiRes.json();

            if (apiRes.status === 200) {

                return res.status(200).json(data);
            }
            else if (apiRes.status == 500) {
                return res.status(500).json(data);
            }
            else if (apiRes.status == 401) {
                return res.status(401).json(data);
            }
            else {
                return res.status(apiRes.status).json({
                    error: "Un-authorize access denied ",
                    data: data
                });
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