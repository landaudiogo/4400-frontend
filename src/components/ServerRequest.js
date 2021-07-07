var base64 = require('base-64')

export default async function serverRequest(content) {
    const { uri, method, basic_auth, data, params } = content

    let url = new URL('http://4400app.com:5000/api/v1' + uri)
    url.search = new URLSearchParams(params).toString()

    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: method ? method : 'GET',
    }
    if (data) {
        options.body = JSON.stringify(data)
    }
    if (basic_auth) {
        options.headers.Authorization = 'Basic ' + base64.encode(basic_auth.username + ':' + basic_auth.password)
    }
    return await fetch(url, options)
}