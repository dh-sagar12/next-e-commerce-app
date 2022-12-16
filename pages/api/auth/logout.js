import cookie from "cookie";

export default async (req, res) => {
    if (req.method === "POST") {
        res.setHeader("Set-Cookie", [
            cookie.serialize("GustyAccess", '', {
                httpOnly: true,
                secure: false,
                expires: new Date(0),
                sameSite: "strict",
                path: "/",
            }),
            cookie.serialize("GustyRefresh", '', {
                httpOnly: true,
                secure: false,
                expires: new Date(0),
                sameSite: "strict",
                path: "/",
            }),
        ]);
        return res.status(200).json({'msg': 'LoggedOut Successfully' }); //success: data.success
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};