export async function GET(request) {
    return new Response("Hello world!", {
        status: 200,
        headers: { 
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
}