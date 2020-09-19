export default (context) => {
    const { route, store } = context
    store.commit('setBreadcrumbNone');
    const { fullPath } = route;
    
    let pathSplit = fullPath.split('?')[0].split('/');
    pathSplit = pathSplit.splice(1)
    let pathMatched = []
    for(let i = 1; i <= pathSplit.length; i++) {
        pathMatched.push('/' + pathSplit.slice(0, i).join('/'))
    }
    pathMatched.forEach(e => {
        store.commit('setBreadcrumbByPath', e) 
    })
}