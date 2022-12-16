import { NextResponse } from "next/server";
import { wrapper } from "./redux/store";

 function middleware(req) {
    let is_admin = false
    let url = req.url
    console.log(url);
    return NextResponse.redirect("http://localhost:3000/");


}



