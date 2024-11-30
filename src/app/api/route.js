export function GET(request, { params }) {
  return Response.json(
    {
      message: `hello world /api`,
      // ip: request.get("X-Forwarded-For") || request.get("X-Client-IP"),
     },
    { status: 200 },
  )
}
