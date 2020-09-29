export async function login({ auth }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (auth="true") {
                resolve();
            }
            else {
                reject();
            }
        }, 1000);
    })
}