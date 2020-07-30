import { ServerResponse, IncomingMessage } from "http";

const redirect = (res: ServerResponse, target: string, msg?: any) => {
  // server
  // 303: "See other"
  res.writeHead(303, { Location: target });
  if (msg) res.write(JSON.stringify(msg));

  res.end();
};

export default (req: IncomingMessage, res: ServerResponse) => {
  console.log("server side props");

  switch (req.method) {
    case "POST":
      const { email, password } = req.body;

      if (!email || !password) {
        redirect(res, "/login", {
          error: true,
          msg: "Email & Password is required!",
        });

        return {
          props: {},
        };
      }
      break;
    default:
  }

  console.log(res, req);

  
  redirect(res, "/login");

  return {
    props: {},
  };
};
