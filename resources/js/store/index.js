import http  from '../http'

export default {
    state: {
        courses: [],
        auth: isAuth ?? false,
        user: user ?? null,
    },
    getters: {
        getCourses(state) {
            return state.courses
        },
        auth(state) {
            return state.auth
        },
        user(state) {
            return state.user
        }
    },
    actions: {
        fetchCourses(context) {
            http.get('/rest/courses/categories/list').then((courses) => {
                context.commit('courses', Object.values(courses).map((course) => {
                    return {
                        id: course.id,
                        name: course.name
                    }
                }))
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mutations: {
        courses(state, data) {
            return state.courses = data
        },
        auth(state, data) {
            return state.auth = data
        },
        user(state, data) {
            return state.user = data
        }
    }
}
