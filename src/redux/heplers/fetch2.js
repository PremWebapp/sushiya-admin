
// this function will be triggered when api call without tokens && POST
export const postApiWithoutToken = async (api, data) => {
    const res = await fetch(api, {
        method: 'post', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const result = await res.json()
    return result
}

// this function will be triggered when api call with tokens && GET
export const getItems = async (api, token = '') => {
    const res = await fetch(api, {
        method: 'get', // or 'PUT'
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    const result = await res.json()
    return result
}

// this function will be triggered when api call with tokens && POST
export const postItems = async (api, data, token = '') => {
    const res = await fetch(api, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(data),
    })
    const result = await res.json()
    return result
}

// this function will be triggered when api call with tokens && DELETE
export const deleteItems = async (api,token = '') => {
    const res = await fetch(api, {
        method: 'DELETE', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        // body: JSON.stringify(data),
    })
    const result = await res.json()
    return result
}

// this function will be triggered when api call with tokens && POST with formData
export const postWithImageItems = async (api, formData = '', token = '') => {
    const res = await fetch(api, {
        method: 'POST', // or 'PUT'
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: formData,
    })
    const result = await res.json()
    return result
}