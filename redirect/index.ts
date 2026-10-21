// www.mikailbayram.com → mikailbayram.com, keeping the path and query.
export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    url.hostname = 'mikailbayram.com';
    return Response.redirect(url.toString(), 301);
  },
};
