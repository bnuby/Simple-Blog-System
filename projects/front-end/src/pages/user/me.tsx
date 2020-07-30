import { FunctionComponent } from "react";
import withAuth from "~components/withAuth";
import Layout from "~components/layout";
import UserModel from "~src/model/user.model";
import { getLocalUser } from "~lib/auth";
import Date from "~components/date";
import { isBrowser } from "~lib/is-browser";

interface UserMeProps {
  user: UserModel;
}

// eslint-disable-next-line react/prefer-stateless-function
const UserMe: FunctionComponent = () => {
  let user: UserModel = {};
  if (isBrowser) {
    const tempUser = getLocalUser();
    if (tempUser) {
      user = tempUser;
    }
  }

  return (
    <Layout
      titleName="My Profile"
    >
      <div className="userMe">
        <div>
          <img
            className="person-img"
            src="https://picsum.photos/seed/picsum/200/300"
            title="picsum random image"
            alt="img"
          />
        </div>

        <div>
          <h3>
            {user.first_name} {user.last_name}
          </h3>
        </div>

        <div className="row">
          <span className="title">Email</span>
          <span className="value">{user?.email || ""}</span>
        </div>

        <div className="row">
          <span className="title">Age</span>
          <span className="value">{user?.age || ""}</span>
        </div>

        <div className="row">
          <span className="title">Created Date</span>
          <span className="value">
            {user.created_at ? (
              <Date
                dateString={user?.created_at as string}
                dateFormat="yyyy/MM/dd HH:mm:ss"
              />
            ) : (
              <span />
            )}
          </span>
        </div>

        <div className="row">
          <span className="title">Last Login Date</span>
          <span className="value">
            {user.last_login_date ? (
              <Date
                dateString={user?.last_login_date as string}
                dateFormat="yyyy/MM/dd HH:mm:ss"
              />
            ) : (
              <span />
            )}
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(UserMe);
