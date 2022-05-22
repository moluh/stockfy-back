export async function isQueryAllowed(query: any[]): Promise<any> {
    for (let i = 0; i < query.length; i++) {
        const isQueryAllowed = /^[a-zA-Z]+$/.test(query[i])
        if (!isQueryAllowed)
            return await (<any[] | any>(
                Promise.reject({ message: 'Query not allowed' })
            ))
    }
}
