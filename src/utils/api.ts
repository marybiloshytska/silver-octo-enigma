export async function getUsers (since: number, pageSize: number) {
    const res = await fetch('https://api.github.com/users' + `?since=${since}&per_page=${pageSize}`)
        .then(res => res.json());
    return res;
}

export async function getUserData (currentUser: string) {
  const res = await fetch(currentUser)
      .then(res => res.json());
  return res;
}