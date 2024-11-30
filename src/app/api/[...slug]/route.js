const notFoundJSON = (request, params) => {
  return Response.json(
    { message: `Route Not Found '/api/${params?.slug?.join("/") || ""}/'` },
    { status: 404 },
  )
}

export function GET(request, { params }) {
  return notFoundJSON(request, params);
}
export function POST(request, { params }) {
  return notFoundJSON(request, params);
}
export function PUT(request, { params }) {
  return notFoundJSON(request, params);
}
export function DELETE(request, { params }) {
  return notFoundJSON(request, params);
}