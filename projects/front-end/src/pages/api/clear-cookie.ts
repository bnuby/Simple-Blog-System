import { ServerResponse, ClientRequest } from "http";
import cookie from "cookie";
import IsProduction from "~lib/is-production";

export default (req: ClientRequest, res: ServerResponse) => {
  switch (req.method) {
    case "POST":
      if (req.body) {
        const { key, value }: { key: string; value: string } = JSON.parse(
          req.body
        );

        res.setHeader(
          "Set-Cookie",
          cookie.serialize(key, JSON.stringify(value), {
            secure: IsProduction,
            httpOnly: !IsProduction,
            maxAge: 0,
            path: "/",
          })
        );
      }
      break;
    default:
      break;
  }

  res.write("OK");
  res.end();
};
