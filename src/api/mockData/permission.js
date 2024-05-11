import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "admin") {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "Home",
              icon: "house",
              url: "home/Home",
            },
            {
              path: "/product",
              name: "product",
              label: "Product",
              icon: "video-play",
              url: "product/index",
            },
            {
              path: "/user",
              name: "user",
              label: "User",
              icon: "user",
              url: "user/User",
            },
            {
              label: "Other",
              icon: "location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "Page1",
                  icon: "setting",
                  url: "Page1",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "Page2",
                  icon: "setting",
                  url: "Page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "Access successfully",
        },
      };
    } else if (username === "user" && password === "user") {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "Home",
              icon: "house",
              url: "home/Home",
            },
            {
              path: "/product",
              name: "product",
              label: "Product",
              icon: "video-play",
              url: "product/index",
            },
          ],
          token: Mock.Random.guid(),
          message: "Access successfully",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "Wrong Password",
        },
      };
    }
  },
};
