const breadcrumb = () => {
  const routerWithBreadcrumb = [
    // Dashboard
    /^\/$/,

    // Muscle Training
    /^\/training$/,
    /^\/training\/muscle-courses$/,
    /^\/training\/muscle-courses\/\d+\/settings$/,
    /^\/training\/muscle-courses\/\d+\/lesson-log\/result$/,
    /^\/training\/muscle-exam$/,
    /^\/training\/muscle-exam\/\d+$/,
    /^\/training\/muscle-courses\/commentary\/\d+$/,
    /^\/training\/muscle-exam\/commentary\/\d+$/,
    /^\/training\/muscle-result\/\d+$/,
    /^\/training\/muscle-exam\/commentary\/\d+$/,

    // Lesson Log
    /^\/learning-logs$/,

    // Proficiency
    /^\/proficiency\/knowledge\/words$/,
    /^\/proficiency\/knowledge\/words\/\d+$/,
    /^\/proficiency\/knowledge\/phrases$/,
    /^\/proficiency\/knowledge\/phrases\/\d+$/,
    /^\/proficiency\/knowledge\/check-list/,
    /^\/training\/muscle-courses\/check-list\/commentary\/\d+/,

    // Login
    /^\/input-email$/,
    /^\/login$/,

    //news
    /^\/news$/,
    /^\/news\/bookmarks$/,
    /^\/news\/\d+\/details$/,

    // Lectures
    /^\/lectures$/,
    /^\/lectures\/bookmarks$/,
    /^\/lectures\/\d+\/live$/,
    /^\/lectures\/\d+\/on-demand\/overview$/,

    // SelfLearning
    /^\/self-learning\/listening$/,
    /^\/self-learning\/reading$/,
  ]

  const init = () => {
    localStorage.setItem('breadcrumbs', [])
  }

  const verifyIfHaveBreadCrumbs = (route) => {
    return routerWithBreadcrumb.some(regex => regex.test(route));
  }
  
  const push = (route) => {
    if (verifyIfHaveBreadCrumbs(route)) {
      let breadcrumbs = localStorage.getItem('breadcrumbs');

      breadcrumbs = breadcrumbs ? breadcrumbs.split(',') : []

      if (!breadcrumbs.includes(route)) {
        breadcrumbs.unshift(route)
      }

      localStorage.setItem('breadcrumbs', breadcrumbs)
    }
  }

  const back = (callback = () => {}) => {
    let breadcrumb = localStorage.getItem('breadcrumbs').split(',')

    breadcrumb.shift()

    localStorage.setItem('breadcrumbs', breadcrumb)

    callback(breadcrumb[0]);
  }

  const remove = (routesByRegex) => {
    let breadcrumbs = localStorage.getItem('breadcrumbs').split(',')

    // Filter it from array
    breadcrumbs = breadcrumbs.filter( items => {
      return !routesByRegex.some(regex => regex.test(items))
    })

    // set the breadcrumbs again
    localStorage.setItem('breadcrumbs', breadcrumbs)
  }

  return {
    init,
    push,
    back,
    remove
  }
}

export default breadcrumb()
