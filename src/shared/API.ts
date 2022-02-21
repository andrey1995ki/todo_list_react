import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://6172783961ed900017c408d1.mockapi.io/api/v1/'
})

export const taskAPI ={
    getTaskList(){
        return instance
            .get('/taskList')
    },
    getTask(id:string){
        return instance
            .get(`/taskList/${id}`)
    },
    getSubTaskList(id:string){
        return instance
            .get(`/taskList/${id}/subTask`)
    },
    addSubTask(description:string, id:string){
        console.log(description);
        return instance
            .post(`/taskList/${id}/subTask`,
                {
                    description
                }
            )
    }
    ,createTask(taskName:string,taskDescription: string,createdAt: string,plannedAt: string){
        return instance
            .post(`/taskList/`,
                {
                    taskName,
                    taskDescription,
                    createdAt,
                    plannedAt
                }
            )
    },
    updateSubTask(parameter:any,taskId:string,subTaskId:string){
        return instance
            .put(`/taskList/${taskId}/subTask/${subTaskId}`,{
                ...parameter
            })
    },
    deleteSubTask(taskId:string,subTaskId:string){
        return instance
            .delete(`/taskList/${taskId}/subTask/${subTaskId}`)
    },
    updateTask(parameter:any,taskId:string){
        console.log(parameter);
        return instance
            .put(`/taskList/${taskId}`,{
                ...parameter
            })
    },


}