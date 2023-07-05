import { getData } from "@/app/services/datahandler";
import data from "../../datastore.json";

export async function GET(request: Request) {
    return new Response(JSON.stringify(data));
}