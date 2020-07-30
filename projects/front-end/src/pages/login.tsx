import {
  useState,
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  createRef,
} from "react";
import styles from "~styles/pages/login.module.scss";
import InputField from "~components/input-field";
import Button from "~components/button";
import { LoginReq, loginUser, validateToken } from "~src/request/auth";
import Layout from "~components/layout";
import Divider from "~components/divider";
import { setToken, setUser } from "~lib/auth";
import { useRouter } from "next/dist/client/router";
import withoutAuth from "~components/withoutAuth";
import { get } from "lodash";

const Login: FunctionComponent = () => {
  const buttonRef = createRef<HTMLButtonElement>();
  const router = useRouter();

  /**
   * Form Change
   */
  const [loginReq, setLogin] = useState<LoginReq>({
    email: "",
    password: "",
  });

  /**
   * Login Handler
   */
  const loginHandle = async () => {
    const req = await loginUser(loginReq);

    if (req && req.status) {
      setToken(req.data);

      router.push("/user/me");
      toastr.success("Login Success");
    } else {
      toastr.error("Login Failed");
    }
    if (buttonRef.current) buttonRef.current.disabled = false;
  };

  /**
   * Input Change
   * @param e
   */
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...loginReq, [e.target.name]: e.target.value });
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
        loginHandle();
      }
    }
  };

  return (
    <Layout>
      <div className={styles.loginPage}>
        <form className={styles.loginBoard}>
          <div>
            <h2 style={{ margin: 0 }}>Login Page</h2>
          </div>

          <div style={{ width: "100%" }}>
            <InputField
              noLabel
              name="email"
              placeholder="Email"
              onChange={inputChange}
              onKeyDown={onEnter}
              labelStyle={{ width: "80px" }}
              inputStyle={{ textAlign: "center" }}
            />

            <Divider height={20} />

            <InputField
              noLabel
              placeholder="Password"
              name="password"
              type="password"
              onChange={inputChange}
              onKeyDown={onEnter}
              labelStyle={{ width: "80px" }}
              inputStyle={{ textAlign: "center" }}
            />
          </div>

          <div>
            <Button buttonRef={buttonRef} text="Login" onClick={loginHandle} />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default withoutAuth(Login);
