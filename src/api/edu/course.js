import request from '@/utils/request'


export default {
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'Post',
            data: courseInfo
        })
    },
    getListTeacher() {
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get',
        })
    },
    getCourseInfoById(id) {
        return request({
            url: `/eduservice/course/getCourseInfo/${id}`,
            method: 'get',
        })
    },
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    getPublishCourseInfo(id) {
        return request({
            url: `/eduservice/course/getPublishCourseInfo/${id}`,
            method: 'get',
        })
    },
    publishCourse(id) {
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'post',
        })
    },
    getListCourse() {
        return request({
            url: `/eduservice/course`,
            method: 'get',
        })
    },
    deleteCourse(id) {
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete',
        })
    }
}