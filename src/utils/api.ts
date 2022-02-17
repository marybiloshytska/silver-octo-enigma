import { message } from "antd";

export async function getUsers (since: number, pageSize: number) {
    const res = await fetch('https://api.github.com/users' + `?since=${since}&per_page=${pageSize}`)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject('Oops, something went bloop...');
        }).catch((err) => {
            message.error(err);
            return [];
        });
    return res;
}

export async function getUserData (currentUser: string) {
  const res = await fetch(currentUser)
      .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject('Oops, something went bloop...');
      }).catch((err) => {
            message.error(err);
            return {};
        });
  return res;
}